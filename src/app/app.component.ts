import { Component } from '@angular/core';
import {Router} from "@angular/router";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'frond-test';

  token = localStorage.getItem("token");





  logout() {
    localStorage.removeItem("token");
    window.location.href = '/'
  }
}
