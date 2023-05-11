import {GRPCConnector} from "simple-grpc-connector" 
const service = {
  add: (a, b) => a + b,
  greet: (name) => `Hello, ${name}!`,
};
// Create a new gRPC connector
const connector = new GRPCConnector({ host: 'localhost', port: 50051 });
// Publish the service functions
connector.publish(service);