import {GRPCConnector} from "simple-grpc-connector" 

// Create a GRPCConnector instance with host and port
const connector = new GRPCConnector({ host: 'localhost', port: 50051 })

// Call the function
const name = 'John';
connector.call('', [name])
  .then((result) => {
    console.log('Response:', result)
  })
  .catch((error) => {
    console.error('Error:', error)
  })