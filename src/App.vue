<template>
    <div id="app">
      <h1>PixelArt</h1>

      <b-container>
        <b-row>
          <b-col sm="3">
            <PixelArtControls />
          </b-col>
          <b-col>
        <div class="canvas-container">
          <PixelArtCanvas />
        </div>
          </b-col>
        </b-row>
      </b-container>
    </div>
</template>

<script>

import PixelArtControls from './components/PixelArtControls.vue'
import PixelArtCanvas from './components/PixelArtCanvas.vue'

export default {
  name: 'PixelArt',
  components: {
    PixelArtControls,
    PixelArtCanvas,
  }
}
</script>

<style>
#app{
  padding:10px;
}
.canvas-container{
		background:#eee;
		padding:10px;
    padding-top:50px;
		box-shadow:0 0 4px #aaa inset;
		margin:0 auto;
	}
</style>
