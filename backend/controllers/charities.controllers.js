import Charity from "../models/charity.model.js";

export const getAllCharities = async (req, res) => {
    try {
        const user=req.user;
        const charities = await Charity.find({
             _id: { $ne: user.selectedCharity}}
        );

        return res.status(200).json(charities);
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
        if (!req.user.isAdmin) {
            return res.status(403).json({ message: "Access denied" });
        }

        const charity = await Charity.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true, runValidators: true }
        );

        if (!charity) {
            return res.status(404).json({ message: "Charity not found" });
        }

        return res.status(200).json({
            message: "Charity updated successfully",
            charity,
        });

    } catch (error) {
        return res.status(500).json({ message: error.message });
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
