const utils = require('./utils');

const cache = {
    canvas: null,
    context: null,
    globalConfig: null,
    pixelMap: null,
    imageData: null
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

const _getImageData = () => {
    return cache.context.getImageData(0, 0, cache.canvas.width, cache.canvas.height)
}

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

    cacheImage: () => {
        cache.imageData = _getImageData();
    },

    restoreImage: () => {
        if(cache.imageData) {
            cache.context.putImageData(cache.imageData, 0, 0);
        }
    },

    getGridItemFromPosition: (posX, posY) => {
        return canvasApi.getGridItemFromCoords(
            Math.floor(Math.floor(posX) / cache.globalConfig.gridItemSize),
            Math.floor(Math.floor(posY) / cache.globalConfig.gridItemSize)
        );
    },

    /**
     * todo, maybe needs to be refactored...
     * 
     * get top left pixel of grid item for floodfill to operate
     * 
     * @param {*} coordX 
     * @param {*} coordY 
     */
    getGridItemFromCoords: (coordX, coordY) => {
          if(coordX < 0 || coordY < 0) {
            return null;
        }

        if(coordX >= cache.canvas.width / cache.globalConfig.gridItemSize || coordY >= cache.canvas.height / cache.globalConfig.gridItemSize) {
            return null;
        }

        const imageData = _getImageData();

        const pixelRow = 4 * cache.canvas.width;
        const itemSize = cache.globalConfig.gridItemSize;
        const pixelStartRow = itemSize * coordY * pixelRow;
        const itemRowLength = itemSize * 4;
        const pixelPosition = pixelStartRow + (itemRowLength * coordX);

        const r = imageData.data[pixelPosition];
        const g = imageData.data[pixelPosition + 1];
        const b = imageData.data[pixelPosition + 2];
        const a = imageData.data[pixelPosition + 3];

        return {
            index: pixelPosition,
            bgcolor: utils.convertRgbaToHexA("rgba(" + r + "," + g + "," + b + "," + a + ")"),
            bordercolor: null, // not needed
            coordX: coordX,
			coordY: coordY
        }

    },

    fillGridItem: (gridItem, color) => {
        const rgba = utils.convertHexToRgba(color);

        const imageData = _getImageData();
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