const Joi = require("joi");

const validate = (req, res, next) => {
  try {
    const schema = Joi.object({
      cities: Joi.array().items(Joi.string()).required(),
    });
    const { error } = schema.validate(req.body);
    if (error) {
      return res.status(400).json({
        status: "error",
        message: error,
      });
    }
    next();
  } catch (error) {
    console.log(error);
    res.status(400).json({
      status: "error",
      message: error,
    });
  }
};

module.exports = { validate };
