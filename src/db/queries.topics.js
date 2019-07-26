const Topic = require("./models").Topic;

const Post = require("./models").Post;

const Flair = require("./models").Flair;

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
    return Topic.destroy({
      where: {id}
    })
    .then((topic) => {
      callback(null, topic);
    })
    .catch((err) => {
      callback(err);
    })
  },

  updateTopic(id, updatedTopic, callback){
     return Topic.findById(id)
     .then((topic) => {
       if(!topic){
         return callback("Topic not found");
       }

       topic.update(updatedTopic, {
        fields: Object.keys(updatedTopic)
      })
      .then(() => {
        callback(null, topic);
      })
      .catch((err) => {
        callback(err);
      });
    });
  },



} //end module
