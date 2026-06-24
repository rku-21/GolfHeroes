import User from "../models/user.model.js";
import Draw from "../models/draw.model.js";
import Winner from "../models/winner.model.js";
import Subscription from "../models/subscription.model.js";

export const getDashboardStats = async (req, res) => {
    try {
        const totalUsers = await User.countDocuments();
        const activeSubscriptions = await Subscription.countDocuments({
            status: "active",
        });
        const totalDraws = await Draw.countDocuments();
        const totalWinners = await Winner.countDocuments();

        return res.status(200).json({
            totalUsers,
            activeSubscriptions,
            totalDraws,
            totalWinners,
        });

    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

export const getAllUsers = async (req, res) => {
    try {
        const users = await User.find().select("-password");

        return res.status(200).json(users);

    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

export const runDraw = async (req, res) => {
    try {
        // TODO: Implement draw logic

        return res.status(200).json({
            message: "Draw executed successfully",
        });

    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

export const getAllWinners = async (req, res) => {
    try {
        const winners = await Winner.find()
            .populate("user", "username email")
            .populate("draw");

        return res.status(200).json(winners);

    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

export const verifyWinner = async (req, res) => {
    try {
        const winner = await Winner.findByIdAndUpdate(
            req.params.id,
            {
                verificationStatus: "approved",
            },
            {
                new: true,
            }
        );

        if (!winner) {
            return res.status(404).json({
                message: "Winner not found",
            });
        }

        return res.status(200).json({
            message: "Winner verified successfully",
            winner,
        });

    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

export const getReports = async (req, res) => {
    try {
        const totalUsers = await User.countDocuments();
        const totalSubscriptions = await Subscription.countDocuments();
        const totalDraws = await Draw.countDocuments();
        const totalWinners = await Winner.countDocuments();

        return res.status(200).json({
            totalUsers,
            totalSubscriptions,
            totalDraws,
            totalWinners,
        });

    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};