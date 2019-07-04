import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DirectoryRoutingModule } from './directory-routing.module';
import { LayoutComponent } from './layout/layout.component';

@NgModule({
  declarations: [LayoutComponent],
  imports: [
    CommonModule,
    DirectoryRoutingModule
  ]
})
export class DirectoryModule { }
