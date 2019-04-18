export const formatTime = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

export const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : '0' + n
}

export const stringify = (obj) => {
  let str = ''
  if (obj){
    let arr = Object.keys(obj) ? Object.keys(obj) : []
    arr.forEach( (key, index) => {
      if (index === arr.length - 1) {
        str += `${key}=${obj[key]}`
      } else {
        str += `${key}=${obj[key]}&`
      }
    })
  }
  return str
}

export const getUrlParams = (url, name) =>{
  let strValue = "";
  const search = url.split('?')
  if (search.length>1){
    let reg = new RegExp("(^|&)"+name+"=([^&]*)(&|$)");
    const r =  search[1].match(reg);
    if ( r != null ) {
      strValue = r[2]
    } else {
      strValue = ''
    }
    return strValue;
  }
  return strValue;
}

export const computingTime = (startTime, endTime) => {
  let sTime = parseInt(startTime)
  let eTime = (new Date()).getTime()
  if(endTime) eTime = endTime

  let timeDifference = eTime - sTime;
  let day = parseInt(timeDifference / 86400000)
  let hour = parseInt(timeDifference % 86400000 / 3600000)
  let minute = parseInt(timeDifference % 86400000 % 3600000 / 60000)
  let second = parseInt(timeDifference % 86400000 % 3600000 % 60000 / 1000)

  return `${day ? day+'天' : ''} ${hour ? hour+'时' : ''} ${minute ? minute+'分' : ''} ${second ? second+'秒' : ''}`
}



















