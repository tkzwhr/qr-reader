<template>
  <div>
    <v-list two-line subheader v-if="items.length > 0">
      <v-list-tile avatar v-for="item in items" :key="item.memo.raw">
        <v-list-tile-avatar>
          <v-icon>{{ item.memo.type }}</v-icon>
        </v-list-tile-avatar>
        <v-list-tile-content>
          <v-list-tile-title><span v-html="item.memo.html"></span></v-list-tile-title>
          <v-list-tile-sub-title>{{ item.scanDate | moment('YYYY/MM/DD HH:mm') }}</v-list-tile-sub-title>
        </v-list-tile-content>
        <v-list-tile-action>
          <v-menu bottom left>
            <v-btn icon slot="activator">
              <v-icon>more_vert</v-icon>
            </v-btn>
            <v-list>
              <v-list-tile @click="">
                <v-list-tile-avatar>
                  <v-icon>content_copy</v-icon>
                </v-list-tile-avatar>
                <v-list-tile-title>Copy</v-list-tile-title>
              </v-list-tile>
              <v-list-tile @click="remove(item.id)">
                <v-list-tile-avatar>
                  <v-icon>delete</v-icon>
                </v-list-tile-avatar>
                <v-list-tile-title>Delete</v-list-tile-title>
              </v-list-tile>
            </v-list>
          </v-menu>
        </v-list-tile-action>
      </v-list-tile>
    </v-list>
    <!-- No entries -->
    <v-card v-else>
      <v-card-text>
        <p class="text-sm-center">データがありません</p>
      </v-card-text>
    </v-card>
  </div>
</template>

<script>
  import memo from '@/models/memo'

  export default {
    name: 'history',
    data () {
      return {
      }
    },
    computed: {
      items () {
        return this.$store.state.scannedList.map(t => ({id: t.id, memo: memo(t.text), scanDate: t.scanDate}))
      }
    },
    methods: {
      remove (id) {
        this.$store.commit('removeScannedText', id)
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>

</style>
