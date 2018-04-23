const mediaDevices = {
  namespaced: true,
  state: {
    camera: {
      devices: [],
      selected: undefined
    }
  },
  mutations: {
    initialize (state, navigator) {
      state.camera.selected = localStorage.getItem('mediaDevices.camera.deviceId')
    },
    setDevices (state, devices) {
      state.camera.devices = devices
    },
    select (state, deviceId) {
      localStorage.setItem('mediaDevices.camera.deviceId', deviceId)
      state.camera.selected = deviceId
    }
  },
  actions: {
    list (context, navigator) {
      return navigator.mediaDevices
        .enumerateDevices()
        .then(sourcesInfo => {
          // list video input devices
          let devices = sourcesInfo
            .filter(t => t.kind === 'videoinput')
            .map(t => ({
              deviceId: t.deviceId,
              label: t.label.length > 0 ? t.label : '（カメラが許可されてないため表示できません）'
            }))

          // add an unused item to list
          devices.push({label: '使用しない', deviceId: ''})

          context.commit('setDevices', devices)
        })
    }
  }
}

export default mediaDevices
