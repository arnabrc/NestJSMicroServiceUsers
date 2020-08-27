import { Model, Document } from 'mongoose';

export interface UserModel extends Document {
    email: String;
    username: String;
    password: String;
    role: String;
    phoneNumber: Number;
}