<template>
  <v-card>
    <v-card-title>
      <span>設定</span>
    </v-card-title>
    <v-card-text>
      <v-select
        :items="camera.devices"
        label="使用するカメラ"
        item-text="label"
        item-value="deviceId"
        v-model="selectedCamera"
      ></v-select>
    </v-card-text>
    <v-card-actions>
      <v-spacer></v-spacer>
      <v-btn color="primary" flat @click.stop="$emit('close')">閉じる</v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
  import { mapState, mapMutations } from 'vuex'

  export default {
    name: 'settings',
    data () {
      return {
      }
    },
    computed: {
      selectedCamera: {
        get () {
          return this.camera.selected
        },
        set (value) {
          this.select(value)
        }
      },
      ...mapState('mediaDevices', ['camera'])
    },
    methods: {
      ...mapMutations('mediaDevices', ['select'])
    }
  }
</script>

<style scoped>
</style>
