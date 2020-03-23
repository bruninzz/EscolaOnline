import { Component, OnInit } from '@angular/core';

import { AuthService } from './auth.service';
import { Usuario } from './usuario';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  usuario: Usuario = new Usuario();
  
  exibeUsuarioInvalido: boolean = false;

  constructor(private authService: AuthService) { }

  ngOnInit() {
    this.usuario.nome = "usuario@email.com";
  }

  fazerLogin(){
    //console.log(this.usuario);
    this.authService.fazerLogin(this.usuario);
    this.authService.mostrarMenuEmitter.subscribe(
      mostrar => this.exibeUsuarioInvalido = !mostrar
    );
  }

}
