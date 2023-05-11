import {GRPCConnector} from "simple-grpc-connector" 

// Create a GRPCConnector instance with host and port
const connector = new GRPCConnector({ host: 'localhost', port: 50051 })

// Define the object
const myObj = {
    name: `John Doe`,
    place: `Utopia`
}

// Publish the object
connector.publish(myObj)

console.log('Server started')