const faker = require('faker');

module.exports = {
  kafka_topic: [{ id: Math.floor(Math.random() * 10+1) , name: faker.random.words() }],
  kafka_server: 'localhost:9092',
};
