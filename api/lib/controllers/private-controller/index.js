const privateController = (req, res) => {
  try {
    return res.status(200).send({
      message: 'Private route accessed!'
    });
  } catch (error) {
    res.status(500).send({ error })
  }
}

module.exports = privateController;