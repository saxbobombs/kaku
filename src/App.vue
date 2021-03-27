<template>
    <div id="app">
        <h1>PixelArt</h1>
        
        <PixelArtControls />
        <PixelArtCanvas />
    </div>
</template>

<script>
import PixelArtControls from './components/PixelArtControls.vue'
import PixelArtCanvas from './components/PixelArtCanvas.vue'
import './../node_modules/bootstrap/dist/css/bootstrap.min.css';
import './../node_modules/bootstrap/dist/js/bootstrap.min.js';
import './../node_modules/@fortawesome/fontawesome-free/css/all.min.css';

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
