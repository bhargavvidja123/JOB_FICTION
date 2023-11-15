const express = require('express')
const path = require('path')
const app = express()
const cookieParser = require("cookie-parser");
app.use(cookieParser());
require('dotenv').config()
const { json } = require('express')
const { conectMongodb } = require("./db/conection");
const bcrypt = require("bcryptjs")


conectMongodb("mongodb://127.0.0.1:27017/Randome").then(() => {
    console.log(`Connection Successfully....`)
}).catch((e) => {
    x
    console.log(`No Connection`)
})




const Register = require("./models/registers")
const { Emailauth, loggedinonly } = require("./middlewares/auth");
const Jobpost = require("./models/postschema")
// const Job = require('./models/postschema');
const Savedpost = require('./models/savePostSchema');
const jobs = require("./models/jobs");

const hbs = require('hbs')
const { error } = require('console');
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

const port = process.env.PORT || 3000;
app.set("view engine", "hbs")

const static_path = path.join(__dirname, "../public")
app.use(express.static(static_path))

const template_path = path.join(__dirname, "../templates/views")
app.set("views", template_path)
// app.use(express.static(template_path))


const forgotpassroute = require("./routes/forgotpassroute");
const loginroute = require("./routes/loginroute");
const registerroute = require("./routes/registerroute");
const homeroute = require("./routes/homeroute");
const savepostroute = require("./routes/savepostroute");
const unsavepostroute = require("./routes/unsavepostroute");
const job_descriptionroute = require("./routes/job_descriptionroute");
const myprofileroute = require("./routes/myprofileroute");
const jobroute = require("./routes/jobsroute")
const edit_profile_route = require("./routes/edit_profile_route");
const savelistroute = require("./routes/savelistroute");
const companyregisterroute = require("./routes/companyregisterroute");
const companyloginroute = require("./routes/companyloginroute");
const companyprofileroute = require("./routes/companyprofileroute");
const uplodroute = require("./routes/uplodroute");
const candidateslist = require("./routes/candidateslist");
const candidateprofile = require("./routes/candidateprofile");
const companyjobpostlist = require("./routes/companyjobpostlist");

app.use("/saveData", savepostroute);
app.use("/unsaveData", unsavepostroute);
app.use("/forgotpass", forgotpassroute);
app.use("/login", loginroute);
app.use("/register", registerroute);
app.use("/home", homeroute);
app.use("/job_description", job_descriptionroute);
app.use("/myprofile", myprofileroute);
app.use("/jobs_1", jobroute);
app.use("/edit_profile", edit_profile_route);
app.use("/saved_jobs", savelistroute);
app.use("/companyregister", companyregisterroute);
app.use("/companylogin", companyloginroute);
app.use("/companyprofile", companyprofileroute);
app.use("/companyjobpostlist", companyjobpostlist);
app.use("/candidateslist", candidateslist);
app.use("/candidateprofile", candidateprofile);
app.use("/file", uplodroute);


app.get("/", (req, res) => {
    res.render("landingpage")
})

app.get("/companyhomepage", (req, res) => {
    res.render("companyhomepage")
})

app.get("/companyprofile", (req, res) => {
    res.render("companyprofile")
})

app.get("/newpost", (req, res) => {
    res.render("newpost")
})

app.get("/jobpostlist", (req, res) => {
    res.render("jobpostlist")
})

app.post('/newpost', async (req, res) => {
    try {
        const lastJob = await Jobpost.findOne().sort('-job_id');
        let newJobId = 1;

        if (lastJob) {
            newJobId = lastJob.job_id + 1;
            console.log(newJobId)
        }
        const data = {
            job_id: newJobId,
            job_title: req.body.job_title,
            role: req.body.Responsibilities,
            experience: req.body.exp,
            skills: req.body.skills,
            industry_type: req.body.industry_type,
            employment_type: req.body.employment_type,
            work_mode: req.body.work_mode,
            salary: req.body.salary,
            location: req.body.location,
            last_date: req.body.last_date,
            degree: req.body.degree,
            criteria: req.body.criteria,
            perk: req.body.Perks,
        }

        // const registered = await data.save();
        // console.log(registered),
        // Jobpost.insertOne(data)
        await Jobpost.insertMany([data]);
        console.log(data)
        res.render("companyhomepage")

    } catch (error) {
        res.status(400).send(error);
    }
})

app.get("/landingpage", async (req, res) => {
    res.render("landingpage");
})


// app.get("/jobs_main",(req,res)=>{
//     res.render("jobs_main")
// })

// app.get('/jobsmain/:title',async (req, res) => {

//     const requestedTitle = req.params.title;

//     // Fetch job data based on the requested title using await
//     const jobsData = await Jobpost.find({ title: requestedTitle }).exec();

//     res.render("jobs_main", {jobsData}); // Pass the fetched data to the 'jobs.hbs' template
// });


// app.post("/jobs_main",async (req,res)=>{
//     const requestedTitle = req.body.search;
//     // Fetch job data based on the requested title using await
//     const jobsData = await Jobpost.find({ job_title : requestedTitle }).exec();
//     //console.log(jobsData);
//     res.render("jobs_main", { jobsData }); // Pass the fetched data to the 'jobs.hbs' template


// });




app.listen(port, () => {
    console.log(`Server is running in port no ${port}`);
})

