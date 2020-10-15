const Barrack = require('../models/barrackModel');
const User = require('../models/userModel');

class BarrackController {
  static list(req, res, next) {
    Barrack.find({ _userId: req._id }).then((barrack) => {
        res.status(200).json({ success: true, data: barrack });
      }).catch(next);
  }
  static post(req, res, next) {
    User.findById(req._id).then((user) => {
        if (user) {
          if (user.resources.golds >= 30 && user.resources.foods >= 30) {
            const resources = user.resources;
            resources.golds -= 30;
            resources.foods -= 30;
            return User.updateOne({ _id: req._id }, { resources: resources });
          } else {
            throw ({name:'Not_Enough'});
          }
        } else {
          throw ({name:'Not_Found'});
        }
      }).then((_) => {
        const { name } = req.body;
        const barrack = new Barrack({ _userId: req._id, name });
        return barrack.save();
      }).then((barrack) => {
        res.status(200).json({ success: true, data: barrack });
      }).catch(next);
  }
  static get(req, res, next) {
    console.log('masuk');
    const { id } = req.params;
    Barrack.findById(id).then((barrack) => {
      console.log(barrack);
        if (barrack) {
          const soldiers_obtained = Math.floor((Date.now() - barrack.lastCollected) / 60000);
          res.status(200).json({
            success: true,
            data: barrack,
            soldiers: soldiers_obtained > 10 ? 10 : soldiers_obtained,
          });
        } else {
          throw ({name:'Not_Found'});
        }
      }).catch(e=>{console.log(e); next(e);})

  }
  static put(req, res, next) {
    const { id } = req.params;
    const { name } = req.body;
    Barrack.findById(id).then((barrack) => {
        if (barrack) {
          barrack.name = name;
          return barrack.save();
        } else {
          throw ({name:'Not_Found'});
        }
      }).then((barrack) => {
        res.status(200).json({ succes: true, data: barrack });
      }).catch(next);
  }
  static delete(req, res, next) {
    const { id } = req.params;
    Barrack.findById(id).then((barrack) => {
        if (barrack) {
          return barrack.remove();
        } else {
          throw ({name:'Not_Found'});
        }
      }).then((barrack) => {
        res.status(200).json({ succes: true, message: 'Barrack was deleted', data: barrack });
      }).catch(next);
  }
  static collect(req, res, next) {
    const { id } = req.params;
    let soldiersCollected;
    Barrack.findById(id).then((barrack) => {
        if (barrack) {
          soldiersCollected = Math.floor((Date.now() - barrack.lastCollected) / 60000);
          soldiersCollected = soldiersCollected > 10 ? 10 : soldiersCollected; 
          barrack.lastCollected = Date.now();
          return barrack.save();
        } else {
          throw ({name:'Not_Found'});
        }
      }).then((barrack) => {
        return User.findById(req._id);
      }).then((user) => {
        const resources = user.resources;
        resources.soldiers += soldiersCollected;
        return User.updateOne({ _id: req._id }, { resources: resources });
      }).then((result) => {
        res.status(200).json({
          success: true,
          message: `${soldiersCollected} soldirs has been collected to your resources`,
        });
      }).catch(next);
  }
}

module.exports = BarrackController;
