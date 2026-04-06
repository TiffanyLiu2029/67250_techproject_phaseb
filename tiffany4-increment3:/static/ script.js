//Add a numeric addition:
var x = 5;
var y = 7;
var z = x + y;
console.log(z);

//Add a string concatenation:
var A = "Hello "; 
var B = "World!";
var C = A + B;
console.log(C);

//Define sumnPrint function 
function sumnPrint(x1, x2) {
    console.log(x1 + x2);
}

sumnPrint(x, y);
sumnPrint(A, B);

//compare C.length to z
if(C.length > z) {
    console.log(C);
} 
else if(C.length < z) {
    console.log(z);
} 
else {
    console.log("good job!");
}

//Arrays and loops 
L1 = ["Watermelon","Pineapple","Pear","Banana"];
L2 = ["Apple","Banana","Kiwi","Orange"];

function findTheBanana(arr1){
    /*for(var i = 0; i < arr1.length; i++) {
        if(arr1[i] === "Banana") {
            alert("Found Banana");
        }
    }*/
    arr1.forEach(function(item) {
        if(item === "Banana") {
            alert("Found Banana");
        }
    });
}

//findTheBanana(L1);
//findTheBanana(L2);

//Define the Function greeting()
var now = new Date();
var hours = now.getHours();

function greeting(x) {
    var greetText;

    if (x < 5 || x >= 20) {
        greetText = "Good night";
    } else if (x < 12) {
        greetText = "Good morning";
    } else if (x < 18) {
        greetText = "Good afternoon";
    } else {
        greetText = "Good evening";
    }

    // Only update if element exists
    var element = document.getElementById("greeting");
    if (element) {
        element.innerHTML = greetText;
    }
}

greeting(hours);

// Function to add the current year to the footer
function addYear() {
    var year = new Date().getFullYear();
    var element = document.getElementById("copyYear");

    if (element) {
        element.innerHTML = "© " + year + " MonoMuse. All rights reserved.";
    }
}