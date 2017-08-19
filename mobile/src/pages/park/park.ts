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
    closedRides: Array<{ title: string, note: string, icon: string, color: string}>;
    showClosed: boolean;
    loading: boolean;

    constructor(public navCtrl: NavController, public navParams: NavParams) {
        this.park = navParams.get('parkId');
        this.title = navParams.get('title');
        let ride = new Rides();
        this.loading = true;
        this.closedRides = null;
        this.showClosed = false;
        ride.getRides(this.park, res => {
            this.loading = false;
            console.log("Rides:", res);
            this.items = [];
            res = this.sortRidesAlphabetically(res);
            var closed = 0;
            res && res.forEach((ride) => {
                let iconInfo = this.getIcon(ride.status);
                this.items.push({
                    title: ride.name,
                    note: ride.status === "Operating" ?
                        ride.waitTime + " minute wait" + (ride.fastPass && (ride.fastPassReturnTime !== undefined) ? "  FastPass: " + ride.fastPassReturnTime.startTime : "") : ride.status,
                    icon: iconInfo.icon,
                    color: iconInfo.color
                });
                if (ride.status !== "Operating") closed++
            })
            if(closed >= 20) {
                this.closedRides = [];
                var l = this.items.length
                for( var i = 0; i < l; i++) {
                    var ride = this.items[i];
                    if (ride.icon === "ios-close-circle-outline") {
                        this.items.splice(i, 1);
                        this.closedRides.push(ride);
                        i--;
                        l--;
                    }
                }
            }
            
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
