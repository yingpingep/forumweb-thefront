import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainComponent } from './main/main.component';
import { RouterModule } from '@angular/router';
import { sharedMaterialModules } from '../shared-material/shared-material.module';
import { ReactiveFormsModule } from '@angular/forms';
import { QuestionAnswerCardComponent } from './question-answer-card/question-answer-card.component';

const routes = [{ path: '', component: MainComponent }];

@NgModule({
  declarations: [MainComponent, QuestionAnswerCardComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    ReactiveFormsModule,
    sharedMaterialModules,
  ],
})
export class GuestModule {}
