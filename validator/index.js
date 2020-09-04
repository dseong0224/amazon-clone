exports.userSignupValidator = (req, res) => {
  req.check("name", "Name is required").notEmpty(); //checks if Name has a value
  req
    .check("email", "Email must be between 3 to 32 characters")
    .matches(/.+\@.+\../) //regex for @ symbol
    .withMessage("Email must contain @")
    .isLength({
      min: 4,
      max: 32,
    });
  req.check("password", "password is required").notEmpty(); //checks if password has a value
  req
    .check("password")
    .isLength({ min: 6 })
    .withMessage("Password must contain at least 6 characters")
    .matches(/\d/) //regex any numeric value - digit
    .withMessage("Password must contain a number");

  const errors = req.validationErrors(); //uses package method validationErrors to construct custom error messages
  if (errors) {
    const firstError = errors.map((error) => error.msg)[0];
    return res.status(400).json({ error: firstError });
  }

  next();
};
