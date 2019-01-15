<template>
  <ul class="list-group">
    <li
      v-for="group in groups"
      :key="group.groupID"
      class="list-group-item d-flex justify-content-between align-items-center text-success"
    >
      {{ group.names.hasOwnProperty('zh') ? group.names.zh : group.names.en }} / {{ group.names.en }}
      <span
        class="badge badge-primary badge-dark"
      >{{ group.total }}</span>
    </li>
  </ul>
</template>
<script>
export default {
  props: {
    groups: {
      type: Array,
      default() {
        return []
      }
    }
  }
}
</script>
