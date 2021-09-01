
const jwt = require('jsonwebtoken')
const user = require('../models/user')
const auth = async (req,res,next) =>{
    try{

        const token = req.header('Authorization').replace('Bearer ','')
        console.log(token)

        const decode = jwt.verify(token,'node-course')
        console.log(decode)

        const user = await user.findOne({_id:decode._id,'tokens.token':token})

        if(!user){
            console.log('No user is found')
            throw new Error()
        }
        req.user = user
        console.log(req.user)

        req.token = token
        next()
    }
    catch(e){
        res.status(401).send({error:'Please Authenticate'})
    }

  
}

module.exports = auth