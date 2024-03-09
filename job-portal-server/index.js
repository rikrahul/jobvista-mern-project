const express = require('express')
const app = express()
const cors = require('cors')
const port = process.env.PORT || 3000;
require('dotenv').config()


//middleware
app.use(express.json())
app.use(cors())

//user: rahulrikhari2001
//pass: z3vZXyufloP9sPcO


const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@job-portal-mern.rlhmbx1.mongodb.net/?retryWrites=true&w=majority`;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();

    // create db
    const db = client.db("mernJobPortal");
    const jobsCollections = db.collection("jobs");

    //create usersignup collection
    const userSignupCollection = db.collection("user_signup");

    //login
    // Login endpoint
    app.post("/login", async (req, res) => {
      const { email, password, userType } = req.body;

      // Check if email, password, and userType are provided
      if (!email || !password || !userType) {
        return res.status(400).send({
          message: "Email, password, and userType are required.",
          status: false
        });
      }

      try {
        // Find user by email and userType
        const user = await userSignupCollection.findOne({ email, userType });

        // Check if user exists
        if (!user) {
          return res.status(404).send({
            message: "User not found.",
            status: false
          });
        }

        // Check if password matches
        if (user.password !== password) {
          return res.status(401).send({
            message: "Incorrect password.",
            status: false
          });
        }

        // Login successful
        return res.status(200).send({
          message: "Login successful.",
          status: true,
          user: {
            id: user._id,
            name: user.name,
            email: user.email,
            userType: user.userType
            // Add any other user data you want to send back
          }
        });
      } catch (error) {
        console.error("Error during login:", error);
        return res.status(500).send({
          message: "Internal server error.",
          status: false
        });
      }
    });



    //get all usersignup data
    app.get("/all-usersignup", async (req, res) => {
      const user_signup = await userSignupCollection.find({}).toArray()
      res.send(user_signup);
    })

    // post usersignup data
    app.post("/sign-up", async (req, res) => {
      const body = req.body;
      body.createAt = new Date();
      // console.log(body)
      const result = await userSignupCollection.insertOne(body);
      if (result.insertedId) {
        return res.status(200).send(result);
      }
      else {
        return res.status(404).send({
          message: "Data not inserted! Try Again later",
          status: false
        })
      }
    })


    // post jobs
    app.post("/post-job", async (req, res) => {
      const body = req.body;
      body.createAt = new Date();
      // console.log(body)
      const result = await jobsCollections.insertOne(body);
      if (result.insertedId) {
        return res.status(200).send(result);
      }
      else {
        return res.status(404).send({
          message: "Data not inserted! Try Again later",
          status: false
        })
      }
    })

    //get all jobs
    app.get("/all-jobs", async (req, res) => {
      const jobs = await jobsCollections.find({}).toArray()
      res.send(jobs);
    })

    // get single job using id
    app.get("/all-jobs/:id", async (req, res) => {
      const id = req.params.id;
      const job = await jobsCollections.findOne({
        _id: new ObjectId(id)
      })
      res.send(job)
    })

    //get jobs by email
    app.get("/myJobs/:email", async (req, res) => {
      // console.log(req.params.email)
      const jobs = await jobsCollections.find({ postedBy: req.params.email }).toArray();
      res.send(jobs)
    })

    // delete a job
    app.delete("/job/:id", async (req, res) => {
      const id = req.params.id;
      const filter = { _id: new ObjectId(id) }
      const result = await jobsCollections.deleteOne(filter);
      res.send(result)
    })

    // update a jobs
    app.patch("/update-job/:id", async (req, res) => {
      const id = req.params.id;
      const jobData = req.body;
      const filter = { _id: new ObjectId(id) };
      const options = { upsert: true };
      const updateDoc = {
        $set: {
          ...jobData
        },
      };

      const result = await jobsCollections.updateOne(filter, updateDoc, options);
      res.send(result)
    })

    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
    //await client.close();
  }
}
run().catch(console.dir);



app.get('/', (req, res) => {
  res.send('Hello Rahul!')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})