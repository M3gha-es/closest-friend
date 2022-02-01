//Create a fake party location for the friends to attend
import faker from 'faker'; //fake data
import { constants } from './constants';
import {Mappable} from './CustomMap'//Show on google map

//Class that provides a fake party location
//Provides party details: name, start time, location
export class Party implements Mappable{
    name:string;//Name of place where the party is held
    startDate: Date; // start of party
    location: { //location of party
        lat: number;
        lng: number;
    }
    url:string = 'http://maps.google.com/mapfiles/ms/icons/green-dot.png'; // color for maps marker
    glatlng:google.maps.LatLng; // useful in calculating distance for friends
    //Initialize the class properties

    constructor(){
        this.name = faker.company.companyName();
        this.startDate = faker.date.soon();
        this.location = {
            lat : parseFloat(faker.address.latitude(constants.LATITUDE_START, constants.LATITUDE_END)),
            lng: parseFloat(faker.address.longitude(constants.LONGITUDE_START,constants.LONGITUDE_END))

        }
        this.glatlng = new google.maps.LatLng(this.location);
    }
    // Implement the Mappable interface
    //Returns a string with party details
    markerContent():string {
        return `<div>
        <h3>Party at: ${this.name}</h3>
        <h4>Starts on: ${this.startDate}</h4>
        </div>`;
    }
}