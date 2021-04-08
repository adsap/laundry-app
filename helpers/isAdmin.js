const isAdmin = function (req, res, next) {
  if (req.session.employeeId && req.session.employeeRole !== 'Admin') {
    const error = 'You have no power here!'
    res.redirect(`/employee/login?error=${error}`)
  }
  else {
    next()
  }
}

module.exports = isAdmin