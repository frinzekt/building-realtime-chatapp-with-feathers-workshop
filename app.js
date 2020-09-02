// LOADING LIBRARIES
const feathers = require('@feathersjs/feathers');
const express = require('@feathersjs/express');
const socketio = require('@feathersjs/socketio');

// CREATING AN EXPRESS SERVER
// EXPRESS IS A LIBRARY THAT HELPS IN CREATING SERVER APPLICATIONS IN THE NODEJS PLATFORM
// NODEJS IS JUST PLATFORM/RUNTIME TO RUN JAVASCRIPT OUTSIDE OF THE BROWSER
const app = express(feathers());

// FEATHERS SERVICES AND METHOD/FUNCTIONS FOR THE SERVICES
class MessageService {
	constructor() {
		this.messages = [];
	}
	async find() {
		return this.messages;
	}
	async get(id) {
		return this.messages[id];
	}
	async create(data) {
		const message = {
			id: this.messages.length,
			text: data.text,
		};
		this.messages.push(message);
		return message;
	}
}

// middlewares
app.use(express.static(__dirname)); //SERVING OF FRONTEND FILES
app.configure(express.rest()); // ENABLING RESTFUL ACCESS OF FEATHERS
app.configure(socketio()); // EXPOSING FEATHERS OVER SOCKET

// ATTACHMENT OF A SERVICE TO THE FEATHERS APPLICATION - SERVICES RESTFUL ROUTE "/"
// SERVICE ROUTE WILL HAVE "/", but can be referenced as normal "messages" without "/"
app.use('/messages', new MessageService());

// SOCKET CHANNEL FOR EVERYONE
//  SOCKET CHANNELS ARE DEDICATED PLACE FOR TRANSFERING
app.on('connection', (connection) => {
	app.channel('everybody').join(connection);
});

// ANYTIME A MESSAGE/EVENT HAPPENED, EVERYBODY IN THE CHANNEL WILL HEAR IT
// APP.PUBLISH WILL REGISTER A SPECIFIC CHANNEL THAT SHOULD RECEIVE THE MESSAGE
app.publish(() => app.channel('everybody'));

// PREVENTS THE SCRIPT FROM EXITTING BY LETTING IT LISTEN ON A SPECIFIC PORT
// RUNNING A NODE APPLICATION REQUIRES TYPING THE COMMAND "node app.js" LIKE PYTHON "python main.py"
app.listen(3030).on('listening', () => {
	console.log('Feathers server running on localhost:3030');
});
