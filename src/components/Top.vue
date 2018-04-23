<template>
  <div>
    <!-- Camera -->
    <div>
      <canvas ref="canvas"></canvas>
      <video ref="video" autoplay></video>
    </div>

    <!-- Read Dialog -->
    <v-dialog v-model="scannedDialog" max-width="500px">
      <v-card>
        <v-card-title>
          <span>読み取りました</span>
        </v-card-title>
        <v-card-text>
          <v-icon>{{ scannedMemo.type }}</v-icon>
          <span v-html="scannedMemo.html"></span>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="primary" flat @click.stop="save">保存する</v-btn>
          <v-btn flat @click.stop="scanned = null">閉じる</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <!-- Saved Snackbar -->
    <v-snackbar :timeout=3000 v-model="savedSnackbar">保存しました</v-snackbar>
  </div>
</template>

<script>
  import { mapState, mapMutations, mapActions } from 'vuex'
  import memo from '@/models/memo'
  import camera from '@/models/camera'
  import qrDecoder from '@/models/qrdecoder'

  export default {
    name: 'top',
    data () {
      return {
        scanned: null,
        savedSnackbar: false
      }
    },
    watch: {
      'camera.selected': function (value) {
        if (value === undefined) {
          this.list(navigator)
            .then(() => {
              this.select(this.camera.devices[0].deviceId)
            })
        } else if (value) {
          camera.start(navigator, value)
        } else {
          camera.stop()
        }
      }
    },
    computed: {
      scannedMemo () {
        if (this.scanned) {
          return memo(this.scanned)
        }

        return memo('')
      },
      scannedDialog () {
        return this.scanned !== null
      },
      ...mapState('mediaDevices', ['camera'])
    },
    methods: {
      capture (data) {
        qrDecoder.decode(data)
      },
      decode (err, data) {
        if (!err && data) {
          this.scanned = data
        }
      },
      save () {
        this.$store.commit('saveScannedText', this.scanned)

        this.scanned = null

        this.savedSnackbar = true
      },
      ...mapMutations('mediaDevices', ['select']),
      ...mapActions('mediaDevices', ['list'])
    },
    created () {
      camera.setCallback(this.capture)
      qrDecoder.setCallback(this.decode)
    },
    mounted () {
      camera.setDOMRefs(this.$refs.video, this.$refs.canvas)
      camera.start(navigator, this.camera.selected)
    },
    beforeDestroy () {
      camera.stop()
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
video {
  width: 100%;
}

canvas {
  display: none;
}
</style>
