const db = require('mongoose');

const DB_URI = process.env.DB_URI || 'mongodb://localhost/battleship';
db.connect(DB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
  useFindAndModify: true,
  //   useCreateIndex: true, // DEPRECATED
});

const conn = db.connection;
conn.once('open', () => {
  console.log('DB connected');
});
