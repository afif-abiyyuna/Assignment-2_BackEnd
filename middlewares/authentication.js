const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
  const { access_token } = req.headers;
  if (access_token) {
    jwt.verify(access_token, 'GAMES_COV', (err, decoded) => {
      if (err) {
        res.status(500).json({ name : 'Invalid_Token'});
      } else {
        req._id = decoded._id;
        next();
      }
    });
  } else {
    res.status(500).json({ name: 'Missing_Token' });
  }
};
