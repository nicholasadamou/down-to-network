export const isMobile = {
  Android: function () {
    return navigator.userAgent.match(/Android/i)
  },
  BlackBerry: function () {
    return navigator.userAgent.match(/BlackBerry/i)
  },
  iOS: function () {
    return navigator.userAgent.match(/iPhone|iPad|iPod/i)
  },
  Opera: function () {
    return navigator.userAgent.match(/Opera Mini/i)
  },
  Windows: function () {
    return navigator.userAgent.match(/IEMobile/i)
  },
  any: function () {
    return (isMobile.Android() || isMobile.BlackBerry() || isMobile.iOS() || isMobile.Opera() || isMobile.Windows())
  }
}

export const translate3d = (x, y) => {
  const translate = `translate3d(${x}px, ${y}px, 0px)`
  return {
    msTransform: translate,
    WebkitTransform: translate,
    transform: translate
  }
}

export const DIRECTIONS = ['Right', 'Left', 'Top', 'Bottom']

export default {
  isMobile,
  translate3d,
  DIRECTIONS
}
