<template>
  <ul class="list-group">
    <li
      v-for="item in ships_order"
      :key="item.id"
      :id="item.groupID"
      :class="{'bg-white':isHighLight(item.groupID)}"
      class="list-group-item d-flex justify-content-between align-items-center text-info"
      @click="highLight"
    >
      {{ getTrans(item.id,'zh') }} / {{ getTrans(item.id,'en') }}
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
    ships_order() {
      let sortable = []
      for (let ship in this.ships) {
        sortable.push(this.ships[ship])
      }
      return sortable.sort((obj1, obj2) => {
        return obj2.amount - obj1.amount
      })
    }
  },
  methods: {
    getTrans(typeID, lang) {
      if (this.translation.type.hasOwnProperty(typeID)) {
        if (this.translation.type[typeID].hasOwnProperty(lang)) {
          return this.translation.type[typeID][lang]
        }
        return this.translation.type[typeID].en
      }
      return 'Undefined Item'
    },
    highLight(event) {
      this.$emit('highlight', event.target.id)
    },
    isHighLight(groupID) {
      return this.highlightgroup.includes(groupID.toString())
    }
  }
}
</script>
