import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CadescolasRoutingModule } from './cadescolas-routing.module';
import { EscolasFormComponent } from './escolas-form/escolas-form.component';
import { EscolasListComponent } from './escolas-list/escolas-list.component';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [EscolasFormComponent, EscolasListComponent],
  imports: [
    CommonModule,
    CadescolasRoutingModule,
    ReactiveFormsModule
  ]
})
export class CadescolasModule { }
