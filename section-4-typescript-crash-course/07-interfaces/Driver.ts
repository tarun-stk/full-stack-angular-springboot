import {CricketCoach} from './CricketCoach';
import {GolfCoach} from './GolfCoach';
import {Coach} from './Coach';


let myCricketCoach = new CricketCoach();
let myGolfCoach = new GolfCoach();

// create an array of coaches
let coaches: Coach[] = [];

// add coaches
coaches.push(myCricketCoach);
coaches.push(myGolfCoach);

for(let tempCoaches of coaches){
    console.log(tempCoaches.getDailyWorkout());
}
