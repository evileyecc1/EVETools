<template>
  <section class="container-fluid align-center mt-3">
    <div>
      <div class="row">
        <div class="col-12">
          <b-alert :show="request_error" variant="danger" dismissible fade>
            <h4 class="alert-heading">请求发生了一些错误</h4>
            <p v-html="error_message"/>
          </b-alert>
        </div>
      </div>
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
        <div class="col-6"/>
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
export default {
  components: { bAlert },
  data() {
    return {
      scan_result: '',
      request_error: false,
      error_message: ''
    }
  },
  methods: {
    submit_scan() {
      this.$axios
        .post('http://api.eve-info.net/scan', { scan: this.$data.scan_result })
        .then(result => {
          this.$router.push({
            name: 'scan-id',
            params: { id: result.data.scan_result_id }
          })
        })
        .catch(err => {
          if (err.response.status == 422) {
            this.$data.request_error = true
            this.$data.error_message = '请使用正确的扫描结果'
          } else if (err.response.status == 500) {
            this.$data.request_error = true
            this.$data.error_message = '服务器出现了一点问题请稍后再试'
          }
        })
    }
  }
}
</script>
