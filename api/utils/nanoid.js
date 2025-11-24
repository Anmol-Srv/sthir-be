const { customAlphabet } = require('nanoid');

module.exports = (len = 16, onlyDigits = false) => {
  let alphabet = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  if (onlyDigits) {
    alphabet = '0123456789';
  }

  const nanoid = customAlphabet(alphabet, len);
  return nanoid();
};
