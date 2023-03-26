import { Component,AfterViewInit } from '@angular/core';
import * as L from 'leaflet';
import { LocationService } from "../services/location.service";
import {LocationU} from "../services/LocationU";


@Component({
  selector: 'app-location',
  templateUrl: './location.component.html',
  styleUrls: ['./location.component.css']
})
export class LocationComponent /*implements AfterViewInit*/ {



  constructor(private locationService: LocationService) { }

  initializeMap(): void {
    // // Créer une carte Leaflet centrée sur une position par défaut
    const map = L.map('map').setView([51.505, -0.09], 13);

    // Ajouter une couche de tuiles OpenStreetMap
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors',
      maxZoom: 25
    }).addTo(map);


    const customIcon = L.icon({
      iconUrl: 'https://i.ibb.co/ftbRwZD/map-marker-2-xxl.png', // L'URL de l'icône personnalisée
      iconSize: [32, 32], // La taille de l'icône en pixels
    });
    //
    // //Récupérer les positions des utilisateurs à partir de l'API
    this.locationService.getLocations().subscribe(result => {
      const locations = result.locations;
      locations.map(location => {
        // Ajouter un marqueur pour chaque position d'utilisateur avec l'icône personnalisée
        L.marker([location.latitude, location.longitude], { icon: customIcon }).addTo(map)
          .bindPopup('User ' + location.user_id + '<br>Lat: ' + location.latitude + '<br>Long: ' + location.longitude);
      });
    });

  }



  ngOnInit(): void {
    this.initializeMap();
    //this.initMap()
  }

  // ngAfterViewInit(): void {
  //  // this.initializeMap();
  //  // this.initMap();
  // }

}
