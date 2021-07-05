<template>
	<canvas
		ref="canvas"
		v-on:mousedown="initDraw($event)"
		width="0"
		height="0"
	></canvas>
</template>

<script>
import EventBus from "./../utils/EventBus";
import PixelArtLib from "./../lib/PixelArtLib";

export default {
	name: "PixelArtCanvas",

	created() {
		this.drawStartGridItem = null;
	},

	mounted() {
		const _me = this;

		PixelArtLib.init(_me.$refs.canvas);
		PixelArtLib.setGridSize(_me.gridSize);

		// the controls need to know what to select first
		EventBus.$emit("setConfigDefaults", {
			gridSize: _me.gridSize,
			colorToUse: _me.colorToUse,
			drawMode: _me.drawMode,
			showGridLines: _me.showGridLines,
		});

		// listen to events from controls
		EventBus.$on("changeColor", function (pColorCode) {
			_me.colorToUse = pColorCode;
		});

		EventBus.$on("changeDrawMode", function (pDrawMode) {
			_me.drawMode = pDrawMode;
		});

		EventBus.$on("changeGridSize", function (pGridSize) {
			_me.gridSize = pGridSize;
			PixelArtLib.setGridSize(pGridSize);
		});

		EventBus.$on("downloadImage", function (pImageType) {
			PixelArtLib.downloadImage("pixelart_img", pImageType);
		});

		EventBus.$on("changeShowGridLines", function (pImageType) {
			PixelArtLib.showGridLines(!!pImageType);
		});
	},

	data() {
		return {
			// defaults
			colorToUse: "#27AF60",
			drawMode: "line",
			gridSize: 32,
			showGridLines: 1
		};
	},

	methods: {
		/**
		 * get the clicked grid item and color it with drawmode
		 *
		 * @param {pEvent} - PointerEvent
		 */
		draw: function (pEvent) {
			const _me = this;

			const _gridItem = PixelArtLib.getGridItemFromEvent(pEvent);
			if (_gridItem) {
				PixelArtLib.applyDrawMode(_me.drawMode, _me.colorToUse, {
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

			PixelArtLib.cacheGridMap();
			_me.drawStartGridItem = PixelArtLib.getGridItemFromEvent(pEvent);

			var _mouseUp = function (pEvent) {
				window.removeEventListener("mouseup", _mouseUp);
				window.removeEventListener("mousemove", _mouseMove);
				_me.draw(pEvent);

				_me.drawStartGridItem = null;
			};
			var _mouseMove = function (pEvent) {
				_me.draw(pEvent);
			};
			window.addEventListener("mouseup", _mouseUp);
			window.addEventListener("mousemove", _mouseMove);
		},
	},
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
