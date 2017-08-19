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
    items: Array<{ title: string, note: string, icon: string }>;

    constructor(public navCtrl: NavController, public navParams: NavParams) {
        // Let's populate this page with some filler content for funzies
        this.icons = ['flask', 'wifi', 'beer', 'football', 'basketball', 'paper-plane',
            'american-football', 'boat', 'bluetooth', 'build'];
        // If we navigated to this page, we will have an item available as a nav param
        this.park = navParams.get('parkId');
        this.park = "KingsIsland";
        let ride = new Rides();
        ride.getRides("KingsIsland", res => {
            console.log("Rides:", res);
            this.items = [];
            debugger
            let rides = res.slice(0, 10);
            rides.forEach((ride)=>{
                this.items.push({
                    title: ride.name,
                    note: ride.status,
                    icon: this.icons[Math.floor(Math.random() * this.icons.length)]
                });
            })
        })
    }

    itemTapped(event, item) {
        // That's right, we're pushing to ourselves!
        this.navCtrl.push(Park, {
            item: item
        });
    }
}
