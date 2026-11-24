const express = require("express");
const app = express();
const port = process.env.PORT || 3000;

const teas = [
    { id: 1, name: "Earl Grey", category: "Black Tea" },
    { id: 2, name: "Sencha", category: "Green Tea" },
    { id: 3, name: "Chamomile", category: "Herbal Tea" },
    { id: 4, name: "English Breakfast", category: "Black Tea" },
    { id: 5, name: "Peppermint", category: "Herbal Tea" },
    { id: 6, name: "Matcha", category: "Green Tea" },
    { id: 7, name: "Silver Needle", category: "White Tea" },
    { id: 8, name: "Rooibos", category: "Herbal Tea" },
    { id: 9, name: "Tie Guan Yin", category: "Oolong Tea" },
    { id: 10, name: "Darjeeling", category: "Black Tea" }
];

app.get("/", (req, res) => {
    res.send("Hello Thomas Griesmayer!");
});

app.get("/teas", (req, res) => {
    res.json(teas);
});

app.get("/teas/:id", (req, res) => {
    const id = parseInt(req.params.id);
    const tea = teas.find(t => t.id === id);
    if (!tea) {
        res.status(404).json({error : "Tea not found!"});
    }
    res.json(tea);
});

app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});