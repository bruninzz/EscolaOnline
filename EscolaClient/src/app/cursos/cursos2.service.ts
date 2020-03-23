import { Injectable } from '@angular/core';
import { CrudService } from '../shared/crud-service';
import { Curso } from './curso';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { delay, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class Cursos2Service extends CrudService<Curso> {

  constructor(protected http: HttpClient) {
    super(http, `${environment.API}cursos`);
  }

  loadByID(id) {
    return null;
  }

  listEscola(idEscola) {
    return this.http.get<Curso[]>(`${environment.API}cursos`)
      .pipe(
        delay(2000),
        tap(console.log)
      );
  }
}
