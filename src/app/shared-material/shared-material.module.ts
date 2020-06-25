import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { ObserversModule } from '@angular/cdk/observers';

export const sharedModules = [
  DragDropModule,
  MatButtonModule,
  MatIconModule,
  ObserversModule,
];

@NgModule({
  declarations: [],
  imports: [CommonModule, ...sharedModules],
  exports: [...sharedModules],
})
export class SharedMaterialModule {}
