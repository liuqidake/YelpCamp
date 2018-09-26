const express = require('express');
const router = express.Router();
const Campground = require('../models/campground');
const Comment = require('../models/comment');
const middleware = require('../middleware/index');

router.get('/', function(req,res){
    res.render('landing');
});

router.get('/campgrounds', function(req, res){
    Campground.find({}, function(err, camp){
        if(err){
            console.log('err');
        }
        else{
            res.render('campgrounds/index', {campgrounds: camp});
        }
    });
});

router.get('/campgrounds/new', middleware.isLoggedIn, function(req, res){
    res.render('campgrounds/new');
});

router.post('/campgrounds', middleware.isLoggedIn, function(req,res){
    var title = req.body.title;
    var image = req.body.image;
    var description = req.body.description;
    var author = {
        id:req.user._id,
        username:req.user.username
    };
    var camp = new Campground({
        title:title,
        image:image,
        description:description,
        author:author
    });
   Campground.create(camp, function(err, camp){
     if(err){
         res.render('campgrounds/new');
     } else{
         res.redirect('/campgrounds');
     }
   });
});

router.get('/campgrounds/:id', function(req, res){
    Campground.findById(req.params.id).populate('comments').exec(function(err,camp){
        if(err){
            console.log(err);
        } else{
            res.render('campgrounds/show', {campground:camp});
        }
    });
});

router.get('/campgrounds/:id/edit', middleware.checkCampgroundOwnership, function(req, res){
    Campground.findById(req.params.id, function(err, camp){
        if(err){
            res.redirect('/campgrounds');
        } else{
            res.render('campgrounds/edit', {campground:camp});
        }
    })
});

router.put('/campgrounds/:id', middleware.checkCampgroundOwnership, function(req,res){
    Campground.findByIdAndUpdate(req.params.id, req.body.campground, function(err, camp){
       if(err){
           res.render('campgrounds/edit');
       } else{
           res.redirect('/campgrounds/'+req.params.id);
       }
    });
});

router.delete('/campgrounds/:id', middleware.checkCampgroundOwnership, function(req,res){
    Campground.findByIdAndRemove(req.params.id, function(err, deletedCamp){
        if(err){
            res.redirect('/campgrounds');
        }
        else{
            res.redirect('/campgrounds');
        }
    })
});


module.exports = router;