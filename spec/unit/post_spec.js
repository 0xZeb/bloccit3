const sequelize = require("../../src/db/models/index").sequelize;
const Topic = require("../../src/db/models").Topic;
const Post = require("../../src/db/models").Post;

describe("Post", () => {

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

//THIS IS THE LINE OF CODE THAT LINKS THE POSTS TO THE TOPIC
//VERY IMPORTANT!!
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


  //begin test specs
  describe("#create()", () => {

    it("should create a post object with a title, body and assigned topic", (done) => {

      Post.create({
        title: "Pros of Cryosleep during the long journey",
        body: "1. Not having to answer the 'are we there yet?' question.",

        //this associates the post to the topic.
        topicId: this.topic.id
      })
      .then((post) => {

        expect(post.title).toBe("Pros of Cryosleep during the long journey");
        expect(post.body).toBe("1. Not having to answer the 'are we there yet?' question.");
        done();


      })
      .catch((err) => {
        console.log(err);
        done();
      });
    });

    //test to confirm cannot create empty post..
    it("should not create a post with missing title, body, or assigned topic", (done) => {

      Post.create({
        title: "Pros of Cryosleep during the long journey"
      })
      .then((post) => {

        done();
      })
      .catch((err) => {

        expect(err.message).toContain("Post.body cannot be null");
        expect(err.message).toContain("Post.topicId cannot be null");
        done();
      });
    });  //end empty post test

  });// end of #create()

  describe("#setTopic()", () => {

     it("should associate a topic and a post together", (done) => {

// #1
       Topic.create({
         title: "Challenges of interstellar travel",
         description: "1. The Wi-Fi is terrible"
       })
       .then((newTopic) => {

// #2
         expect(this.post.topicId).toBe(this.topic.id);


         this.post.setTopic(newTopic)
         .then((post) => {
// #4
        
           expect(post.topicId).toBe(newTopic.id);
           done();

         });
       })
     });

   });

   describe("#getTopic()", () => {

     it("should return the associated topic", (done) => {

       this.post.getTopic()
       .then((associatedTopic) => {
         expect(associatedTopic.title).toBe("Expeditions to Alpha Centauri");
         done();
       });
     });

   });




});// end post suite
