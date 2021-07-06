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

html, body{
	height:100%;
}
body {
	color: #222 !important;
	display: flex;
	flex-direction:column;
}

#app{
	padding-top:10px;
	box-shadow:0 0 2px red inset;
	height:100%;
	flex:1;
	display:flex;
	flex-direction:column;
}

#header {
	background: #fff;
	padding: 0;
	margin:0;
	border: 1px solid #fff;
	font-family: 'Alegreya Sans SC', sans-serif;
}
#header h1{
	margin:0;
	padding:0;
	font-size:10px;
}

.canvas-container {
	margin: 0 auto;
	overflow: auto;
	flex:1;
	box-shadow:0 0 2px blue;
	width:100%;
	overflow:auto;
}

.canvas-container canvas {
	display: block;
	margin: 0 auto;
}

.browser-comp {
	border-radius: 0 !important;
	max-width: none !important;
	color: #444;
}

.browser-comp .toast {
	box-shadow: none !important;
	border-radius: 0 !important;
	width: 100% !important;
	max-width: none !important;
}
</style>
