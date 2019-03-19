<template>
  <section class="container">
    <div>
      <h1 class="title text-info">似乎出错了</h1>
      <h3 v-if="error.statusCode === 404" class="subtitle text-success">此页面不存在</h3>
      <h3 v-else class="subtitle text-info">应用发生了一些错误，如果可以的话请将你的操作发送至admin@eve-info.net以帮助我们改进，谢谢</h3>
    </div>
  </section>
</template>

<script>
export default {
  //eslint-disable-next-line
  props: ['error'],
  layout: 'default'
}
</script>

<style>
.container {
  min-height: 70vh;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
}

.title {
  font-family: 'Quicksand', 'Source Sans Pro', -apple-system, BlinkMacSystemFont,
    'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
  display: block;
  font-weight: 300;
  font-size: 100px;
  color: #35495e;
  letter-spacing: 1px;
}

.subtitle {
  font-weight: 300;
  font-size: 42px;
  color: #526488;
  word-spacing: 5px;
  padding-bottom: 15px;
}

.links {
  padding-top: 15px;
}
</style>
