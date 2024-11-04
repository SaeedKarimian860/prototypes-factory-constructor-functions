// String.prototype.yell = function () {
//     return `OMG!!!!! ${this.toUpperCase()}!!!! AGHGHGHG!`;
// };

// Array.prototype.pop = function() {
//     return "Sorry I want that element, I will never pop it off";
// }

function hex(r, g, b) {
  return "#" + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);
}
function rgb(r, g, b) {
  return `rgb(${r}, ${g}, ${b})`;
}

// hex(255, 100, 25);
// rgb(255, 100, 25);
// "#ff6419"
// "rgb(255, 100, 25)"

//This function makes and returns an object every time it is called.
//The resulting objects all follow the same "recipe".
// function makeColor(r, g, b) {
//   const color = {};
//   color.r = r;
//   color.g = g;
//   color.b = b;
//   color.rgb = function () {
//     const { r, g, b } = this;
//     return `rgb(${r}, ${g}, ${b})`;
//   };
//   color.hex = function () {
//     const { r, g, b } = this;
//     return ("#" + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1)
//     );
//   };
//   return color;
// }

// const firstColor = makeColor(35, 255, 150);
// firstColor.hex();
// firstColor.rgb();

// const black = makeColor(0, 0, 0);
// black.rgb();
// black.hex();

//This is a constructor function
//function Color(r, g, b) {
// this.r = r;
// this.g = g;
// this.b = b;
//}

//If you call it on its own like a regular function...
//Color(35, 60, 190); //undefined
//It returns undefined.

//THE NEW OPERATOR
//Creates a blank, plain JavaScript object;
//Links (sets the constructor of) this object to another object;
//Passes the newly created object from Step 1 as the this context;
//Returns this if the function doesn't return its own object;

// function Color(r, g, b) {
//   this.r = r;
//   this.g = g;
//   this.b = b;
// }

// Color.prototype.rgb = function () {
//     const { r, g, b } = this;
//     return `rgb(${r}, ${g}, ${b})`;
// };

// Color.prototype.hex = function() {
//   const {r, g, b} = this;
//   return '#' + ((1 << 28) + (r << 16) + (g << 8) + b).toString(16).slice(1);
// };

// Color.prototype.rgba = function(a=1.0) {
//   const { r, g, b } = this;
//   return `rgba(${r}, ${g}, ${b}, ${a})`;
// }

// const color1 = new Color(40, 255, 60);
// color1.hex();
// const color2 = new Color(0, 0, 0);
// color2.hex();

//JS CLASSES
// class Color {
//   constructor(r, g, b, name) {
//     this.r = r;
//     this.g = g;
//     this.b =b;
//     this.name = name;
//   }
//   innerRGB() {
//     const {r, g, b} = this;
//     return `${r}, ${g}, ${b}`;
//   }
//   rgb() {
//     return `rgb(${this.innerRGB()})`;
//   }
//   rgba(a=1.0) {
//     return `rgba(${this.innerRGB()}, ${a})`;
//   }
//   hex() {
//     const {r, g, b} = this;
//     return '#' + ((1 << 28) + (r << 16) + (g << 8) + b).toString(16).slice(1);
//   }
// }
// const red = new Color(255, 67, 89, 'tomato');
// const white = new Color(255, 255, 255, 'white');

class Color {
  constructor(r, g, b, name) {
    this.r = r;
    this.g = g;
    this.b = b;
    this.name = name;
    this.calcHSL();
  }
  innerRGB() {
    const { r, g, b } = this;
    return `${r}, ${g}, ${b}`;
  }
  rgb() {
    return `rgb(${this.innerRGB()})`;
  }
  rgba(a = 1.0) {
    return `rgba(${this.innerRGB()}, ${a})`;
  }
  hex() {
    const { r, g, b } = this;
    return "#" + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);
  }
  hsl() {
    const { h, s, l } = this;
    return `hsl(${h},${s}%, ${l}%)`;
  }
  fulllySaturated() {
    const { h, l } = this;
    return `hsl(${h},100%, ${l}%)`;
  }
  opposite() {
    const { h, s, l } = this;
    const newHue = (h + 180) % 360;
    return `hsl(${newHue},${s}%, ${l}%)`;
  }
  calcHSL() {
    let { r, g, b } = this;
    // Make r, g, and b fractions of 1
    r /= 255;
    g /= 255;
    b /= 255;

    // Find greatest and smallest channel values
    let cmin = Math.min(r, g, b),
      cmax = Math.max(r, g, b),
      delta = cmax - cmin,
      h = 0,
      s = 0,
      l = 0;
    if (delta == 0) h = 0;
    else if (cmax == r)
      // Red is max
      h = ((g - b) / delta) % 6;
    else if (cmax == g)
      // Green is max
      h = (b - r) / delta + 2;
    // Blue is max
    else h = (r - g) / delta + 4;

    h = Math.round(h * 60);

    // Make negative hues positive behind 360°
    if (h < 0) h += 360;
    // Calculate lightness
    l = (cmax + cmin) / 2;

    // Calculate saturation
    s = delta == 0 ? 0 : delta / (1 - Math.abs(2 * l - 1));

    // Multiply l and s by 100
    s = +(s * 100).toFixed(1);
    l = +(l * 100).toFixed(1);
    this.h = h;
    this.s = s;
    this.l = l;
  }
}
const red = new Color(255, 67, 89, "tomato");
red.hsl();
red.opposite();
red.rgba(0.3);
const white = new Color(255, 255, 255, "white");
