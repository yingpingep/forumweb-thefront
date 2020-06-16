import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { ScreenModeComponent } from './screen-mode.component';

export const screenRoutes: Routes = [
  {
    path: '',
    component: ScreenModeComponent
  }
];

@NgModule({
  declarations: [ScreenModeComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(screenRoutes)
  ]
})
export class ScreenModeModule { }
