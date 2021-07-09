export default {

	_cursor: null,

	_currentCursor: null,

	initCursor: function(){
		var _me = this;

		_me._cursor = document.createElement('div');
		_me._cursor.className = 'cursor';
		_me._cursor.hidden = true;

		document.body.appendChild(_me._cursor);
	},

	/**
	 *
	 * @param {*} pElement
	 * @param {*} pCursorContentGetter
	 */
	addCursorChanger: function(pElement, pCursorContentGetter){
		var _me = this;

		pElement.addEventListener('mousemove', function(pEvent){
			if(_me._cursor && pEvent && !pEvent.noPropagationForCursor){
				pEvent.noPropagationForCursor = true; // mousemove should not propagate for cursor
				_me._cursor.hidden = true;
				var _c = pCursorContentGetter();
				if(!_c){
					return;
				}

				var _text = _c.text;

				if(_c === 'hide'){
					if(!_me._cursor.classList.contains('kaku-hide-cursor')){
						_me._cursor.classList.add('kaku-hide-cursor');
					}
				}else{
					_me._cursor.classList.remove('kaku-hide-cursor');
				}

				if(typeof _c === 'object'){
					_me._currentCursor = _c;
				}

				_me._cursor.hidden = false;
				_me._cursor.style.top = pEvent.clientY + ((_me._currentCursor.offsetY) ? _me._currentCursor.offsetY : 0) + 'px';
				_me._cursor.style.left = pEvent.clientX + ((_me._currentCursor.offsetX) ? _me._currentCursor.offsetX : 0) + 'px';
				if(_text){
					_me._cursor.innerHTML = _text;
				}
			}
		});

		pElement.addEventListener('mouseout', function(){
			_me._cursor.hidden = true;
		})
	}


}
