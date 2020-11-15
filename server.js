const express = require("express");
const path = require("path");

const app = express();


app.use("/static", express.static(path.resolve("public", "static")));

app.get("/*", (req, res) => {
    res.sendFile(path.resolve("public", "index.html"));
});

app.listen(process.env.PORT || 5060, () => console.log("server running..."));