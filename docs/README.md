# simple-grpc-connector
Simple gRPC Connector is a JavaScript library that provides an easy-to-use interface for integrating gRPC functionality into your applications. It simplifies the process of creating gRPC clients and servers, making it effortless to publish functions as gRPC services and invoke them over gRPC.
## Features
* Easy integration with existing Node.js applications
* Publish any function as a gRPC service
* Call published functions over gRPC
* Automatic serialization and deserialization of function arguments and results
* Support for SSL/TLS encryption (optional)
* Lightweight and minimalistic design
## Getting Started
### Example 1: Publishg a service and calling a function defined in the service
#### Publishing the service over gRPC
```javascript
import {GRPCConnector} from "simple-grpc-connector" 
const service = {
  add: (a, b) => a + b,
  greet: (name) => `Hello, ${name}!`,
}
// Create a new gRPC connector
const connector = new GRPCConnector({ host: 'localhost', port: 50051 })
// Publish the service functions
connector.publish(service)
```
#### Calling a function in the published service over gRPC
```javascript
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
```
### Example 2: Publishing a function and calling the function over gRPC
#### Publishing the function over gRPC
```javascript
import {GRPCConnector} from "simple-grpc-connector" 

// Create a GRPCConnector instance with host and port
const connector = new GRPCConnector({ host: 'localhost', port: 50051 })

// Define the function
function sayHello(name) {
  return `Hello, ${name}!`
}

// Publish the function
connector.publish(sayHello)

console.log('Server started')
```

#### Calling the function over gRPC
```javascript
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
```

### Example 3: Publishing an object and accessing the object over GRPC
#### Publishing the object over gRPC
```javascript
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
```

#### Accessing the object over gRPC
```javascript
import {GRPCConnector} from "simple-grpc-connector" 

// Create a GRPCConnector instance with host and port
const connector = new GRPCConnector({ host: 'localhost', port: 50051 })

// Access the object
connector.call('', [])
  .then((result) => {
    console.log('Response:', result)
  })
  .catch((error) => {
    console.error('Error:', error)
  })
```
## Limitations
Please note that the Simple gRPC Connector has certain limitations when it comes to publishing complex data types such as functions or classes. Currently, the library only supports publishing plain JavaScript objects as gRPC services. Complex data types like functions, classes, or instances cannot be directly published using the connector.

If you require more advanced functionality or need to publish complex data types, you may need to consider alternative approaches or libraries that support such use cases.

## Empower Your Applications with Simple gRPC Connectivity
That's it! With the Simple gRPC Connector, you can easily publish objects as gRPC services and access them remotely from gRPC clients.

Feel free to modify and extend this example to suit your specific use case. Refer to the library documentation for more details on advanced usage and additional features provided by the Simple gRPC Connector.

## Documentation
For detailed usage instructions, API reference, and examples, please refer to the **[Documentation](https://github.com/jinujd/simple-grpc-connector/blob/main/docs/README.md)**
## Contributing
Contributions are welcome! Please read the **[Contributing Guidelines](https://github.com/jinujd/simple-grpc-connector/blob/main/docs/CONTRIBUTING.md)** for more information
## License
This project is licensed under the **[MIT License](https://opensource.org/license/mit/).