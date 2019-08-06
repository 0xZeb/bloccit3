const Topic = require("./models").Topic;

const Post = require("./models").Post;

const Flair = require("./models").Flair;

const User = require("./models").User;

module.exports = {

  getAllTopics(callback){
    return Topic.all()

    // topics = the value of 'return Topic.all()' passed to .then() method
    .then((topics) => {
      callback(null, topics);

    })
    .catch((err) => {
      callback(err);
    })
  },

  addTopic(newTopic, callback) {
    return Topic.create({
      title: newTopic.title,
      description: newTopic.description
    })
    .then((topic) => {
      callback(null, topic);
    })
    .catch((err) => {
      callback(err);
    })
  },

//POST RESOURCE p2
  getTopic(id, callback){

    //being eager load of associated posts -allows us to pull requested objects and associated ones with 1 request, instead of 2.
    return Topic.findById(id, {

      include: [{
        model: Post,
        as: "posts"
      }]
    })
    .then((topic) => {
      callback(null, topic);
    })
    .catch((err) => {
      callback(err);
    })
  },

  deleteTopic(id, callback){
    // #1
       return Topic.findAll(req.params.id)
       .then((topic) => {

   // #2
         const authorized = new Authorizer(req.user, topic).destroy();

         if(authorized) {
   // #3
           topic.destroy()
           .then((res) => {
             callback(null, topic);
           });

         } else {

   // #4
           req.flash("notice", "You are not authorized to do that.")
           callback(401);
         }
       })
       .catch((err) => {
         callback(err);
       });
  },

  updateTopic(id, updatedTopic, callback){

  // #1
       return Topic.findById(req.params.id)
       .then((topic) => {

  // #2
         if(!topic){
           return callback("Topic not found");
         }

  // #3
         const authorized = new Authorizer(req.user, topic).update();

         if(authorized) {

  // #4
           topic.update(updatedTopic, {
             fields: Object.keys(updatedTopic)
           })
           .then(() => {
             callback(null, topic);
           })
           .catch((err) => {
             callback(err);
           });
         } else {

  // #5
           req.flash("notice", "You are not authorized to do that.");
           callback("Forbidden");
         }
       });
  },



} //end module
