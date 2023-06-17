const grpc = require('grpc');
const protoLoader = require('@grpc/proto-loader');

const packageDefinition = protoLoader.loadSync('user.proto', {});
const userProto = grpc.loadPackageDefinition(packageDefinition).UserService;

const users = [];

function createUser(call, callback) {
  const user = {
    id: call.request.id,
    name: call.request.name,
  };
  users.push(user);
  callback(null, user);
}

function getUser(call, callback) {
  const foundUser = users.find((user) => user.id === call.request.id);
  if (foundUser) {
    callback(null, foundUser);
  } else {
    callback({
      code: grpc.status.NOT_FOUND,
      details: 'User not found',
    });
  }
}

function startServer() {
  const server = new grpc.Server();
  server.addService(userProto.UserService.service, {
    CreateUser: createUser,
    GetUser: getUser,
  });

  server.bind('0.0.0.0:50051', grpc.ServerCredentials.createInsecure());
  server.start();
  console.log('gRPC server started on port 50051');
}

startServer();

