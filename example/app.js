var underscore = require('underscore');
var machina = require('machina')(underscore);
var Monologue = require('monologue.js')(underscore);
var amqp = require('amqp');
var Bootstrapper = require('../lib/amqp-bootstrapper.js')(underscore, machina, Monologue, amqp);
var config = {
	connection : {
		host     : 'localhost',
		port     : 5672,
		login    : 'guest',
		password : 'guest',
		vhost    : '/'
	},
	queues : {
		"test-queue-name" : {
			options: {
				durable: false
			},
			bindings : {
				"test-exchange" : "bootstrapper.test.*"
			}
		}
	},
	exchanges : {
		"test-exchange" : {
			type    : "topic",
			durable : false
		}
	},
	routingKeys : {
		"bootstrapper.test.ping" : "test-exchange"
	}
};
var b = new Bootstrapper(config);

b.on("#", function(d,e) {
	console.log(e);
});

module.exports = {
	config : config,
	Bootstrapper : Bootstrapper,
	b : b
};