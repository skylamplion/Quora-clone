const express = require("express");
const router = express.Router();

const questionRouters = require("./Question.js");
const answerRouters = require("./Answer.js");

router.get("/",(req,res)=>{
    res.send("hello World")
})


router.use("/questions",questionRouters)
router.use("/answers",answerRouters)

module.exports = router;