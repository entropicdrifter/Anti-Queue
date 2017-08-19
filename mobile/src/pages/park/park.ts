import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Rides } from '../../service/Rides';

@Component({
    selector: 'park',
    templateUrl: 'park.html'
})

export class Park {
    park: string;
    icons: string[];
    items: Array<{ title: string, note: string, icon: string, color: string }>;
    loading: boolean;

    constructor(public navCtrl: NavController, public navParams: NavParams) {
        this.park = navParams.get('parkId');
        let ride = new Rides();
        this.loading = true;
        ride.getRides(this.park, res => {
            this.loading = false;
            console.log("Rides:", res);
            this.items = [];
            res = this.sortRidesAlphabetically(res);
            res && res.forEach((ride) => {
                let iconInfo = this.getIcon(ride.status);
                this.items.push({
                    title: ride.name,
                    note: ride.status === "Operating" ?
                        ride.waitTime + " minute wait" : ride.status,
                    icon: iconInfo.icon,
                    color: iconInfo.color
                });
            })
        })
    }

    sortRidesAlphabetically(rides){
        return rides.sort((a,b) => {
            let aText = a.name.toUpperCase();
            let bText = b.name.toUpperCase();
            return (aText < bText) ? -1 : (aText > bText) ? 1 : 0;
        })
    }

    getIcon(status) {
        switch (status) {
            case "Refurbishment":
                return {
                    icon: "ios-construct-outline",
                    color: "red"
                };
            case "Closed":
                return {
                    icon: "ios-close-circle-outline",
                    color: "red"
                };
            case "Down":
                 return {
                    icon: "ios-build-outline",
                    color: "red"
                };
            default:
                return {
                    icon: "ios-checkmark-circle-outline",
                    color: "green"
                };
        }
    }

    itemTapped(event, item) {
        // That's right, we're pushing to ourselves!
        this.navCtrl.push(Park, {
            item: item
        });
    }
}
