import User from "../models/user.model.js";
import Subscription from "../models/subscription.model.js"
import Score from "../models/scores.model.js"
import Draw from "../models/Draw.model.js"
import Winner from "../models/Winner.model.js"

export const getDashboard = async (req, res) => {
    try {
        const user = await User.findById(req.user._id)
            .populate("selectedCharity");

        const subscription = await Subscription.findOne({
            user: req.user._id,
            status: "active",
        });

        const scores = await Score.find({
            user: req.user._id,
        }).sort({ playedOn: -1 });

        const currentDraw = await Draw.findOne({
            status: "pending",
        });
        const totalDrawsPlayed = scores.length;

        const latestScore = scores.length ? scores[0].score : null;

        const averageScore =
            scores.length > 0
                ? scores.reduce((sum, s) => sum + s.score, 0) / scores.length
                : 0;

        const winnings = await Winner.find({
                user: req.user._id,
                paymentStatus: "paid",
            });

            const totalWinnings = winnings.reduce(
                (sum, winner) => sum + winner.prizeAmount,
                0
            );
            const totalDonated = winnings.reduce(
               (sum, winner) =>
                 sum + (winner.prizeAmount * user.charityPercentage) / 100,
                    0
                );

        res.status(200).json({
            user,
            subscription,
            currentDraw,
            latestScore,
            averageScore,
            totalDrawsPlayed,
            totalWinnings,
            totalDonated,
            totalScores: scores.length,
            recentScores: scores,
        });
    } catch (error) {
        res.status(500).json({
            message: error.message,
        });
    }
};



