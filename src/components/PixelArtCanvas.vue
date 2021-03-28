<template>
	<canvas ref="canvas" v-on:click="draw($event)" v-on:mousedown="initSimpleLine($event)" width="0" height="0"></canvas>
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

		// the controls need to know what to select first
		EventBus.$emit('setConfigDefaults', {
			gridSize: _me.gridSize,
			colorToUse: _me.colorToUse,
			drawMode: _me.drawMode
		});

		// listen to events from controls
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
		
		EventBus.$on('downloadImage', function(pImageType){
			PixelArtLib.downloadImage('pixelart_img', pImageType);
		});
	},

	data() {
		return {
			// defaults
			colorToUse: '#27AF60',
			drawMode: 'simple',
			gridSize: 8
		}
	},

	methods: {
		/**
		 * get the clicked grid item and color it with drawmode
		 * 
		 * @param {pEvent} - PointerEvent
		 */
		draw: function(pEvent){
			const _me = this,
				_canvasBoundingClientRect = _me.$refs.canvas.getBoundingClientRect(), // to get the position relative to viewport
				_canvasPosX = _canvasBoundingClientRect.left,
				_canvasPosY = _canvasBoundingClientRect.top;

			const _gridItem = PixelArtLib.getGridItemFromPosition(pEvent.clientX - _canvasPosX, pEvent.clientY - _canvasPosY);
			if(_gridItem){
				PixelArtLib.applyDrawMode(_me.drawMode, _me.colorToUse, _gridItem);
			}
		},

		/**
		 * to draw a line in simple mode, events need to be bound
		 */
		initSimpleLine: function(){
			var _me = this;

			if(_me.drawMode !== 'simple'){
				return;
			}

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
