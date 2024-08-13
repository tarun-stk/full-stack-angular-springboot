import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map, of } from 'rxjs';
import { Country } from '../commons/country';
import { State } from '../commons/state';

@Injectable({
  providedIn: 'root'
})
export class FormService {

  countriesUrl: string = `http://localhost:8080/api/countries`;
  statesUrl: string = `http://localhost:8080/api/states`;

  constructor(private httpClient: HttpClient) { }

  getCredtitCardMonths(startMonth: number): Observable<number[]> {
    let data: number[] = [];
    for (let currentMonth = startMonth; currentMonth < 13; currentMonth++) {
      data.push(currentMonth);
    }
    // of converts normal data type to observable
    // so that subscribe to this method.
    return of(data);
  }

  getCredtitCardYears(startYear: number): Observable<number[]> {
    let data: number[] = [];
    for (let currentYear = startYear; currentYear < startYear + 10; currentYear++) {
      data.push(currentYear);
    }
    // of converts normal data type to observable
    // so that subscribe to this method.
    return of(data);
  }

  getCountries(): Observable<Country[]> {
    return this.httpClient.get<GetResponseCountries>(this.countriesUrl).pipe(
      map(
        response => response._embedded.countries
      )
    );
  }

  getStates(theCountryCode: string): Observable<State[]> {
    const searchStatesUrl = `${this.statesUrl}/search/findByCountryCode?code=${theCountryCode}`;
    return this.httpClient.get<GetResponseStates>(searchStatesUrl).pipe(
      map(
        response => response._embedded.states
      )
    );
  }

}

interface GetResponseCountries {
  // unwraps json from sring data rest _embedded entry
  _embedded: {
    countries: Country[];
  }

}

interface GetResponseStates {
  // unwraps json from sring data rest _embedded entry
  _embedded: {
    states: State[];
  }
}
