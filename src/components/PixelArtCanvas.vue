<template>
	<div>
		<canvas ref="canvas" v-on:click="draw($event)" v-on:mousedown="initLine($event)" width="0" height="0"></canvas>
	</div>
</template>

<script>

import EventBus from "./../utils/EventBus";
import PixelArtLib from "./../lib/PixelArtLib";

export default {
	name: 'PixelArtCanvas', 

	mounted(){
		const _me = this;

		PixelArtLib.init(_me.$refs.canvas);
		PixelArtLib.setGridSize(_me.gridSize);

		EventBus.$on('changeColor', function(pColorCode){
			_me.colorToUse = pColorCode;
		});

		EventBus.$on('changeDrawMode', function(pDrawMode){
			_me.drawMode = pDrawMode;
		});

		EventBus.$on('changeGridSize', function(pGridSize){
			_me.gridSize = pGridSize;
			PixelArtLib.setGridSize(pGridSize);
		});
		
		EventBus.$on('downloadImage', function(){
			PixelArtLib.downloadImage('pixelart_img');
		});
	},

	data() {
		return {
			colorToUse: 'f00',
			drawMode: 'simple',
			gridSize: 8
		}
	},

	methods: {
		draw: function(pEvent){
			const _me = this,
				_canvasPosX = _me.$refs.canvas.offsetLeft,
				_canvasPosY = _me.$refs.canvas.offsetTop;

			const _gridItem = PixelArtLib.getGridItemFromPosition(pEvent.clientX - _canvasPosX, pEvent.clientY - _canvasPosY);
			if(_gridItem){
				PixelArtLib.applyColor(_me.drawMode, _me.colorToUse, _gridItem);
			}
		},

		initLine: function(){
			var _me = this;

			var _mouseUp = function(){
				window.removeEventListener('mouseup', _mouseUp);
				window.removeEventListener('mousemove', _mouseMove);
			}
			var _mouseMove = function(pEvent){
				_me.draw(pEvent);

			}
			window.addEventListener('mouseup', _mouseUp);
			window.addEventListener('mousemove', _mouseMove);
		}
	}
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
