const express = require('express');
var router  = express.Router();
const Campground = require('../models/campground');
const Comment = require('../models/comment');
const middleware = require('../middleware/index');


router.get('/campgrounds/:id/comments/new', middleware.isLoggedIn,function(req,res){
    Campground.findById(req.params.id, function(err,camp){
        if(err){
            res.rendirect('/campgrounds');
        } else{
            res.render('comments/new', {campground:camp});
        }
    })
});

router.post('/campgrounds/:id/comments',middleware.isLoggedIn, function(req,res){
    var text = req.body.text;
    var author ={
        id:req.user._id,
        username:req.user.username
    }
    var newComment = {text:text, author:author};
    Comment.create(newComment, function(err, newComment){
        if(err){
            console.log(err);
        } else{
            Campground.findById(req.params.id, function(err, camp){
                if(err){
                    console.log(err);
                } else{
                    camp.comments.push(newComment);
                    camp.save();
                    res.redirect('/campgrounds/'+req.params.id);
                }
            });
        }
    });
});

router.get('/campgrounds/:id/comments/:comment_id/edit', middleware.checkCommentOwnership, function(req, res){
    Comment.findById(req.params.comment_id, function(err, foundComment){
        if(err){
            res.redirect('back');
        } else{
            res.render('comments/edit', {campground_id:req.params.id, comment:foundComment});
        }
    })
});

router.put('/campgrounds/:id/comments/:comment_id',middleware.checkCommentOwnership, function(req,res){
    Comment.findByIdAndUpdate(req.params.comment_id, req.body.comment, function(err, comment){
        if(err){
            res.redirect('back');
        } else {
            res.redirect('/campgrounds/'+req.params.id);
        }
    })
});

router.delete('/campgrounds/:id/comments/:comment_id',  middleware.checkCommentOwnership, function(req,res){
    Comment.findByIdAndRemove(req.params.comment_id, function(err,deletedComment){
        if(err){
            res.redirect('back');
        } else{
            res.redirect('/campgrounds'+req.params.id);
        }
    });
})


module.exports = router;