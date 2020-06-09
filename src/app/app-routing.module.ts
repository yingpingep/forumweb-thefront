import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { NicknameComponent } from './nickname/nickname.component';


const routes: Routes = [
  { path: 'nickname', component: NicknameComponent },
  { path: '', pathMatch: 'full', redirectTo: 'nickname' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
