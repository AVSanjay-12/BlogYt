const express = require('express')
const router = express.Router();
const Post = require('../models/Post')


//Get Home
router.get('',async (req, res)=>{
    const locals = {
        title:"NodeJs Blog",
        description:"Simple Blog created with nodejs express and mongoDb."
    }
    try{
        const data = await Post.find();
        res.render('index', {locals, data});
    }catch(error){
        console.log(error);
    }
  
})

//Post :id

router.get('/post/:id',async (req, res)=>{

    
    try{

        let slug = req.params.id;

        const data = await Post.findById({_id: slug});

        const locals = {
            title:data.title,
            description:"Simple Blog created with nodejs express and mongoDb."
        }
        res.render('post', {locals, data});
    }catch(error){
        console.log(error);
    }
  
})

// Post searchTerm
router.post('/search',async (req, res)=>{
    
    try{
        const locals = {
            title:"Search",
            description:"Simple Blog created with nodejs express and mongoDb."
        }
        let searchTerm = req.body.searchTerm;
        const searchNoSpChar = searchTerm.replace(/[^a-zA-Z0-9]/g, "")



        const data = await Post.find({
            $or: [
                {title: {$regex: new RegExp(searchNoSpChar, 'i')}},
                {body: {$regex: new RegExp(searchNoSpChar, 'i')}},
            ]
        });
        res.render("search", {
            data, locals
        });
    }catch(error){
        console.log(error);
    }
  
})







router.get('/about',(req, res)=>{
    res.render('about');
})
module.exports = router