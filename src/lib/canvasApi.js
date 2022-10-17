const cache = {
    canvas: null,
    context: null
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
    init: (canvas) => {
        cache.canvas = canvas;
        cache.context = cache.canvas.getContext('2d')
    },

    getCanvas: () => {
        return cache.canvas;
    },

    clear: () => {
        cache.context.clearRect(0, 0, cache.canvas.width, cache.canvas.height);
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