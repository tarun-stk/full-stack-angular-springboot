var reviews = [5, 5, 4, 0, 2];
var total = 0;
for (var i = 0; i < reviews.length; i++) {
    console.log(reviews[i]);
    total += reviews[i];
}
// average
var avg = total / reviews.length;
console.log("avg: " + avg);
