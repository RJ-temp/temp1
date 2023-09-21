import { Body, Controller, Get, Post , Patch , Delete , Param , Query , Session } from '@nestjs/common';
import { CreateUserDto } from './dtos/create-user.dto';
import { UsersService } from './users.service';
import { UpdateUserDto } from './dtos/update-user.dto';
import { Serialize } from 'src/interceptors/serialize.intercept';
import { UserDto } from './dtos/user.dto';
import { AuthService } from './auth.service';
import { setEngine } from 'crypto';

@Controller('auth')
@Serialize(UserDto)   //Apply to whole controller
export class UsersController {
    constructor(private userService : UsersService, private authService:AuthService){}
    //Test routes for cookies
    // @Get('/color/:color')
    // setCookie(@Param('color') color:string , @Session() sesson:any){
    //     sesson.color = color;
    // }
    // @Get('/color')
    // getColor(@Session() session:any){
    //     return session.color;
    // }

    @Get('/who')
    whoAmI(@Session() session:any){
        return this.userService.findOne(session.userId);
    }
    @Post('/signout')
    signout(@Session() session:any){
        session.userId = null;
    }    
    @Post('/signup')
    async CreateUser(@Body() body:CreateUserDto , @Session() session:any){
        const user = await this.authService.signup(body.email , body.password);
        session.userId = user.id;
        return user;
    }
    @Post('/signin')
    async login(@Body() body:CreateUserDto , @Session() session:any){
        const user = await this.authService.signin(body.email , body.password);
        session.userId = user.id;
        return user;
    }
    // @UseInterceptors(new SerializeInterceptor(UserDto))
    // @Serialize(UserDto)
    @Get('/:id')
    findUser(@Param('id') id:string){
        return this.userService.findOne(parseInt(id));
    }
    @Get()
    findAllUser(@Query('email') email:string){
        return this.userService.find(email);
    }
    @Delete('/:id')
    deleteUser(@Param('id') id:string){
        this.userService.remove(parseInt(id));
    }
    @Patch('/:id')
    updateUser(@Param('id') id:string , @Body() body:UpdateUserDto){
        return this.userService.update(parseInt(id) , body);
    }
}
