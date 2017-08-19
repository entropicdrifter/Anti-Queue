import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Rides } from '../../service/Rides';
import {Park} from '../park/park';
import { Geolocation } from '@ionic-native/geolocation';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  parks: Array<{id: string, location: string, name: string, timezone: string, lat: number, long: number}>;
  user: {lat: string, long: string};

  constructor(public navCtrl: NavController, private geolocation: Geolocation) {
    //EXAMPLE DATA GRABBING
    let ride = new Rides();
    this.parks = [];
    this.geolocation = geolocation;
    ride.getParks(res => {
      console.log(res)
      for(var key in res){
        let park = res[key];
        park.id = key;
        this.parks.push(park);
      }
      this.getCurrentLocation();
    });
  }

  getCurrentLocation(){
      this.geolocation.getCurrentPosition().then((resp) => {
        console.log(resp);
        let user = {
          lat: resp.coords.latitude,
          long: resp.coords.longitude
        }
        this.calculateDistance(user);
      }).catch((error) => {
        console.log('Error getting location', error);
      });
  }

  calculateDistance(user){
    let userX = user.lat;
    let userY = user.long;
     let parks = this.parks;
     let parksToUser = {};
     for(var key in parks){
        let parkX = parks[key].lat;
        let parkY = parks[key].long;
        var a = parkX - userX
        var b = parkY - userY
        var c = Math.sqrt( a*a + b*b );
        parksToUser[parks[key].name] = c;
        console.log(parksToUser);
        this.sortByDistance(parksToUser);
     }
  }

  sortByDistance(parksToUser){
    let distances = [];
    for(var key in parksToUser){
      let park = {
        name: key,
        distance: parksToUser[key]
      }
      distances.push(park);
    }
    distances.sort(function(a, b) {
        return a.distance - b.distance;
    });
    this.parks = distances;
    console.log(distances);
  }

  itemTapped(event, park) {
    this.navCtrl.push(Park, {
      parkId: park.id,
      title: park.name
    });
  }

}
