import {GRPCConnector} from "simple-grpc-connector" 
const connector = new GRPCConnector({ host: 'localhost', port: 50051 }); 

// Call a published function
connector
  .call('greet', [2, 3])
  .then((result) => {
    console.log('Result:', result); // Output: 5
  })
  .catch((error) => {
    console.error('Error:', error);
  });