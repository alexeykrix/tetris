const btnPlay = document.querySelector('.play')
const btnPause = document.querySelector('.pause')
const btnReset = document.querySelector('.reset')
const range = document.querySelectorAll('.size')
const cellRange = document.querySelectorAll('.cellSize')
const canvas = document.querySelector('#canvas')
const c = canvas.getContext('2d')
const canvasInfo = document.querySelector('#info')
const cInfo = canvasInfo.getContext('2d')
canvas.width = 300
canvas.height = 600
canvasInfo.height = 40

c.fillStyle = cInfo.fillStyle  = '#eeeeee'
c.strokeStyle = cInfo.strokeStyle  = '#000'
c.lineWidth = cInfo.lineWidth  = '1'
let score = 0

let cellSize = 30
let cellsX = canvas.width / cellSize
let cellsY = canvas.height / cellSize

const figures = [
  [ //  I
    [{x: 2, y: 0}, {x: 2, y: 1}, {x: 2, y: 2}, {x: 2, y: 3},],
    [{x: 0, y: 1}, {x: 1, y: 1}, {x: 2, y: 1}, {x: 3, y: 1},],
    [{x: 2, y: 0}, {x: 2, y: 1}, {x: 2, y: 2}, {x: 2, y: 3},],
    [{x: 0, y: 1}, {x: 1, y: 1}, {x: 2, y: 1}, {x: 3, y: 1},]
  ],
  [ // J
    [{x: 1, y: 0}, {x: 1, y: 1}, {x: 1, y: 2}, {x: 0, y: 2},],
    [{x: 0, y: 0}, {x: 0, y: 1}, {x: 1, y: 1}, {x: 2, y: 1},],
    [{x: 1, y: 0}, {x: 1, y: 1}, {x: 1, y: 2}, {x: 2, y: 0},],
    [{x: 0, y: 1}, {x: 1, y: 1}, {x: 2, y: 1}, {x: 2, y: 2},]
  ],
  [ // L
    [{x: 1, y: 0}, {x: 1, y: 1}, {x: 1, y: 2}, {x: 2, y: 2},],
    [{x: 0, y: 2}, {x: 0, y: 1}, {x: 1, y: 1}, {x: 2, y: 1},],
    [{x: 1, y: 0}, {x: 1, y: 1}, {x: 1, y: 2}, {x: 0, y: 0},],
    [{x: 0, y: 1}, {x: 1, y: 1}, {x: 2, y: 1}, {x: 2, y: 0},]
  ],
  [ // O
    [{x: 1, y: 0}, {x: 2, y: 0}, {x: 1, y: 1}, {x: 2, y: 1},],
    [{x: 1, y: 0}, {x: 2, y: 0}, {x: 1, y: 1}, {x: 2, y: 1},],
    [{x: 1, y: 0}, {x: 2, y: 0}, {x: 1, y: 1}, {x: 2, y: 1},],
    [{x: 1, y: 0}, {x: 2, y: 0}, {x: 1, y: 1}, {x: 2, y: 1},]
  ],
  [ // S
    [{x: 1, y: 0}, {x: 2, y: 0}, {x: 0, y: 1}, {x: 1, y: 1},],
    [{x: 0, y: 0}, {x: 0, y: 1}, {x: 1, y: 1}, {x: 1, y: 2},],
    [{x: 1, y: 0}, {x: 2, y: 0}, {x: 0, y: 1}, {x: 1, y: 1},],
    [{x: 0, y: 0}, {x: 0, y: 1}, {x: 1, y: 1}, {x: 1, y: 2},],
  ],
  [ // T
    [{x: 0, y: 1}, {x: 1, y: 1}, {x: 2, y: 1}, {x: 1, y: 2},],
    [{x: 1, y: 0}, {x: 1, y: 1}, {x: 1, y: 2}, {x: 0, y: 1},],
    [{x: 0, y: 1}, {x: 1, y: 1}, {x: 2, y: 1}, {x: 1, y: 0},],
    [{x: 1, y: 0}, {x: 1, y: 1}, {x: 1, y: 2}, {x: 2, y: 1},],
  ],
  [ // Z
    [{x: 0, y: 0}, {x: 1, y: 0}, {x: 1, y: 1}, {x: 2, y: 1}, ],
    [{x: 1, y: 0}, {x: 1, y: 1}, {x: 0, y: 1}, {x: 0, y: 2}, ],
    [{x: 0, y: 0}, {x: 1, y: 0}, {x: 1, y: 1}, {x: 2, y: 1}, ],
    [{x: 1, y: 0}, {x: 1, y: 1}, {x: 0, y: 1}, {x: 0, y: 2}, ],
  ],
]
let gameData = []
let figId
let figure, current = []
let figRotate = 0

let scoreMylty = 0
let speed = 1000/(score/10+1.5)

const randomFigure = () => {
  let rand = - 0.5 + Math.random() * figures.length;
  return Math.round(rand);
}
const checkSolved = () => {
  for (let i = 0; i < 20; i++) {
    lastRow = [0,0,0,0,0,0,0,0,0,0,]
    gameData.forEach(el=> {
      if (el.y === i) {
        lastRow[el.x] = 1
      }
    })
  
    allLine = true
    lastRow.forEach(el => el === 1? '': allLine=false)

    let ids = []
    
    if (allLine === true) {
      gameData.forEach((el, id) => el.y === i? ids.push(id) :'')
      gameData.forEach(el => el.y <= i? el.y++ :'')
    }

    ids.forEach(id => {
      gameData[id].x = -1
      gameData[id].y = -1
    })

    gameData = gameData.filter(a => (a.x !== -1 && a.y !== -1))

    if (ids.length) scoreMylty++
    
  }
}


let nextFigureId
nextFigureId = randomFigure()

const nextFig = (isInit) => {
  isInit? '' : current.forEach(el => gameData.push(JSON.parse(JSON.stringify(el))))
  let colors = ['#e67e22','#e74c3c','#3498db','#9b59b6','#f1c40f',
      '#2ecc71','#44bd32','#f39c12','#16a085','#c0392b','#2980b9',
      '#8e44ad','#575fcf','#e1b12c','#ff5e57','#cf6a87','#f8a5c2',
      '#f7d794','#f3a683','#786fa6','#e84118',]
  let color = colors[Math.round(-0.5 + Math.random()*colors.length)]
  figId = nextFigureId
  figure = JSON.parse(JSON.stringify(figures[figId]))
  current = figure[figRotate].slice()
  current.forEach(el => el.color = color)
  current.forEach(el=> el.x = el.x +3)
  checkSolved()
  nextFigureId = randomFigure()
  
}


const clearCanvas = () => {
  c.fillStyle = '#3d3d3e'
  c.beginPath()
  c.rect(0, 0, canvas.width, canvas.height)
  c.fill()
  c.closePath()

  cInfo.fillStyle = '#3d3d3e'
  cInfo.beginPath()
  cInfo.rect(0, 0, canvas.width, canvas.height)
  cInfo.fill()
  cInfo.closePath()
}

const renderBlock = (x, y, color) => {  
  c.fillStyle = color

  c.beginPath()
  c.rect(x*cellSize, y*cellSize, cellSize, cellSize)
  c.fill()
  c.closePath()
}

const renderNextBlock = (x, y, color) => {  
  cInfo.fillStyle = color

  cInfo.beginPath()
  cInfo.rect(x*10+10, y*10, 10, 10)
  cInfo.fill()
  cInfo.closePath()
}

const render = () => {
  clearCanvas()

  cInfo.fillStyle = '#e67e22'
  cInfo.font = '20px "Roboto Mono"'
  cInfo.textAlign = 'right';
  cInfo.fillText('best: '+ (localStorage.getItem('bestTetris') || 0), 290, 27)
  
  c.fillStyle = '#242424'
  c.font = '90px "Roboto Mono"'
  c.textAlign = 'center';
  c.fillText(score, canvas.width/2, canvas.width/2+20)
  
  figures[nextFigureId][0]
    .forEach( block => renderNextBlock(block.x, block.y, '#e67e22'))

  let fallFigure = [0,0,0,0,0,0,0,0,0,0]
  current.forEach(block=> {
    if (fallFigure[block.x] < block.y) {
      fallFigure[block.x] = block.y
    }
  })

  fallFigure.forEach((y, x) => {
    if (y > 0) {
      for (let i=1; i < 20; i++) {
        renderBlock(x, y+i, '#12121240')
      }
    }
  })

  current.forEach( block => renderBlock(block.x, block.y, block.color))
  gameData.forEach( block => renderBlock(block.x, block.y, block.color))
}

const moveFigure = () => {
  let scoreset = [0, 1, 3, 7, 15]

  if (scoreMylty > 0) {
    clearInterval(moveTimeout)
    moveTimeout = setInterval(() =>moveFigure(), speed)
  } 
  score += scoreset[scoreMylty]
  scoreMylty = 0

  if (+localStorage.getItem('bestTetris') < score) {
    localStorage.setItem('bestTetris', score)
  }

  let fallFigure = [0,0,0,0,0,0,0,0,0,0]
  current.forEach(block=> {
    if (fallFigure[block.x] < block.y) {
      fallFigure[block.x] = block.y
    }
  })

  let futurePos = []
  let isNewBusy = false

  fallFigure.forEach( (el, id) => {
    if (el !== 0) futurePos.push({'x': id, 'y': el+1})
  })
  
  futurePos.forEach( el => {
    if (19 < el.y ) isNewBusy = true
  })

  for (let i = 0; i < gameData.length-1; i++) {
    let data = gameData[i]
    futurePos.forEach( el => {
      if (data.x === el.x && data.y === el.y ) isNewBusy = true
    })
  }

  if (isNewBusy) {
    if (current[0].y === 0 ||
        current[0].y === 1 ||
        current[0].y === 2) {
      score = 0
      clearInterval(renderTimeout)
      clearInterval(moveTimeout)
      renderTimeout = undefined
      moveTimeout = undefined
    
      c.fillStyle = '#121212e0'
      c.beginPath()
      c.rect(0, 0, canvas.width, canvas.height)
      c.fill()
      c.closePath()
    
      c.fillStyle = '#ededed'
      c.font = '50px "Roboto Mono"'
      c.textAlign = 'center';
      c.fillText('GAME OVER', canvas.width/2, canvas.height/2 +25)
      
      gameData = []
      return
    }

    nextFig()
  } else current.forEach(block => block.y++)
  
}

let renderTimeout
let moveTimeout

const init = () => {
  nextFig(true)
  renderTimeout = setInterval(() =>render(), 20)
  moveTimeout = setInterval(() =>moveFigure(), speed)
  render()
}
init()

const rotateHandler = () => {
  let nextFigId = figRotate !== 3? figRotate +1 : 0
  let thisRotate = figures[figId][figRotate]
  let nextRotate = figures[figId][nextFigId]
  let moveX, moveY
  let isNewBusy = false
  let movedFig = []
  current.forEach( block => movedFig.push(JSON.parse(JSON.stringify(block))))

  moveX = movedFig[0].x - thisRotate[0].x
  moveY = movedFig[0].y - thisRotate[0].y

  nextRotate.forEach( el => {
    if (9 < (el.x + moveX) || 0 > (el.x + moveX) || 
        19 < (el.y + moveY) ) isNewBusy = true
  })

  for (let i = 0; i < gameData.length-1; i++) {
    let data = gameData[i]
    nextRotate.forEach( el => {
      if (data.x === (el.x + moveX) && 
          data.y === (el.y + moveY) ) isNewBusy = true
    })
  }

  if (!isNewBusy) {
    current.forEach( (block, id) => {
      block.x = nextRotate[id].x + moveX
      block.y = nextRotate[id].y + moveY
    })  
    figRotate = nextFigId
  }
}

const leftHandler = () => {
  let fallFigure = [10,10,10,10,10,10,10,10,10,10,
                    10,10,10,10,10,10,10,10,10,10]
  
  let isNewBusy = false
  current.forEach(block=> {
    if (fallFigure[block.y] > block.x) fallFigure[block.y] = block.x
  })
  let fallFigureY = 20
  fallFigure = fallFigure.filter(a => {
    if (a <= 9) {
      if (a-1 < 0) isNewBusy = true
      if (fallFigureY > fallFigure.indexOf(a)) {
        fallFigureY = fallFigure.indexOf(a)
      }
      return true
    }
  })
  
  let futurePos = []
  fallFigure.forEach((x, id) => {
    futurePos.push({
      'x': x-1,
      'y': fallFigureY + id,
    })
  })

  for (let i = 0; i < gameData.length-1; i++) {
    let data = gameData[i]
    futurePos.forEach( el => {
      if (data.x === el.x && data.y === el.y ) isNewBusy = true
    })
  }

  !isNewBusy? current.forEach(el => el.x--) :''
}

const rightHandler = () => {
  let fallFigure = [-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,
                    -1,-1,-1,-1,-1,-1,-1,-1,-1,-1]
  let isNewBusy = false
  current.forEach(block => {
    if (fallFigure[block.y] < block.x) fallFigure[block.y] = block.x
  })
  let fallFigureY = 20
  fallFigure = fallFigure.filter(a => {
    if (a > 0 ) {
      if (a+1 > 9) isNewBusy = true
      if (fallFigureY > fallFigure.indexOf(a)) {
        fallFigureY = fallFigure.indexOf(a)
      }
      return true
    }
  })
  
  let futurePos = []
  fallFigure.forEach((x, id) => {
    futurePos.push({
      'x': x+1,
      'y': fallFigureY + id,
    })
  })
  for (let i = 0; i < gameData.length-1; i++) {
    let data = gameData[i]
    futurePos.forEach( el => {
      if (data.x === el.x && data.y === el.y ) isNewBusy = 1
    })
  }
  !isNewBusy? current.forEach(el => el.x++) :''
}


//        events

const keydownHandler = (e) => {
  e.preventDefault()
  if (renderTimeout === undefined && 
      (e.code === 'Space' || e.code === 'KeyP' ||
      e.code === 'Enter' || e.code === 'Escape')) {
    renderTimeout = setInterval(() =>render(), 20)
    moveTimeout = setInterval(() =>moveFigure(), speed)
  }
  if (e.code === 'KeyW' || e.code === 'ArrowUp') rotateHandler()
  if (e.code === 'KeyA' || e.code === 'ArrowLeft') leftHandler()
  if (e.code === 'KeyD' || e.code === 'ArrowRight') rightHandler()
  if (e.code === 'KeyS' || e.code === 'ArrowDown') moveFigure()
}

document.addEventListener('keydown', keydownHandler)

btnPause.addEventListener('click', () => {
  clearInterval(renderTimeout)
  clearInterval(moveTimeout)
  renderTimeout = undefined
  moveTimeout = undefined

  c.fillStyle = '#121212f0'
  c.beginPath()
  c.rect(0, 0, canvas.width, canvas.height)
  c.fill()
  c.closePath()
})
btnReset.addEventListener('click', () => {
  clearInterval(renderTimeout)
  clearInterval(moveTimeout)
  gameData = []
  init()
})

document.addEventListener('touchstart', e => {
  let t = e.touches[0]
  
  let width = window.innerWidth
  let height = window.innerHeight

  if (width/2 > t.clientX && height/2 < t.clientY) leftHandler()
  if (width/2 < t.clientX && height/2 < t.clientY) rightHandler()
  if (height/2 > t.clientY) rotateHandler()
  if (height - 0.8*height < t.clientY) moveFigure()

  if (renderTimeout === undefined) {
    renderTimeout = setInterval(() =>render(), 20)
    moveTimeout = setInterval(() =>moveFigure(), speed)
  }

})