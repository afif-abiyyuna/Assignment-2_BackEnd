const mongoose = require('mongoose');

module.exports = () => {
  mongoose.connect(
    'mongodb://localhost/Database_games_COV',
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
      useCreateIndex: true
    }
  );
  const db = mongoose.connection;
  db.on('error', (e) => console.log(e));
  db.once('open', () => console.log('Mongoose connection success!'));
};
