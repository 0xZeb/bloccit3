const sequelize = require("../../src/db/models/index").sequelize;
const Topic = require("../../src/db/models").Topic;
const Post = require("../../src/db/models").Post;


describe("Topic", () => {

      beforeEach((done) => {

    //declaring two variables to test.
        this.topic;
        this.post;
        //clear out the db before each test
        sequelize.sync({ force: true}).then((res) => {

          //make a new topic each time
          Topic.create({
            title: "Expeditions to Alpha Centauri",
            description: "A compilation of reports from recent visits to the star system."
          })
          .then((topic) => {
            this.topic = topic;

            //make a new post to test each time
            Post.create({
              title: "My first visit to proxima centauri b",
              body: "i saw some rocks.",
              topicId: this.topic.id
            })
            .then((post) => {
              this.post = post;
              done();
            });
          })
          .catch((err) => {
            console.log(err);
            done();
          });
        });


      }); ///end pre test conditions


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
             expect(postsArray[0].title).toBe("My first visit to proxima centauri b");
             done();
           })


          });


         //confirm associated post is returned when getPost called.
         it("should confirm associate post and is returned when method is called", (done) => {

           this.topic.getPosts()
           .then((associatedPost) => {
             expect(associatedPost[0].title).toBe("My first visit to proxima centauri b");
             expect(associatedPost[0].body).toBe("i saw some rocks.");
             done();
           });
         });

       });



}) //end test suite
