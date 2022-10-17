const utils = require('./utils');

const cache = {
    canvas: null,
    context: null,
    globalConfig: null,
    pixelMap: null
};


const _addPathToContext = (pathList) => {
    cache.context.beginPath();
    
    pathList.forEach((pathPoint, index) => {
        if(index == 0) {
            cache.context.moveTo(pathPoint.x, pathPoint.y);
            return; // break;
        }

        cache.context.lineTo(pathPoint.x, pathPoint.y);
    });

    cache.context.lineTo(pathList[0].x, pathList[0].y);
    
    cache.context.closePath();
};

/**
 * API
 */
const canvasApi = {
    init: (canvas, globalConfig) => {
        cache.canvas = canvas;
        cache.context = cache.canvas.getContext('2d', {
            willReadFrequently: true
        });
        cache.globalConfig = globalConfig;
    },

    getCanvas: () => {
        return cache.canvas;
    },

    clear: () => {
        cache.context.clearRect(0, 0, cache.canvas.width, cache.canvas.height);
    },

    updateImageData: () => {
        const imageData = cache.context.getImageData(0, 0, cache.canvas.width, cache.canvas.height);

        imageData.data[0] = 39;
        imageData.data[1] = 175;
        imageData.data[2] = 96;
        imageData.data[3] = 255;

        cache.context.putImageData(imageData, 0, 0);

        console.log(imageData);
    },

    fillPixel: (gridItem, color) => {
        const rgba = utils.convertHexToRgba(color);

        const imageData = cache.context.getImageData(0, 0, cache.canvas.width, cache.canvas.height);
        const x = gridItem.coordX;
        const y = gridItem.coordY;
        const itemSize = cache.globalConfig.gridItemSize;
        const itemRowLength = itemSize * 4;
        const pixelRow = 4 * cache.canvas.width;
        let pixelStartRow = itemSize * y * pixelRow;
        let pixelPosition = pixelStartRow + (itemRowLength * x);
        let pixelPaintedPerItem = 0;
        let pixelRowsPainted = 0;

        let counter = 0;
        do {
            counter++;
            
            if(pixelPaintedPerItem >= itemSize) {
                pixelPaintedPerItem = 0;
                pixelPosition = pixelPosition + pixelRow - itemRowLength;
                pixelRowsPainted++;
            }

            imageData.data[pixelPosition] = rgba.r;
            imageData.data[pixelPosition + 1] = rgba.g;
            imageData.data[pixelPosition + 2] = rgba.b;
            imageData.data[pixelPosition + 3] = rgba.a;
            pixelPosition = pixelPosition + 4;

            pixelPaintedPerItem++;

            if(pixelRowsPainted >= itemSize) {
                break;
            }

        } while (counter < itemSize * itemSize); // only draw x*y times

        cache.context.putImageData(imageData, 0, 0);
    },
    

    fillPath: (pathList, fillStyle) => {
        _addPathToContext(pathList);

		cache.context.fillStyle = fillStyle;
		cache.context.fill();
    },

    strokePath: (pathList, strokeStyle) => {
        _addPathToContext(pathList);

        cache.context.lineWidth = 1;
		cache.context.strokeStyle = strokeStyle;
		cache.context.stroke();
    }

};


module.exports = canvasApi;