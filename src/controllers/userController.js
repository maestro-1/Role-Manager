import bcrypt from 'bcrypt';
import User from '../models/userModel';
const saltRounds= 12

exports.register =async(req,res, next)=>{
    let user = await User.findOne({'email':req.body.email})
    if(user){
        res.send('User already exists')
    }
    else{
        const user = new User(req.body)
        user.password = bcrypt.hashSync(req.body.password,saltRounds)

        await user.save((err)=>{
            if(err){
                return next(err)
            }
            res.send('User '+user.firstName + ' added successfully')
    })
    }
}