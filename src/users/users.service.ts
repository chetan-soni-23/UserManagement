/* eslint-disable @typescript-eslint/no-unused-vars */
import { Inject, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User, UserDocument } from '../schemas/user.schema';
import { UsersRepository } from 'src/repository/users.repository';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class UsersService {

  constructor(
    @Inject(UsersRepository) private userRepo: UsersRepository,
    @InjectModel(User.name) private readonly userModel: Model<UserDocument>,
  ) {}

  create(createUserDto: CreateUserDto): Promise<UserDocument> {
    const createdUser = this.userRepo.create(createUserDto);
    return createdUser;
  }

  findAll() {
    return this.userRepo.findAll();
  }

  findOne(id: string): Promise<User> {
    return this.userRepo.findOne(id);
  }

  findOneByEmail(email: string): Promise<UserDocument & User> {
    return this.userModel.findOne({email: email});
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    await this.userModel.updateOne({_id: id}, {
        ...updateUserDto
    })
  }

  async remove(id: string) {
    return await this.userModel.deleteOne({_id: id});
  }
}
