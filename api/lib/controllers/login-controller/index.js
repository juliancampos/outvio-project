const { createToken } = require('../../commons/token-service');

const loginController = async (req, res) => {
  try {
    const { username } = req.body;
    if (!username) {
      return res.status(400).send({
        message: 'Username not informed!'
      });
    }

    const token = createToken(username);
    return res.status(200).send({ token });
  } catch (error) {
    res.status(500).send({ error });
  }
}

module.exports = loginController;
