import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import fs from "fs";
import path from "path";

interface User {
  id: number;
  email: string;
  password: string;
}

const USERS_FILE_PATH = path.join(process.cwd(), "data", "users.json");

function readUsersFromFile(): User[] {
  const fileData = fs.readFileSync(USERS_FILE_PATH, "utf-8");
  return JSON.parse(fileData);
}


const SECRET_KEY = "123";


export async function POST(req: Request) {
  try {
    const { email, password } = await req.json(); 

    const users = readUsersFromFile(); 

    const existingUser = users.find((user) => user.email === email); 

    if (!existingUser) {
      return NextResponse.json({ error: "Invalid email or password" }, { status: 400 });
    }

   
    const isPasswordValid = await bcrypt.compare(password, existingUser.password);
    if (!isPasswordValid) {
      return NextResponse.json({ error: "Invalid email or password" }, { status: 400 });
    }

    const token = jwt.sign(
      { id: existingUser.id, email: existingUser.email },
      SECRET_KEY,
      { expiresIn: "1h" }
    );

    return NextResponse.json({ message: "Login successful", token }, { status: 200 });
  }catch (error: unknown) {
    if (error instanceof Error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }
    return NextResponse.json({ error: "Something went wrong" }, { status: 500 });
  }
  
}
