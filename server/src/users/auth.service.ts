import { BadRequestException, Injectable, NotFoundException } from "@nestjs/common";
import { UsersService } from "./users.service";
import * as bcrypt from 'bcrypt';


@Injectable()
export class AuthService{
constructor(private userService : UsersService){}

async signup(email:string , password:string){
    const users = await this.userService.find(email);
    if(!users){
        throw new BadRequestException('Email aready exist')
    }

    const saltOrRounds = 10;
    const hash = await bcrypt.hash(password, saltOrRounds);
    return this.userService.create(email,hash);
    
}

async signin(email:string , password:string){
    const [user] = await this.userService.find(email)
    if(!user){
        throw new NotFoundException('User not found')
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if(isMatch){
        return user;
    }else{
        throw new BadRequestException('Invalid credentials');
    }
}
}