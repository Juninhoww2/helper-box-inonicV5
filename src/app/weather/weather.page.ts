import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { WeatherApiService } from '../../services/weatherApi.service';

interface CepForm {
  cep: number;
}

interface RegionData {
  state: string;
  city: string;
}

interface WeatherData {
  city: string;
  date: string;
  time: string;
  description: string;

}

@Component({
  selector: 'app-weather',
  templateUrl: './weather.page.html',
  styleUrls: ['./weather.page.scss'],
})
export class WeatherPage implements OnInit {

  public regionData: RegionData = { state: '', city: '' };
  public weatherData: WeatherData = {
    city: '',
    date: '',
    time: '',
    description: ''
  };

  constructor(
    private weatherApi: WeatherApiService,
    private router: Router
  ) {
  }

  ngOnInit() {
  }

  async searchCEP(data: CepForm) {
    const cep = data.cep;

    const url = `https://cep.awesomeapi.com.br/json/${cep}`;

    await this.weatherApi.fetchCepApi(url).then(response => this.regionData = response);
    console.log(this.regionData.city);

    const urlWeather = `https://cors-anywhere.herokuapp.com/https://api.hgbrasil.com/weather?key=e18ea6b4&city_name=${this.regionData.city},${this.regionData.state}`;

    this.searchWeatherForecast(urlWeather);
  }

  async searchWeatherForecast(url: string) {
    await this.weatherApi.fetchWeatherApi(url).then(response => this.weatherData = response.results);
  }


}
