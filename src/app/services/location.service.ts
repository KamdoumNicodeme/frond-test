import { Injectable } from '@angular/core';
import {WebSocketSubject} from "rxjs/internal/observable/dom/WebSocketSubject";
import {webSocket} from "rxjs/webSocket";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";
import {LocationU} from "./LocationU";

@Injectable({
  providedIn: 'root'
})
export class LocationService {
  private webSocketSubject: WebSocketSubject<any>;

  constructor(private http: HttpClient) {
    // Créer une instance de WebSocket et la connecter à l'URL de votre serveur Laravel
    this.webSocketSubject = webSocket('ws://localhost:8000/ws');

    // Écouter les événements de mise à jour de la position de l'utilisateur
    this.webSocketSubject.asObservable()
      .subscribe((event: any) => {
        if (event.type === 'locationUpdated') {
          // Mettre à jour la position de l'utilisateur dans votre application Angular
          const updatedUser = event.data.user;
          updatedUser.data.user.locations.longitude;
          updatedUser.data.user.locations.latitude;
          // ...
        }
      });
  }

  // Mettre à jour la position de l'utilisateur en envoyant une requête WebSocket au serveur Laravel
  public updateLocation(latitude: number, longitude: number): void {
    const payload = {
      type: 'updateLocation',
      data: {
        latitude,
        longitude
      }
    };
    this.webSocketSubject.next(payload);
  }




  private apiUrl = 'http://localhost:8000/api/locations';



  public  getLocations(): Observable<{ locations: LocationU[] }> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Authorization': 'Bearer ' + localStorage.getItem('token')
      })
    };
    return this.http.get<{ locations: LocationU[] }>(this.apiUrl, httpOptions);
  }


}
