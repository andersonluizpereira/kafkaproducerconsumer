
const kafka = require('kafka-node');
const bp = require('body-parser');
const config = require('./config');

try {
  const Consumer = kafka.Consumer;
  const cn = {kafkaHost: `${config.kafka_server}`}
  const client = new kafka.KafkaClient(cn);
  let consumer = new Consumer(
    client,
    [{ topic: 'meutopico' }],
    {
      autoCommit: true,
      fetchMaxWaitMs: 1000,
      fetchMaxBytes: 1024 * 1024,
      encoding: 'utf8',
      fromOffset: false
    }
  );
  consumer.on('message', async function(message) {
    //console.log('here');
    console.log(
      'kafka-> ',
      message.value
    );
  })
  consumer.on('error', function(err) {
    console.log('error', err);
  });
}
catch(e) {
  console.log(e);
}
