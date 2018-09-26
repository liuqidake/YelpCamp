const Campground = require('../models/campground');
const Comment = require('../models/comment');

function isLoggedIn(req,res,next){
    if(req.isAuthenticated()){
        next();
    } else{
        res.redirect('back');
    }
}

function checkCampgroundOwnership(req,res,next){
    if(req.isAuthenticated()){
       Campground.findById(req.params.id, function(err, camp){
           if(err){
               res.redirect('back');
           }
           else{
               if(camp.author.id.equals(req.user._id)){
                   next();
               }
               else{
                   res.redirect('back');
               }
           }
       })
    }
    else{
        res.redirect('back');
    }
}

function checkCommentOwnership(req,res,next){
    if(req.isAuthenticated()){
        Comment.findById(req.params.comment_id, function(err, foundComment){
            if(err){
                res.redirect('back');
            } else{
                if(foundComment.author.id.equals(req.user._id)){
                    next();
                } else {
                    res.redirect('back');
                }
            }
        });
    } else {
        res.redirect('back');
    }
}


module.exports = {
    isLoggedIn,
    checkCampgroundOwnership,
    checkCommentOwnership
}