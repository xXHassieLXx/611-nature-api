import { Component, OnInit } from '@angular/core';
import { Place } from '../../core/models/place.model';
import { HomeService } from '../../core/services/home.service';
import * as mapboxgl from 'mapbox-gl';
import { environment } from '../../../environments/environment';
import { AIAnalyze } from '../../core/models/ai-analize.model';

@Component({
  selector: 'app-places',
  templateUrl: './places.component.html',
  styleUrl: './places.component.scss',
  standalone: false
})
export class PlacesComponent implements OnInit {
  places: Place[] = [];
  showGalleryMap: { [key: number]: boolean } = {};
  showTrailsMap: { [key: number]: boolean } = {};
  loading: boolean = false;
  modalVisible = false;
  analyze: AIAnalyze | null = null; 


  constructor(private homeService: HomeService) { }

  ngOnInit(): void {
    this.homeService.getAllPlaces().subscribe({
      next: (data) => {
        this.places = data;

        // After places load, init mini maps
        this.places.forEach(place => {
          setTimeout(() => { // use timeout to ensure div exists
            this.initMiniMap(place);
          }, 0);
        });
      },
      error: (err) => console.error('Error loading places:', err)
    });
  }





  toggleGallery(placeId: number) {
    const place = this.places.find(p => p.id === placeId);
    if (!place) return;

    console.log(`🟡 Clicked place ID: ${placeId}`);
    console.log('📷 Current photos:', place.photos);
    console.log('🏕️ Current amenities:', place.amenities);
    console.log('🗺️ Current trails:', place.trails);

    if (!place.photos || place.photos.length === 0 || !place.amenities || !place.trails) {
      this.homeService.getPlaceById(placeId).subscribe({
        next: (fullPlace) => {
          console.log('🔍 Full place data from API:', fullPlace);

          place.photos = fullPlace.photos;
          place.amenities = fullPlace.amenities; // refresh amenities
          place.trails = fullPlace.trails;       // add trails

          this.showGalleryMap[place.id] = true;
        },
        error: (err) => console.error('❌ Error fetching full place:', err)
      });
    } else {
      this.showGalleryMap[place.id] = !this.showGalleryMap[place.id];
    }

    // Make sure trails toggle matches gallery toggle
    this.showTrailsMap[placeId] = this.showGalleryMap[place.id];
    console.log('🗺️ Trails for place ID', placeId, ':', place.trails);
  }


  initMiniMap(place: Place) {
    const containerId = 'mini-map-' + place.id;
    if (document.getElementById(containerId)) {
      const map = new mapboxgl.Map({
        accessToken: environment.MAPBOX_TOKEN,
        container: containerId,
        style: 'mapbox://styles/mapbox/streets-v11',
        center: [place.longitude, place.latitude],
        zoom: 13
      });

      new mapboxgl.Marker()
        .setLngLat([place.longitude, place.latitude])
        .addTo(map);
    }
  }

  analyzePlaces() {
    console.log('🤖 Analyzing places with AI...');
    this.modalVisible = false;
    this.loading = true;
    this.homeService.analyzePlacesWithAI().subscribe({
      next: (res)=>{
        console.log('✅ AI Analysis Result:', res);
        this.loading = false;
        this.analyze = res;
        this.modalVisible = true;
      },
      error: (err)=>{
        console.error('❌ Error analyzing places with AI:', err);
        this.loading = false;
      }
    });
  }




}
