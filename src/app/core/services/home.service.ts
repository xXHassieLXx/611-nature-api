import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Place } from '../models/place.model';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Trail } from '../models/trail.model';

@Injectable({
  providedIn: 'root'
})
export class HomeService {
  constructor(private httpClient: HttpClient) { }

  // 🏞️ Get all places
  getAllPlaces(): Observable<Place[]> {
    console.log('Fetching all places from API...');
    return this.httpClient.get<Place[]>(`${environment.API_URL}/place`);
  }

  // 🔍 Get place by ID
  getPlaceById(id: number): Observable<Place> {
    console.log(`Fetching place with ID: ${id}`);
    return this.httpClient.get<Place>(`${environment.API_URL}/place/${id}`);
  }

  getAllTrails(): Observable<Trail[]> {
    console.log('Fetching all trails from API...');
    return this.httpClient.get<Trail[]>(`${environment.API_URL}/place/allTrails`);

  }
  analyzePlacesWithAI(): Observable<any> {
    return this.httpClient.get(`${environment.API_URL}/place/ai-analyze`, {
      responseType: 'text'
    }).pipe(
      map((res: string) => JSON.parse(res))
    );
  }
}


