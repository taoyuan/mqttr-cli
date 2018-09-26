#!/usr/bin/env node

const util = require('util');
const path = require('path');
const fs = require('fs');
const minimist = require('minimist');
const mqtt = require('mqttr');

const helpMe = require('help-me')({
	dir: path.join(__dirname, '..', 'doc')
});

function start(args) {
	args = minimist(args, {
		string: ['hostname', 'username', 'password', 'key', 'cert', 'ca'],
		integer: ['port', 'qos', 'keepAlive'],
		boolean: ['stdin', 'help', 'clean', 'insecure'],
		alias: {
			port: 'p',
			hostname: ['h', 'host'],
			topic: 't',
			qos: 'q',
			clean: 'c',
			keepalive: 'k',
			clientId: ['i', 'id'],
			username: 'u',
			password: 'P',
			protocol: ['C', 'l'],
			msgpack: 'M',
			verbose: 'v',
			help: '-H',
			ca: 'cafile'
		},
		default: {
			host: 'localhost',
			qos: 0,
			retain: false,
			clean: true,
			keepAlive: 30 // 30 sec
		}
	});

	if (args.help) {
		return helpMe.toStdout('subscribe');
	}

	args.topic = args.topic || args._.shift();

	if (!args.topic) {
		console.error('missing topic\n');
		return helpMe.toStdout('subscribe');
	}

	if (args.key) {
		args.key = fs.readFileSync(args.key);
	}

	if (args.cert) {
		args.cert = fs.readFileSync(args.cert);
	}

	if (args.ca) {
		args.ca = fs.readFileSync(args.ca);
	}

	if (args.key && args.cert && !args.protocol) {
		args.protocol = 'mqtts';
	}

	if (args.insecure) {
		args.rejectUnauthorized = false;
	}

	if (!args.msgpack) {
		args.codec = 'json';
	}

	if (args.port) {
		if (typeof args.port !== 'number') {
			console.warn('# Port: number expected, \'%s\' was given.', typeof args.port);
			return;
		}
	}

	if (args['will-topic']) {
		args.will = {};
		args.will.topic = args['will-topic'];
		args.will.payload = args['will-message'];
		args.will.qos = args['will-qos'];
		args.will.retain = args['will-retain'];
	}

	args.keepAlive = args['keep-alive'];

	const client = mqtt.connect(args);

	client.on('connect', () => {
		client.subscribe(args.topic, (topic, payload) => {
			if (Buffer.isBuffer(payload)) {
				payload = payload.toString();
			}

			if (args.verbose) {
				console.log('[' + topic + ']', util.inspect(payload, {colors: true, depth: 99}));
			} else {
				console.log(payload);
			}
		}, {qos: args.qos}, (err, result) => {
			result.forEach((sub) => {
				if (sub.qos > 2) {
					console.error('subscription negated to', sub.topic, 'with code', sub.qos);
					process.exit(1);
				}
			});
		});
	});
}

module.exports = start;

if (require.main === module) {
	start(process.argv.slice(2));
}
