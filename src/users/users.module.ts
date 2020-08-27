import {ClientsModule} from '@nestjs/microservices/module';
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { userSchema } from '../schemas/user.schema';
import { UserController } from '../controllers/user/user.controller';
import { UserService } from '../services/user/user.service';
import { Transport } from '@nestjs/microservices/enums';
import { APP_FILTER } from '@nestjs/core';
import { HttpExceptionFilter } from '../filters/http-exception.filter';

@Module({
    imports: [
        MongooseModule.forFeature([{
            name: 'users',
            schema: userSchema,
            collection: 'users'
        }]),
        MongooseModule.forRoot("mongodb://localhost:27017/employeenesttutorial"),
        // MongooseModule.forRoot("mongodb+srv://ArnabRC:A_RC@kol-90@cluster0.oguj3.mongodb.net/employeenesttutorial?retryWrites=true&w=majority")
        ClientsModule.register([{
            name: 'AUTH_CLIENT',
            transport: Transport.TCP,
            options: {
                host: 'localhost',
                port: 4000
            }
        }])
    ],
    controllers: [UserController],
    providers: [
        UserService,
        {
            provide: APP_FILTER,
            useClass: HttpExceptionFilter,
        }
    ]
})
export class UsersModule {}
