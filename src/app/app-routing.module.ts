import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { NicknameComponent } from './nickname/nickname.component';


const routes: Routes = [
  { path: 'nickname', component: NicknameComponent },
  { path: 'dashboard', loadChildren: () => import('./dashboard/dashboard.module').then(m => m.DashboardModule) },
  { path: '', pathMatch: 'full', redirectTo: 'nickname' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
