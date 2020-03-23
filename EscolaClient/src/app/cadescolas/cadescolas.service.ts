import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { CrudService } from '../shared/crud-service';
import { Escola } from './escola';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class cadEscolaService extends CrudService<Escola> {

  constructor(protected http: HttpClient) {
    super(http, `${environment.API}escolas`);
  }
}
