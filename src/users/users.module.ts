import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { UserEntity } from './entities/user.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from './strategy/jwt.strategy';

@Module({
  imports : [
    TypeOrmModule.forFeature([
      UserEntity
    ]),
    PassportModule.register({
      defaultStrategy : "jwt"
    }),
    JwtModule.registerAsync({
      useFactory : async ()=> ({
        secret : 'auth_bb',
        signOptions : {expiresIn : "10h"}
      })
    })
  ],
  controllers: [UsersController],
  providers: [UsersService , JwtStrategy],
})
export class UsersModule {}
