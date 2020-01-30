const userService = require('../_services').user;

module.exports = async (req, res, next) => {
    const user = await userService.getById(req.user.sub);

    if (!user || user.level !== 'admin') {
        next('You are not Autorized!');
    }

    next();
}