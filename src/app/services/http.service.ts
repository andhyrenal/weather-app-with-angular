import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class HttpService {
  constructor(private http: HttpClient) {}

  api_key = 'c0eb2c46d7116425fb3e101f4853289a';
  url = `https://api.openweathermap.org/data/2.5/weather`;
  forecast_url = `https://api.openweathermap.org/data/2.5/onecall`;

  getLocationService(lat: any, lon: any) {
    let params = new HttpParams()
      .set('lat', lat)
      .set('lon', lon)
      .set('units', 'metric')
      .set('appid', this.api_key);

    return this.http.get(this.url, { params });
  }

  getWeatherDataByCity(city: any) {
    let params = new HttpParams()
      .set('q', city)
      .set('units', 'metric')
      .set('appid', this.api_key);

    return this.http.get(this.url, { params });
  }

  getApi(url: string): void {
    this.http.get(url).subscribe((response) => {});
  }

  getForecast(lat: any, lon: any) {
    let params = new HttpParams()
      .set('lat', lat)
      .set('lon', lon)
      .set('exclude', 'hourly,minutely,alert,current')
      .set('units', 'metric')
      .set('appid', this.api_key);

    return this.http.get(this.forecast_url, { params });
  }
}
