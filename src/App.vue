<template>
    <div id="app">
      <b-container>
        <h1>PixelArt</h1>
        
        <div class="control-container">
          <PixelArtControls />
        </div>
        <div class="canvas-container">
          <PixelArtCanvas />
        </div>
        
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
html{
  background:#eee;
}

#app{
  padding:10px;
  background:#eee;
}

.control-container{
  background:#eee;
  
}
.canvas-container{
		background:#fff;
		padding:10px;
		box-shadow:0 0 4px #aaa inset;
		margin:0 auto;
    overflow:auto;
}
.canvas-container canvas{
  display:block;
  margin:0 auto;
}
</style>
