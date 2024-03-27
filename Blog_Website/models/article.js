const mongoose = require('mongoose');
const slugify = require('slugify');

const articleSchema = new mongoose.Schema({
    title:{
        type:String,
        require:true
    },
    content:{
        type:String,
        require:true
    },
    createdDate:{
        type:Date,
        default:Date.now()
    },
    slug:{
        type:String,
        require:true,
        unique:true
    }

    
});
articleSchema.pre('validate',function(next){
    if(this.title){
        this.slug = slugify(this.title,{lower:true,strict:true})
    }
    next()
});

module.exports = mongoose.model("Article",articleSchema);