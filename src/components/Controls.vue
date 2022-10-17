<template>
	<div>
		<div class="version"><Version /></div>
		<ul class="control-container">
			<li>
				<b-button class="control-button" v-b-modal.image-settings-window v-b-tooltip.hover.right title="image settings">
					<i class="fas fa-image"></i>
				</b-button>
				<ImageSettingsWindow v-on:submit="onImageSettingsWindowSubmit" />
			</li>
			<li>
				<b-form-checkbox-group class="control-button grid-size-container" buttons>
					<b-form-checkbox v-on:change="changeShowGridLines" v-model="showGridLines" value="1"
						unchecked-value="0" v-b-tooltip.hover.right title="show/hide grid">
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
				<b-form-radio-group stacked class="control-button drawmode" buttons v-model="drawMode"
					v-on:change="chooseDrawMode">
					<b-form-radio value="move" key="move" v-b-tooltip.hover.right title="Move Canvas">
						<i class="fas fa-arrows-alt"></i>
					</b-form-radio>
					<template v-for="option in drawModes">
						<b-form-radio :value="option.value" :key="option.index" v-b-tooltip.hover.right :title="option.text">
							<i :class="option.icon"></i>
						</b-form-radio>
					</template>
				</b-form-radio-group>
			</li>
			<li>
				<vue-color-picker v-model="colorToUse" class="btn control-button btn-secondary fas fa-palette"
					v-b-tooltip.hover.right title="Color" v-on:change="chooseColor" />
			</li>
			<li>
				<b-button class="control-button" v-b-tooltip.hover.right title="undo">
					<i class="fas fa-undo" v-on:click="undo"></i>
				</b-button>
			</li>
			<li>
				<b-dropdown class="control-button" v-b-tooltip.hover.right title="download image">
					<template #button-content>
						<i class="fas fa-file-download"></i>
					</template>
					<b-dropdown-item v-on:click="downloadImage('png')">PNG</b-dropdown-item>
					<b-dropdown-item v-on:click="downloadImage('jpg')">JPG</b-dropdown-item>
					<b-dropdown-item v-on:click="downloadImage('gif')">GIF</b-dropdown-item>
				</b-dropdown>
			</li>
		</ul>
	</div>
</template>

<script>

import Vue from 'vue';
import VueColorPicker from '@duoa/vue-color-picker';
import '@duoa/vue-color-picker/dist/vue-color-picker.css';

// Register
Vue.use(VueColorPicker);

import EventBus from "../utils/EventBus";
import ImageSettingsWindow from './ImageSettingsWindow.vue';
import Version from './Version.vue';

export default {
	name: "Controls",
	components: {
		ImageSettingsWindow,
		Version
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

		EventBus.$on("changeColor", function(pColor) {
			if (pColor != '#00000000') {
				_me.colorToUse = pColor;
			}
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
					icon: "fas fa-fill-drip fa-flip-horizontal",
				},
				{
					value: "simple",
					text: "Pencil",
					icon: "fas fa-pencil-alt",
				},
				{
					value: "line",
					text: "Line",
					icon: "fas fa-pencil-ruler",
				},
				{
					value: "square",
					text: "Square",
					icon: "k-icon k-icon-square-o-white"
				},
				{
					value: "circle",
					text: "Circle",
					icon: "far fa-circle"
				},
				{
					value: "erase",
					text: "Eraser",
					icon: "fas fa-eraser",
				},
				{
					value: "flooderase",
					text: "FloodEraser",
					icon: "fas fa-fill-drip",
				},
				{
					value: "pipette",
					text: "Pipette",
					icon: "fas fa-eye-dropper",
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

		onImageSettingsWindowSubmit: function (pSettings) {
			var _me = this;

			switch (pSettings.mode) {
				case 0: // 8bit
					_me.changeGridItemSize(pSettings.gridItemSize);
					_me.chooseGridSize(pSettings.gridSize);
					break;
				case 1: // photo
					_me.changeGridItemSize(1);
					_me.chooseGridSize(pSettings.gridWidth + 'x' + pSettings.gridHeight);
					_me.changeShowGridLines('0');
					break;
			}
		},

		undo: function () {
			EventBus.$emit("undo");
		},

		changeGridItemSize: function (pSize) {
			EventBus.$emit("changeGridItemSize", parseInt(pSize));
		},

		changeShowGridLines: function (pIsChecked) {
			EventBus.$emit("changeShowGridLines", pIsChecked + '' === '1' ? true : false);
		},
		/**
		 * publish color change
		 */
		chooseColor: function (pColor) {
			EventBus.$emit("changeColor", pColor);
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
