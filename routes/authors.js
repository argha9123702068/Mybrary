const express = require('express')
const router = express.Router()
const Author = require('../models/author')

//All Authors Route
router.get('/',async(req,res)=>{
    let searchOptions ={}
    if(req.query.name!=null && req.query.name!==''){
        searchOptions.name= new RegExp(req.query.name,'i')
    }
    try{
        let authors = await Author.find(searchOptions)
        res.render("authors/index",{authors:authors,searchOptions:req.query})
    }catch(e){
        console.log(e.message)
    }
    
   
})

//New Author Route
router.get('/new',(req,res)=>{
    res.render('authors/new',{author:new Author()})
})

//Create Author
router.post('/',async (req,res)=>{
    let author = new Author({
        name:req.body.name
    })
   
    try{
        author = await author.save()
        res.redirect('authors')
    } catch(e){
        res.render('authors/new',{
            author:author,
            errorMessage:e.message
        })
        
    }
})

module.exports=router