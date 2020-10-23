const validator = require("validator")


function validateRegister(input) {
    let isError = {}
    if (validator.isEmpty(input.name)) {
        isError.name = {
            message: "name field is Emplty"
        }
        return isError
    }
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
    if (!validator.isLength(input.password, { min: 5 })) {
        isError.password = {
            message: "password should be grater then 5 charactor"
        }
    }

    if (input.password !== input.confirmPassword) {
        isError.confirmPassword = {
            message: "password is not matched"
        }
    }
    if (validator.isEmpty(input.confirmPassword)) {
        isError.confirmPassword = {
            message: "confirm password field is empty"
        }
    }

    return isError;

}


module.exports = validateRegister