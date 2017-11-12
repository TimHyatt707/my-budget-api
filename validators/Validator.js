const Yup = require("yup");

class Validator {
  constructor({ name, schemas }) {
    this._name = name;
    this._schemas = schemas;
  }
  async validate(input, schemaName) {
    try {
      const schema = this._schemas[schemaName];
      return await Yup.object(schema).validate(input);
    } catch (error) {
      return error;
    }
  }
}

module.exports = Validator;
