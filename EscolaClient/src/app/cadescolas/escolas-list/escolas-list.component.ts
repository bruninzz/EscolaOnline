import { Component, OnInit, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Observable, empty, of, Subject, EMPTY } from 'rxjs';

import { cadEscolaService } from '../cadescolas.service';
import { Escola } from '../escola';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { catchError, switchMap, take } from 'rxjs/operators';
import { AlertModalService } from '../../shared/alert-modal.service';

@Component({
  selector: 'app-escolas-list',
  templateUrl: './escolas-list.component.html',
  styleUrls: ['./escolas-list.component.css']
})
export class EscolasListComponent implements OnInit {

  deleteModalRef: BsModalRef;
  @ViewChild('deleteModal', { static: true }) deleteModal;

  escolas: Observable<Escola[]>;
  error$ = new Subject<boolean>();

  escolaSelecionado: Escola;

  constructor(
    private escolaService : cadEscolaService,
    private alertService: AlertModalService,
    private modalService: BsModalService,
    private router: Router,
    private route: ActivatedRoute
    ) { 
  }

  ngOnInit() {
    //this.escolas = this.escolaService.getEscolas();
    //this.escolaService.emitirEscolaCriada.subscribe(escola => console.log(escola));
    this.onRefresh();
  }

  onRefresh() {
    this.escolas = this.escolaService.list().pipe(
      // map(),
      // tap(),
      // switchMap(),
      catchError(error => {
        console.error(error);
        // this.error$.next(true);
        this.handleError();
        return empty();
      })
    );
  }

  handleError() {
    this.alertService.showAlertDanger('Erro ao carregar escolas.');
  }

  onEdit(id) {
    console.log("Editar:"+id);
    this.router.navigate(['editarEscola', id], { relativeTo: this.route });
  }

  onDelete(escola) {
    this.escolaSelecionado = escola;
    // this.deleteModalRef = this.modalService.show(this.deleteModal, { class: 'modal-sm' });

    const result$ = this.alertService.showConfirm('Confirmacao', 'Tem certeza que deseja remover essa escola?');
    result$.asObservable()
    .pipe(
      take(1),
      switchMap(result => result ? this.escolaService.remove(escola.id) : EMPTY)
    )
    .subscribe(
      success => {
        this.onRefresh();
      },
      error => {
        this.alertService.showAlertDanger('Erro ao remover a escola.');
      }
    );
  }

  onConfirmDelete() {
    this.escolaService.remove(this.escolaSelecionado.id)
    .subscribe(
      success => {
        this.onRefresh();
        this.deleteModalRef.hide();
      },
      error => {
        this.alertService.showAlertDanger('Erro ao remover a escolas.');
        this.deleteModalRef.hide();
      }
    );
  }

  onDeclineDelete() {
    this.deleteModalRef.hide();
  }

}
