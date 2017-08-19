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
  parks: Array<{id: string, location: string, name: string, timezone: string}>;
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

  parseLocationString(location){
    let longPattern = /\((.+)\,/;
    var longArr = location.match(longPattern);
    var long = longArr[1];

    let latPattern = /\s(.+)\)/;
    let latArr = location.match(latPattern);
    let lat = latArr[1];
    return  {
      lat: lat,
      long: long
    }
  }

  parseDMS(input) {
    var parts = input.split(/[^\d\w]+/);
    var lat = this.ConvertDMSToDD(parts[0], parts[1], parts[2], parts[3]);
    var lng = this.ConvertDMSToDD(parts[4], parts[5], parts[6], parts[7]);
  }

  ConvertDMSToDD(degrees, minutes, seconds, direction) {
    var dd = degrees + minutes/60 + seconds/(60*60);

    if (direction == "S" || direction == "W") {
        dd = dd * -1;
    } // Don't do anything for N or E
    console.log(dd);
    return dd;
  }

  calculateDistance(user){
    let parks = this.parks;
    let userX = user.lat;
    let userY = user.long;
    let parksToUser = {};
    let earthRadius = 6371;
    for(var key in parks){
      let parkLocation = this.parseLocationString(parks[key].location);
      this.parseDMS(parkLocation.lat);
    }
    console.log(parksToUser);    
  }

  sortParksByDistance(parksToUser){
    for(var key in parksToUser){
      
    }
  }

  itemTapped(event, park) {
    this.navCtrl.push(Park, {
      parkId: park.id
    });
  }

}
