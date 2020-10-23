const mongoose = require("mongoose");

url = "mongodb://localhost:27017/express_auth_app";

module.exports = mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true }, (err, connection) => {
    if (err) throw err;
    if (connection) {
        console.log("express_auth_app connected with mongoDB")
    }

})