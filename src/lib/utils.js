const utils = {
    convertHexToRgba: (hexWithHash) => {
        return {
            r: parseInt(hexWithHash.slice(1, 3), 16),
            g: parseInt(hexWithHash.slice(3, 5), 16),
            b: parseInt(hexWithHash.slice(5, 7), 16),
            a: (hexWithHash.length == 9) ? parseInt(hexWithHash.slice(7, 9), 16) : 255
        };
    },

    convertRgbaToHexA(rgba, forceRemoveAlpha = false) {
        return "#" + rgba.replace(/^rgba?\(|\s+|\)$/g, '') // Get's rgba / rgb string values
          .split(',') // splits them at ","
          .filter((string, index) => !forceRemoveAlpha || index !== 3)
          .map(string => parseFloat(string)) // Converts them to numbers
          .map((number, index) => index === 3 ? Math.round(number * 255) : number) // Converts alpha to 255 number
          .map(number => number.toString(16)) // Converts numbers to hex
          .map(string => string.length === 1 ? "0" + string : string) // Adds 0 when length of one number is 1
          .join("") // Puts the array to togehter to a string
      }
};

module.exports = utils;