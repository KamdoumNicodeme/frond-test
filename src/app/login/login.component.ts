import { Component } from '@angular/core';
import {AuthService} from "../services/auth.service";
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  email!: string;
  password!: string ;

  constructor(private authService: AuthService, private router: Router) { }

  login() {
    let token: string; // Déclaration de la variable token

    this.authService.login(this.email, this.password)
      .subscribe(
        (response) => {
          token = response.token; // Affectation de la valeur du token
          localStorage.setItem("token",token);
          // Si le token est présent, rediriger l'utilisateur vers la page de localisation
          this.router.navigate(['/location']);
        },
        error => {
          // Si une erreur s'est produite, afficher un message d'erreur
          console.log('Error:', error);
          alert('La connexion a échoué. Veuillez vérifier vos identifiants.');
        }
      );
  }

}
