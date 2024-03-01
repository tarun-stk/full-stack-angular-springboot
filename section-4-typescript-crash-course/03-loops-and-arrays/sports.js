var sportOne = ["Cricket", "Basket Ball", "Hockey"];
// adding elements at end
sportOne.push("Baz Ball");
sportOne.push("Foot Ball");
for (var _i = 0, sportOne_1 = sportOne; _i < sportOne_1.length; _i++) {
    var sport = sportOne_1[_i];
    console.log(sport);
}
// if example
for (var _a = 0, sportOne_2 = sportOne; _a < sportOne_2.length; _a++) {
    var sport = sportOne_2[_a];
    if (sport == "Cricket") {
        console.log("My Favourite: " + sport);
    }
    console.log(sport);
}
