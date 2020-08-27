import * as mongoose from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

export const userSchema = new mongoose.Schema({
    email: String,
    username: String,
    password: String,
    role: String,
    phoneNumber: Number
}, {
    versionKey: false
});

/* @Schema()
export class User extends mongoose.Document {
    @Prop()
    email: String; 
    
    @Prop()
    username: String;

    @Prop()
    password: String;

    @Prop()
    role: String;

    @Prop()
    phoneNumber: Number;
}

export const userSchema = SchemaFactory.createForClass(User); */
