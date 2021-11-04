const app = require("./app.js")

const port = process.env.PORT || 3000;

app.listen(port, () => console.log("server runing through 3000 port"))
