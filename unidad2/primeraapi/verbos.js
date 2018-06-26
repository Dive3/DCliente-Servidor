var express = require("express");

var app = express();

app.get("/", (req, res) => {
    res.send("Utilizaste el verbo GET");
});

app.post("/", (req, res) => {
    res.send("Utilizaste el verbo POST");
});

app.put("/", (req, res) => {
    res.status(400).send("Utilizaste el verbo PUT");
});

app.delete("/",(req, res) => {
    res.status(500).send("Utilizaste el verbo DELETE");
});

app.listen(3000);