import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AlertModalService } from '../../shared/alert-modal.service';
import { Location } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { map, switchMap, exhaustMap } from 'rxjs/operators';
import { Cursos2Service } from '../cursos2.service';
import { Observable } from 'rxjs';
import { Escola } from 'src/app/cadEscolas/escola';
import { cadEscolaService } from 'src/app/cadEscolas/cadescolas.service';

@Component({
  selector: 'app-cursos-form',
  templateUrl: './cursos-form.component.html',
  styleUrls: ['./cursos-form.component.scss']
})
export class CursosFormComponent implements OnInit {
  formCurso: FormGroup;
  submitted = false;
  idEscola: number;
  escolas$: Observable<Escola[]>;
  
  constructor(
    private fb: FormBuilder,
    private escolaService : cadEscolaService,
    private service: Cursos2Service,
    private modal: AlertModalService,
    private location: Location,
    private route: ActivatedRoute,
    private router : Router
  ) {}

  ngOnInit() {
    this.escolas$ = this.escolaService.list();
    const curso = this.route.snapshot.data['curso'];
    console.log("Curso:"+ curso);
    //this.idEscola = 1;
    this.formCurso = this.fb.group({
      id: [curso.id],
      idEscola : [curso.idEscola],
      nome: [curso.nome, [Validators.required, Validators.minLength(3), Validators.maxLength(250)]]
    });
  }

  // updateForm(curso) {
  //   this.form.patchValue({
  //     id: curso.id,
  //     nome: curso.nome
  //   });
  // }

  hasError(field: string) {
    return this.formCurso.get(field).errors;
  }

  onSubmit() {
    this.submitted = true;
    console.log(this.formCurso.value);
    if (this.formCurso.valid) {
      console.log('submit');

      let msgSuccess = 'Curso criado com sucesso!';
      let msgError = 'Erro ao criar curso, tente novamente!';
      if (this.formCurso.value.id) {
        msgSuccess = 'Curso atualizado com sucesso!';
        msgError = 'Erro ao atualizar curso, tente novamente!';
      }

      this.service.save(this.formCurso.value).subscribe(
        success => {
          this.modal.showAlertSuccess(msgSuccess);
            this.location.back();
        },
        error => this.modal.showAlertDanger(msgError)
      );
    }
  }

  onCancel() {
    this.router.navigate(['/cursos']);
    this.submitted = false;
    this.formCurso.reset();
    
    // console.log('onCancel');
  }
}
