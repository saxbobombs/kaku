<template>
<div>
	<ul class="control-container">
		<li>
			<b-dropdown class="control-button">
				<template #button-content>
					<i class="fas fa-th"></i>
				</template>
				<b-dropdown-item v-for="g in gridSizes" :key="g.index" v-on:click="chooseGridSize(g.value)" :title="g.name">
					{{ g.name }}
				</b-dropdown-item>
			</b-dropdown>
		</li>
		<li>
			<v-swatches row-length="5" v-model="colorToUse" v-on:input="chooseColor">
				<b-button class="control-button" slot="trigger">
					<i class="fas fa-palette"></i> <span class="color-preview" :style="'background:' + colorToUse"></span>
				</b-button>
			</v-swatches>
			
		</li>
		<li>
			<b-form-radio-group class="control-button drawmode" buttons v-model="drawMode" v-on:change="chooseDrawMode">
				<template v-for="option in drawModes">
					<b-form-radio :value="option.value" :key="option.index" >
						<i :class="'fas '+option.icon "></i>
					</b-form-radio>
				</template>
			</b-form-radio-group>

		</li>
		<li class="right">
			<b-button class="control-button" href="#" v-on:click="downloadImage()">
				<i class="fas fa-file-download"></i> Download
			</b-button>
		</li>
	</ul>  
</div>
</template>

<script>

import EventBus from "./../utils/EventBus";
import VSwatches from "vue-swatches"
import "vue-swatches/dist/vue-swatches.css"

export default {
	name: 'PixelArtControls',
		components: {
			VSwatches
		},

		mounted(){
			var _me = this;

			// var colorPicker = new Iro.ColorPicker('#picker');
			// console.log(colorPicker);

			EventBus.$on('setConfigDefaults', function(pDefaults){
				_me.gridSize = pDefaults.gridSize;
				_me.colorToUse = pDefaults.colorToUse;
				_me.drawMode = pDefaults.drawMode;
			});
		},
	
		data() {
			return {
				gridSize: null,
				colorToUse: null,
				drawMode: null,
				colors: [{
					name: 'rot',
					value: 'f00'
				}, {
					name: 'blau',
					value: '00f'
				}, {
					name: 'grün',
					value: '0f0'
				}],
				drawModes: [{
					value: 'floodfill',
					text: 'Floodfill',
					icon: 'fa-fill-drip'
				},{
					value: 'simple',
					text: 'Pencil',
					icon: 'fa-pencil-alt'
				}],
				gridSizes: [{
					name: '8x8',
					value: 8
				},{
					name: '12x12',
					value: 12
				},{
					name: '16x16',
					value: 16
				},{
					name: '32x32',
					value: 32
				}],
		}
	},

	methods: {
		swatches: function(){
			console.log(arguments);
		},

		openColorPicker: function(){
			var _me = this;
			_me.$refs['color-picker-modal'].show()
		},

		chooseColor: function(pColor){
			EventBus.$emit("changeColor", pColor);
			this.colorToUse = pColor;

		},
		chooseDrawMode: function(pDrawMode){
			EventBus.$emit("changeDrawMode", pDrawMode);
		},
		chooseGridSize: function(pGridSize){
			this.gridSize = pGridSize;
			EventBus.$emit("changeGridSize", pGridSize);
		},
		downloadImage: function(){
			EventBus.$emit("downloadImage");
		}
	}
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
	.control-container{
		width:100%;
		list-style:none;
		padding:0;
		margin:0;
	}
	.control-container>li{
		margin-bottom:4px;
		margin-right:4px;
		display: inline-block;
	}
		
	.color-preview{
		display:inline-block;
		width:2em;
		height:1.5em;
		border:1px solid;
		vertical-align: top;
	}

</style>

<style>
	.input-group.color-picker input{
		flex:1;
	}
</style>
