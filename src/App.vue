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

export default {
	name: "kaku",
	components: {
		Controls,
		DrawingPad,
	},

	mounted() {
		var _me = this;

		// check browser
		if (!Utils.browserIsCompatible()) {
			_me.$refs["browser-comp"].show();
		}
	},
};
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Alegreya+Sans+SC:wght@200&display=swap');
@import './style/main.scss';

</style>
