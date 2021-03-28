/**
 * PixelArtLib
 * 
 * library for canvas manipulations
 */

let gridMap = {}, // map of griditems
	canvasEl = null, // ref to canvas
	gridItemsHorizontal = 8, // amount of grid items per row
	gridItemsVertical = 8; // amount of grid item rows

// config
let gridItemSize = 8, // width & height of grid item
	gridItemDefaultBgColor = '#eee', // grid item fill color
	gridItemDefaultBorderColor = '#333'; // grid item border

/**
 * calculate the grid
 */
const _generateGrid = function(){
    var _x = 0;
    var _y = 0;

	gridMap = {};

    for(var i = 0; i < gridItemsHorizontal * gridItemsVertical; i++){
        if(_x >= gridItemsHorizontal){
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
	
	// always redraw everything
	_context.clearRect(0,0, canvasEl.width, canvasEl.height);

	for(let _key in gridMap){
		var _gridItem = gridMap[_key],
			_posX = (_gridItem.coordX * gridItemSize),
			_posY = (_gridItem.coordY * gridItemSize);

		_gridItem.posX = _posX;
		_gridItem.posY = _posY;
	
		// for lines to to be 1px wide, this fix is needed
		// details: https://stackoverflow.com/questions/7530593/html5-canvas-and-line-width/7531540#7531540
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

/**
 * generate a download request
 * 
 * @param {string} pFileName 
 * @param {string} pImageType 
 */
const downloadImage = function(pFileName, pImageType){
	var link = document.createElement('a');

	var _data = canvasEl.toDataURL('image/'+pImageType); // base64-string of image data
	// TODO: ie11
	link.href = _data.replace(/^data:image\/[^;]/, 'data:application/octet-stream'); // replace type 
	link.download = pFileName + '.'+pImageType;

	link.click();
}

/**
 * color the selected grid item in desired color and drawmode
 * 
 * @param {string} pDrawMode 
 * @param {string} pColorCode 
 * @param {object} pGridStartItem 
 */
const applyDrawMode = function(pDrawMode, pColorCode, pGridStartItem){
	let _redraw = true;
	switch(pDrawMode){
		case 'simple': 
		if(pGridStartItem.bgcolor === pColorCode){
			_redraw = false;
		}else{
			pGridStartItem.bgcolor = pColorCode;
		}
		break;
		case 'floodfill': 
			_applyFloodFill(pColorCode, pGridStartItem.bgcolor, pGridStartItem);
		break;
		default: console.warn('unbekannter drawmode ' + pDrawMode);
	}

	if(_redraw){
		_drawGrid();
	}
}

/**
 * redraw the grid in desired size
 * 
 * @param {int} pGridSize 
 */
const setGridSize = function(pGridSize){
	gridItemsHorizontal = pGridSize;
	gridItemsVertical = pGridSize;

	// +1 for the right and bottom border
	canvasEl.width = gridItemsHorizontal * gridItemSize + 1;
	canvasEl.height = gridItemsVertical * gridItemSize + 1;

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

// API
export default {
    init: init,
	setGridSize: setGridSize,
	getGridItemFromPosition: getGridItemFromPosition,
	applyDrawMode: applyDrawMode,
	downloadImage: downloadImage
}