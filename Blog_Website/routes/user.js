const express = require('express');
const Router = express.Router();
const Article = require("../models/article");

//New form view

Router.get('/new',(req,res)=>{
    res.render('article/new',{title1:"Create-blog"});
 
});

//Update
Router.get('/edit/:id',async(req,res)=>{
   const article_data = await Article.findById({_id:req.params.id})
   res.render('article/edit',{article:article_data,title1:'Edit-page'})
})

// edit article
Router.post('/edit/:id', (req, res) => {
    Article.findOneAndUpdate({ _id: req.params.id }, req.body, { new: true })
        .then(docs => {
            res.redirect('/');
        })
        .catch(err => {
            console.error('Error updating article:', err);
            res.send('Sorry, an error occurred while updating the article.');
        });
});


//Single page view

Router.get('/:slug',async(req,res)=>{
    const article = await Article.findOne({slug:req.params.slug})
    if(article==null){res.redirect('/')}
    res.render('article/show',{article:article,title1:'Blogs'})
})

//post

Router.post("/",(req,res)=>{
     const article = new Article({
        title:req.body.title,
        content:req.body.content
    });
   article.save().then(()=>{
    res.redirect('/')
   })
}); 

//delete old version of mongoose accepted;

// Router.get('/delete/:id',(req,res)=>{
//     Article.findByIdAndDelete({_id:req.params.id},(err)=>{
//         if(err){
//             res.send('sorry')
//         }else{
//             res.redirect('/')
//         }
//     })
// })

//delete
Router.get('/delete/:id', (req, res) => {
    Article.findByIdAndDelete(req.params.id)
        .then(() => {
            res.redirect('/');
        })
        .catch(err => {
            console.error('Error deleting article:', err);
            res.send('Sorry, an error occurred while deleting the article.');
        });
});


module.exports = Router;