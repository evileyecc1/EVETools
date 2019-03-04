<template lang="html">
  <div class="">
    <h1 class="text-info">本页链接</h1>
    <input v-model="current_link" type="text" class="form-control form-control-lg">
    <button
      v-clipboard:copy="current_link"
      v-clipboard:success="onCopy"
      v-clipboard:error="onError"
      type="button"
      class="btn btn-block btn-large mt-3 btn-secondary"
    >{{ copy_button_text }}</button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      copy_button_text: '点击复制'
    }
  },
  computed: {
    current_link() {
      return window.location.href
    }
  },
  methods: {
    onCopy(e) {
      this.$data.copy_button_text = '复制成功'
    },
    onError(e) {
      this.$data.copy_button_text = '复制失败'
    }
  }
}
</script>
