<template>
  <section class="container-fluid align-center mt-3">
    <div>
      <div class="row">
        <div class="col-12 col-lg-4">
          <h1 class="text-info">公司统计</h1>
          <ul class="list-group">
            <li v-for="(value,key) in corporations" :key="key" class="list-group-item d-flex justify-content-between align-items-center text-success">
              <b-img :src="getImageServer(key,'Corporation',32)" rounded alt="Corporation image"/>
              {{ getCorporationName(key) }}
              <span class="badge badge-primary badge-dark">{{ value }}</span>
            </li>
          </ul>
        </div>
        <div class="col-12 col-lg-4">
          <h1 class="text-success">联盟统计</h1>
          <ul class="list-group">
            <li v-for="(value,key) in alliances" :key="key" class="list-group-item d-flex justify-content-between align-items-center text-info">
              <b-img :src="getImageServer(key,'Alliance',32)" rounded alt="Rounded image"/>{{ getAllianceName(key) }}
              <span class="badge badge-primary badge-dark">{{ value }}</span>
            </li>
          </ul>
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
import { bImg } from 'bootstrap-vue'
import { getBaseUrl } from '~/utils/API'
import FastCopy from '~/components/FastCopy'
export default {
  components: {
    FastCopy
  },
  asyncData({ params, error }) {
    return axios
      .get(getBaseUrl() + `/scan/${params.id}`)
      .then(res => {
        return {
          ...res.data
        }
      })
      .catch(e => {
        error({
          statusCode: 404,
          message: '无法找到此扫描结果'
        })
      })
  },
  data() {
    return {
      mainProps: {
        blank: true,
        blankColor: '#777',
        width: 32,
        height: 32
      }
    }
  },
  computed: {},
  methods: {
    getImageServer(id, type, width) {
      let suffix = 'png'
      if (type == 'Character') suffix = jpg
      return (
        'https://imageserver.eveonline.com/' +
        type +
        '/' +
        id +
        '_' +
        width +
        '.' +
        suffix
      )
    },
    getAllianceName(alliance_id) {
      if (this.alliances_detail.hasOwnProperty(alliance_id)) {
        return this.alliances_detail[alliance_id].name
      }
      return 'Unknown Alliances '.alliance_id
    },
    getCorporationName(corporation_id) {
      console.log('Get corporation name' + corporation_id)
      if (this.corporations_detail.hasOwnProperty(corporation_id)) {
        console.log('Target in')
        return this.corporations_detail[corporation_id].name
      }
      return 'Unknown Corporation '.corporation_id
    }
  }
}
</script>
