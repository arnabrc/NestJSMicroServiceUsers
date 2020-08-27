import { MessagePattern } from '@nestjs/microservices/decorators';
import { Controller, UseGuards, Get, Post, Body, Param, Put, Delete, UseFilters } from '@nestjs/common';
import { UserService } from '../../services/user/user.service';
import { AuthGuard } from '../../guards/auth.guard';
import { UserModel } from '../../models/user.model';
import { HttpExceptionFilter } from '../../filters/http-exception.filter';

@Controller('user') 
@UseFilters(new HttpExceptionFilter())
export class UserController {
    constructor(
        private readonly userService: UserService
    ) { }

    @UseGuards(AuthGuard)
    @Get('greet')
    async greet(): Promise<string> {
        return 'Greetings authenticated user';
    }

    @MessagePattern({ role: 'user', cmd: 'get login' })
    getUser(data: any) {
      return this.userService.findOne({ username: data.username });
    }

    // Create 
    // @UseGuards(AuthGuard)
    @Post('add')
    async Add(@Body() user: UserModel) {
        // throw new ForbiddenException();
        return await this.userService.add(user);
    }

    // Read All
    @UseGuards(AuthGuard)
    @Get('all')
    async GetAll() {
        // throw new ForbiddenException();
        return await this.userService.getAll();
    }

    // Read One
    @UseGuards(AuthGuard)
    @Get('get/:id')
    async GetOne(@Param('id') id) {
        // throw new ForbiddenException();
        return await this.userService.getOne(id);
    }

    // Update
    @UseGuards(AuthGuard)
    @Put('update/:id')
    async Update(@Param('id') id, @Body() employee: any) {
        // throw new ForbiddenException();
        await this.userService.update(id, employee);
    }

    // Delete 
    @UseGuards(AuthGuard)
    @Delete('delete/:id')
    async Delete(@Param('id') id) {
        // throw new ForbiddenException();
        await this.userService.delete(id);
    }
}
