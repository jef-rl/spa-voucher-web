import { AdministratorGuard } from './../_shared/services/administrator.guard';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardPageComponent } from './page/dashboard.component';
import { TaskPageComponent } from './page/task/task.component';

const routes: Routes = [
  {
    // path: '',
    // canActivate: [AdministratorGuard],
    // children: [
    //   {
        path: '',
        canActivateChild: [AdministratorGuard],
        children: [
          {
            path: 'task/:taskId',
            component: TaskPageComponent,
          },
          {
            path: '',
            component: DashboardPageComponent
          }
        ]
    //   }
    // ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule {}
