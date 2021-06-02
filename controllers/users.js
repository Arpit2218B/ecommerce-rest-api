const users = {
    getUsers: (req, res) => {
        res.send('GET /users');
    },

    getUser:  (req, res) => {
        res.send(`GET /users/${req.params.id}`);
    }
}

module.exports = users;