const express = require("express");
const bodyParser = require('body-parser')
require("./dataBase");
const passport = require('passport')
const userRoutes = require("./routes/userRoutes")
const app = express();

//body-parser middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
//using user router as middleware

// passport config
app.use(passport.initialize());
require('./utils/passport')(passport);
app.use("/user", userRoutes)


app.get("/", passport.authenticate('jwt', { session: false }), (req, res) => {
    res.send(`<h1>home page</h1>`)
})

app.listen(3000, () => {
    console.log("Server running at port : 3000")
})