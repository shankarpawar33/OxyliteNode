const signUp = require('../Models/signup');
const bcrypt = require('bcrypt');
const { response } = require('express');
const jwt=require('jsonwebtoken')

const register = async (req, res) => {
    try {
        const salt = await bcrypt.genSalt(10);
        const hashedPass = await bcrypt.hash(req.body.password, salt);
    const user = await new signUp({
            name: req.body.name,
            mobile_number: req.body.mobile_number,
            password: hashedPass,
            userType:req.body.userType,
            plantId:req.body.plantId
              
    })
         const result = await user.save();
         res.json({responsse_code:200,response_msg:"success",data:result});
        } catch (error) {
          console.error('Error creating job post:', error);
          res.status(500).json({ error: 'Internal Server Error' });
        }
    }

    const login=async(req,res)=>{
        try {
            const user = await signUp.findOne({ mobile_number: req.body.mobile_number });
            if (!user) {
                return res.status(400).json({ error: 'User not found' });
            }
            const validate = await bcrypt.compare(req.body.password, user.password);
            if (!validate) {
                return res.status(400).json({ error: 'Incorrect password' });
            }
                const token = jwt.sign({ userId: user.id, mobile_number: user.mobile_number,}, 'your-secret-key');
                res.json({response_messge:"Login successfull..", token});
              } catch (error) {
                console.error('Error during login:', error);
                res.status(500).json({ message: 'Internal server error' });
              }
    } 

    const getAllUser=async(req,res)=>{

        try{
            const users=await signUp.find().select('userId name mobile_number password userType plantId');
            res.status(200).json({msg:"success" ,data:users});
        }catch (error) {
            console.error('Error during find users:', error);
            res.status(500).json({ message: 'Internal server error' });
          }
    }
    const getUserById = async (req, res) => {
        const { userId } = req.params;
    
        try {
            const response = await signUp.findOne({ userId }).select('name mobile_number password userType plantId customerId');
            if (!response) {
                return res.status(400).json('Wrong userId');
            }
    
            res.status(200).json({ msg: "Success", data: response });
        } catch (error) {
            console.error('Error during find users:', error);
            res.status(500).json({ message: 'Internal server error' });
        }
    };
    

    const getByCustomerId= async (req, res) => {
        const {custId}=req.params;
        try {
            const response = await signUp.findOne({ custId }).select({ _id: 0, name: 1, mobile_number: 1, password: 1, userType: 1, plantId: 1, userId: 1 });
            if (!response) {
                return res.status(400).json('Wrong custId');
            }
    
            res.status(200).json({ msg: "Success", data: response });
        } catch (error) {
            console.error('Error during find users:', error);
            res.status(500).json({ message: 'Internal server error' });
        }
    };

module.exports = {
    register,
    login,
    getAllUser,
    getUserById,
    getByCustomerId
};
