import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import fs from 'fs';
import path from 'path';

const USERS_FILE_PATH = path.join(process.cwd(), 'data', 'users.json');
const SECRET_KEY = '123'; 

interface User {
  id: number;
  email: string;
  password: string;
}

function readUsersFromFile(): User[] {
  const fileData = fs.readFileSync(USERS_FILE_PATH, 'utf-8');
  return JSON.parse(fileData);
}

function writeUsersToFile(users: User[]) {
  fs.writeFileSync(USERS_FILE_PATH, JSON.stringify(users, null, 2));
}

export async function POST(req: Request) {
  const { email, password } = await req.json();

  const users = readUsersFromFile();

  const existingUser = users.find((user) => user.email === email);
  if (existingUser) {
    return NextResponse.json({ error: 'User already exists' }, { status: 400 });
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const newUser = { id: users.length + 1, email, password: hashedPassword };
  users.push(newUser);

  writeUsersToFile(users);

  const token = jwt.sign({ id: newUser.id, email: newUser.email }, SECRET_KEY, { expiresIn: '1h' });

  return NextResponse.json({ message: 'User registered successfully', token }, { status: 201 });
}
