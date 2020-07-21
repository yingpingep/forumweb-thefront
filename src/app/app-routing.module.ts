import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { NicknameComponent } from './nickname/nickname.component';

export const routes: Routes = [
  { path: 'nickname', component: NicknameComponent },
  {
    path: 'dashboard',
    loadChildren: () =>
      import('./manager/manager.module').then((m) => m.ManagerModule),
  },
  {
    path: 'guest',
    loadChildren: () =>
      import('./guest/guest.module').then((m) => m.GuestModule),
  },
  { path: '', pathMatch: 'full', redirectTo: 'nickname' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
