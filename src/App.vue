<template>
  <v-app>
    <v-toolbar color="primary" v-if="isRootView">
      <v-toolbar-title class="white--text">QR Reader</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn icon to="/history">
        <v-icon class="white--text">history</v-icon>
      </v-btn>
      <v-btn icon @click.stop="settingsDialog = true">
        <v-icon class="white--text">settings</v-icon>
      </v-btn>
    </v-toolbar>
    <v-toolbar color="primary" v-else>
      <v-btn icon @click.stop="$router.go(-1)">
        <v-icon class="white--text">arrow_back</v-icon>
      </v-btn>
      <v-toolbar-title class="white--text">QR Reader</v-toolbar-title>
    </v-toolbar>

    <main>
      <router-view></router-view>
    </main>

    <!-- Settings Dialog -->
    <v-dialog v-model="settingsDialog" max-width="500px">
      <settings ref="settings" @close="settingsDialog = false" />
    </v-dialog>
  </v-app>
</template>

<script>
  import { mapMutations, mapActions } from 'vuex'
  import Settings from './components/Settings'

  export default {
    name: 'app',
    components: {
      Settings
    },
    data () {
      return {
        isRootView: true,
        settingsDialog: false
      }
    },
    watch: {
      '$route': function (value) {
        this.isRootView = ['/'].includes(value.path)
      },
      settingsDialog (value) {
        if (value) {
          this.list(navigator)
        }
      }
    },
    methods: {
      ...mapMutations('mediaDevices', ['initialize']),
      ...mapActions('mediaDevices', ['list'])
    },
    mounted () {
      this.initialize()
    }
  }
</script>

<style>
  body {
    margin: 0;
  }

  #app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    color: #2c3e50;
  }

  main {
    text-align: center;
    margin-top: 20px;
  }

  h1, h2 {
    font-weight: normal;
  }

  ul {
    list-style-type: none;
    padding: 0;
  }

  li {
    display: inline-block;
    margin: 0 10px;
  }

  a {
    color: #35495E;
  }
</style>
