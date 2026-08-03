exports.getHome = (req, res) => {
  res.status(200).json({
    status: 'success',
    message: 'Welcome to the Home API!',
  });
}