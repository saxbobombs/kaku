const canvasApi = require('./../canvasApi');

/**
 * use floodfill algorithm to fill the grid.
 *
 * @param {object} pGridMap
 * @param {string} pColorToUse
 * @param {string} pColorToOverride
 * @param {object} pGridStartItem
 */
 function apply(pColorToUse, pColorToOverride, pGridStartItem) {
	if(pColorToOverride === pColorToUse){
		return;
	}

	canvasApi.fillGridItem(pGridStartItem, pColorToUse);

	var _stack = [pGridStartItem.coordX + ':' + pGridStartItem.coordY];

	while(_stack.length > 0){
		var _item = _stack.shift(),
			_x = parseInt(_item.split(':')[0]),
			_y = parseInt(_item.split(':')[1]);

		var _neighbourKeys = [
				(_x - 1) + ':' + _y, // left
				(_x - 1) + ':' + (_y - 1), // top left
				_x + ':' + (_y - 1), // top
				(_x + 1) + ':' + (_y - 1), // top right
				(_x + 1) + ':' + _y, // right
				(_x + 1) + ':' + (_y + 1), // bottom right
				_x + ':' + (_y + 1), // bottom
				(_x - 1) + ':' + (_y + 1), // bottom left
			];

		for(var _i = 0; _i < _neighbourKeys.length; _i++){
			var _key = _neighbourKeys[_i],
				_keyX = parseInt(_key.split(':')[0]),
				_keyY = parseInt(_key.split(':')[1]);
				const _gridItem = canvasApi.getGridItemFromCoords(_keyX, _keyY, true)

			if(_gridItem && _gridItem.bgcolor === pColorToOverride && _stack.indexOf(_key) === -1){
				_gridItem.bgcolor = pColorToUse;
				canvasApi.fillGridItem(_gridItem, pColorToUse);
				_stack.push(_key);
			}
		}
	}
}


module.exports = {
	apply: apply
};
