import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UserModel } from '../../models/user.model';

@Injectable()
export class UserService {
    constructor(
        @InjectModel('users') private readonly userModel: Model<UserModel>
    ) { }

    // Get Particular
    async findOne(username) {
        return await this.userModel.find({ "username": username.username } );
        // return await this.userModel.find({ username: username });
    }

    // Create 
    async add(user) {
        const createuser = new this.userModel(user);
        await createuser.save();
    }

    // Read All
    async getAll() {
        return await this.userModel.find();
    }

    // Read One
    async getOne(id) {
        return await this.userModel.find({ _id: id });
    }

    // Update
    async update(id, user) {
        await this.userModel.updateOne({ _id: id }, user);
    }

    // Delete
    async delete(id) {
        await this.userModel.deleteOne({ _id: id });
    }
}
