let sportOne: string[] = ["Cricket", "Basket Ball", "Hockey"];

// adding elements at end
sportOne.push("Baz Ball");
sportOne.push("Foot Ball");

for(let sport of sportOne){
    console.log(sport);
}

// if example

for(let sport of sportOne){
    if(sport == "Cricket"){
        console.log("My Favourite: " + sport);
    }
    console.log(sport);
}