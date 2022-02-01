/// <reference types="@types/google.maps" />
import {Friend} from './Friend'
import {Party} from './Party'
import {CustomMap} from './CustomMap'
import {constants} from './constants'

//Create map
const custommap = new CustomMap('map');

// create party
const party = new Party();
//add marker for a party on the map
custommap.addMarker(party);

//create friends and calculate the distance from the party
let friends:Friend[] = [];

for (let i = 0 ; i < constants.FRIENDS_LIMIT; i++){
    //create a friend until the defined limit is reached
    friends[i] = new Friend();
    //add marker for each of the friends on the maps
    custommap.addMarker(friends[i]);
    //For the friend, save the distance from party
    friends[i].setDistance(custommap.getDistance(party.glatlng,friends[i]));

}

//Sort the distances to find the closest friend
friends.sort((a, b) => (a.dist >= b.dist) ? 1 : -1)

//keep track of closest first
let cnt = 1;
friends.forEach(function (friend:Friend) {
    //Update the pop up text indicating the order of friends
    friend.setClosest(cnt);
    cnt++;
});






