import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-googlmaps',
  templateUrl: './googlmaps.component.html',
  styleUrls: ['./googlmaps.component.scss']
})
export class GooglmapsComponent implements OnInit {

  title = 'My first AGM project';
  lat = 47.38957141;
  lng = 8.51593944;
  iconurl = '/assets/img/team/pin.png';
  maptypeid = 'roadmap';
  zoom = 13;
  scrollwheel =  false;
  styles = [
    {
      'featureType': 'administrative',
      'elementType': 'labels.text.fill',
      'stylers': [
        {
          'color': '#444444'
        }
      ]
    },
    {
      'featureType': 'landscape',
      'elementType': 'all',
      'stylers': [
        {
          'color': '#f2f2f2'
        }
      ]
    },
    {
      'featureType': 'poi',
      'elementType': 'all',
      'stylers': [
        {
          'visibility': 'off'
        }
      ]
    },
    {
      'featureType': 'road',
      'elementType': 'all',
      'stylers': [
        {
          'saturation': -100
        },
        {
          'lightness': 45
        }
      ]
    },
    {
      'featureType': 'road.highway',
      'elementType': 'all',
      'stylers': [
        {
          'visibility': 'simplified'
        }
      ]
    },
    {
      'featureType': 'road.arterial',
      'elementType': 'labels.icon',
      'stylers': [
        {
          'visibility': 'off'
        }
      ]
    },
    {
      'featureType': 'transit',
      'elementType': 'all',
      'stylers': [
        {
          'visibility': 'off'
        }
      ]
    },
    {
      'featureType': 'water',
      'elementType': 'all',
      'stylers': [
        {
          'color': '#009686'
        },
        {
          'visibility': 'on'
        }
      ]
    }
  ]
  ;

  constructor() {
  }

  ngOnInit() {
  }

}
