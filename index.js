const express = require("express");
const app = express();

app.use(express.json());

const PORT = 3000;
const { evaluateCardsFast } = require('phe');

function containsDuplicates(array) {
    return array.length !== new Set(array).size
}

const server = app.listen(PORT, () => console.log("server started"))

app.get("/eval7", (req,res) => {
    if(!req.query.hand || null == req.query.hand.match(/([AKQJT98765432][hdsc]){7}/) ) {
        res.status(400).json()
        return
        
    }
    const cards = req.query.hand.split(/(?=(?:..)*$)/)
    if(containsDuplicates(cards)) {
        res.status(400).json()
        return
    }
    const score = evaluateCardsFast(cards)
    res.status(200).json({ score: score })
})

module.exports = server