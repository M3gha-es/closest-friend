//Create 5 fake friends to attend a party

import faker from 'faker';
import {Mappable} from './CustomMap'
import { constants } from './constants';

//Class that provides a fake friend location
//Provides friend details: name, location
export class  Friend implements Mappable{
     name:string; //Name of friend
    location: { //location of friend
        lat: number;
        lng: number;
    };

    closest:number = 0; // Set the closest number;

    url:string = 'http://maps.google.com/mapfiles/ms/icons/orange-dot.png'; //Color for marker on google maps
    dist:number; // distance from party
    //Initialize the class properties
    constructor(){
        this.name = faker.name.firstName();
        this.location = {
            lat : parseFloat(faker.address.latitude(constants.LATITUDE_START, constants.LATITUDE_END)),
            lng: parseFloat(faker.address.longitude(constants.LONGITUDE_START,constants.LONGITUDE_END))
        }
    }
    // Implement the Mappable interface
    //Returns a string with friend details
    markerContent():string {
        return `<div>
            <h3>Hi! ${this.name}</h3>
            <h4> ${this.closest}</h4>
        </div>`;
    }

    //Update the info window of the marker using this value
    setClosest(val:number):void {
        this.closest = val;
    }

    //Update the distance
    setDistance(val:number):void {
        this.dist = val;
    }
}