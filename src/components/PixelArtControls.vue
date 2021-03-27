<template>
		<fieldset>
			<ul class="colors">
				<li v-for="c in colors" :key="c.index">
					<button type="button" v-on:click="chooseColor(c.value)" :style="'background:#' + c.value" :title="c.name">
						<span>{{ c.name }}</span>
					</button>
				</li>
			</ul>
			<ul class="drawmode">
				<li v-for="m in drawModes" :key="m.index">
					<button type="button" class="btn btn-primary" v-on:click="chooseDrawMode(m.value)" :title="m.name">
						<i :class="'fas ' + m.icon " aria-hidden="true"></i>
					</button>
				</li>
			</ul>
			<ul class="gridSize">
				<li v-for="g in gridSizes" :key="g.index">
					<button type="button" class="btn btn-primary" v-on:click="chooseGridSize(g.value)" :title="g.name">
						{{ g.name }}
					</button>
				</li>
			</ul>

			<button class="btn btn-primary" v-on:click="downloadImage"><i class="fas fa-file-download"></i> Download</button>

			{{colorToUse}}
		</fieldset>
</template>

<script>
import EventBus from "./../utils/EventBus";

export default {
	name: 'PixelArtControls',
	
		data() {
			return {		
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
				}]
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

fieldset{
	display:inline-block;
	vertical-align:top;
}
button span{
	display:none;
}

.colors{
	list-style:none;
	margin:0;
	padding:0;
}
.colors li{
	display:inline-block;
}
.colors button{
		margin:1px;
		border:1px solid #000;
		width:10px;
		height:10px;
		padding:0;
}
</style>
