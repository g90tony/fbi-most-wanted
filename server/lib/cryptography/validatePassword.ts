const bcrypt = require("bcryptjs");

export default async function validatePassword(
  plainPassword: string,
  hashedPassword: string
) {
  return await bcrypt.compare(plainPassword, hashedPassword);
}
