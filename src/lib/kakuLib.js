/**
 * kakuLib
 *
 * library for canvas manipulations
 */

import DownloadJs from 'downloadjs';

let gridMap = {}, // map of griditems
	gridMapCache = {}, // cache of maps for some drawing methods
	canvasEl = null; // ref to canvas

// config
let gridItemSize,
	gridItemDefaultBgColor,
	gridItemDefaultBorderColor,
	gridItemBorderVisible,
	gridItemsHorizontal,
	gridItemsVertical;

let history = [];

/**
 * calculate the grid
 */
const _generateGrid = function () {
	var _x = 0;
	var _y = 0;

	gridMap = {};

	for (var i = 0; i < gridItemsHorizontal * gridItemsVertical; i++) {
		if (_x >= gridItemsHorizontal) {
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

	history.push(_cloneGridMap());
}

/**
 * draw the grid
 */
const _drawGrid = function () {
	const _context = canvasEl.getContext('2d');

	// always redraw everything
	_context.clearRect(0, 0, canvasEl.width, canvasEl.height);

	for (let _key in gridMap) {
		var _gridItem = gridMap[_key],
			_posX = (_gridItem.coordX * gridItemSize),
			_posY = (_gridItem.coordY * gridItemSize);

		_gridItem.posX = _posX;
		_gridItem.posY = _posY;

		_context.beginPath();
		_context.moveTo(_posX, _posY);
		_context.lineTo(_posX + gridItemSize, _posY);
		_context.lineTo(_posX + gridItemSize, _posY + gridItemSize);
		_context.lineTo(_posX, _posY + gridItemSize);
		_context.lineTo(_posX, _posY);
		_context.closePath();

		_context.fillStyle = _gridItem.bgcolor;
		_context.fill();
	}

	if(gridItemBorderVisible){
		console.log(gridItemSize, canvasEl.height);
		for(var _y = 1; _y * gridItemSize < canvasEl.height; _y++){
			var _linePosY = gridItemSize * _y;
			// for lines to to be 1px wide, this fix is needed
			// details: https://stackoverflow.com/questions/7530593/html5-canvas-and-line-width/7531540#7531540
			_linePosY = Math.floor(_linePosY) + 0.5;

			_context.beginPath();
			_context.moveTo(0, _linePosY);
			_context.lineTo(canvasEl.width, _linePosY);
			_context.lineTo(0, _linePosY);
			_context.closePath();

			_context.lineWidth = 1;
			_context.strokeStyle = _gridItem.bordercolor;
			_context.stroke();
		}
		for(var _x = 1; _x * gridItemSize < canvasEl.height; _x++){
			var _linePosX = gridItemSize * _x;
			// for lines to to be 1px wide, this fix is needed
			// details: https://stackoverflow.com/questions/7530593/html5-canvas-and-line-width/7531540#7531540
			_linePosX = Math.floor(_linePosX) + 0.5;

			_context.beginPath();
			_context.moveTo(_linePosX, 0);
			_context.lineTo(_linePosX, canvasEl.height);
			_context.lineTo(_linePosX, 0);
			_context.closePath();

			_context.lineWidth = 1;
			_context.strokeStyle = _gridItem.bordercolor;
			_context.stroke();
		}
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
function _applyFloodFill(pColorToUse, pColorToOverride, pGridStartItem) {
	// already colored, ignore
	if (pGridStartItem.bgcolor === pColorToUse) {
		return;
	}
	// recolor the griditem
	if (pGridStartItem.bgcolor === pColorToOverride) {
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

	for (var _n = 0; _n < _neighbourKeys.length; _n++) {
		var _gridItem = gridMap[_neighbourKeys[_n]];
		if (_gridItem && _gridItem.bgcolor === pColorToOverride) {
			_applyFloodFill(pColorToUse, pColorToOverride, _gridItem);
		}
	}
}

/**
 * draw a line between two points
 *
 * @param {string} pColorCode
 * @param {object} pStartGridItem
 * @param {object} pCurrentGridItem
 */
function _applyLine(pColorCode, pStartGridItem, pCurrentGridItem){
	// clear the line to be redrawn
	for(let _gridItemIndex in gridMapCache){
		gridMap[_gridItemIndex].bgcolor = gridMapCache[_gridItemIndex].bgcolor;
	}

	// bresenham's line algorithm
	let x0 = pStartGridItem.coordX,
		y0 = pStartGridItem.coordY,
		x1 = pCurrentGridItem.coordX,
		y1 = pCurrentGridItem.coordY,
		dx = Math.abs(x1 - x0),
		sx = x0 < x1 ? 1 : -1,
		dy = -1 * Math.abs(y1 - y0),
		sy = y0 < y1 ? 1 : -1,
		err = dx + dy;

	const t = true;

	while(t){
		gridMap[x0 + ':' + y0].bgcolor = pColorCode;
		if (x0 == x1 && y0 == y1){
			break;
		}

		let e2 = 2 * err;

		if (e2 >= dy){
			err += dy;
			x0 += sx;
		}

		if(e2 <= dx) {
			err += dx;
			y0 += sy;
		}
	}
}

/**
 *
 */
const _cloneGridMap = function(){
	return JSON.parse(JSON.stringify(gridMap));
}

/**
 * get grid item via pos
 *
 * @param {number} pPosX
 * @param {number} pPosY
 */
const getGridItemFromPosition = function (pPosX, pPosY) {
	for (var _key in gridMap) {
		var _gridItem = gridMap[_key];

		// +1/-1, damit bei margin auch bei klick auf border gefärbt wird
		if (_gridItem.posX < pPosX + 1 && _gridItem.posX + gridItemSize > pPosX - 1 &&
			_gridItem.posY < pPosY + 1 && _gridItem.posY + gridItemSize > pPosY - 1
		) {
			return _gridItem;
		}
	}

	return null;
}

/**
 * get grid item via (mouse) event
 *
 * @param {object} pEvent
 * @returns
 */
const getGridItemFromEvent = function (pEvent) {
	const _canvasBoundingClientRect = canvasEl.getBoundingClientRect(), // to get the position relative to viewport
        _canvasPosX = _canvasBoundingClientRect.left,
        _canvasPosY = _canvasBoundingClientRect.top;

	return getGridItemFromPosition(
		pEvent.clientX - _canvasPosX,
		pEvent.clientY - _canvasPosY
	);
}

/**
 * generate a download request
 *
 * @param {string} pFileName
 * @param {string} pImageType
 */
const downloadImage = function (pFileName, pImageType) {
	DownloadJs(canvasEl.toDataURL('image/' + pImageType), pFileName + '.' + pImageType, 'image/' + pImageType);
}

/**
 *
 * @param {boolean} pShow
 */
const showGridLines = function(pShow){
	gridItemBorderVisible = pShow;
	_drawGrid();
}

const changeGridItemSize = function(pGridItemSize){
	gridItemSize = pGridItemSize;
	setGridSize(gridItemsHorizontal);
	_drawGrid();
}

/**
 * color the selected grid item in desired color and drawmode
 *
 * @param {string} pDrawMode
 * @param {string} pColorCode
 * @param {object} pGridStartItem
 */
const applyDrawMode = function (pDrawMode, pColorCode, pGridItems) {
	let _redraw = true,
		_currentGridItem = pGridItems.current;

	switch (pDrawMode) {
		case 'simple':
			if (_currentGridItem.bgcolor === pColorCode) {
				_redraw = false;
			} else {
				_currentGridItem.bgcolor = pColorCode;
			}
			break;
		case 'erase':
			_currentGridItem.bgcolor = '#ffffff00';
		break;
		case 'floodfill':
			_applyFloodFill(pColorCode, _currentGridItem.bgcolor, _currentGridItem);
			break;
		case 'flooderase':
			_applyFloodFill('#ffffff00', _currentGridItem.bgcolor, _currentGridItem);
			break;
		case 'line':
			_applyLine(pColorCode, pGridItems.start, _currentGridItem)
			break;
		default: console.warn('unbekannter drawmode ' + pDrawMode);
	}

	if (_redraw) {
		_drawGrid();
	}
}

/**
 * deep clone the grid for certain draw modes
 */
const cacheGridMap = function(){
	gridMapCache = _cloneGridMap();
}

/**
 * redraw the grid in desired size
 *
 * @param {int} pGridSize
 */
const setGridSize = function (pGridSize) {
	gridItemsHorizontal = pGridSize;
	gridItemsVertical = pGridSize;

	canvasEl.width = gridItemsHorizontal * gridItemSize;
	canvasEl.height = gridItemsVertical * gridItemSize;

	_generateGrid();
	_drawGrid();
}

const undo = function(){
	var _historyItem = history.pop();
	if(_historyItem){
		gridMap = _historyItem;
		_drawGrid();
	}
}

const updateHistory = function(){
	history.push(_cloneGridMap());
}

/**
 * init the canvas
 *
 * @param {<canvas>} pCanvas
 */
const init = function (pCanvas, pDefaults) {
	canvasEl = pCanvas;

	gridItemSize = pDefaults.gridItemSize;
	gridItemDefaultBgColor = pDefaults.gridItemDefaultBgColor;
	gridItemDefaultBorderColor = pDefaults.gridItemDefaultBorderColor;
	gridItemBorderVisible = pDefaults.gridItemBorderVisible;
	gridItemsHorizontal = pDefaults.gridItemsHorizontal;
	gridItemsVertical = pDefaults.gridItemsVertical;
}

// API
export default {
	init: init,
	setGridSize: setGridSize,
	cacheGridMap: cacheGridMap,
	getGridItemFromPosition: getGridItemFromPosition,
	getGridItemFromEvent: getGridItemFromEvent,
	applyDrawMode: applyDrawMode,
	downloadImage: downloadImage,
	showGridLines: showGridLines,
	changeGridItemSize: changeGridItemSize,
	undo: undo,
	updateHistory: updateHistory,
}
