<template>
  <section class="container-fluid align-center mt-3">
    <div>
      <div class="row">
        <div class="col-4">
          <h1 class="text-info">扫描结果</h1>
          <ul class="list-group">
            <li
              v-for="item in itemsInGroup"
              :key="item.typeID"
              class="list-group-item d-flex justify-content-between align-items-center text-info"
            >
              {{ item.names.hasOwnProperty('zh') ? item.names.zh : item.names.en }} / {{ item.names.en }}
              <span
                class="badge badge-primary badge-info"
              >{{ item.amount }}</span>
            </li>
          </ul>
        </div>
        <div class="col-4">
          <h1 class="text-success">舰船分类</h1>
          <ul class="list-group">
            <li
              v-for="group in scan_result"
              :key="group.groupID"
              class="list-group-item d-flex justify-content-between align-items-center text-success"
            >
              {{ group.names.hasOwnProperty('zh') ? group.names.zh : group.names.en }} / {{ group.names.en }}
              <span
                class="badge badge-primary badge-dark"
              >{{ group.total }}</span>
            </li>
          </ul>
        </div>
        <div class="col-4">
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
      </div>
    </div>
  </section>
</template>
<style lang="css">
.container-fluid {
  max-width: 1170px;
}
</style>
<script>
import axios from 'axios'
export default {
  components: {},
  asyncData({ params, error }) {
    return axios
      .get(`http://api.eve-info.net/scan/${params.id}`)
      .then(res => {
        let scan_result = res.data.scan_result
        let temp = scan_result.sort((a, b) => {
          return b.total - a.total
        })
        return {
          scan_result: temp
        }
      })
      .catch(e => {
        error({ statusCode: 404, message: '无法找到此扫描结果' })
      })
  },
  data() {
    return {
      copy_button_text: '点击复制'
    }
  },
  computed: {
    itemsInGroup() {
      return this.$data.scan_result
        .map(item => item.items)
        .sort((a, b) => {
          return b.amount - a.amount
        })
        .flat()
    },
    current_link() {
      return 'http://tools.eve-info.net' + this.$route.path
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
