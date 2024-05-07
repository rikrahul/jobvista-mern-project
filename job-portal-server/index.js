const express = require('express');
const app = express();
const cors = require('cors');
const XLSX = require('xlsx');
require('dotenv').config();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

app.use(express.json());
app.use(cors());

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
    const jobApplcationCollection = db.collection("jobApplication");

    // Define backupCollections function
    async function backupCollections() {
      try {
        // Fetch data from collections concurrently
        const [jobsData, userSignupData, jobApplicationData] = await Promise.all([
          jobsCollections.find({}).toArray(),
          userSignupCollection.find({}).toArray(),
          jobApplcationCollection.find({}).toArray()
        ]);

        // Convert data to Excel format
        const wb = XLSX.utils.book_new();
        const jobsSheet = XLSX.utils.json_to_sheet(jobsData);
        const userSignupSheet = XLSX.utils.json_to_sheet(userSignupData);
        const jobApplicationSheet = XLSX.utils.json_to_sheet(jobApplicationData);

        XLSX.utils.book_append_sheet(wb, jobsSheet, "Jobs");
        XLSX.utils.book_append_sheet(wb, userSignupSheet, "User Signup");
        XLSX.utils.book_append_sheet(wb, jobApplicationSheet, "Job Applications");

        // Save Excel file
        const filePath = './backup.xlsx';
        XLSX.writeFile(wb, filePath);
        console.log("Backup completed successfully.");
      } catch (error) {
        console.error("Error during backup:", error);
      }
    }

    // Define backup route
    app.get('/backup', async (req, res) => {
      try {
        await backupCollections();
        const filePath = './backup.xlsx';
        res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
        res.download(filePath); // Send the file as response for download
      } catch (error) {
        console.error("Error during backup:", error);
        res.status(500).send('Error during backup');
      }
    });

    //job apply
    app.post("/job-applications/:id", async (req, res) => {
      const body = req.body;
      body.createAt = new Date();
      // console.log(body)
      const result = await jobApplcationCollection.insertOne(body);
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

    //get all jobApplication data
    app.get("/all-jobApplication", async (req, res) => {
      const jobApplication = await jobApplcationCollection.find({}).toArray()
      res.send(jobApplication);
    })

    // get single application using id
    app.get("/all-jobApplication/:id", async (req, res) => {
      const id = req.params.id;
      const jobApplication = await jobApplcationCollection.findOne({
        _id: new ObjectId(id)
      })
      res.send(jobApplication)
    })


    //get application by email
    app.get("/all-jobApplicationByEmail/:userEmail", async (req, res) => {
      const jobApplication = await jobApplcationCollection.find({ email: req.params.userEmail }).toArray();
      res.send(jobApplication)
    })

    //delete application
    app.delete('/all-jobApplication/:id', async (req, res) => {
      const id = req.params.id;
      const filter = { _id: new ObjectId(id) }
      const result = await jobApplcationCollection.deleteOne(filter);
      res.send(result)
    })

    // update a jobs
    app.patch("/update-application/:id", async (req, res) => {
      const id = req.params.id;
      const applicationData = req.body;
      const filter = { _id: new ObjectId(id) };
      const options = { upsert: true };
      const updateDoc = {
        $set: {
          ...applicationData
        },
      };

      const result = await jobApplcationCollection.updateOne(filter, updateDoc, options);
      res.send(result)
    })

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
        const passwordMatch = await bcrypt.compare(password, user.password);
        if (!passwordMatch) {
          return res.status(401).send({
            message: "Incorrect password.",
            status: false
          });
        }

        // Login successful
        // After verifying the user's credentials
        const token = jwt.sign({ userId: user._id, userType: user.userType }, 'JOBVISTARAHULRIKHARI', { expiresIn: '1h' });

        return res.status(200).send({
          message: "Login successful.",
          status: true,
          token: token,
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

    app.post("/sign-up", async (req, res) => {
      const body = req.body;
      const hashedPassword = await bcrypt.hash(body.password, 10); // 10 is the salt rounds
      body.password = hashedPassword;
      body.createdAt = new Date();

      try {
        const result = await userSignupCollection.insertOne(body);
        if (result.insertedId) {
          return res.status(200).send(result);
        } else {
          return res.status(404).send({
            message: "Data not inserted! Try Again later",
            status: false
          });
        }
      } catch (error) {
        console.error("Error during sign-up:", error);
        return res.status(500).send({
          message: "Internal server error.",
          status: false
        });
      }
    });


    app.delete('/all-usersignup/:id', async (req, res) => {
      const id = req.params.id;
      const filter = { _id: new ObjectId(id) }
      const result = await userSignupCollection.deleteOne(filter);
      res.send(result)
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
      if (!ObjectId.isValid(id)) {
        return res.status(400).send({ message: 'Invalid job ID.' });
      }

      const job = await jobsCollections.findOne({
        _id: new ObjectId(id)
      });

      if (!job) {
        return res.status(404).send({ message: 'Job not found.' });
      }

      res.send(job);
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
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})