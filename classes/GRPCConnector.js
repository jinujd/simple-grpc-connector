import grpc from "@grpc/grpc-js"
import protoLoader from "@grpc/proto-loader" 
import path from 'path'
import {GRPCConnectorOptions, DEFAULT_OPTIONS} from "./GRPCConnectorOptions.js" 
import {isFunction, isAsyncFunction, cwd, serializeParams, deSerializeParams} from "../utils/helpers.js"    
export class GRPCConnector {
    service = {}
    grpcOptions = {
        keepCase: true,
        longs: String,
        enums: String,
        defaults: true,
        oneofs: true,
    }
    grpcProto = null
    grpcClient = null
    grpcServer = null
    grpcService = null
    grpcPackageDefinition = null
    connectorOptions = new GRPCConnectorOptions()
    constructor(options =  DEFAULT_OPTIONS) {
        this.init(options)
    }
    
    init(options = DEFAULT_OPTIONS) {   
        this.connectorOptions = new GRPCConnectorOptions(options) 
        
        this.grpcPackageDefinition = protoLoader.loadSync(path.resolve(cwd(import.meta.url), '..', 'schemas', 'service.proto'), this.grpcOptions)
        this.grpcProto = grpc.loadPackageDefinition(this.grpcPackageDefinition).Service
        this.grpcService = this.grpcProto.service
    }
    getGrpcClient(host, port) { 
        this.grpcClient = this.grpcClient || new this.grpcService(`${host}:${port}`, grpc.credentials.createInsecure())
        return this.grpcClient
    }
    initGRPCServer() {
        if(!this.grpcServer) {
            this.grpcServer = new grpc.Server() 
            this.grpcServer.addService(this.grpcService, {
                CallFunction: this.callServiceFunction.bind(this),
            }) 
        }
        return this.grpcServer
    } 
    async callServiceFunction(call, callback) { 
        const request = call.request 
        let {functionName, parameters} = request
        parameters = JSON.parse(parameters)
        parameters = deSerializeParams(parameters)  
        const fn = !functionName? this.service: this.service[functionName]
        if(!fn) return callback(new Error(`Function '${functionName}' is not supported.`), null)
        let result = null
        if(isFunction(fn))
            result = isAsyncFunction(fn)? await fn(...parameters): fn(...parameters)
        else 
            result = fn
        result = result !== undefined? result: {} 
        result = JSON.stringify(serializeParams({serviceResult: result }))

        const response = { result }  
        callback(null, response);
    }
    connect() { 
        const Service =  this.grpcProto;
        const credentials =  this.createGRPCClientCredentials() 
        const endpoint = this.getGRPCEndpoint() 
        this.grpcClient = new Service(endpoint, credentials)
    }
    decodeServiceResponse(response) { 
        return deSerializeParams(JSON.parse(response.result)).serviceResult
    } 
    call(functionName = "", parameters = [], serviceInfo = new Object()) { 
        this.connect() 
        parameters = JSON.stringify(serializeParams(parameters))    
        const request = {functionName, parameters}
        return new Promise((resolve, reject) => { 
            this.grpcClient.CallFunction(request, (error, response) => { 
                if(error) return reject(error)
                try { 
                    resolve(this.decodeServiceResponse(response))
                } catch(err) {
                    reject(err)
                }
            })
        })
    }
    publish(service = () => {}, serviceInfo = new Object()) {
        this.service = service 
        const {host, port} = serviceInfo
        this.initGRPCServer(host, port) 
        const credentials =  this.createGRPCServerCredentials()
        const endpoint = this.getGRPCEndpoint()
        this.bindGRPCServer(endpoint, credentials)
    }
    getGRPCCredentrialsObject() {

    } 
    setupGRPCCredentials(grpcCredentials) { 
        const {useSSL, SSLOptions: {rootCert, privateKey, certChain}} = this.connectorOptions 
        if(!useSSL) return grpcCredentials.createInsecure() 
        
        const rootCertData = fs.readFileSync(rootCert)
        const privateKeyData = fs.readFileSync(privateKey)
        const certChainData = fs.readFileSync(certChain)
        return grpcCredentials.createSsl(rootCertData, [{ private_key: privateKeyData, cert_chain: certChainData }], true)
        
    }
    createGRPCServerCredentials() {
        return this.setupGRPCCredentials(grpc.ServerCredentials) 
    }
    createGRPCClientCredentials() { 
        return this.setupGRPCCredentials(grpc.credentials)  
    }
    getGRPCEndpoint() {
        const {host, port} = this.connectorOptions
        return `${host}:${port}`
    }
    bindGRPCServer(endpoint, credentials) { 
        this.grpcServer.bindAsync(endpoint, credentials, (error) => {
            if (error) throw new Error('Failed to bind GRPC server', error)  
            this.grpcServer.start()
        })
    } 
}