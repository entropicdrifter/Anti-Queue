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
    title: string;
    items: Array<{ title: string, note: string, icon: string, color: string }>;

    constructor(public navCtrl: NavController, public navParams: NavParams) {
        // Let's populate this page with some filler content for funzies
        this.icons = ['flask', 'wifi', 'beer', 'football', 'basketball', 'paper-plane',
            'american-football', 'boat', 'bluetooth', 'build'];
        // If we navigated to this page, we will have an item available as a nav param
        this.park = navParams.get('parkId');
        this.title = navParams.get('title');
        // this.park = "KingsIsland";
        let ride = new Rides();
        ride.getRides(this.park, res => {
            console.log("Rides:", res);
            this.items = [];
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

    getWaitTimeString(waitTime) {
        return
    }

    getIcon(status) {
        switch (status) {
            case "Refurbishment":
                return {
                    icon: "ios-construct",
                    color: "red"
                };
            case "Closed":
                return {
                    icon: "ios-close-circle-outline",
                    color: "red"
                };
            case "Down":
                 return {
                    icon: "ios-build",
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
