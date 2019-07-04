import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FormsModule } from '@angular/forms';
import { DirectoryRoutingModule } from './directory-routing.module';
import { LayoutComponent } from './layout/layout.component';

@NgModule({
  declarations: [LayoutComponent],
  imports: [
    CommonModule,
    DirectoryRoutingModule,
    FormsModule
  ]
})
export class DirectoryModule { }
