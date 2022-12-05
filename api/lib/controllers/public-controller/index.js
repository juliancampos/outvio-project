const publicController = (req, res) => {
  try {
    return res.status(200).send({
      message: `Public route accessed: ${req.baseUrl}`
    });
  } catch (error) {
    res.status(500).send({ error })
  }
}

module.exports = publicController;