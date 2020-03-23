import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { EscolasListComponent } from './escolas-list/escolas-list.component';
import { EscolasFormComponent } from './escolas-form/escolas-form.component';
import { EscolaResolverGuard } from './guards/escola-resolver.guard';


const routes: Routes = [
  { path: '', component: EscolasListComponent },
  {
    path: 'novaEscola',
    component: EscolasFormComponent,
    resolve: {
      escola: EscolaResolverGuard
    }
  },
  {
    path: 'editarEscola/:id',
    component: EscolasFormComponent,
    resolve: {
      escola: EscolaResolverGuard
    }
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CadescolasRoutingModule { }
