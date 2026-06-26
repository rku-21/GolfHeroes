import Plan from "../models/plans.model.js"

export const getAllPlans=async(req,res)=>{
    try {
        const plans=await Plan.find();
        return res.status(200).json({plans});
    }
    catch(error){
        res.status(500).json({message:"internal server error",error:error.message});
    }
}