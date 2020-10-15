const User = require('../models/userModel');

class AttackController{
    static randomSuccess(allySoldiers, enemySoldiers) {
        const arr = [];
        for (let i = 0; i < 3; i++) {
          arr.push(Math.random() < allySoldiers / (enemySoldiers + 1));
        }
        return arr.filter((el) => el).length >= 2 ? true : false;
    }

    static attack(req,res,next){
        const enemyId = req.params.id;
        const allySoldiers = Number(req.body.soldiers); 
        let ally;
        let enemy;
        let isSuccess;
        User.findById({_id: req._id}).then((user)=>{
            if(user){
                ally = user ;
                return User.findById({_id:enemyId});
            } else {
                throw ({name: 'User_Not_Found'});
            }
        }).then((user)=>{
            if(user){
                enemy = user;
                if(ally.resources.soldiers >= allySoldiers){
                    const resources = ally.resources;
                    resources.soldiers = ally.resources.soldiers - allySoldiers;
                    return true;
                    // User.findOneAndUpdate({_id:ally._id}, {resources}); 
                } else {
                    throw ({name:'Not_Enough'});
                }
            } else {
                throw ({name:'User_Not_Found'});
            }   
        }).then(user=>{
            // ally = user;
            isSuccess = AttackController.randomSuccess(allySoldiers, enemy.resources.soldiers);
            if(isSuccess){
                const newMedals = ally.medals + 5;
                const resources = ally.resources;
                resources.golds = resources.golds + Math.floor(enemy.resources.golds / 2);
                resources.foods = resources.foods + Math.floor(enemy.resources.foods / 2);
                resources.soldiers = ally.soldiers - allySoldiers;
                return User.findOneAndUpdate({_id: ally._id}, {medals: newMedals, resources});
            }else {
                const newMedals = Math.floor(ally.medals / 2);
                return User.findOneAndUpdate({_id: ally._id}, {medals: newMedals});
            }     
        }).then(user=>{
            ally = user;
            if (isSuccess){
                const resources = enemy.resources;
                resources.foods = Math.ceil(enemy.resources.foods / 2);
                resources.golds = Math.ceil(enemy.resources.golds / 2);
                resources.soldiers = 0;
                return User.findOneAndUpdate({_id:enemy._id}, {resources}); 
            } else {
                return User.findOneAndUpdate({_id:enemy._id}, {medals: enemy.medals + 2});
            }   
        }).then(user=>{
            enemy = user;
            res.status(200).json({success:true, message: `Attack ${isSuccess ? 'Success' : 'Fail'}`});
        }).catch(next);
        
    }

}


module.exports = AttackController;