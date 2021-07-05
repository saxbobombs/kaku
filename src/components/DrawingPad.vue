<template>
	<canvas
		ref="canvas"
		v-on:mousedown="initDraw($event)"
		width="0"
		height="0"
	></canvas>
</template>

<script>
import EventBus from "../utils/EventBus";
import kakuLib from "../lib/kakuLib";

export default {
	name: "DrawingPad",

	created() {
		this.drawStartGridItem = null;
	},

	mounted() {
		const _me = this;

		kakuLib.init(_me.$refs.canvas);
		kakuLib.setGridSize(_me.gridSize);

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
			kakuLib.setGridSize(pGridSize);
		});

		EventBus.$on("downloadImage", function (pImageType) {
			kakuLib.downloadImage("kaku_img", pImageType);
		});

		EventBus.$on("changeShowGridLines", function (pImageType) {
			kakuLib.showGridLines(!!pImageType);
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

			const _gridItem = kakuLib.getGridItemFromEvent(pEvent);
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

			kakuLib.cacheGridMap();
			_me.drawStartGridItem = kakuLib.getGridItemFromEvent(pEvent);

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
	canvas{
		box-shadow: 0px 0px 2px #aaa;
	}
</style>