const User = require('../service/Users');
const user = new User();

class UsersController {
    async findAll(req, res) {
        return user.findAll().then(result => {
            res.status(200).json(result);
        });
    }

    async createUser(req, res) {
        try {
            await user.save(req.body, '*');
            return res.status(201).json(req.body);
        } catch (error) {
            return res.status(400).json({ error: error.message });
        }
    }
}

module.exports = UsersController;