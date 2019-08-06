const sequelize = require("../../src/db/models/index").sequelize;
const Topic = require("../../src/db/models").Topic;
const Post = require("../../src/db/models").Post;
const User = require("../../src/db/models").User;


describe("Topic", () => {

      beforeEach((done) => {
        this.topic;
     this.post;
     this.user;

     sequelize.sync({force: true}).then((res) => {

// #2
       User.create({
         email: "starman@tesla.com",
         password: "Trekkie4lyfe"
       })
       .then((user) => {
         this.user = user; //store the user

// #3
         Topic.create({
           title: "Expeditions to Alpha Centauri",
           description: "A compilation of reports from recent visits to the star system.",

// #4
           posts: [{
             title: "My first visit to Proxima Centauri b.",
             body: "I saw some rocks.",
             userId: this.user.id
           }]
         }, {

// #5
           include: {
             model: Post,
             as: "posts"
           }
         })
         .then((topic) => {
           this.topic = topic; //store the topic
           this.post = topic.posts[0]; //store the post
           done();
         })
       })
     });
   });


    describe("#create()", () => {

         it("should create a topic object with a title, description", (done) => {
    //#1
           Topic.create({
             title: "why youre 'new' coaching idea is actually trash",
             description: "A compilation of reports from twitter."
           })
           .then((topic) => {

    //#2
             expect(topic.title).toBe( "why youre 'new' coaching idea is actually trash");
             expect(topic.description).toBe("A compilation of reports from twitter.");
             done();

           })
           .catch((err) => {
             console.log(err);
             done();
           });
         });

     });

       //define test for getPost method




       //all tests should call `this.topic.getPosts`
       //1 step at a time
       describe("#getPosts()", () => {

          //create and associate a post with the topic in scope.
          // ids need to match (post and topic)
         it("should create and associate a topic and a post together", (done) =>{

           this.topic.getPosts()
           .then((newPost) => {
             expect(newPost[0].topicId).toBe(this.topic.id);
             done();
           });

         });


         //return an array of Post objects that are associated with the topic instance
         // return all of the posts for a topic
         it("should return an array of post objects associated with topic", (done) => {

           this.topic.getPosts()
           .then((postsArray) => {
             expect(postsArray[0].title).toBe("My first visit to Proxima Centauri b.");
             done();
           })


          });


         //confirm associated post is returned when getPost called.
         it("should confirm associate post and is returned when method is called", (done) => {

           this.topic.getPosts()
           .then((associatedPost) => {
             expect(associatedPost[0].title).toBe("My first visit to Proxima Centauri b.");
             expect(associatedPost[0].body).toBe("I saw some rocks.");
             done();
           });
         });

       });



}) //end test suite
