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


module.exports = router