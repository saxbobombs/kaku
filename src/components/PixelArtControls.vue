<template>
<div>
	<ul>
		<li>
			<b-dropdown class="pa-ctrl-btn rounded-0" dropright>
				<template #button-content>
					<i class="fas fa-th"></i> ({{gridSize}})
				</template>
				<b-dropdown-item v-for="g in gridSizes" :key="g.index" v-on:click="chooseGridSize(g.value)" :title="g.name">
					{{ g.name }}
				</b-dropdown-item>
			</b-dropdown>
		</li>
		<li>
			<b-dropdown class="pa-ctrl-btn" dropright>
				<template #button-content>
					<i class="fas fa-palette"></i>
				</template>
				<b-dropdown-item v-for="c in colors" :key="c.index">
					<b-button v-on:click="chooseColor(c.value)" :style="'background:#' + c.value" :title="c.name">
						<span>{{ c.name }}</span>
					</b-button>
				</b-dropdown-item>
			</b-dropdown>
		</li>
		<li>
			<b-button-group class="pa-ctrl-btn">
				<b-button v-for="m in drawModes" :key="m.index" v-on:click="chooseDrawMode(m.value)" :title="m.name">
					<i :class="'fas ' + m.icon " aria-hidden="true"></i>
				</b-button>
			</b-button-group>

		</li>
		<li>
			<b-button class="pa-ctrl-btn" href="#" v-on:click="downloadImage()">
				<i class="fas fa-file-download"></i> Download
			</b-button>
		</li>
	</ul>
  
</div>
</template>

<script>
import EventBus from "./../utils/EventBus";

export default {
	name: 'PixelArtControls',
	
		data() {
			return {
				gridSize: 8,
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
					name: 'Floodfill',
					icon: 'fa-fill-drip'
				},{
					value: 'simple',
					name: 'Dot',
					icon: 'fa-pencil-alt'
				}],
				gridSizes: [{
					name: '8',
					value: 8
				},{
					name: '12',
					value: 12
				},{
					name: '16',
					value: 16
				},{
					name: '32',
					value: 32
				}],
		}
	},

	methods: {
		chooseColor: function(pColor){
			EventBus.$emit("changeColor", pColor);
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
	ul{
		width:100%;
		list-style:none;
		padding:0;
	}
	li{
		margin-bottom:4px;
	}
	.pa-ctrl-btn{
		width:100%;
	}
</style>
