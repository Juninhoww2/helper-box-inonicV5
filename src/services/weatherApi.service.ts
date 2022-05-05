import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

interface RegionData {
    state: string;
    city: string;
}

interface WeatherData {
    results: {
        city: string;
        date: string;
        time: string;
        description: string;
    };
}

@Injectable({
    providedIn: 'root',
})

export class WeatherApiService {

    constructor(private http: HttpClient) {

    }

    fetchCepApi(urlCepApi: string) {
        return this.http.get<RegionData>(urlCepApi).toPromise();
    }

    fetchWeatherApi(urlApiWeather: string) {
        return this.http.get<WeatherData>(urlApiWeather).toPromise();
    }

}
