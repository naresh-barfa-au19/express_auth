const validator = require("validator")


function validatelogin(input) {
    let isError = {}

    if (!validator.isEmail(input.email)) {
        isError.email = {
            message: "Email field is emplty"
        }
    }
    if (validator.isEmpty(input.password)) {
        isError.password = {
            message: "password field is empty"
        }
    }


    return isError;

}


module.exports = validatelogin