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
      maxZoom: 18
    }).addTo(map);
    //
    // //Récupérer les positions des utilisateurs à partir de l'API
    this.locationService.getLocations().subscribe(result => {
      const locations = result.locations;
      locations.map(location => {
        // Ajouter un marqueur pour chaque position d'utilisateur
        L.marker([location.latitude, location.longitude]).addTo(map)
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
