import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard.component';
import { RouterModule } from '@angular/router';
import { QuestionsComponent } from './questions/questions.component';
import { GuestModeComponent } from './guest-mode/guest-mode.component';




@NgModule({
  declarations: [
    DashboardComponent,
    QuestionsComponent,
    GuestModeComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild([
      {
        path: '',
        component: DashboardComponent,
        children: [
          { path: '', component: QuestionsComponent },
          { path: 'questions', component: QuestionsComponent },
          { path: 'guestmode', component: GuestModeComponent }
        ]
      }
    ])
  ]
})
export class DashboardModule { }
