const Farm = require('../models/farmModels');
const User = require('../models/userModel');


class farmController{
    static list(req,res,next){
        Farm.find({_userId:req._id}).then(farms=>{
            res.status(200).json({success:true, data:farms});
        }).catch(next);
    }
    static post(req, res, next){
        User.findById(req._id).then(user=>{
            if(user){
                if(user.resources.golds >=10 && user.resources.foods >= 30){
                    const resources = user.resources;
                    resources.golds -= 10;
                    resources.foods -= 30;
                    return User.updateOne({_id:req._id}, {resources: resources});
                } else {
                    throw ({name:'Not_Enough'});
                }
            } else {
                throw ({name:'Not_Found'});
            }
        }).then((_)=>{
            const {name} = req.body;
            const farm = new Farm({_userId:req._id, name});
            return farm.save();
        }).then(farm=>{
            res.status(200).json({success:true, data:farm});
        }).catch(next);
    }
    static get (req,res,next){
        const {id} = req.params;
        Farm.findById(id).then(farm=>{
            if(farm){
                const foods_obtained = Math.floor((Date.now() - farm.lastCollected) / 60000);
                res.status(200).json({
                    succes:true,
                    data: farm,
                    foods: foods_obtained > 20 ? 20 : foods_obtained,
                });
            } else {
                throw ({name:'Not_Found'});
            }
        }).catch(next);
    }
    static put (req,res,next){
        const {id} = req.params;
        const {name} = req.body;
        Farm.findById(id).then(farm=>{
            if(farm){
                farm.name = name;
                return farm.save();
            } else {
                throw ({name:'Not_Found'});
            }
        }).then(farm=>{
            res.status(200).json({success:true, data: farm});
        }).catch(next);
    }
    static delete (req,res,next){
        const {id} = req.params;
        Farm.findById(id).then(farm=>{
            if(farm){
                return farm.remove();
            } else {
                 throw ({name:'Not_Found'}); 
            }
        }).then(farm=>{
            res.status(200).json({success:true, message: 'Farm was deleted', data: farm});
        }).catch(next);
    }
    static collect(req, res, next) {
        const { id } = req.params;
        let foodsCollected;
        Farm.findById(id).then((farm) => {
            if (farm) {
              foodsCollected = Math.floor((Date.now() - farm.lastCollected) / 60000);
              foodsCollected = foodsCollected > 20 ? 20 : foodsCollected; 
              farm.lastCollected = Date.now();
              return farm.save();
            } else {
              throw ({name:'Not_Found'});
            }
          }).then((farm) => {
            return User.findById(req._id);
          }).then((user) => {
            const resources = user.resources;
            resources.foods += foodsCollected;
            return User.updateOne({ _id: req._id }, { resources: resources });
          }).then((result) => {
            res.status(200).json({
              success: true,
              message: `${foodsCollected} foods has been collected to your resources`,
            });
          }).catch(next);
      }
}



module.exports = farmController;