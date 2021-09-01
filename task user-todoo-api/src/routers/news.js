
const express = require('express')
const News = require('../models/todoo')
const router = new express.Router()
const auth = require('../middleware/auth')


/////////post/////////
router.post('/todoo',auth,async(req,res)=>{
    const news = new todoo({...req.body,owner:req.user._id})
    try{
        await todoo.save()
        res.status(200).send(news)
    }
    catch(e){
        res.status(400).send(e)
    }
})


//////////get//////////

router.get('/todoo',auth,async(req,res)=>{
    try{
       await req.user.populate('todoo').execPopulate()
       res.send(req.user.todoo)
    }
    catch(e){
        res.status(500).send(e)
    }
})




/////////get by id////////////////
router.get('/todoo/:id',auth,async(req,res)=>{
    const _id = req.params.id
    try{
        const news = await todoo.findOne({_id,owner:req.user._id})
        if(!todoo){
            return res.status(404).send('todoo not found')
        }
        res.status(200).send(todoo)
    }
    catch(e){
        res.status(500).send(e)
    }
})


///////patch/////////
router.patch('/todoo/:id',auth,async(req,res)=>{
    const _id = req.params.id
    const updates = Object.keys(req.body)
    try{
        const todoo = await todoo.findOne({_id,owner:req.reporter._id})
        if(!todoo){
            return res.status(404).send('todoo is not found')
        }
        updates.forEach((update)=> todoo[update] = req.body[update])
        await todoo.save()
        res.send(todoo)
    }
    catch(e){
        res.status(400).send(e)
    }

})



/////// Delete//////
router.delete('/todoo/:id',auth,async(req,res)=>{
    const _id = req.params.id
    try{
        const todoo = await todoo.findOneAndDelete({_id,owner:req.user._id})
        if(!todoo){
            return res.status(404).send('todoo is not found')
        }
        res.send(todoo)
    }
    catch(e){
        res.status(500).send(e)
    }
})







module.exports = router