const utils = {
    convertHexToRgba: (hexWithHash) => {
        return {
            r: parseInt(hexWithHash.slice(1, 3), 16),
            g: parseInt(hexWithHash.slice(3, 5), 16),
            b: parseInt(hexWithHash.slice(5, 7), 16),
            a: (hexWithHash.length == 9) ? parseInt(hexWithHash.slice(7, 9), 16) : 255
        };
    },

    convertRgbaToHexA: (r, g, b, a) => {
        a = (a == 0) ? 0 : 255; // @TODO: alpha channel has some rounding issues
        var outParts = [
            r.toString(16),
            g.toString(16),
            b.toString(16),
            parseInt(a * 255).toString(16).substring(0, 2)
        ];

        // Pad single-digit output values
        outParts.forEach(function (part, i) {
            if (part.length === 1) {
                outParts[i] = '0' + part;
            }
        });


        return ('#' + outParts.join(''));
    }
};

module.exports = utils;