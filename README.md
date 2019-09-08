# mqttr-cli

[![Greenkeeper badge](https://badges.greenkeeper.io/taoyuan/mqttr-cli.svg)](https://greenkeeper.io/)

> [mqttr](https://github.com/taoyuan/mqttr) command line tool.

## mqttr

```
`mqttr` command line interface, available commands are:

  * publish     publish a message to the broker
  * subscribe   subscribe for updates from the broker
  * version     the current MQTT.js version
  * help        help about commands

Launch 'mqttr help [command]' to know more about the commands.
```

## mqttr-pub

```
Usage: mqttr publish [opts] topic [message]

Available options:

  -h/--hostname HOST    the broker host
  -p/--port PORT        the broker port
  -i/--client-id ID     the client id
  -q/--qos 0/1/2        the QoS of the message
  -t/--topic TOPIC      the message topic
  -m/--message MSG      the message body
  -r/--retain           send a retained message
  -s/--stdin            read the message body from stdin
  -u/--username USER    the username
  -P/--password PASS    the password
  -C/--protocol PROTO   the protocol to use, 'mqtt',
                        'mqtts', 'ws' or 'wss'
  -M/--msgpack          use 'msgpack' to encode messsage
  --key PATH            path to the key file
  --cert PATH           path to the cert file
  --ca PATH             path to the ca certificate
  --insecure            do not verify the server certificate
  --will-topic TOPIC    the will topic
  --will-payload BODY   the will message
  --will-qos 0/1/2      the will qos
  --will-retain         send a will retained message
  -H/--help             show this
```

## mqttr-sub

```
Usage: mqttr subscribe [opts] [topic]

Available options:

  -h/--hostname HOST    the broker host
  -p/--port PORT        the broker port
  -i/--client-id ID     the client id
  -q/--qos 0/1/2        the QoS of the message
  --no-clean            do not discard any pending message for
                        the given id
  -t/--topic TOPIC      the message topic
  -k/--keepalive SEC    send a ping every SEC seconds
  -u/--username USER    the username
  -P/--password PASS    the password
  -l/--protocol PROTO   the protocol to use, 'mqtt',
                        'mqtts', 'ws' or 'wss'
  -M/--msgpack          use 'msgpack' to decode messsage
  --key PATH            path to the key file
  --cert PATH           path to the cert file
  --ca PATH             path to the ca certificate
  --insecure            do not verify the server certificate
  --will-topic TOPIC    the will topic
  --will-message BODY   the will message
  --will-qos 0/1/2      the will qos
  --will-retain         send a will retained message
  -v/--verbose          print the topic before the message
  -H/--help             show this
```

