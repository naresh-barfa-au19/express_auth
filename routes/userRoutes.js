const express = require("express");
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require("jsonwebtoken")
const passport = require("passport")

const Users = require("./../userSchema/userSchema");

//validation register function require here
const validateRegister = require("./../validations/validateRegister");
// validation login function require here
const validatelogin = require("./../validations/validateLogin")


router.post('/register', async (req, res) => {
    const isError = validateRegister(req.body);
    if (Object.keys(isError).length === 0) {

        const userData = await Users.findOne({ email: req.body.email });
        console.log("user data from data base", userData);
        if (userData && userData.email === req.body.email) {
            return res.send({
                status: "fail",
                message: "email already exit... login"
            })
        } else {
            const hashPassword = bcrypt.hashSync(req.body.password, 12);


            const registerData = new Users({
                name: req.body.name,
                email: req.body.email,
                password: hashPassword,
            });
            registerData.save();
            console.log("user registered here")
            res.send({
                status: "success",
                message: "User registerd successfully"
            })
        }
    } else {
        res.status(400).send(isError)
    }
})

//after registering the user we can be proceed for login page

router.post("/login", async (req, res) => {
    console.log("in login page")
    //validate login user
    isError = validatelogin(req.body)
    if (Object.keys(isError).length === 0) {

        // first we will check weather user exits or not in dataBase
        const userData = await Users.findOne({ email: req.body.email })
        // if email not in data base
        if (userData !== null) {

            // now compare enterd password with hash password
            const result = await bcrypt.compare(req.body.password, userData.password)
            //now check user data  is equal to requested data from login form
            if (result) {

                if (userData && userData.email === req.body.email) {
                    //now we can aalow to login user 
                    // generate the token 
                    const payload = {
                        id: userData.id,
                        email: userData.email,
                        password: userData.password,
                    }
                    const token = await jwt.sign(payload, "NeshBarfa", { expiresIn: "1h" })

                    const userToken = {
                        status: "success",
                        message: " login successfully",
                        token: "Bearer " + token
                    }
                    console.log(token);
                    return res.status(200).send(userToken)


                }
            } else {
                return res.status(400).send({
                    status: "fail",
                    message: "wrong password"
                })
            }
        } else {
            return res.status(400).send({
                status: "fail",
                message: "please register your self"
            })
        }
    } else {
        return res.status(400).send({
            status: "fail",
            message: "re-login please ....",
            error: isError,
        });
    }

})


router.get("/deshBoard", passport.authenticate("jwt", { session: false }), (req, res) => {

    res.status(200).json({
        message: "successful deshBoard",
        name: req.user.name,
        email: req.user.email,
        userId: req.user.id
    })
})


// exporting router to use in index file

module.exports = router
