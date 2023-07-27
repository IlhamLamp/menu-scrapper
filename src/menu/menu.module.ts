import { Module } from '@nestjs/common';
import { MenuController } from './menu.controller';
import { ScrapperService } from './scrapper.service';

@Module({
  controllers: [MenuController],
  providers: [ScrapperService]
})
export class MenuModule {}
