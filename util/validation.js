function userDetailsAreValid(user) {
    return userCredentialsAreValid(user) &&
        !isEmpty(user.name) && !isEmpty(user.address.street) && 
        !isEmpty(user.address.postalcode) && !isEmpty(user.address.city)
}

function isEmpty(value) {
    return !value || value.trim() === "";
}

function userCredentialsAreValid(user) {
    return user.email && user.email.includes("@") &&
        user.password && user.password.trim().length >= 6
}

module.exports = userDetailsAreValid;
