// LOADING LIBRARIES
const feathers = require('@feathersjs/feathers');
const express = require('@feathersjs/express');
const socketio = require('@feathersjs/socketio');

// CREATING AN EXPRESS SERVER
// EXPRESS IS A LIBRARY THAT HELPS IN CREATING SERVER APPLICATIONS IN THE NODEJS PLATFORM
// NODEJS IS JUST PLATFORM/RUNTIME TO RUN JAVASCRIPT OUTSIDE OF THE BROWSER
const app = feathers();

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

// ATTACHMENT OF A SERVICE TO THE FEATHERS APPLICATION - SERVICES RESTFUL ROUTE "/"
// SERVICE ROUTE WILL HAVE "/", but can be referenced as normal "messages" without "/"
app.use('/messages', new MessageService());

const main = async () => {
	await app.service('messages').create({ text: 'Hello Feathers' });
	await app.service('messages').create({ text: 'Hello again' });
	const messages = await app.service('messages').find();
	console.log('All messages', messages);
};

main();

// LET'S JUST COMMENT THIS FOR NOW, SO WE CAN DEMONSTRATE FEATHERS ON ITS OWN
// //MIDDLEWARE ARE SERVICES THAT HAPPENS IN THE MIDDLE OF REQUEST AND EXECUTION OF MAIN TASKS
// app.use(express.static(__dirname)); // SERVING OF STATIC/FRONTEND FILES

// // PREVENTS THE SCRIPT FROM EXITTING BY LETTING IT LISTEN ON A SPECIFIC PORT
// // RUNNING A NODE APPLICATION REQUIRES TYPING THE COMMAND "node app.js" LIKE PYTHON "python main.py"
// app.listen(3030).on('listening', () => {
// 	console.log('Feathers server running on localhost:3030');
// })
