let gridMap = {},
	canvasEl = null,
	gridSize = 8;

// config
let gridItemSize = 20,
	gridItemDefaultBgColor = '#ddd',
	gridItemDefaultBorderColor = '#000';

/**
 * generate the grid
 */
const _generateGrid = function(){
    var _x = 0;
    var _y = 0;

	gridMap = {};

    for(var i = 0; i < gridSize * gridSize; i++){
        if(_x >= gridSize){
            _x = 0;
            _y++;
        }

        gridMap[_x + ':' + _y] = {
            index: i,
            bgcolor: gridItemDefaultBgColor,
            bordercolor: gridItemDefaultBorderColor,
            coordX: _x,
            coordY: _y
        };

        _x++;
    }
}

/**
 * draw the grid
 */
const _drawGrid = function(){
	const _context = canvasEl.getContext('2d');
	
	_context.clearRect(0,0, canvasEl.width, canvasEl.height);

	for(let _key in gridMap){
		var _gridItem = gridMap[_key],
			_posX = (_gridItem.coordX * gridItemSize),
			_posY = (_gridItem.coordY * gridItemSize);

		_gridItem.posX = _posX;
		_gridItem.posY = _posY;
	
		// TODO
		var _lineFix = 0.5;
		
		_context.beginPath();
		_context.moveTo(_posX + _lineFix, _posY + _lineFix);
		_context.lineTo(_posX + gridItemSize + _lineFix, _posY + _lineFix);
		_context.lineTo(_posX + gridItemSize + _lineFix, _posY + gridItemSize + _lineFix);
		_context.lineTo(_posX + _lineFix, _posY + gridItemSize + _lineFix);
		_context.lineTo(_posX + _lineFix, _posY + _lineFix);
		_context.closePath();
	
		_context.strokeStyle = _gridItem.bordercolor;
		_context.fillStyle = _gridItem.bgcolor;
		_context.fill();
		_context.stroke();
	}	
}

/**
 * use floodfill algorithm to fill the grid.
 * 
 * recursively check every neighbouring griditem with the same color and recolor it.
 *  
 * @param {string} pColorToUse 
 * @param {string} pColorToOverride 
 * @param {object} pGridStartItem 
 */
function _applyFloodFill(pColorToUse, pColorToOverride, pGridStartItem){
	// already colored, ignore
	if(pGridStartItem.bgcolor === pColorToUse){
		return;
	}
	// recolor the griditem
	if(pGridStartItem.bgcolor === pColorToOverride){
		pGridStartItem.bgcolor = pColorToUse;
	}

	// check the neighbours
	var _x = pGridStartItem.coordX,
		_y = pGridStartItem.coordY;

	var _neighbourKeys = [
		[(_x - 1) + ':' + _y], // left
		[(_x - 1) + ':' + (_y - 1)], // top left
		[_x + ':' + (_y - 1)], // top
		[(_x + 1) + ':' + (_y - 1)], // top right
		[(_x + 1) + ':' + _y], // right
		[(_x + 1) + ':' + (_y + 1)], // bottom right
		[_x + ':' + (_y + 1)], // bottom
		[(_x - 1) + ':' + (_y + 1)], // bottom left
	];

	for(var _i = 0; _i < _neighbourKeys.length; _i++){
		var _gridItem = gridMap[_neighbourKeys[_i]];
		if(_gridItem && _gridItem.bgcolor === pColorToOverride){
			_applyFloodFill(pColorToUse, pColorToOverride, _gridItem);
		}
	}
}

/**
 * get grid item via pos
 * 
 * @param {number} pPosX 
 * @param {number} pPosY 
 */
const getGridItemFromPosition = function(pPosX, pPosY){
	for(var _key in gridMap){
		var _gridItem = gridMap[_key];

		// +1/-1, damit bei margin auch bei klick auf border gefärbt wird
		if(_gridItem.posX < pPosX + 1 && _gridItem.posX + gridItemSize > pPosX - 1 &&
			_gridItem.posY < pPosY + 1 && _gridItem.posY + gridItemSize > pPosY - 1
		){
			return _gridItem;
		}
	}

	return null;
}

const downloadImage = function(pFileName){
	var link = document.createElement('a');
	// console.log('sad');

	var _data = canvasEl.toDataURL('image/png');
	link.href = _data.replace(/^data:image\/[^;]/, 'data:application/octet-stream');
	link.download = pFileName + '.png';

	link.click();

}

const applyColor = function(pDrawMode, pColorCode, pGridStartItem){
	switch(pDrawMode){
		case 'simple': 
		pGridStartItem.bgcolor = pColorCode;
		break;
		case 'floodfill': 
			_applyFloodFill(pColorCode, pGridStartItem.bgcolor, pGridStartItem);
		break;
		default: console.warn('unbekannter drawmode ' + pDrawMode);
	}

	_drawGrid();
}

const setGridSize = function(pGridSize){
	gridSize = pGridSize;

	canvasEl.width = gridSize * gridItemSize + 1;
	canvasEl.height = gridSize * gridItemSize + 1;

	_generateGrid();
	_drawGrid();
}

/**
 * init the canvas
 * 
 * @param {<canvas>} pCanvas 
 */
const init = function(pCanvas){
    canvasEl = pCanvas;
}

export default {
    init: init,
	setGridSize: setGridSize,
	getGridItemFromPosition: getGridItemFromPosition,
	applyColor: applyColor,
	downloadImage: downloadImage
}