let gridMap = {},
	canvasEl = null,
	gridSize = 8;

// config
let gridItemSize = 20,
	gridItemDefaultBgColor = 'ddd',
	gridItemDefaultBorderColor = '000';

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
	
		_context.strokeStyle = '#' + _gridItem.bordercolor;
		_context.fillStyle = '#' + _gridItem.bgcolor;
		_context.fill();
		_context.stroke();
	}	
}

function _applyFloodFill(pColorToUse, pColorToOverride, pGridStartItem){
	if(pGridStartItem.bgcolor === pColorToUse){
		return;
	}
	if(pGridStartItem.bgcolor === pColorToOverride){
		pGridStartItem.bgcolor = pColorToUse;
	}
	var _x = pGridStartItem.coordX,
		_y = pGridStartItem.coordY;
	// oberer Nachbar
	var _oberer = gridMap[_x + ':' + (_y - 1)];
	
	if(_oberer && _oberer.bgcolor === pColorToOverride){
		_applyFloodFill(pColorToUse, pColorToOverride, _oberer);
	}
	
	var _linker = gridMap[(_x - 1) + ':' + _y];
	
	if(_linker && _linker.bgcolor === pColorToOverride){
		_applyFloodFill(pColorToUse, pColorToOverride, _linker);
	}

	var _rechter = gridMap[(_x + 1) + ':' + _y];
	
	if(_rechter && _rechter.bgcolor === pColorToOverride){
		_applyFloodFill(pColorToUse, pColorToOverride, _rechter);
	}

	var _unterer = gridMap[_x + ':' + (_y + 1)];
	
	if(_unterer && _unterer.bgcolor === pColorToOverride){
		_applyFloodFill(pColorToUse, pColorToOverride, _unterer);
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
	applyColor: applyColor
}