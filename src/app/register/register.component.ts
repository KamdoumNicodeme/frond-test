import {Component, OnInit} from '@angular/core';
import {AuthService} from "../services/auth.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  name!: string;
  email!: string;
  password!: string;
  latitude!: number;
  longitude!: number;

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit(): void {
  }

  register() {
    const location = {latitude: this.latitude, longitude: this.longitude};

    this.authService.register(this.name, this.email, this.password, location)
      .subscribe(
        (response) => {
          console.log(response);
          this.router.navigate(['/login']);
        },
        error => console.log('Error:', error)
      );
  }

}
