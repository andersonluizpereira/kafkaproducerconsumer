
const kafka = require('kafka-node');
const bp = require('body-parser');
const config = require('./config');

try {
  const Producer = kafka.Producer;
  const cn = {kafkaHost: `${config.kafka_server}`}
  const client = new kafka.KafkaClient(cn);
  const producer = new Producer(client);
  const kafka_topic = 'meutopico';
  let payloads = [
    {
      topic: kafka_topic,
      messages: JSON.stringify(config.kafka_topic),
      partition: Math.floor(Math.random() * 3+1)
    }
  ];

  producer.on('ready', async function() {
    let push_status = producer.send(payloads, (err, data) => {
      if (err) {
        console.log('[kafka-producer -> '+kafka_topic+']: broker update failed');
      } else {
        console.log('[kafka-producer -> '+kafka_topic+']: broker update success');
      }
      process.exit(0);
    });
  });

  producer.on('error', function(err) {
    console.log(err);
    console.log('[kafka-producer -> '+kafka_topic+']: connection errored');
    throw err;
  });
}
catch(e) {
  console.log(e);
}
