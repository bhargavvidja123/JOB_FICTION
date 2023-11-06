const Register  = require("../models/registers");
const bcrypt    = require("bcryptjs");
const express = require("express");
const app = express()
const cookieParser=require("cookie-parser");
app.use(cookieParser());

module.exports = {

    get:async (req,res)=>{

        res.render("login");

    },
    post: async(req,res)=>{
        try{
    
            const check = await Register.findOne({email:req.body.email})
            const match = await bcrypt.compare(req.body.password,check.password);
            if(match)
            {

                res.cookie("jwt",check.token,{
                    maxAge:300000,
                    httpOnly:true,
                });
                res.render("home"); 

            }
            else
            {
                 res.status(400).send('<script>alert("Incorrect Password or Email."); window.location = "/login";</script>');
            }
        }
        catch (error)
        {
            res.status(400).send('<script>alert("Fatal Error."); window.location = "/login";</script>');
        }
    }
}