<template>
  <div id="app">
    <h1>Fabric.js 高级功能演示</h1>
    <FabricCanvas :background-image="imageUrl" />
  </div>
</template>

<script>
import FabricCanvas from '@/components/FabricCanvas/index.vue';

export default {
  name: 'App',
  components: {
    FabricCanvas
  },
  data() {
    return {
      imageUrl: require('@/assets/images/a.jpg')
    }
  }
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  text-align: center;
  color: #2c3e50;
  margin-top: 20px;
}
</style>