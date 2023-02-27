const express = require("express")
const router = express.Router();


router.get("", async (req, res) => {

    return res.json({"Message":"Welcome to universities api project"})
})


module.exports = { indexRoutes: router}