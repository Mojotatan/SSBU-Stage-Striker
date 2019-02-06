export const extractParams = url => {
  let params = {}
  url.replace(/[?&]+([^=&]+)=([^&]*)/gi, (m, key, value) => {
    params[key] = value.split('').filter(char => char != '/').join('')
  })
  return params
}

export const stageList = [
  {
    name: 'Dream Land',
    img: 'dreamLand.png',
    status: 'starter'
  },
  {
    name: 'Final Destination',
    img: 'finalDestination.jpg',
    status: 'starter'
  },
  {
    name: 'Fountain of Dreams',
    img: 'fountainOfDreams.png',
    status: 'starter'
  },
  {
    name: 'Kalos',
    img: 'kalos.png',
    status: 'counterpick'
  },
  {
    name: 'Wario Ware',
    img: 'warioWare.png',
    status: 'banned'
  }
]