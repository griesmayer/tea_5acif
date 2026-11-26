const express = require("express");
const path = require("path");
const app = express();
const port = process.env.PORT || 3000;
app.use(express.static(path.join(__dirname, "public")));

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

app.post("/teas", (req, res) => {
    const name = req.body.name;
    const category = req.body.category;
    if (!name || !category) {
        return res.status(400).json({error: "Name and category is required!"});
    }
    const newId = teas.length ? teas[teas.length-1].id+1 : 1;
    const newTea = {id: newId, name, category};
    teas.push(newTea);
    res.status(201).json(newTea);
});

app.put("/teas/:id", (req, res) => {
    const id = parseInt(req.params.id);
    const {name, category} = req.body;
    if (!name || !category) {
        return res.status(400).json({error: "Name and category is required!"});
    }
    const pos = teas.findIndex(t => t.id === id);
    if (pos === -1) {
        res.status(404).json({error : "Tea not found!"});
    }
    teas[pos] = {id, name, category};
    return res.json(teas[pos]);
});

app.patch("/teas/:id", (req, res) => {
    const id = parseInt(req.params.id);
    const {name, category} = req.body;
    const tea = teas.find(t => t.id === id);
    if (!tea) {
        res.status(404).json({error : "Tea not found!"});
    }
    if (name != undefined) tea.name = name;
    if (category != undefined) tea.category = category;
    return res.json(tea);
});

app.delete("/teas/:id", (req, res) => {
    const id = parseInt(req.params.id);
    const pos = teas.findIndex(t => t.id === id);
    if (pos === -1) {
        res.status(404).json({error : "Tea not found!"});
    }
    teas.splice(pos, 1);
    return res.status(404).send();
});

app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});