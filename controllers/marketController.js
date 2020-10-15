const Market = require('../models/marketModels');
const User = require('../models/userModel');

class MarketController {
  static list(req, res, next) {
    Market.find({ _userId: req._id }).then((markets) => {
        res.status(200).json({ success: true, data: markets });
      }).catch(next);
  }
  static post(req, res, next) {
    User.findById(req._id).then((user) => {
        if (user) {
          if (user.resources.golds >= 30 && user.resources.foods >= 10) {
            const resources = user.resources;
            resources.golds -= 30;
            resources.foods -= 10;
            return User.updateOne({ _id: req._id }, { resources: resources });
          } else {
            throw ({name:'Not_Enough'});
          }
        } else {
          throw ({name:'Not_Found'});
        }
      }).then((_) => {
        const { name } = req.body;
        const market = new Market({ _userId: req._id, name });
        return market.save();
      }).then((market) => {
        res.status(200).json({ success: true, data: market });
      }).catch(next);
  }
  static get(req, res, next) {
    const { id } = req.params;
    Market.findById(id).then((market) => {
        if (market) {
          const golds_obtained = Math.floor((Date.now() - market.lastCollected) / 60000);
          res.status(200).json({
            success: true,
            data: market,
            golds: golds_obtained > 20 ? 20 : golds_obtained,
          });
        } else {
          throw ({name:'Not_Found'});
        }
      }).catch(next);
  }
  static put(req, res, next) {
    const { id } = req.params;
    const { name } = req.body;
    Market.findById(id).then((market) => {
        if (market) {
          market.name = name;
          return market.save();
        } else {
          throw ({name:'Not_Found'});
        }
      }).then((market) => {
        res.status(200).json({ succes: true, data: market });
      }).catch(next);
  }
  static delete(req, res, next) {
    const { id } = req.params;
    Market.findById(id).then((market) => {
        if (market) {
          return market.remove();
        } else {
          throw ({name:'Not_Found'});
        }
      }).then((market) => {
        res.status(200).json({ succes: true, message: 'Market was deleted', data: market });
      }).catch(next);
  }
  static collect(req, res, next) {
    const { id } = req.params;
    let goldsCollected;
    Market.findById(id).then((market) => {
        if (market) {
          goldsCollected = Math.floor((Date.now() - market.lastCollected) / 60000);
          goldsCollected = goldsCollected > 20 ? 20 : goldsCollected; 
          market.lastCollected = Date.now();
          return market.save();
        } else {
          throw ({name:'Not_Found'});
        }
      }).then((market) => {
        return User.findById(req._id);
      }).then((user) => {
        const resources = user.resources;
        resources.golds += goldsCollected;
        return User.updateOne({ _id: req._id }, { resources: resources });
      }).then((result) => {
        res.status(200).json({
          success: true,
          message: `${goldsCollected} golds has been collected to your resources`,
        });
      }).catch(next);
  }
}

module.exports = MarketController;
