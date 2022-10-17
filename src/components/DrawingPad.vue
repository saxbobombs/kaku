<template>
	<div class="inner">
		<canvas
			ref="canvas"
			width="0"
			height="0"
		></canvas>
	</div>
</template>

<script>
import EventBus from "../utils/EventBus";
import kakuLib from "../lib/kakuLib";
import Cursor from "../utils/Cursor";
import Utils from "../utils/Utils";

export default {
	name: "DrawingPad",

	created() {
		this.drawStartGridItem = null;
		this.moveStartPoint = null;
		this.currentGridItemIndex = null;
	},

	mounted() {
		const _me = this;

		if(Utils.isTouchDevice()){
			_me.$refs.canvas.addEventListener('touchstart', _me.initDraw);
		}else{
			_me.$refs.canvas.addEventListener('mousedown', _me.initDraw);
		}

		EventBus.$on("setConfigDefaults", function (pDefaults) {
			kakuLib.init(_me.$refs.canvas, pDefaults);
			_me.calculateAndEmitDrawingPadPosition();
			_me.gridSize = pDefaults.gridSize;
			_me.colorToUse = pDefaults.colorToUse;
			_me.drawMode = pDefaults.drawMode;
			_me.showGridLines = pDefaults.showGridLines;
			_me.gridItemSize = pDefaults.gridItemSize;
		});

		Cursor.addCursorChanger(_me.$refs.canvas, function () {
			return 'hide';
		});

		// listen to events from controls
		EventBus.$on("changeColor", function (pColorCode) {
			if (pColorCode != '#ffffff00') {
				_me.colorToUse = pColorCode;
			}
		});

		EventBus.$on("changeDrawMode", function (pDrawMode) {
			_me.drawMode = pDrawMode;
		});

		EventBus.$on("changeGridSize", function (pGridSize) {
			_me.gridSize = pGridSize;
			kakuLib.setGridSize(pGridSize);
			_me.calculateAndEmitDrawingPadPosition();
		});

		EventBus.$on("downloadImage", function (pImageType) {
			kakuLib.downloadImage("kaku_img", pImageType);
		});

		EventBus.$on("changeShowGridLines", function (pImageType) {
			kakuLib.showGridLines(!!pImageType);
		});

		EventBus.$on("changeGridItemSize", function (pSize) {
			kakuLib.changeGridItemSize(pSize);
		});

		EventBus.$on("undo", function () {
			kakuLib.undo();
		});
	},

	methods: {
		/**
		 * get the clicked grid item and color it with drawmode
		 *
		 * @param {pEvent} - PointerEvent
		 */
		draw: function (pEvent) {
			const _me = this;

			if (_me.drawMode == 'move') {
				_me.calculateAndEmitDrawingPadPosition(pEvent)
				return;
			}

			const _gridItem = kakuLib.getGridItemFromEvent(pEvent);
			
			if (_me.drawMode == 'pipette') {
				EventBus.$emit("changeColor", _gridItem.bgcolor);
				return;
			}

			if(!_gridItem || _me.currentGridItemIndex === _gridItem.index) {
				return;
			}

			_me.currentGridItemIndex = _gridItem.index;
			
			if (_gridItem) {
				kakuLib.applyDrawMode(_me.drawMode, _me.colorToUse, {
						current: _gridItem,
						start: _me.drawStartGridItem
				});
			}
		},

		/**
		 * init drawing events
		 */
		initDraw: function (pEvent) {
			var _me = this;

			// only left mouse button on desktop
			if(!Utils.isTouchDevice() && pEvent.which !== 1){
				return;
			}

			kakuLib.updateHistory();

			kakuLib.cacheImage();

			var _event = _me.getCursorEvent(pEvent);
			_me.drawStartGridItem = kakuLib.getGridItemFromEvent(_event);

			var _mouseUp = function (pEvent) {
				var _event = _me.getCursorEvent(pEvent);

				if(Utils.isTouchDevice()){
					window.removeEventListener("touchend", _mouseUp);
					window.removeEventListener("touchmove", _mouseMove);
				}else{
					window.removeEventListener("mouseup", _mouseUp);
					window.removeEventListener("mousemove", _mouseMove);
				}
				_me.draw(_event);

				_me.drawStartGridItem = null;
				_me.moveStartPoint = null;
				_me.currentGridItemIndex = null;
			};
			var _mouseMove = function (pEvent) {
				var _event = _me.getCursorEvent(pEvent);
				_me.draw(_event);
			};

			if(Utils.isTouchDevice()){
				window.addEventListener("touchend", _mouseUp);
				window.addEventListener("touchmove", _mouseMove);
			}else{
				window.addEventListener("mouseup", _mouseUp);
				window.addEventListener("mousemove", _mouseMove);
			}
		},

		getCursorEvent: function(pEvent){
			var _event = Utils.getCursorEvent(pEvent);

			return _event;
		},

		calculateAndEmitDrawingPadPosition: function(pCursorEvent = null) {
			var _me = this;
			
			if (pCursorEvent) {
				if(!_me.moveStartPoint) {
					_me.moveStartPoint = {
						x: pCursorEvent.clientX - _me.$refs.canvas.parentElement.parentElement.getBoundingClientRect().left,
						y: pCursorEvent.clientY - _me.$refs.canvas.parentElement.parentElement.getBoundingClientRect().top,
					};
				}

				EventBus.$emit('setDrawingPadPositionByEvent', pCursorEvent, _me.moveStartPoint);
			} else {
				const vw = Math.max(document.documentElement.clientWidth || 0, window.innerWidth || 0);
				const vh = Math.max(document.documentElement.clientHeight || 0, window.innerHeight || 0);
				
				EventBus.$emit('setDrawingPadPosition', { 
					x: (vw - _me.$refs.canvas.width) / 2,
					y: (vh - _me.$refs.canvas.height) / 2,
				});
			}
			
		}

	},
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
	canvas{
		box-shadow: 0px 0px 2px #aaa;
	}
</style>
