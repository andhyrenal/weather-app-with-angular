import { Component, OnInit } from '@angular/core';
import { HttpService } from 'src/app/services/http.service';

@Component({
  selector: 'app-weather',
  templateUrl: './weather.component.html',
  styleUrls: ['./weather.component.css'],
})
export class WeatherComponent implements OnInit {
  constructor(private httpService: HttpService) {}

  lat: any;
  lon: any;
  newlat: any;
  newlon: any;
  weather: any;
  newDate = new Date();
  forecast: any = [];
  data: any;
  icon = 'http://openweathermap.org/img/wn/';
  inputLocation: any;
  location: any;

  // get location by latitude and longitude
  getLocation() {
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition((success) => {
        this.lat = success.coords.latitude;
        this.lon = success.coords.longitude;

        this.httpService
          .getLocationService(this.lat, this.lon)
          .subscribe((data) => {
            this.weather = data;
          });

        this.httpService.getForecast(this.lat, this.lon).subscribe((data) => {
          this.data = data;
          this.futureForecast(this.data.daily);
        });
      });
    }
  }

  // get weather and forecast from city
  getCity() {
    this.location = this.inputLocation;
    this.httpService
      .getWeatherDataByCity(this.inputLocation)
      .subscribe((data) => {
        this.weather = data;
        this.lat = this.weather.coord.lat;
        this.lon = this.weather.coord.lon;
        this.httpService.getForecast(this.lat, this.lon).subscribe((data) => {
          this.data = data;
          this.futureForecast(this.data.daily);
          this.inputLocation = '';
        });
      });
  }

  futureForecast(data: any) {
    this.forecast = [];
    for (var i = 1; i < data.length; i++) {
      this.forecast.push(data[i]);
    }
  }

  ngOnInit(): void {
    this.getLocation();
  }
}
