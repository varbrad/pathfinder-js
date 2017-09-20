<template>
  <div id="app">
    <canvas ref="canvas"></canvas>
  </div>
</template>

<script>
import { start } from './pathfinder'

export default {
  name: 'app',
  mounted () {
    start(this.$refs.canvas)
  }
}
</script>

<style lang="scss">
html, body, #app {
  margin: 0;
  padding: 0;
  width: 100%;
  height: 100%;
  overflow: hidden;
}

#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;

  > canvas {
    width: 100%;
    height: 100%;
    background: radial-gradient(#dcdcdc, #c9c9c9);
  }
}
</style>
