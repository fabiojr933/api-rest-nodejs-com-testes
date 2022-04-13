const accountService = require('../service/Account');
const account = new accountService();

class AccountController {
    async accountCreate(req, res) {
        try {
            await account.accountCreate(req.body, '*');
            return res.status(201).json(req.body);
        } catch (error) {
            return res.status(400).json({ error: error.message });
        }
    }
    async accountGetAll(req, res) {
        account.accountfindALL().then((result) => {
            res.status(200).json(result);
        });
    }
    async get(req, res) {
        account.find({ id: req.params.id }).then((result) => {
            res.status(200).json(result);
        });
    }
    async update(req, res) {
        try {
            await account.update(req.params.id, req.body);
            return res.status(200).json(req.body);
        } catch (error) {
            return res.status(400).json({ error: error.message });
        }
    }
    async remove(req, res) {
        account.remove(req.params.id).then(() => res.status(204).send())
    }
}
module.exports = AccountController;