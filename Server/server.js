const express = require("express");
const cors = require("cors");
const path = require("path")
const app = express();
const bodyParser = require("body-parser");
const PORT = process.env.PORT || 3000;
const db = require("./DataBase");
const router = require("./routes")
require('dotenv').config();

// Mongodb Connection

db.connect()

// Middle Wire

app.use(bodyParser.json({ limit: "50mb" }));
app.use(bodyParser.urlencoded({ extended: true, limit: "50mb" }));


// cors 
app.use((req, res, next) => {
    req.header("Acces-control-Allow-Origin", "*")
    req.header("Acces-control-Allow-Headers", "*")
    next()
});
app.use(cors());

// Static
app.use("/uploads", express.static(path.join(__dirname, "/../uploads")));
app.use(express.static(path.join(__dirname, "/../Client/dist")));


// routes

app.use("/api", router)

app.get("*", (req, res) => {
    try {
        res.sendFile(path.join(`${__dirname}/../Client/dist/index.html`));
    } catch (e) {
        res.send("Oops! unexpected eroor")
    }
})


app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
})
