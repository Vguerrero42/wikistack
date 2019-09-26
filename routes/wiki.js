const express = require('express')
const router = express.Router()
const {addPage,main}= require('../views')
const {Page} = require('../models')


router.get('/',(req,res) =>{
    res.send(main())
})

router.post ('/',async (req,res,next) =>{
    let page = await Page.create(req.body)
    try {;
        res.redirect('/');
      } catch (error) { next(error) }
})


// console.log(slugger('hello goodbye'))
router.get('/add',(req,res) => {
    res.send(addPage())
})

router.get('/:slug', async (req,res,next) =>{
   try{
        const page = await Page.findOne({
        where: {slug : req.params.slug}
    })
    res.json(page)
}
catch(error){next(error)}
})



module.exports = router