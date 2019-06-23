const Topic = require("./models").Topic;

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
  }

}
