import { generateToken } from "../lib/utils.js";
import User from "../models/user.model.js";
import bcrypt from "bcryptjs";

export const login =async(req,res)=>{
    try{
        const {email,password}=req.body;

        if(!email || !password){
            return res.status(400).json({message:"please provide email and password"});
        }
         const user = await User.findOne({ email });

        if (!user) {
            return res.status(400).json({ message: "Invalid credentials" });
        }

         const isPasswordMatch = await bcrypt.compare(password, user.password);
        if (!isPasswordMatch) {
            return res.status(400).json({ message: "Invalid credentials" });
        }

        const token=generateToken(user.id,res);

        return res.status(200).json({
            message: "Login successfully",
            _id: user._id,
            username: user.username,
            email: user.email,
            profilePicture: user.profilePicture,
            coverPhoto: user.coverPhoto,
            about: user.about,
            isAdmin: user.isAdmin,
            subscription: user.subscription,
            subscriptionStatus: user.subscriptionStatus,
            subscriptionExpiry: user.subscriptionExpiry,
            selectedCharity: user.selectedCharity,
            charityPercentage: user.charityPercentage,
        });



    }
    catch(error){
        res.status(500).json({message:"internal server error", error:error.message});
    }

};

export const signup=async(req,res)=>{
    try {
        const {email,password,username}=req.body;
        console.log(email,password,username);

        if(!email  || !password || !username) {
            return res.status(400).json({message:"credenatials not provided"});
        }
        if (password.length < 6) {
            return res.status(400).json({ message: "Password must be at least 6 characters" });
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            return res.status(400).json({ message: "Invalid email format" });
        }

        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: "User already exists with this email" });
        }

        const salt=await bcrypt.genSalt(10);
        const hashPassword=await bcrypt.hash(password,salt);
         
        const user=new User({
            email:email,
            username:username,
            password:hashPassword,
        });
        await user.save();
        console.log("user created");

        const token=generateToken(user.id,res);
        

        return res.status(200).json({
            message: "Account created successfully",
            _id: user._id,
            username: user.username,
            email: user.email,
            profilePicture: user.profilePicture,
            coverPhoto: user.coverPhoto,
            about: user.about,
            isAdmin: user.isAdmin,
            subscription: user.subscription,
            subscriptionStatus: user.subscriptionStatus,
            subscriptionExpiry: user.subscriptionExpiry,
            selectedCharity: user.selectedCharity,
            charityPercentage: user.charityPercentage,
        });


    }
    catch(error){
        console.log(error);
        return res.status(500).json({message:"Internal server error", error:error.message});
    }
};

export const logout = (req, res) => {
    try {
        res.cookie("jwt", "", { maxAge: 0 });
        res.status(200).json({ message: "Logged  out  successfully" });
    }
    catch (error) {
        return res.status(500).json({ message: "Internal server error", error });
    }

};

export const checkAuth = (req, res) => {
    try {
      res.status(200).json(req.user);
       
    }
    catch (error) {
        return res.status(500).json({ message: "Internal server error", error });
    }
}

export const updateProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);

    user.profilePicture = req.file.path;

    await user.save();

    res.status(200).json(user);

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};
