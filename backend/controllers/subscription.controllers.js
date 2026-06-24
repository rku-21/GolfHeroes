import Subscription from "../models/subscription.model.js";

export const getMySubscriptions = async (req, res) => {
    try {
        const subscription = await Subscription.findOne({
            user: req.user._id,
        });

        if (!subscription) {
            return res.status(404).json({
                message: "No subscription found",
            });
        }

        return res.status(200).json(subscription);
    } catch (error) {
        return res.status(500).json({
            message: error.message,
        });
    }
};

export const addSubscription = async (req, res) => {
    try {
        const { plan, amount, expiryDate } = req.body;

        const existing = await Subscription.findOne({
            user: req.user._id,
            status: "active",
        });

        if (existing) {
            return res.status(400).json({
                message: "You already have an active subscription",
            });
        }

        const subscription = await Subscription.create({
            user: req.user._id,
            plan,
            amount,
            expiryDate,
            status: "active",
        });

        return res.status(201).json({
            message: "Subscription created successfully",
            subscription,
        });
    } catch (error) {
        return res.status(500).json({
            message: error.message,
        });
    }
};

export const cancelSubscription = async (req, res) => {
    try {
        const subscription = await Subscription.findOne({
            user: req.user._id,
            status: "active",
        });

        if (!subscription) {
            return res.status(404).json({
                message: "No active subscription found",
            });
        }

        subscription.status = "inactive";
        await subscription.save();

        return res.status(200).json({
            message: "Subscription cancelled successfully",
        });
    } catch (error) {
        return res.status(500).json({
            message: error.message,
        });
    }
};