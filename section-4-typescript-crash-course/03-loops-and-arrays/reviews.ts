let reviews: number[] = [5,5,4,0,2];
let total: number = 0;
for(let i = 0; i < reviews.length; i ++){
    console.log(reviews[i]);
    total += reviews[i];
}

// average
let avg: number = total/reviews.length;

console.log("avg: " + avg);



