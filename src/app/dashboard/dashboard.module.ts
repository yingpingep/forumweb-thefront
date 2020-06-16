import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard.component';
import { RouterModule, Routes } from '@angular/router';
import { QuestionsComponent } from './questions/questions.component';
import { GuestModeComponent } from './guest-mode/guest-mode.component';

export const dashboardRoutes: Routes = [
  {
    path: '',
    component: DashboardComponent,
    children: [
      { path: '', component: QuestionsComponent },
      { path: 'questions', component: QuestionsComponent },
      { path: 'guestmode', component: GuestModeComponent }
    ]
  },
  {
    path: 'screenmode',
    loadChildren: () => import('./screen-mode/screen-mode.module').then(m => m.ScreenModeModule)
  }
];

@NgModule({
  declarations: [
    DashboardComponent,
    QuestionsComponent,
    GuestModeComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(dashboardRoutes)
  ]
})
export class DashboardModule { }
