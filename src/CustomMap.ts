//Intruct other classes how to argument
//to 'addMarker' and content to marker info window
//Any class with location object literal can use this interface
import {constants} from './constants'

export interface Mappable {
    location:{
        lat:number,
        lng:number
    },
    markerContent(): string,
    url:string
}

//Class to create a googleMap object of type google.maps.Map
//Arguments: divId - Html ID provided
//Use googleMap to reference all google.maps.Map properties and methods
export class CustomMap{
    //Private variable inaccessible by others
    private googleMap:google.maps.Map;
    private previouslyOpenedWindow:google.maps.InfoWindow;

    constructor(divId:string, ){
       this.googleMap = new google.maps.Map(document.getElementById(divId), {
            zoom:constants.ZOOM,
            //center the map location to center of USA
            center:{
                lat:(constants.LATITUDE_START+constants.LATITUDE_END)/2,
                lng:(constants.LONGITUDE_START + constants.LONGITUDE_END)/2
            },
            //Disable zoom as we don't want user to move to another location
            zoomControl: false,
            //Restrict the maps to show only USA
            restriction: {
                latLngBounds: {
                  north: constants.LATITUDE_START,
                  south: constants.LATITUDE_END,
                  east: constants.LONGITUDE_START,
                  west: constants.LONGITUDE_END,
                }
            }
        });

    }
    //Create a marker. Any class with location literal
    //will be able to add marker
    addMarker(mappable: Mappable):void{
        //create marker object
        //Arguments: map (object created), position (where to place marker)
        const marker = new google.maps.Marker({
            map:this.googleMap,
            position: {
                lat: mappable.location.lat,
                lng:mappable.location.lng
            },
            icon:mappable.url

        });

        //Add a listener to marker
        //On click open window with information specific to user / company
        marker.addListener('click', ()=>{
            if(this.previouslyOpenedWindow != null){
                this.previouslyOpenedWindow.close();
            }

            const infoWindow = new google.maps.InfoWindow({
                content:mappable.markerContent()
            });

            infoWindow.open(this.googleMap, marker);
            this.previouslyOpenedWindow = infoWindow;
        });
    }
    //Close the last opened info window before opening a new one
     closePreviouslyOpenedWindow() {
        if (this.previouslyOpenedWindow) {
            this.previouslyOpenedWindow.close();
        }
    }

    //Get the distance between two locations
    //Arguments: Party object and Friend object
    //Returns distance between party location and friend location
    getDistance(partylatlng: google.maps.LatLng,  mappable: Mappable):number {
        return(google.maps.geometry.spherical.computeDistanceBetween(
            partylatlng,
            new google.maps.LatLng(mappable.location)));

    }

}