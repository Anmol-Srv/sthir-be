const convertCookieStringToObject = (str = '') => {
  str = str.split('; ');
  const result = {};
  for (const i in str) {
    if (Object.prototype.hasOwnProperty.call(str, i)) {
      const cur = str[i].split('=');
      // eslint-disable-next-line prefer-destructuring
      result[cur[0]] = cur[1];
    }
  }
  return result;
};

module.exports = {
  convertCookieStringToObject,
};