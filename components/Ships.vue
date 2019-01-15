<template>
  <ul class="list-group">
    <li
      v-for="item in ships"
      :key="item.typeID"
      class="list-group-item d-flex justify-content-between align-items-center text-info"
    >
      {{ item.names.hasOwnProperty('zh') ? item.names.zh : item.names.en }} / {{ item.names.en }}
      <span
        class="badge badge-primary badge-info"
      >{{ item.amount }}</span>
    </li>
  </ul>
</template>
<script>
export default {
  props: {
    ships: {
      type: Array,
      default() {
        return []
      }
    }
  }
}
</script>
