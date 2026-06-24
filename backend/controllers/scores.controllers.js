import Score from "../models/scores.model.js";

export const getMyScores = async (req, res) => {
    try {
        const scores = await Score.find({ user: req.user.id })
            .sort({ playedOn: -1 });

        return res.status(200).json(scores);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

export const addScore = async (req, res) => {
    try {
        const { score, playedOn } = req.body;

        if (score < 1 || score > 45) {
            return res.status(400).json({
                message: "Score must be between 1 and 45",
            });
        }

        const alreadyExists = await Score.findOne({
            user: req.user._id,
            playedOn,
        });

        if (alreadyExists) {
            return res.status(400).json({
                message: "Score for this date already exists",
            });
        }

        const totalScores = await Score.countDocuments({
            user: req.user._id,
        });

        if (totalScores >= 5) {
            const oldestScore = await Score.findOne({
                user: req.user._id,
            }).sort({ playedOn: 1 });

            await Score.findByIdAndDelete(oldestScore._id);
        }

        const newScore = await Score.create({
            user: req.user._id,
            score,
            playedOn,
        });

        return res.status(201).json({
            message: "Score added successfully",
            newScore,
        });

    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

export const updateScore = async (req, res) => {
    try {
        const score = await Score.findOneAndUpdate(
            {
                _id: req.params.id,
                user: req.user._id,
            },
            req.body,
            {
                new: true,
                runValidators: true,
            }
        );

        if (!score) {
            return res.status(404).json({
                message: "Score not found",
            });
        }

        return res.status(200).json({
            message: "Score updated successfully",
            score,
        });

    } catch (error) {
        return res.status(500).json({
            message: error.message,
        });
    }
};

export const deleteScore = async (req, res) => {
    try {
        const score = await Score.findOneAndDelete({
            _id: req.params.id,
            user: req.user._id,
        });

        if (!score) {
            return res.status(404).json({
                message: "Score not found",
            });
        }

        return res.status(200).json({
            message: "Score deleted successfully",
        });

    } catch (error) {
        return res.status(500).json({
            message: error.message,
        });
    }
};