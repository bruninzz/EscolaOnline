import { Injectable } from '@angular/core';
import { Escola } from 'src/app/cadescolas/escola';
import { Resolve, RouterStateSnapshot, ActivatedRouteSnapshot } from '@angular/router';
import { Observable, of } from 'rxjs';
import { cadEscolaService } from '../cadescolas.service';

@Injectable({
  providedIn: 'root'
})
export class EscolaResolverGuard implements Resolve<Escola> {

  constructor(private service: cadEscolaService) {}


  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Escola> {
    if (route.params && route.params['id']) {
      return this.service.loadByID(route.params['id']);
    }

    return of({
      id: null,
      name: null,
      cidade : null,
      bairro: null
    });
  }
}
