import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainComponent } from './main/main.component';
import { RouterModule } from '@angular/router';
import { SingleComponent } from './single/single.component';
import { MultipleComponent } from './multiple/multiple.component';
import { AnswerComponent } from './answer/answer.component';
import { sharedModules } from '../shared-material/shared-material.module';

const routes = [{ path: '', component: MainComponent }];

@NgModule({
  declarations: [
    MainComponent,
    SingleComponent,
    MultipleComponent,
    AnswerComponent,
  ],
  imports: [CommonModule, RouterModule.forChild(routes), sharedModules],
})
export class GuestModule {}
