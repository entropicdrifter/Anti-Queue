import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Rides } from '../../service/Rides';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  parks: Array<{location: string, name: string, timezone: string}>;

  constructor(public navCtrl: NavController) {
    //EXAMPLE DATA GRABBING
    let ride = new Rides();
    this.parks = [];
    ride.getParks(res => {
      console.log(res)
      for(var key in res){
        let park = res[key];
        park.id = key;
        this.parks.push(park);
      }
    });
  }

  itemTapped(event, item) {
    // That's right, we're pushing to ourselves!
    console.log(item);
  }

}
