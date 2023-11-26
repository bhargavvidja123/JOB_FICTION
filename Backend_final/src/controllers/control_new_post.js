const jobs=require('../models/jobs');
const companyregister = require("../models/companyregisterschema");
const Register = require('../models/registers');
const { sendEmail } = require('../services/mailer');
const { Newjobposted } = require('../services/mailtemplates');


module.exports = {

    get:async (req,res)=>{

        res.render("newpost.hbs");

    },
    post: async(req,res)=>{
        try{
            
            
            const companyemail=req.body.email;
           const company_name=req.body.company_name;
           const profile = req.body.profile;
          
            const lastJob = await jobs.findOne().sort('-id');
            let newJobId = 1;
            
            if (lastJob) {
                newJobId = lastJob.id + 1;
             
            }
            const data = {
                id: newJobId,
                company_email: companyemail,
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
               company:company_name,
                perk: req.body.Perks,
                profile:profile,
            }
    
            // const registered = await data.save();
            // console.log(registered),
            // Jobpost.insertOne(data)
            
            await jobs.insertMany([data]);

            const registers = await Register.find({verified:true}).exec();

            data.skills = data.skills.join();
            
            for(let i in registers){
                console.log(registers[i].email);
                if(registers[i].email != undefined)
                sendEmail(registers[i].email ,"New Opportunity at Job Fiction",Newjobposted(data));
            }
           
            res.render("companyhomepage.hbs")
        }
        catch (error)
        {
            console.log(error)
            res.status(400).send('<script>alert("Fatal Error."); window.location = "/companylogin";</script>');
        }
    }
}