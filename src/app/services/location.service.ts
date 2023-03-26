import { Injectable } from '@angular/core';
import {WebSocketSubject} from "rxjs/internal/observable/dom/WebSocketSubject";
import {webSocket} from "rxjs/webSocket";

@Injectable({
  providedIn: 'root'
})
export class LocationService {
  private webSocketSubject: WebSocketSubject<any>;

  constructor() {
    // Créer une instance de WebSocket et la connecter à l'URL de votre serveur Laravel
    this.webSocketSubject = webSocket('ws://localhost:8000/ws');

    // Écouter les événements de mise à jour de la position de l'utilisateur
    this.webSocketSubject.asObservable()
      .subscribe((event: any) => {
        if (event.type === 'locationUpdated') {
          // Mettre à jour la position de l'utilisateur dans votre application Angular
          const updatedUser = event.data.user;
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
}
