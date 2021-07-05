<template>
  <div id="app">
    <div id="header">
      <b-container>
        <h1>kaku</h1>
      </b-container>
    </div>
    <b-container>
      <b-toast
        class="browser-comp"
        ref="browser-comp"
        static
        title="browser compatibility"
        no-auto-hide
      >
        please use a modern browser to avoid unexpected behavior.
      </b-toast>
      <div class="control-container">
        <Controls />
      </div>
      <div class="canvas-container">
        <DrawingPad />
      </div>
    </b-container>
  </div>
</template>

<script>
import Controls from "./components/Controls.vue";
import DrawingPad from "./components/DrawingPad.vue";
import Utils from "./utils/Utils";

export default {
  name: "kaku",
  components: {
    Controls,
    DrawingPad,
  },

  mounted() {
    var _me = this;

    // check browser
    if (!Utils.browserIsCompatible()) {
      _me.$refs["browser-comp"].show();
    }
  },
};
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Alegreya+Sans+SC:wght@100&display=swap');

html {
  background: #efefef;
}

body {
  color: #222 !important;
}

#header {
  background: #fff;
  margin: -15px;
  padding-top: 15px;
  padding-bottom: 15px;
  margin-bottom: 10px;
  border: 1px solid #fff;
  box-shadow: 0 0 4px #444 inset;
  font-family: 'Alegreya Sans SC', sans-serif;
}

#header h1 {
  margin: 0;
}
#header h1 img {
  vertical-align: top;
  display: inline-block;
  margin-top: 8px;
}
#header p {
  margin: 0;
}

#app {
  padding: 10px;
  background: #efefef;
}

.canvas-container {
  background: #fff;
  border: 1px solid #fff;
  padding: 10px;
  box-shadow: 0 0 4px #444 inset;
  margin: 0 auto;
  overflow: auto;
}

.canvas-container canvas {
  display: block;
  margin: 0 auto;
}

.browser-comp {
  border-radius: 0 !important;
  max-width: none !important;
  color: #444;
}

.browser-comp .toast {
  box-shadow: none !important;
  border-radius: 0 !important;
  width: 100% !important;
  max-width: none !important;
}
</style>
