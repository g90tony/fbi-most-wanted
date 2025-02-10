import bcrypt from "bcrypt";

export default async function validatePassword(
  plainPassword: string,
  hashedPassword: string
) {
  return await bcrypt.compare(plainPassword, hashedPassword);
}
