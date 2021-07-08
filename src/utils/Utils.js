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

	isMobile: function(){
		return isMobile();
	}
};
