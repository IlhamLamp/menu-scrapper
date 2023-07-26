import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ScrapperModule } from './scrapper/scrapper.module';
import { MenusController } from './menus/menus.controller';
import { MenusService } from './menus/menus.service';

@Module({
  imports: [ScrapperModule],
  controllers: [AppController, MenusController],
  providers: [AppService, MenusService],
})
export class AppModule {}
