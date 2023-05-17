const { v4: uuidv4 } = require("uuid");

const deviceID = uuidv4();

/**
 * retorna uuid
 * @param {*}
 * @param {*}
 */
const generateUUID = async () => {
  const deviceID = uuidv4();

  return deviceID;
};

module.exports = { generateUUID };
