import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  latitudeA!: number;
  latitudeB!: number;
  longitudeA!: number;
  longitudeB!: number;
  airDistance!: number;
  
  latitudeAErr= false;
  latitudeBErr= false;
  longitudeAErr= false;
  longitudeBErr= false;

  title = 'DistanceCalculator';
  buttonClicked = false;

  calculateDistance(): void{
    if (this.latitudeA < -90 || this.latitudeA > 90){
      this.latitudeAErr = true;
    }
    if (this.latitudeB < -90 || this.latitudeB > 90){
      this.latitudeBErr = true;
    }
    if (this.longitudeA < -90 || this.longitudeA > 90){
      this.longitudeAErr = true;
    }
    if (this.longitudeB < -90 || this.longitudeB > 90){
      this.longitudeBErr = true;
    }

    if (this.longitudeBErr || this.longitudeAErr || this.latitudeBErr || this.latitudeAErr)
      return
      
    this.buttonClicked = true;
    const earthRadius = 6371; // Distance in kilometers
    const dLat = (this.latitudeB - this.latitudeA) * (Math.PI / 180);
    const dLon = (this.longitudeB - this.longitudeA) * (Math.PI / 180);
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(this.latitudeA * (Math.PI / 180)) *
      Math.cos(this.latitudeB * (Math.PI / 180)) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    this.airDistance = earthRadius * c;
  }

  removeResult(){
    this.buttonClicked = false;
  }
  resetLatAErr(){
    this.latitudeAErr = false;
  }
  resetLatBErr(){
    this.latitudeBErr = false;
  }
  resetLonAErr(){
    this.longitudeAErr = false;
  }
  resetLonBErr(){
    this.longitudeBErr = false;
  }
}
