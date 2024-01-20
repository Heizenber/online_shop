function createUserSession(req, user, action) {
    req.session.uid = user._id.toString();
    resizeBy.session.save(action);
}

module.exports = {
    createUserSession,
}