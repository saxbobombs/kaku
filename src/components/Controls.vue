<template>
	<div>
		<ul class="control-container">
			<li>
				<b-button v-b-modal.image-settings-window v-b-tooltip.hover title="image settings">
					<i class="fas fa-image"></i>
				</b-button>
				<ImageSettingsWindow
					v-on:submit="onImageSettingsWindowSubmit" />
			</li>
			<li>
				<b-form-checkbox-group
					class="control-button grid-size-container"
					buttons
				>
					<b-form-checkbox v-on:change="changeShowGridLines" v-model="showGridLines" value="1" unchecked-value="0" v-b-tooltip.hover title="show/hide grid">
						<template v-if="showGridLines == 1">
						<i class="fas fa-border-all"></i>
						</template>
						<template v-else>
						<i class="fas fa-border-none"></i>
						</template>
					</b-form-checkbox>
				</b-form-checkbox-group>
			</li>

			<li>
				<b-form-radio-group
					class="control-button drawmode"
					buttons
					v-model="drawMode"
					v-on:change="chooseDrawMode"
				>
					<template v-for="option in drawModes">
						<b-form-radio :value="option.value" :key="option.index" v-b-tooltip.hover :title="option.text">
							<i :class="'fas ' + option.icon"></i>
						</b-form-radio>
					</template>
				</b-form-radio-group>
			</li>
			<li>
				<v-swatches
					row-length="5"
					v-model="colorToUse"
					v-on:input="chooseColor"
					v-b-tooltip.hover title="color picker"
				>
					<b-button class="control-button" slot="trigger">
						<i class="fas fa-palette"></i>
						<span
							class="color-preview"
							:style="'background:' + colorToUse"
						></span>
					</b-button>
				</v-swatches>
			</li>
			<li>
				<b-button class="control-button" v-b-tooltip.hover title="undo">
					<i class="fas fa-undo" v-on:click="undo"></i>
				</b-button>
			</li>
			<li>
				<b-dropdown class="control-button" v-b-tooltip.hover title="download image">
					<template #button-content>
						<i class="fas fa-file-download"></i>
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

import ImageSettingsWindow from './ImageSettingsWindow.vue';

export default {
	name: "Controls",
	components: {
		VSwatches,
		ImageSettingsWindow
	},

	mounted() {
		var _me = this;
		EventBus.$on("setConfigDefaults", function (pDefaults) {
			_me.gridSize = pDefaults.gridSize;
			_me.colorToUse = pDefaults.colorToUse;
			_me.drawMode = pDefaults.drawMode;
			_me.showGridLines = pDefaults.showGridLines ? '1' : '0';
			_me.gridItemSize = pDefaults.gridItemSize;
		});
	},

	data() {
		return {
			gridSize: null,
			colorToUse: null,
			drawMode: null,
			showGridLines: null,
			gridItemSize: null,
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

		onImageSettingsWindowSubmit: function(pSettings){
			var _me = this;

			_me.changeGridItemSize(pSettings.gridItemSize);
			_me.chooseGridSize(pSettings.gridSize);
		},

		undo: function(){
			EventBus.$emit("undo");
		},

		changeGridItemSize: function(pSize){
			EventBus.$emit("changeGridItemSize", parseInt(pSize));
		},

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
