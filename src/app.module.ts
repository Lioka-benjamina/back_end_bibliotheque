import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { UserEntity } from './users/entities/user.entity';
import { MembresModule } from './membres/membres.module';
import { MembreEntity } from './membres/entities/membre.entity';
// import { ServeStaticModule } from '@nestjs/serve-static';
// import { join } from 'path';
import { LivresModule } from './livres/livres.module';
import { LivreEntity } from './livres/entities/livre.entity';

@Module({
  imports: [
    // ServeStaticModule.forRoot({
    //   rootPath : join(__dirname, "../public"),
    //   serveRoot : "/membre"
    // }),

    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: '',
      database: 'bibliotheque',
      entities: [UserEntity,MembreEntity,LivreEntity],
      // autoLoadEntities: true,
      synchronize: false,
      // migrationsRun : true 
    }),
    UsersModule,
    MembresModule,
    LivresModule,
    
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
