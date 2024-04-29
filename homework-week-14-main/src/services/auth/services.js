import bcrypt from "bcrypt";
import prisma from "@/lib/prisma";

export async function signUp(userData, callback) {
  try {
    const existingUser = await prisma.user.findUnique({
      where: {
        email: userData.email,
      },
    });

    if (existingUser) {
      callback(false);
    } else {
      const hashedPassword = await bcrypt.hash(userData.password, 10);
      const user = await prisma.user.create({
        data: {
          name: userData.name,
          email: userData.email,
          password: hashedPassword,
        },
      });
      callback(user);
    }
  } catch (error) {
    console.error("Error creating user:", error);
    callback(false);
  }
}

export async function signIn(email) {
  try {
    const user = await prisma.user.findUnique({
      where: {
        email: email,
      },
    });
    return user;
  } catch (error) {
    console.error("Error finding user:", error);
    return null;
  }
}

