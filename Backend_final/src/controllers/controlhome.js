const jobs = require("../models/jobs");
const Register = require("../models/registers");
const jwt = require("jsonwebtoken");
module.exports = {

    get:async (req,res)=>{
        const data = await jobs.find().limit(10);
        console.log(data);
        const defaultJobTitles = await jobs.distinct('job_title');
        const  defaultWorkModes = await jobs.distinct('work_mode');
        const defaultLocations = await jobs.distinct('location');
        

        if(req.cookies.jwt){
            jwt.verify(req.cookies.jwt,'ehewlkjjfsafasjflkasfjjkfsjflkasjffjsjasfasffafa',async(err,decoded)=>{
                if(err)
                {
                return res.status(400).send('<script>alert("Cookies decoding Error."); window.location = "/login";</script>');
                }
                else
                {
                    if(decoded.flag === true){
                        res.status(400).send('<script> alert("You have to login first."); window.location = "/login";</script>');
                    }
                    else{
                    const check = await Register.findOne({_id:decoded._id});
                    const profile=check.profile;
                    res.render("home.hbs",{profile,data:data , logged:true,defaultJobTitles:defaultJobTitles , defaultLocations:defaultLocations , defaultWorkModes:defaultWorkModes});

                    
                    
                }
                }
                });
            
        }
        else{
        res.render("home.hbs",{data:data,defaultJobTitles:defaultJobTitles , defaultLocations:defaultLocations , defaultWorkModes:defaultWorkModes});
        }

    },

}