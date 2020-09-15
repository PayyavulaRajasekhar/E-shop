import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { SubStringPipe } from './substring.pipe';
import { FilterPipe } from './filter.pipe';
import { SpinnerComponent } from './spinner/spinner.component';

@NgModule({
  declarations: [
    SubStringPipe,
    FilterPipe,
    SpinnerComponent
  ],
  exports: [
    CommonModule,
    FormsModule,
    HttpClientModule,
    SubStringPipe,
    FilterPipe,
    SpinnerComponent
  ]
})
export class SharedModule { }
