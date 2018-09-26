var mongoose = require('mongoose');
var Comment = require('./models/comment.js');
var Campgrounds = require('./models/campground.js');
var User = require('./models/user.js');

var data = [
    {
        title: "Cloud's Rest", 
        image: "https://farm4.staticflickr.com/3795/10131087094_c1c0a1c859.jpg",
        description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum"
    },
    {
        title: "Desert Mesa", 
        image: "https://farm6.staticflickr.com/5487/11519019346_f66401b6c1.jpg",
        description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum"
    },
    {
        title: "Canyon Floor", 
        image: "https://farm1.staticflickr.com/189/493046463_841a18169e.jpg",
        description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum"
    }
]

function seedsDb(){
    //Remove all the Campground objects
   Campgrounds.remove({}, function(err){
    if(err){
        console.log(err);
    }
    else{
        // console.log('removed');
        // //Add Campground objects to data base
        // data.forEach(function(campground){
        //     Campgrounds.create(campground, function(err, camp){
        //         if(err){
        //             console.log(err);
        //         } else{
        //             //Create Comment object and add it to the Campground
        //             Comment.create({
        //                 text:"Hello",
        //                 author:"Jennifer"
        //             }, function(err, comment){
        //                 if(err){
        //                     console.log(err);
        //                 }
        //                 else{
        //                     camp.comments.push(comment);
        //                     camp.save();
        //                     console.log('saved');
        //                 }
        //             })
        //         }
        //     })
        // });
    }
});
}

module.exports = seedsDb;