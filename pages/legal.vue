<template>
  <section class="container-fluid align-center mt-3">
    <h1>
      CCP Copyright Notice
    </h1>
    <span>
      EVE Online and the EVE logo are the registered trademarks of CCP hf. All rights are reserved worldwide. All other trademarks are the property of their respective owners. EVE Online, the EVE logo, EVE and all associated logos and designs are the intellectual property of CCP hf. All artwork, screenshots, characters, vehicles, storylines, world facts or other recognizable features of the intellectual property relating to these trademarks are likewise the intellectual property of CCP hf. CCP hf. has granted permission to eve-info.net to use EVE Online and all associated logos and designs for promotional and information purposes on its website but does not endorse, and is not in any way affiliated with, eve-info.net. CCP is in no way responsible for the content on or functioning of this website, nor can it be liable for any damage arising from the use of this website.
    </span>
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
            name: 'scan-id',
            params: { id: result.data.scan_result_id }
          })
        })
        .catch(err => {
          this.showSubmitError({ message: err.response.data.message })
        })
    }
  }
}
</script>
