module.exports = (req, res) => {
  // const resjson = { code: 0 }
  const resjson = { code: 0 }
  if (req.$data) {
    resjson.data = req.$data
  }
  res.json(resjson)
}
