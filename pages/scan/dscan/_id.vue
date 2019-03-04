<template>
  <section class="container-fluid align-center mt-3">
    <div>
      <div class="row">
        <div class="col-12 col-lg-4">
          <h1 class="text-info">扫描结果</h1>
          <Ships :ships="types" :translation="translation"/>
        </div>
        <div class="col-12 col-lg-4">
          <h1 class="text-success">舰船分类</h1>
          <Groups :groups="groups" :translation="translation"/>
        </div>
        <div class="col-12 col-lg-4">
          <fast-copy />
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
import FastCopy from '~/components/FastCopy'
export default {
  components: { Ships, Groups, FastCopy },
  asyncData({ params, error }) {
    return axios
      .get(baseUrl + `/scan/${params.id}`)
      .then(res => {
        return { ...res.data }
      })
      .catch(e => {
        error({ statusCode: 404, message: '无法找到此扫描结果' })
      })
  },
  data() {},
  computed: {},
  methods: {}
}
</script>
