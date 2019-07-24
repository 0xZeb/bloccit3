const flairQueries = require("../db/queries.posts.js");

module.exports = {

  new(req, res, next){
   res.render("flairs/new", {topicId: req.params.topicId});
  },

}
