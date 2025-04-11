import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from './entities/user.entity';
import { Repository } from 'typeorm';
import * as bcrypt from "bcrypt"
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UserEntity)
    private  userRepo : Repository<UserEntity>,
    
    private jwtService : JwtService
  ){}

  async register(UserDto: CreateUserDto) {
    const verifyEmail = await this.userRepo.findOneBy({email : UserDto.email.trim()}) 
    if(verifyEmail) throw new BadRequestException("email déja existe")
    
    const setUser = this.userRepo.create({
      ...UserDto
    })

    setUser.passwordConfirm = await bcrypt.genSalt()
    setUser.password = await bcrypt.hash(setUser.password , setUser.passwordConfirm)

    const saveUser = await this.userRepo.save(setUser)

    const token = this.jwtService.sign({email : saveUser.email , role : saveUser.role}) 
    return {
      "token" : token
    };
  }

  async login(credentials : CreateUserDto){
    
    const { ...data } = credentials
    const getUser = await this.userRepo.findOneBy({email : data.email})
    // if(!getUser) throw new BadRequestException("email incorrect")
    if(!getUser) return "emaill incorrect"
    console.log("eeeeeeee");

    const getPassword = await bcrypt.compare(data.password , getUser.password)
    // if(!getPassword) throw new BadRequestException("mot de pass incorrect")
    if(!getPassword) return "mot de pass incorrect"

    const { email , role } = getUser

    const token = this.jwtService.sign({email : email , role : role})

    return {
      "token" : token
    }
  }

  findAll() {
    return `This action returns all users`;
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
