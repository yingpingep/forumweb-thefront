import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainComponent } from './main/main.component';
import { RouterModule } from '@angular/router';
import { sharedModules } from '../shared-material/shared-material.module';
import { ReactiveFormsModule } from '@angular/forms';

const routes = [{ path: '', component: MainComponent }];

@NgModule({
  declarations: [MainComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    ReactiveFormsModule,
    sharedModules,
  ],
})
export class GuestModule {}
