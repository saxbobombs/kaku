export default {

	_cursor: null,

	initCursor: function(){
		var _me = this;

		_me._cursor = document.createElement('div');
		_me._cursor.className = 'cursor';
		_me._cursor.hidden = true;

		var _icon = document.createElement('i');

		_me._cursor.appendChild(_icon);
		document.body.appendChild(_me._cursor);
	},

	addCursorChanger: function(pElement, pCursorContentGetter){
		var _me = this;
		pElement.addEventListener('mousemove', function(pEvent){
			if(_me._cursor && pEvent){
				var _c = pCursorContentGetter();
				if(!_c){
					return;
				}
				_me._cursor.hidden = false;
				_me._cursor.style.top = pEvent.clientY + ((_c.offsetY) ? _c.offsetY : 0) + 'px';
				_me._cursor.style.left = pEvent.clientX + ((_c.offsetX) ? _c.offsetX : 0) + 'px';
				_me._cursor.innerHTML = _c.text;
			}
		});

		pElement.addEventListener('mouseout', function(){
			_me._cursor.hidden = true;
		})
	}


}
