class Camera {
  constructor (fps) {
    this.fps = fps
  }

  setDOMRefs (videoRef, canvasRef) {
    this.videoRef = videoRef
    this.canvasRef = canvasRef
  }

  setCallback (callback) {
    this.callback = callback
  }

  start (navigator, deviceId) {
    if (!deviceId || deviceId.length === 0) {
      return
    }

    this.stop()

    const constraints = {
      audio: false,
      video: { optional: [ { sourceId: deviceId } ] }
    }

    const self = this
    return navigator.mediaDevices
      .getUserMedia(constraints)
      .then(stream => {
        self.videoRef.srcObject = stream
        self.stopCallback = () => { stream.getVideoTracks()[0].stop() }
        self.capture()
      })
  }

  stop () {
    if (this.stopCallback) {
      this.stopCallback()
      this.stopCallback = null
    }
  }

  capture () {
    if (!this.stopCallback) {
      return
    }

    const context = this.canvasRef.getContext('2d')
    const width = this.videoRef.offsetWidth
    const height = this.videoRef.offsetHeight
    this.canvasRef.setAttribute('width', width)
    this.canvasRef.setAttribute('height', height)
    context.drawImage(this.videoRef, 0, 0, width, height)
    this.callback(context.getImageData(0, 0, width, height))

    setTimeout(() => {
      this.capture()
    }, 1000.0 / this.fps)
  }
}

export default new Camera(12)
