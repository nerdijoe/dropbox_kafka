const mongoose = require('mongoose');


const connection =  new require('./kafka/Connection');
const action = require('./helpers/actionConstants');
const auth = require('./services/auth');

const topic_name = 'request_topic';
const consumer = connection.getConsumer(topic_name);
const producer = connection.getProducer();

// mongoose setup ####
const dbConfig = {
  development: 'mongodb://127.0.0.1/273_lab1_dropbox_dev',
  test: 'mongodb://127.0.0.1/273_lab1_dropbox_test'
};

const appEnv = 'development'; //app.settings.env;
mongoose.Promise = global.Promise;
mongoose.connect(dbConfig[appEnv], { useMongoClient: true }, (err, res) => {
  console.log(`Connected to DB: ${dbConfig[appEnv]}`);
});
// mongoose setup end ####


console.log('server is running');
consumer.on('message', (message) => {
  console.log('--- consumer.on -> message received');
  console.log(JSON.stringify(message.value));
  console.log('----------------------------------\n')
  const data = JSON.parse(message.value);
  console.log('#### action =', data.data.action);
  switch (data.data.action) {
    case action.USER_SIGN_IN: {
      auth.signIn(data.data, (err, res) => {
        console.log('after USER_SIGN_IN, res=', res);
        const payloads = [
          {
            topic: data.replyTo,
            messages: JSON.stringify({
              correlationId: data.correlationId,
              data: res
            }),
            partition: 0,
          },
        ];
        producer.send(payloads, (err, data) => {
          console.log('producer.send');
          console.log(data);
        });
        return;
      });
      
      break;
    }

    case action.USER_SIGN_UP: {
      auth.signUp(data.data, (err, res) => {
        console.log('after USER_SIGN_UP, res=', res);
        const payloads = [
          {
            topic: data.replyTo,
            messages: JSON.stringify({
              correlationId: data.correlationId,
              data: res
            }),
            partition: 0,
          },
        ];
        producer.send(payloads, (err, data) => {
          console.log('producer.send');
          console.log(data);
        });
        return;
      });
      
      break;    
    }
    default: {
      console.log('invalid Action');
    }
  }
  

});
