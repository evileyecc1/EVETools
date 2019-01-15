<template>
  <section class="container-fluid align-center mt-3">
    <div>
      <div class="row">
        <div class="col-4">
          <h1 class="text-info">扫描结果</h1>
          <ships :ships="itemsInGroup"/>
        </div>
        <div class="col-4">
          <h1 class="text-success">舰船分类</h1>
          <groups :groups="scan_result"/>
          <div v-if="isFleetScan">
            <h1 class="text-info mt-3">所在星系</h1>
            <ul class="list-group">
              <li
                v-for="(value,key) in system_result"
                :key="key"
                class="list-group-item d-flex justify-content-between align-items-center text-success"
              >
                {{ key }}
                <span class="badge badge-primary badge-dark">{{ value }}</span>
              </li>
            </ul>
          </div>
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
import { baseUrl } from '~/utils/API'
import Ships from '~/components/Ships'
import Groups from '~/components/Groups'
export default {
  components: { Ships, Groups },
  asyncData({ params, error }) {
    return axios
      .get(baseUrl + `/scan/${params.id}`)
      .then(res => {
        let scan_result = res.data.scan_result
        let temp = scan_result.sort((a, b) => {
          return b.total - a.total
        })
        if (res.data.type == 'fleet_scan') {
          return {
            scan_result: temp,
            system_result: res.data.system_result,
            type: res.data.type
          }
        }
        return {
          type: res.data.type,
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
      return window.location.href
    },
    isFleetScan() {
      return this.$data.type == 'fleet_scan'
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
