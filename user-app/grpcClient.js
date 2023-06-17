const grpc = require('grpc');
const protoLoader = require('@grpc/proto-loader');

const packageDefinition = protoLoader.loadSync('user.proto', {});
const userProto = grpc.loadPackageDefinition(packageDefinition).UserService;

const client = new userProto('localhost:50051', grpc.credentials.createInsecure());

function createUser() {
  const user = {
    id: '1',
    name: 'John Doe',
  };

  client.CreateUser(user, (error, response) => {
    if (error) {
      console.error(error);
      return;
    }
    console.log('User created:', response);
  });
}

function getUser() {
  const user = {
    id: '1',
  };

  client.GetUser(user, (error, response) => {
    if (error) {
      console.error(error);
      return;
    }
    console.log('User:', response);
  });
}

createUser();
getUser();

