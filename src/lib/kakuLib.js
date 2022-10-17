/**
 * kakuLib
 *
 * library for canvas manipulations
 */

import DownloadJs from 'downloadjs';

import canvasApi from './canvasApi';
import floodfill from './drawmode/floodfill';
import utils from './utils';

let gridMap = {} // map of griditems

// config
const config = {
	gridSize: null,
	gridItemSize: null,
	gridItemDefaultBgColor: null,
	gridItemDefaultBorderColor: null,
	gridItemBorderVisible: null
};


// internal	
let gridItemsHorizontal,
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
			bgcolor: config.gridItemDefaultBgColor,
			bordercolor: config.gridItemDefaultBorderColor,
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
	// always redraw everything
	canvasApi.clear();

	for (let _key in gridMap) {
		var _gridItem = gridMap[_key],
			_posX = (_gridItem.coordX * config.gridItemSize),
			_posY = (_gridItem.coordY * config.gridItemSize);

		_gridItem.posX = _posX;
		_gridItem.posY = _posY;

		if(_gridItem.bgcolor === '#00000000'){
			continue;
		}

		canvasApi.fillPath([
			{x: _posX, y: _posY},
			{x: _posX + config.gridItemSize, y: _posY},
			{x: _posX + config.gridItemSize, y: _posY + config.gridItemSize},
			{x: _posX, y: _posY + config.gridItemSize},
			{x: _posX, y: _posY}
		], _gridItem.bgcolor);
		
	}

	if(config.gridItemBorderVisible){
		for(var _y = 1; _y * config.gridItemSize < canvasApi.getCanvas().height; _y++){
			var _linePosY = config.gridItemSize * _y;
			// for lines to to be 1px wide, this fix is needed
			// details: https://stackoverflow.com/questions/7530593/html5-canvas-and-line-width/7531540#7531540
			_linePosY = Math.floor(_linePosY) + 0.5;

			canvasApi.strokePath([
				{x: 0, y: _linePosY},
				{x: canvasApi.getCanvas().width, y: _linePosY},
				{x: 0, y: _linePosY},
			], _gridItem.bordercolor);
		}

		for(var _x = 1; _x * config.gridItemSize < canvasApi.getCanvas().width; _x++){
			var _linePosX = config.gridItemSize * _x;
			// for lines to to be 1px wide, this fix is needed
			// details: https://stackoverflow.com/questions/7530593/html5-canvas-and-line-width/7531540#7531540
			_linePosX = Math.floor(_linePosX) + 0.5;

			canvasApi.strokePath([
				{x: _linePosX, y: 0},
				{x: _linePosX, y: canvasApi.getCanvas().height},
				{x: _linePosX, y: 0},
			], _gridItem.bordercolor);
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
	canvasApi.restoreImage();

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
		canvasApi.fillGridItem(canvasApi.getGridItemFromCoords(x0, y0, true), pColorCode);
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
 * draw a square between two points
 *
 * @param {string} pColorCode
 * @param {object} pStartGridItem
 * @param {object} pCurrentGridItem
 */
function _applySquare(pColorCode, pStartGridItem, pCurrentGridItem){
	canvasApi.restoreImage();

	for(var _h = 0; _h <= Math.abs(pStartGridItem.coordX - pCurrentGridItem.coordX); _h++) {
		canvasApi.fillGridItem(canvasApi.getGridItemFromCoords(Math.min(pStartGridItem.coordX,pCurrentGridItem.coordX) + _h, pStartGridItem.coordY, true), pColorCode);
		canvasApi.fillGridItem(canvasApi.getGridItemFromCoords(Math.min(pStartGridItem.coordX,pCurrentGridItem.coordX) + _h, pCurrentGridItem.coordY, true), pColorCode);
	}

	for(var _v = 0; _v <= Math.abs(pStartGridItem.coordY - pCurrentGridItem.coordY); _v++) {
		canvasApi.fillGridItem(canvasApi.getGridItemFromCoords(pStartGridItem.coordX, Math.min(pStartGridItem.coordY,pCurrentGridItem.coordY) + _v, true), pColorCode);
		canvasApi.fillGridItem(canvasApi.getGridItemFromCoords(pCurrentGridItem.coordX, Math.min(pStartGridItem.coordY,pCurrentGridItem.coordY) + _v, true), pColorCode);
	}
}

function _applyCircle(pColorCode, pStartGridItem, pCurrentGridItem) {
	canvasApi.restoreImage();

	// for better usability, calculate the center via a square
	const startCoordX = pStartGridItem.coordX;
	const startCoordY = pStartGridItem.coordY;
	let currentCoordX = pCurrentGridItem.coordX;
	let currentCoordY = pCurrentGridItem.coordY;
	const shortestLine = (Math.abs(startCoordX - currentCoordX) > Math.abs(startCoordY - currentCoordY)) 
		? Math.abs(startCoordY - currentCoordY) : Math.abs(startCoordX - currentCoordX);

	currentCoordX = startCoordX + shortestLine;
	currentCoordY = startCoordY + shortestLine;

	let virtualCenterX = (startCoordX - currentCoordX) / 2;
	if (pStartGridItem.coordX < pCurrentGridItem.coordX) {
		virtualCenterX = Math.abs(virtualCenterX);
	}
	
	let virtualCenterY = (startCoordY - currentCoordY) / 2;
	if (pStartGridItem.coordY < pCurrentGridItem.coordY) {
		virtualCenterY = Math.abs(virtualCenterY);
	}
	
	const steps = 200;
	const radius = Math.abs(virtualCenterX);


	for (var i = 0; i < steps; i++) {
		const point = {
			x: Math.round(virtualCenterX + radius * Math.cos(2 * Math.PI * i / steps)) + startCoordX,
			y: Math.round(virtualCenterY + radius * Math.sin(2 * Math.PI * i / steps)) + startCoordY
		}

		const gridItem = canvasApi.getGridItemFromCoords(point.x, point.y, true);

		if (gridItem) {
			canvasApi.fillGridItem(gridItem, pColorCode);
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
 * get grid item via (mouse) event
 *
 * @param {object} pEvent
 * @returns
 */
const getGridItemFromEvent = function (pEvent) {
	const _canvasBoundingClientRect = canvasApi.getCanvas().getBoundingClientRect(), // to get the position relative to viewport
        _canvasPosX = _canvasBoundingClientRect.left,
        _canvasPosY = _canvasBoundingClientRect.top;


	return canvasApi.getGridItemFromPosition(
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
	DownloadJs(canvasApi.getCanvas().toDataURL('image/' + pImageType), pFileName + '.' + pImageType, 'image/' + pImageType);
}

/**
 *
 * @param {boolean} pShow
 */
const showGridLines = function(pShow){
	config.gridItemBorderVisible = pShow;
	_drawGrid();
}

const changeGridItemSize = function(pGridItemSize){
	config.gridItemSize = pGridItemSize;
	setGridSize(config.gridSize);
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
	const _currentGridItem = canvasApi.getGridItemFromCoords(pGridItems.current.coordX, pGridItems.current.coordY, true);

	const colorRgba = utils.convertHexToRgba(pColorCode);
	console.log('colorRgba', colorRgba);
	pColorCode = utils.convertRgbaToHexA(colorRgba.r, colorRgba.g, colorRgba.b, colorRgba.a);
	
	switch (pDrawMode) {
		case 'simple':
			canvasApi.fillGridItem(_currentGridItem, pColorCode);
			break;
		case 'erase':
			canvasApi.fillGridItem(_currentGridItem, '#00000000');
		break;
		case 'floodfill':
			floodfill.apply(pColorCode, _currentGridItem.bgcolor, _currentGridItem);
			break;
		case 'flooderase':
			floodfill.apply('#00000000', _currentGridItem.bgcolor, _currentGridItem);
			break;
		case 'line':
			_applyLine(pColorCode, pGridItems.start, _currentGridItem)
			break;
		case 'square':
			_applySquare(pColorCode, pGridItems.start, _currentGridItem)
			break;
		case 'circle':
			_applyCircle(pColorCode, pGridItems.start, _currentGridItem)
			break;
		default: console.warn('unbekannter drawmode ' + pDrawMode);
	}
}

/**
 * redraw the grid in desired size
 *
 * @param {int} pGridSize
 */
const setGridSize = function (pGridSize) {
	config.gridSize = pGridSize;

	if(typeof config.gridSize === 'string'){
		var _gridSize = config.gridSize.split('x');
		gridItemsHorizontal = _gridSize[0];
		gridItemsVertical = _gridSize[1];
	}else{
		gridItemsHorizontal = pGridSize;
		gridItemsVertical = pGridSize;
	}


	canvasApi.getCanvas().width = gridItemsHorizontal * config.gridItemSize;
	canvasApi.getCanvas().height = gridItemsVertical * config.gridItemSize;

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
	canvasApi.init(pCanvas, config);

	config.gridSize = pDefaults.gridSize;
	config.gridItemSize = pDefaults.gridItemSize;
	config.gridItemDefaultBgColor = pDefaults.gridItemDefaultBgColor;
	config.gridItemDefaultBorderColor = pDefaults.gridItemDefaultBorderColor;
	config.gridItemBorderVisible = pDefaults.showGridLines;
	
	setGridSize(config.gridSize);

	// canvasApi.updateImageData();
}

// API
export default {
	init: init,
	setGridSize: setGridSize,
	getGridItemFromEvent: getGridItemFromEvent,
	applyDrawMode: applyDrawMode,
	downloadImage: downloadImage,
	showGridLines: showGridLines,
	changeGridItemSize: changeGridItemSize,
	undo: undo,
	updateHistory: updateHistory,
	cacheImage: canvasApi.cacheImage,
}
