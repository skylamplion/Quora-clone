const express = require("express");
const router = express.Router();

const questionDB = require("../models/QuestionDB.js");

router.post("/", async (req, res) => {
    console.log(req.body);
    try {
        await questionDB.create({
            questionName: req.body.questionName,
            questionUrl: req.body.questionUrl,
            user: req.body.user

        }).then(() => {
            res.status(201).send({
                status: true,
                message: "Question added sucessfully"
            }).catch((err) => {
                res.status(400).send({
                    status: false,
                    message: "Bad format"
                })
            })
        })
    } catch (e) {
        res.status(500).send({
            status: false,
            message: "Eror while adding Question",
        })
    }
})


router.get("/", async (req, res) => {
    try {
        await questionDB.aggregate(
            [
                {
                    $lookup: {
                        from: "answers", //Collection to join
                        localField: "_id", //field from input document
                        foreignField: "questionId",
                        as: "allAnswers" //output array fild
                    }
                }
            ]
        ).exec().then((doc) => {
            res.status(200).send(doc);
        }).catch((err) => {
            res.status(500).send({
                status: false,
                message: "Unable to get the question details"

            })
        })
    } catch (e) {
        res.status(500).send({
            status: false,
            message: "Unexpact eror"

        })
    }
})


module.exports = router;