import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CatsService } from './cats.service';
import { Cat, CatSchema } from './schemas/cat.schema';
import { User, UserSchema } from '../users/schemas/user.schema';
import { CatsResolver } from './cats.resolver';

@Module({
  imports: [MongooseModule.forFeature([
      { name: Cat.name, schema: CatSchema },
      { name: User.name, schema: UserSchema },
    ])],
  providers: [CatsService, CatsResolver],
})
export class CatsModule {}