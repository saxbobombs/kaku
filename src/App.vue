<template>
	<b-container id="app">
		<b-toast
			class="browser-comp"
			ref="browser-comp"
			static
			title="browser compatibility"
			no-auto-hide
		>
			please use a modern browser to avoid unexpected behavior.
		</b-toast>
		<div class="canvas-container">
			<DrawingPad />
		</div>

		<div class="control-container">
			<Controls />
		</div>
	</b-container>
</template>

<script>
import Controls from "./components/Controls.vue";
import DrawingPad from "./components/DrawingPad.vue";
import Utils from "./utils/Utils";
import EventBus from "./utils/EventBus";
import Cursor from "./utils/Cursor";
import Config from "./cfg/config";

export default {
	name: "kaku",
	components: {
		Controls,
		DrawingPad,
	},

	mounted() {
		var _me = this;

		_me.initCursor();

		if (Utils.isMobile()) {
			document.body.classList.add("kaku-is-mobile");
		}

		EventBus.$emit("setConfigDefaults", Config.defaults);
		// check browser
		if (!Utils.browserIsCompatible()) {
			_me.$refs["browser-comp"].show();
		}
	},

	methods: {
		initCursor: function () {
			var _me = this;
			_me._drawMode = Config.defaults.drawMode;

			Cursor.initCursor();
			Cursor.addCursorChanger(document.body, function () {
				switch (_me._drawMode) {
					case "simple":
						return {
							offsetX: -1,
							offsetY: -24,
							text: '<i class="fas fa-pencil-alt"></i>',
						};
					case "line":
						return {
							offsetX: 15,
							offsetY: 15,
							text: '<i class="fas fa-pencil-ruler"></i>',
						};
					case "floodfill":
						return {
							offsetX: 0,
							offsetY: -24,
							text: '<i class="fas fa-fill-drip fa-flip-horizontal"></i>',
						};
					case "erase":
						return {
							offsetX: -6,
							offsetY: -22,
							text: '<i class="fas fa-eraser"></i>',
						};
					case "flooderase":
						return {
							offsetX: -24,
							offsetY: -23,
							text: '<i class="fas fa-fill-drip"></i>',
						};
				}
				EventBus.$on("changeDrawMode", function (pDrawMode) {
					_me._drawMode = pDrawMode;
				});
			});
		},
	},

	onCursorChange: function () {
		console.log();
	},
};
</script>

<style>
/* @import url('https://fonts.googleapis.com/css2?family=Alegreya+Sans+SC:wght@200&display=swap'); */
@import "./style/main.scss";
</style>
