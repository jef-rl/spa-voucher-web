import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardPageComponent } from './page/dashboard.component';
import { AppSharedModule } from '../_shared/app.shared.module';
import { PipesModule } from '../_shared/pipes/pipes.module';
import { ProcessService } from '../_shared/services/dashboard/process.service';
import { AppMaterialModule } from '../app.material.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    AppMaterialModule,
    PipesModule,
    AppSharedModule,
    DashboardRoutingModule
  ],
  declarations: [DashboardPageComponent],
  providers: [ProcessService]
})
export class DashboardModule {}
