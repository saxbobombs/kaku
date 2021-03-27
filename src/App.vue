<template>
    <div id="app">
      <div id="header">
        <b-container>
          <h1><img src="@/assets/pixelart_img.png" alt=""> PixelArt</h1>
          <p>draw something</p>
        </b-container>
      </div>
      <b-container>
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
  background:#efefef;
}
body{
  color:#218838 !important;
}
#header h1{
  border-bottom:1px solid;
  margin:0;
}
#header h1 img{
  vertical-align: top;
  display:inline-block;
  margin-top:8px;
}
#header p{
  margin:0;
}

#app{
  padding:10px;
  background:#efefef;
}
#header{
  background:#fff;
  margin:-15px;
  padding-top:15px;
  padding-bottom:15px;
  margin-bottom:10px;
  border:1px solid #fff;
  box-shadow:0 0 4px #444 inset;
}

.canvas-container{
		background:#fff;
    border:1px solid #fff;
		padding:10px;
		box-shadow:0 0 4px #444 inset;
		margin:0 auto;
    overflow:auto;
}
.canvas-container canvas{
  display:block;
  margin:0 auto;
}
</style>
