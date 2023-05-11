# simple-grpc-connector
Simple gRPC Connector is a JavaScript library that provides an easy-to-use interface for integrating gRPC functionality into your applications. It simplifies the process of creating gRPC clients and servers, making it effortless to publish functions as gRPC services and invoke them over gRPC.
The Simple gRPC Connector library leverages the powerful capabilities of the [@grpc/grpc-js](https://www.npmjs.com/package/@grpc/grpc-js) module, which is a modern, pure JavaScript gRPC implementation. By utilizing [@grpc/grpc-js](https://www.npmjs.com/package/@grpc/grpc-js), the library ensures compatibility with the latest versions of Node.js and offers improved performance and reliability for your gRPC-based applications.

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
## Other features
### gRPC services over SSL
The Simple gRPC Connector library provides seamless support for SSL/TLS encryption, enabling secure communication between gRPC services and clients.  

The following example demonstrates how you can configure and use SSL options with the Simple gRPC Connector to establish secure connections between your gRPC services and clients.

```javascript
import { GRPCConnector, GRPCConnectorOptions } from 'simple-grpc-connector';
// Create SSL options
const sslOptions = {
  host: 'localhost', 
  port: 50051, 
  useSSL: true,
  SSLOptions: {
    rootCert: '/path/to/rootCert.pem',
    privateKey: '/path/to/privateKey.pem',
    certChain: '/path/to/certChain.pem'
  }
}; 
// Create connector options with SSL options
const connectorOptions = new GRPCConnectorOptions({ ...sslOptions });
```
In the above example, SSL options are provided as part of the GRPCConnectorOptions when initializing the connector. The SSL options include the paths to the root certificate (rootCert.pem), private key (privateKey.pem), and certificate chain (certChain.pem). By setting useSSL to true, the connector will use SSL/TLS for secure communication.

Make sure to replace the file paths (/path/to/rootCert.pem, /path/to/privateKey.pem, /path/to/certChain.pem) with the actual paths to your SSL/TLS files.

### Asynchronous Function Support
The Simple gRPC Connector library fully supports the use of asynchronous functions, allowing you to leverage the power of asynchronous programming in your gRPC service implementation. This means you can define and publish asynchronous functions as gRPC service methods, enabling efficient and non-blocking communication with remote clients.

By utilizing async functions, you can handle time-consuming or I/O-bound operations without blocking the execution flow, resulting in better performance and responsiveness. The library seamlessly integrates with async/await syntax and supports the use of Promises, enabling you to write clean and concise asynchronous code.

Whether you need to perform complex computations, access databases, or make API calls, you can leverage the asynchronous capabilities of the Simple gRPC Connector to build efficient and scalable gRPC services.

With async function support, you can embrace modern JavaScript's asynchronous programming paradigm and unlock the full potential of your gRPC service implementation.

## Limitations
Please note that the Simple gRPC Connector has certain limitations when it comes to publishing complex data types such as functions or classes. Currently, the library only supports publishing plain JavaScript objects as gRPC services. Complex data types like functions, classes, or instances cannot be directly published using the connector.

If you require more advanced functionality or need to publish complex data types, you may need to consider alternative approaches or libraries that support such use cases.

## Unit Tests (Work in Progress) 
We are actively working on adding comprehensive unit tests to ensure the reliability and stability of the Simple gRPC Connector library. Unit tests help us identify and fix any issues or bugs, as well as ensure that the library functions as expected.

At the moment, the unit tests are still in progress. We are dedicated to delivering a thoroughly tested library to provide you with a seamless experience. We appreciate your patience and understanding as we continue to work on this aspect.

Once the unit tests are completed, you will be able to run them to verify the functionality of the library in your own environment. Stay tuned for updates on the availability of unit tests.

In the meantime, if you encounter any issues or have any questions, please don't hesitate to reach out to us. We are here to assist you and address any concerns you may have.

## Empower Your Applications with Simple gRPC Connectivity
That's it! With the Simple gRPC Connector, you can easily publish objects as gRPC services and access them remotely from gRPC clients.

Feel free to modify and extend this example to suit your specific use case. Refer to the library documentation for more details on advanced usage and additional features provided by the Simple gRPC Connector.

## Documentation
For detailed usage instructions, API reference, and examples, please refer to the **[Documentation](https://github.com/jinujd/simple-grpc-connector/blob/main/docs/README.md)**
## Contributing
Contributions are welcome! Please read the **[Contributing Guidelines](https://github.com/jinujd/simple-grpc-connector/blob/main/docs/CONTRIBUTING.md)** for more information
## License
This project is licensed under the **[MIT License](https://opensource.org/license/mit/)**.

 
