import Draw from "../models/Draw.model.js";

export const getCurrentDraw = async (req, res) => {
    try {
        const currentDraw = await Draw.findOne({ status: "pending" });

        if (!currentDraw) {
            return res.status(404).json({
                message: "No current draw found",
            });
        }

        return res.status(200).json(currentDraw);
    } catch (error) {
        return res.status(500).json({
            message: error.message,
        });
    }
};

export const getDrawHistory = async (req, res) => {
    try {
        const draws = await Draw.find({ status: "completed" })
            .sort({ year: -1, month: -1 });

        return res.status(200).json(draws);
    } catch (error) {
        return res.status(500).json({
            message: error.message,
        });
    }
};