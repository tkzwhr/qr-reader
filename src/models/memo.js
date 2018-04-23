export default function memo (data) {
  let obj = {raw: data}

  // type
  if (data.match(/https?:\/\//)) {
    obj.type = 'link'
  } else {
    obj.type = 'description'
  }

  // html
  if (obj.type === 'link') {
    obj.html = `<a href="${data}" target="_blank">${data}</a>`
  } else {
    obj.html = data
  }

  return obj
}
