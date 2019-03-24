<template>
  <ul class="list-group">
    <li
      v-for="group in groups_order"
      :key="group[0]"
      :id="group[0]"
      :class="{'bg-white':isHighLight(group[0])}"
      class="list-group-item d-flex justify-content-between align-items-center text-success"
      @click="highLight"
    >
      {{ getTrans(group[0],'zh') }} / {{ getTrans(group[0],'en') }}
      <span
        class="badge badge-primary badge-dark"
      >{{ group[1] }}</span>
    </li>
  </ul>
</template>
<script>
export default {
  props: {
    groups: {
      type: Object,
      default() {
        return []
      }
    },
    translation: {
      type: Object,
      default() {
        return []
      }
    },
    highlightgroup: {
      type: Array,
      default() {
        return []
      }
    }
  },
  computed: {
    groups_order() {
      let sortable = []
      for (let group in this.groups) {
        sortable.push([group, this.groups[group]])
      }
      return sortable.sort((obj1, obj2) => {
        return obj2[1] - obj1[1]
      })
    }
  },
  methods: {
    getTrans(groupID, lang) {
      if (this.translation.group.hasOwnProperty(groupID)) {
        if (this.translation.group[groupID].hasOwnProperty(lang)) {
          return this.translation.group[groupID][lang]
        }
        return this.translation.group[groupID].en
      }
      return 'Undefined Item'
    },
    highLight(event) {
      this.$emit('highlight', event.target.id)
    },
    isHighLight(groupID) {
      return this.highlightgroup.includes(groupID)
    }
  }
}
</script>
