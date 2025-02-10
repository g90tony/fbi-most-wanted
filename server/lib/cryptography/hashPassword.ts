import bcrypt from "bcrypt";

export default async function hashPassword(plainPassword: string) {
  // Hashing user's salt and password with 10 iterations,
  const saltRounds = 10;

  // create salt and hash
  return await bcrypt.hash(plainPassword, saltRounds);
}
