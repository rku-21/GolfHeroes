import Charity from "../models/charity.model.js";

export const getAllCharities = async (req, res) => {
    try {
        const {cursor,limit=20}=req.query;
        const query={};
        if(cursor){
            query.createdAt={$lt : new Date(cursor)};
        }

        const Allcharities=await Charity.find(query).sort({createdAt:-1}).limit(parseInt(limit)+1).populate('name description image website category isFeatured');

        const hasMore=Allcharities.length>limit;
        const nextCursor=hasMore?Allcharities[limit-1].createdAt:null;
        const charities=Allcharities.slice(0,limit);
       

        return res.status(200).json({
            charities,
            hasMore:hasMore,
            nextCursor:nextCursor,
        });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

export const getCharityById = async (req, res) => {
    try {
        const charity = await Charity.findById(req.params.id);

        if (!charity) {
            return res.status(404).json({ message: "Charity not found" });
        }

        return res.status(200).json(charity);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

export const addCharity = async (req, res) => {
    try {
        if (!req.user.isAdmin) {
            return res.status(403).json({ message: "Access denied" });
        }

        const charity = await Charity.create(req.body);

        return res.status(201).json({
            message: "Charity added successfully",
            charity,
        });

    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

export const updateCharity = async (req, res) => {
    try {
        const {charityId}=req.body;
        const userId=req.user._id;
        console.log(charityId);

        const updatedUser=await User.findByIdAndUpdate(
            userId,
            {selectedCharity:charityId},
            {new:true}

        )



        res.status(200).json({
            message:"update successfully",
            mycharity:updatedUser.selectedCharity,
            updatedUser:updatedUser,
        })


    }catch(error){
        res.status(500).json({
            message:"Internal server Error",
            error:error.message,
        })
    }
   
};

export const deleteCharity = async (req, res) => {
    try {
        if (!req.user.isAdmin) {
            return res.status(403).json({ message: "Access denied" });
        }

        const charity = await Charity.findByIdAndDelete(req.params.id);

        if (!charity) {
            return res.status(404).json({ message: "Charity not found" });
        }

        return res.status(200).json({
            message: "Charity deleted successfully",
        });

    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

import User from "../models/user.model.js";

export const getMyCharity = async (req, res) => {
    try {
        const user = await User.findById(req.user.id)
            .populate("selectedCharity");

        if (!user) {
            return res.status(404).json({
                message: "User not found",
            });
        }

        return res.status(200).json({
            mycharity: user.selectedCharity,
            charityPercentage: user.charityPercentage,
        });

    } catch (error) {
        return res.status(500).json({
            message: error.message,
        });
    }
};
