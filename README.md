# jquery-loadingimagethingy

yet another jquery plugin to put a loading icon and backdrop into a specified 
element. right now, it supports css3 and image animations.

latest version - 1.1

## usage

examples:

* $("body").loadingimagethingy({ animation: "circleg", imageWidth: 150, imageHeight: 32 }).loadingimagethingy("enable");
* $("#someDiv").loadingimagethingy("enable");
* $("body").loadingimagethingy("disable");

## options

* overlayBackgroundColor: "rgba(0,0,0,0.5)", // the background color of the overlay in any format you want
* imageType: "css3", // css3|image
* imagePath: "", // either null or the path as string
* imageHeight: 80, // image height as int (normally at 128, bubbling best set at 80, circleg at 32)
* imageWidth: 128, // image width as int (normally 128, circleg best at 150, floatingbarsg best at 103)
* animation: "bubbling", // floatingcircles|circularg|bubbling|circleg|floatingbarsg
* messageHeightOffset: 50, // hack to get text under positioned image
* message: "" // the text under the animation (if any)