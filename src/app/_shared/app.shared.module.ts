import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { AppMaterialModule } from './../app.material.module';
import { ArticleTileComponent } from './components/article-tile/article-tile.component';
import { BannerComponent } from './components/banner/banner.component';
import { BookingTileComponent } from './components/booking-tile/booking-tile.component';
import { UIDateComponent } from './components/date-ui/date-ui.component';
import { HeadlineTileComponent } from './components/headline-tile/headline-tile.component';
import { HomeArticleTileComponent } from './components/home-article-tile/home-article-tile.component';
import { OrderTileComponent } from './components/order-tile/order-tile.component';
import { ProcessTileComponent } from './components/process-tile/process-tile.component';
import { TaskTileComponent } from './components/task-tile/task-tile.component';
import { TitleComponent } from './components/title/title.component';
import { UserTileComponent } from './components/user-tile/user-tile.component';
import { VenueTileComponent } from './components/venue-tile/venue-tile.component';
import { VoucherTileComponent } from './components/voucher-tile/voucher-tile.component';
import { EditProcessComponent } from './forms/process/process.component';
import { EditTaskComponent } from './forms/task/task.component';
import { PipesModule } from './pipes/pipes.module';
import { ProcessService } from './services/dashboard/process.service';
import { TaskService } from './services/dashboard/task.service';
import { NewsService } from './services/news.service';
import { RedirectService } from './services/redirect.service';
import { UserService } from './services/user.service';

const APP_COMPONENTS = [
  UIDateComponent,
  HomeArticleTileComponent,
  ArticleTileComponent,
  HeadlineTileComponent,
  VenueTileComponent,
  BookingTileComponent,
  VoucherTileComponent,
  OrderTileComponent,
  TitleComponent,
  BannerComponent,
  TaskTileComponent,
  UserTileComponent,
  ProcessTileComponent,
];

const EDIT_COMPONENTS = [EditTaskComponent, EditProcessComponent];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    ReactiveFormsModule,
    AppMaterialModule,
    PipesModule
  ],
  exports: [APP_COMPONENTS, EDIT_COMPONENTS],
  declarations: [APP_COMPONENTS, EDIT_COMPONENTS],
  providers: [UserService, NewsService, TaskService, ProcessService, RedirectService]
})
export class AppSharedModule {}
