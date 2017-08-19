
interface RideApi {
    getParks(c: (() => void)): void;
    getRides(s: string, c: (() => void)): void;
    getOperationSchedule(s: string, c: (() => void)): void;
}

export class Rides implements RideApi {
    constructor() {}

    getParks(callback) {
        fetch('http://localhost:3000/getParks', {
            method: 'get'
        }).then(response => {
            response.json().then(data => {
                callback(data);
            })
        }).catch(function (err) {
           console.log(err.message);
        });
    }

    getRides(parkId: string, callback) {
        fetch('http://localhost:3000/getRides/'+parkId, {
            method: 'get'
        }).then(response => {
            response.json().then(data => {
                callback(data);
            })
        }).catch(function (err) {
           console.log(err.message);
        });
    }

    getOperationSchedule(parkId: string, callback) {
        fetch('http://localhost:3000/getParkOpeningTimes/' + parkId, {
            method: 'get'
        }).then(response => {
            response.json().then(data => {
                callback(data);
            })
        }).catch(function (err) {
           console.log(err.message);
        });
    }
}