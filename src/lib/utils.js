const utils = {
    convertHexToRgba: (hexWithHash) => {
        return {
            r: parseInt(hexWithHash.slice(1, 3), 16),
            g: parseInt(hexWithHash.slice(3, 5), 16),
            b: parseInt(hexWithHash.slice(5, 7), 16),
            a: (hexWithHash.length == 9) ? parseInt(hexWithHash.slice(7, 9), 16) : 255
        };
    }
};

module.exports = utils;