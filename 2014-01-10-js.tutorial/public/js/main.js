console.log("hello from javascript");
console.log("Sam Tucker");


//debugger

var a = 10;
var b = 20;
var c = a + b;
var d = c * b;
var e = d * (b - a);

var power = Math.pow(2,8);

console.log("e is " + e);
console.log("2 to the 8th power is " + power);

//example
//you have a room that is 8ft by 12ft
//write the code that will compute the area of the room and print that out to the console

var height = 8;
var width = 12;
var area = height * width;
console.log("The area is " + area + " feet");

//example
//you have a cylinder that is 5 x 7 x 9 inches.
//what is the volume cu in

var radius = 5;
var length = 9;
var area = Math.PI * Math.pow(radius, 2);
var volume = area * length;
var volMessage = "The volume of the cylinder is " + volume + " cubic inches."
console.log(volMessage);

//you are a painter
//you have an exceptionally large bucket of paint
//you cvan paint up to 29,572 square feet of surface without having to refill.
//ervery house you encounter has 3 rooms. here are the dimensions.
//3 x 5
//7 x 9
//6 x 2
//how many houses can you paint before running out of paint

var bucket = 29572;
var house = (3 * 5) + (7 * 9) + (6 * 2);
var refill=Math.round(bucket/house);
var refillMessage = "The bucket can be used to paint " + refill + " houses";
console.log(refillMessage);
 
//you are a spaceperson, with lasers
//you can travel the speed of light
//you are in the andromeda galaxy, somewhere
//you want to destroy justin bieber
//if you leave tomorrow
//when will you arrive to meet the bieb.
//
//i.e. how many days will it take you to get here
//
//2.5 million light years
//299,705 km s
//light year 9.5E12km

var lyears = 2500000;
var speed = 2.59e10;
var d = 9.5e12;
var distance = d * lyears;
var arrival = Math.floor(distance/speed);
var arrivalMessage = "I will arrive in " + arrival + " days";
console.log(arrivalMessage);

var firstName = prompt("What is your first name?");
console.log("Your first name is " + firstName);

var lastName = prompt("What is your last name?");
console.log("Your full name is " + firstName + " " + lastName);

//debugger
l = parseInt(prompt("Enter the length of your room"));
w = parseInt(prompt("Enter the width of your room"));
h = parseInt(prompt("Enter the height of your room"));
vol = l * w * h;
console.log("The volume of your room is " + vol);

var age = prompt("What is your age?");
if(age < 18)
  console.log("you cannot vote");
else
  console.log("you can vote");
