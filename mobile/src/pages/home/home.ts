import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Rides } from '../../service/Rides';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor(public navCtrl: NavController) {
    //EXAMPLE DATA GRABBING
    let ride = new Rides();
    ride.getParks(res => {
      console.log(res)
    });
        ride.getRides("KingsIsland", res=>{
      console.log("Rides:",res);
    })
    ride.getOperationSchedule("KingsIsland", res=>{
      console.log("SCHEDULE:",res);
    })
  }

}
