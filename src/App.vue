<template>
    <h1>PixelArt</h1>
    
    <PixelArtControls />
    <PixelArtCanvas />
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
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
