import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Location } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';

import { AlertModalService } from '../../shared/alert-modal.service';
import { map, switchMap, exhaustMap } from 'rxjs/operators';
import { cadEscolaService } from '../cadescolas.service';


@Component({
  selector: 'app-escolas-form',
  templateUrl: './escolas-form.component.html',
  styleUrls: ['./escolas-form.component.css']
})
export class EscolasFormComponent implements OnInit {

  formEscola: FormGroup;
  submitted = false;

  constructor(
    private fb: FormBuilder,
    private service: cadEscolaService,
    private modal: AlertModalService,
    private location: Location,
    private route: ActivatedRoute,
    private router : Router
  ) {}

  ngOnInit() {
    const escola = this.route.snapshot.data['escola'];

    this.formEscola = this.fb.group({
      id: [escola.id],
      name: [escola.name, [Validators.required, Validators.minLength(3), Validators.maxLength(250)]],
      cidade: [escola.cidade, [Validators.required, Validators.minLength(3), Validators.maxLength(250)]],
      bairro: [escola.bairro, [Validators.required, Validators.minLength(3), Validators.maxLength(250)]]
    });
  }

  hasError(field: string) {
    return this.formEscola.get(field).errors;
  }

  onSubmit() {
    this.submitted = true;
    console.log(this.formEscola.value);
    if (this.formEscola.valid) {
      console.log('submit');

      let msgSuccess = 'Escola criada com sucesso!';
      let msgError = 'Erro ao criar escola, tente novamente!';
      if (this.formEscola.value.id) {
        msgSuccess = 'Escola atualizada com sucesso!';
        msgError = 'Erro ao atualizar escola, tente novamente!';
      }

      this.service.save(this.formEscola.value).subscribe(
        success => {
          this.modal.showAlertSuccess(msgSuccess);
            this.location.back();
        },
        error => this.modal.showAlertDanger(msgError)
      );
    }
  }

  onCancel() {
    this.submitted = false;
    this.formEscola.reset();
    this.router.navigate(['/cadEscolas']);
  }
}
