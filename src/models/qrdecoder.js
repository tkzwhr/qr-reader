import QrCode from 'qrcode-reader'

class QRDecoder {
  constructor () {
    this.qr = new QrCode()
  }

  setCallback (callback) {
    this.qr.callback = (err, result) => {
      if (err) {
        callback(err, null)
        return
      }
      if (!result.result) {
        callback(null, null)
        return
      }

      callback(null, result.result)
    }
  }

  decode (image) {
    this.qr.decode(image)
  }
}

export default new QRDecoder()
