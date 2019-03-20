<template>
  <section class="container-fluid align-center mt-3">
    <div>
      <div class="row">
        <div class="col-6">
          <div class="card" variant="dark">
            <div class="card-header">Dscan/FleetScan/LocalScan</div>
            <div class="card-body">
              <form>
                <div class="row">
                  <textarea id v-model="scan_result" cols="30" rows="10" class="col-lg-12"/>
                  <div class="wd-100"/>
                  <button
                    type="button"
                    class="btn btn-large btn-block mt-3 btn-primary"
                    @click="submit_scan"
                  >提交</button>
                </div>
              </form>
            </div>
          </div>
        </div>
        <div class="col-6">
          <div class="card bg-light mb-3" style="max-width: 100%;">
            <div class="card-header">使用说明</div>
            <div class="card-body">
              <h4 class="card-title">如何使用</h4>
              <p
                class="card-text"
              >打开舰载扫描器, 在扫描结果任选一行, 然后猛敲 CTRL + A, 再敲 CTRL + C, 最后在这个页面的左边框框用力敲 CTRL + V .</p>
              <p
                class="card-text"
              >打开舰队左上角的菜单, 显示舰队编制, 然后猛敲 CTRL + A, 再敲 CTRL + C, 最后在这个页面的左边框框用力敲 CTRL + V .</p>

              <h4 class="card-title mt-3 text-info">更新日志</h4>
              <p class="card-text">2019.3.19 LocalScan(Beta)上线，修复bug</p>
              <p class="card-text">2019.1.15 FleetScan上线</p>
            </div>
          </div>
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
import bAlert from 'bootstrap-vue/es/components/alert/alert'
import { getBaseUrl } from '~/utils/API'
export default {
  components: { bAlert },
  data() {
    return {
      scan_result: '',
      request_error: false,
      error_message: ''
    }
  },
  notifications: {
    showSubmitError: {
      title: '提交扫描结果失败',
      message: '提交时发生错误',
      type: 'error'
    }
  },
  methods: {
    submit_scan() {
      this.$axios
        .post(getBaseUrl() + '/scan', { scan: this.$data.scan_result })
        .then(result => {
          this.$router.push({
            name: 'scan-' + result.data.scan_type + '-id',
            params: { id: result.data.scan_id }
          })
        })
        .catch(err => {
          this.showSubmitError({ message: err.response.data.message })
        })
    }
  }
}
</script>
