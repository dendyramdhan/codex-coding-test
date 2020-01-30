const userService = require('../_services').user;

module.exports = async (req, res, next) => {
    if (req.params.id != req.user.sub) {
        next('You are not Autorized!');
    }

    next();
}