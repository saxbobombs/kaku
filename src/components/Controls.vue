<template>
	<div>
		<ul class="control-container">
			<li>
				<b-button v-b-modal.modal-1>
					<i class="fas fa-image"></i>
				</b-button>
				<b-modal id="modal-1" title="image settings">

					<b-form>
						<b-form-group label="grid item size">
							<b-form-input
								v-on:change="changeGridItemSize"
								v-model="gridItemSize"
								class="griditemsize"
								type="number"
								min="1"
								max="100"
							/>
						</b-form-group>
						<b-form-group label="grid size">
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
						</b-form-group>
						<b-form-group label="show grid">
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
								</b-form-checkbox>
							</b-form-checkbox-group>
						</b-form-group>
						<b-form-group label="download">
							<b-dropdown class="control-button">
							<template #button-content>
								<i class="fas fa-file-download"></i> choose format
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
						</b-form-group>
					</b-form>
					</b-modal>
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
			<li>
				<v-swatches
					row-length="5"
					v-model="colorToUse"
					v-on:input="chooseColor"
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
				<b-button class="control-button">
					<i class="fas fa-undo" v-on:click="undo"></i>
				</b-button>
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
			_me.showGridLines = pDefaults.showGridLines;
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
