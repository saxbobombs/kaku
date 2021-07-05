<template>
	<div>
		<ul class="control-container">
			<li>
				<b-form-radio-group
					class="control-button grid-size-container"
					buttons
					v-model="gridSize"
					v-on:change="chooseGridSize"
				>
					<i class="group-label fas fa-th"></i>
					<template v-for="option in gridSizes">
						<b-form-radio :value="option.value" :key="option.index">
							{{ option.name }}
						</b-form-radio>
					</template>
				</b-form-radio-group>
			</li>
			<li>
				<b-form-checkbox-group
					class="control-button grid-size-container"
					buttons
				>
					<b-form-checkbox v-on:change="changeShowGridLines" v-model="showGridLines" value="1" unchecked-value="0">
						<template v-if="showGridLines == 1">
						<i class="fas fa-border-all"></i>
						</template>
						<template v-else>
						<i class="fas fa-border-none"></i>
						</template>
						grid lines
					</b-form-checkbox>
				</b-form-checkbox-group>
			</li>
			<li>
				<v-swatches
					row-length="5"
					v-model="colorToUse"
					v-on:input="chooseColor"
				>
					<b-button class="control-button" slot="trigger" variant="light">
						<i class="fas fa-palette"></i>
						<span
							class="color-preview"
							:style="'background:' + colorToUse"
						></span>
					</b-button>
				</v-swatches>
			</li>
			<li>
				<b-form-radio-group
					class="control-button drawmode"
					buttons
					v-model="drawMode"
					v-on:change="chooseDrawMode"
				>
					<template v-for="option in drawModes">
						<b-form-radio :value="option.value" :key="option.index">
							<i :class="'fas ' + option.icon"></i>
						</b-form-radio>
					</template>
				</b-form-radio-group>
			</li>
			<li class="right">
				<b-dropdown variant="light" class="control-button">
					<template #button-content>
						<i class="fas fa-file-download"></i> Download
					</template>
					<b-dropdown-item v-on:click="downloadImage('png')"
						>PNG</b-dropdown-item
					>
					<b-dropdown-item v-on:click="downloadImage('jpg')"
						>JPG</b-dropdown-item
					>
					<b-dropdown-item v-on:click="downloadImage('gif')"
						>GIF</b-dropdown-item
					>
				</b-dropdown>
			</li>
		</ul>
	</div>
</template>

<script>
import EventBus from "../utils/EventBus";
import VSwatches from "vue-swatches";
import "vue-swatches/dist/vue-swatches.css";

export default {
	name: "Controls",
	components: {
		VSwatches,
	},

	mounted() {
		var _me = this;

		EventBus.$on("setConfigDefaults", function (pDefaults) {
			_me.gridSize = pDefaults.gridSize;
			_me.colorToUse = pDefaults.colorToUse;
			_me.drawMode = pDefaults.drawMode;
			console.log(pDefaults);
			_me.showGridLines = pDefaults.showGridLines;
		});
	},

	data() {
		return {
			gridSize: null,
			colorToUse: null,
			drawMode: null,
			showGridLines: null,
			drawModes: [
				{
					value: "floodfill",
					text: "Floodfill",
					icon: "fa-fill-drip",
				},
				{
					value: "simple",
					text: "Pencil",
					icon: "fa-pencil-alt",
				},
				{
					value: "line",
					text: "Line",
					icon: "fa-pencil-ruler",
				},
				{
					value: "erase",
					text: "Eraser",
					icon: "fa-eraser",
				},
				{
					value: "flooderase",
					text: "FloodEraser",
					icon: "fa-times",
				},
			],
			gridSizes: [
				{
					name: "8x8",
					value: 8,
				},
				{
					name: "12x12",
					value: 12,
				},
				{
					name: "16x16",
					value: 16,
				},
				{
					name: "32x32",
					value: 32,
				}
			],
		};
	},

	methods: {

		changeShowGridLines: function(pIsChecked){
			EventBus.$emit("changeShowGridLines", pIsChecked + '' === '1' ? true : false);
		},
		/**
		 * publish color change
		 */
		chooseColor: function (pColor) {
			EventBus.$emit("changeColor", pColor);
			this.colorToUse = pColor;
		},

		/**
		 * publish drawmode change
		 */
		chooseDrawMode: function (pDrawMode) {
			EventBus.$emit("changeDrawMode", pDrawMode);
		},

		/**
		 * publish gridsize change
		 */
		chooseGridSize: function (pGridSize) {
			this.gridSize = pGridSize;
			EventBus.$emit("changeGridSize", pGridSize);
		},

		/**
		 * publish a download request
		 */
		downloadImage: function (pImageType) {
			EventBus.$emit("downloadImage", pImageType);
		},
	},
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.control-container {
	width: 100%;
	list-style: none;
	padding: 0;
	margin: 0;
	margin-bottom: 7px;
}

.control-container > li {
	margin-bottom: 4px;
	margin-right: 4px;
	display: inline-block;
}

.color-preview {
	display: inline-block;
	width: 2em;
	height: 1.5em;
	border: 1px solid #fff;
	vertical-align: top;
}

.grid-size-container {
	color: #fff;
	position: relative;
}

.grid-size-container .group-label::after {
	content: " ";
	display: inline-block;
	width: 0;
	height: 100%;
	vertical-align: middle;
}

.grid-size-container .group-label {
	display: inline-block;
	padding-left: 15px;
	padding-right: 10px;
}

.btn-group {
	border-left: 1px solid;
	border-right: 1px solid;
}

.btn-group label {
	border: 0;
}

.control-button {
	border-top: 1px solid;
	border-bottom: 1px solid;
}

.grid-size-container .group-label,
.control-button,
.control-button .dropdown-toggle,
.btn-group label {
	color: #218838 !important;
	border-color: #28a745 !important;
	background: #f8f9fa;
	border-radius: 0;
	box-shadow: none !important;
}

.control-button.b-dropdown {
	border: 0;
}

.btn-group label:hover {
	background: #ddd !important;
}

.btn-group label:active,
.btn-group label.active {
	border-color: #fff !important;
	border-color: #28a745 !important;
	background: #ddd !important;
	outline: unset;
}
</style>

<style>
.control-container .control-button.b-dropdown button,
.control-container .dropdown-menu {
	border-color: #28a745 !important;
	border-radius: 0 !important;
}

.control-container .dropdown-menu {
	margin-top: 5px !important;
}

.control-container .vue-swatches__container {
	border: 1px solid #28a745 !important;
	background: #f8f9fa;
	box-shadow: none !important;
}

.control-container .vue-swatches__container,
.control-container .vue-swatches__swatch {
	border-radius: 0 !important;
}

.control-container .control-button button {
	color: #218838 !important;
}
</style>
