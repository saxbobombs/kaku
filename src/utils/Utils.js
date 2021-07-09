import Bowser from "bowser";
import isMobile from "is-mobile";

const bowserParser = Bowser.getParser(window.navigator.userAgent);

export default {
	/**
	 * check if the used browser is compatible
	 *
	 * @TODO: needs further testing
	 *
	 * @returns {bool}
	 */
	browserIsCompatible: function () {
		let _compatible = true;
		const _browser = bowserParser.getBrowser();

		// no download in IE < 11
		if (_browser.name === 'Internet Explorer' && _browser.version !== '11.0') {
			_compatible = false;
		}

		return _compatible;
	},

	isTouchDevice: function(){
		// TODO: touch detection is more suitable
		return isMobile();
	},

	/**
	 * return MouseEvent or TouchEvent-Touch
	 *
	 * @param {*} pEvent
	 * @returns
	 */
	getCursorEvent(pEvent){
		var _me = this,
			_event = pEvent;

		if(_me.isTouchDevice()){
			_event = pEvent.touches[0];
			if(!_event){
				_event = pEvent.changedTouches[0];
			}
		}

		return _event;
	}
};
