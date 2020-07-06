import { NgModule, InjectionToken } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard/dashboard.component';
import { RouterModule, Routes } from '@angular/router';
import { QuestionsComponent } from './questions/questions.component';
import { QuestionDesignCardComponent } from './question-design-card/question-design-card.component';
import { SharedMaterialModule } from '../shared-material/shared-material.module';
import { LocalStoredService } from './services/local-stored.service';
import { StoredService } from './services/stroed-service';

export const managerRoutes: Routes = [
  {
    path: '',
    component: DashboardComponent,
    children: [
      { path: '', component: QuestionsComponent },
      { path: 'questions', component: QuestionsComponent },
    ],
  },
  {
    path: 'screenmode',
    loadChildren: () =>
      import('./screen-mode/screen-mode.module').then(
        (m) => m.ScreenModeModule
      ),
  },
];

@NgModule({
  declarations: [
    DashboardComponent,
    QuestionsComponent,
    QuestionDesignCardComponent,
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(managerRoutes),
    SharedMaterialModule,
  ],
  providers: [
    {
      provide: StoredService,
      useClass: LocalStoredService,
    },
  ],
})
export class ManagerModule {}
