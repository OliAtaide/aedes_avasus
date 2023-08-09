function myFunction(x) {
    if (x.matches) { // If media query matches
        $('.collapse').removeClass('collapse-horizontal')
    }
}

var x = window.matchMedia("(max-width: 600px)")
myFunction(x) // Call listener function at run time
x.addListener(myFunction) // Attach listener function on state changes