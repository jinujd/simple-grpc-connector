import {GRPCConnector} from "simple-grpc-connector" 

// Create a GRPCConnector instance with host and port
const connector = new GRPCConnector({ host: 'localhost', port: 50051 })

// Define the function
function sayHello(name) {
  return `Hello, ${name}!`
}

// Publish the service function
connector.publish(sayHello)

console.log('Server started')