<template>
  <b-navbar class="navbar navbar-expand-lg navbar-light bg-light">
    <div class="navbar-css container-fluid">
      <a class="navbar-brand" href="#">Eve Tools</a>
      <div id="navbarSupportedContent" class="collapse navbar-collapse">
        <ul class="navbar-nav mr-auto">
          <li class="nav-item">
            <a class="nav-link" href="#">首页</a>
          </li>
          <li class="nav-item">
            <nuxt-link class="nav-link" to="/scan">扫描工具</nuxt-link>
          </li>
        </ul>
      </div>
    </div>
  </b-navbar>
</template>

<style lang="css">
.navbar-css {
  max-width: 1170px;
}
</style>
<script>
import bNavbar from 'bootstrap-vue/es/components/navbar/navbar'
export default {}
</script>
