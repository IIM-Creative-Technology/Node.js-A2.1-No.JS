const socket = io("http://localhost:3000")
const grid = document.getElementById('grid')
const colorPicker = document.getElementById('color_picker')
const gridSize = 32


//grid creation
for(let i=0; i<gridSize; i++){

    let div = document.createElement('div')
    div.classList.add('row')
    grid.appendChild(div)
    for(let j=0; j<gridSize; j++){
        let cell = document.createElement('div')
        cell.id = `_${j}_${i}`
        cell.addEventListener('click', newCell)
        document.querySelector('.row:last-child').appendChild(cell)
    }
}

function newCell(){
    let coords = this.id.split("_")
    socket.emit('newCell', {color: colorPicker.value, x: coords[1], y: coords[2]})
}

socket.on('globalCell', (data)=>{
    let id = `_${data.cell_data.x}_${data.cell_data.y}`
    console.log(id)
    document.querySelector('div#'+id).style.backgroundColor = data.cell_data.color
})