import "./gameVars.js"

// Create map and implement values

// Dimensions / number of tiles will give size, size should be 10px

let gridSize = mapDimensions / gridPartDimensions

map.style.width = mapDimensions + "px"
map.style.height = mapDimensions + "px"

createGrid()

function createGrid() {

    // Loop through each position

    for (let x = 0; x < gridSize; x++) {
        for (let y = 0; y < gridSize; y++) {

            let gridPart = new GridPart({ x: x, y: y })

            let el = gridPart.el
            let id = gridPart.id

            el.id = id

            el.classList.add(gridPart.type)

            el.style.width = gridPartDimensions + "px"
            el.style.height = gridPartDimensions + "px"

            map.appendChild(el)

            positions[id] = gridPart
        }
    }
}

//

let el = buildNotificationEl
el.innerText = "Press " + hotkeys.exitBuildMode + " to exit build mode"

// Add structure display

addStructureDisplay()

function addStructureDisplay() {

    let structureDisplayParent = document.createElement("div")
    structureDisplayParent.classList.add("structureDisplayParent")

    let interactionDisplayParent = document.getElementById("interactionDisplayParent")
    interactionDisplayParent.appendChild(structureDisplayParent)

    for (let structureTypeName in structureTypes) {

        let structureType = structureTypes[structureTypeName]

        let structureDisplayChild = document.createElement("div")
        structureDisplayChild.classList.add("structureDisplayChild")

        structureDisplayParent.appendChild(structureDisplayChild)

        let structureDisplayImage = document.createElement("img")
        structureDisplayImage.classList.add("structureDisplayImage")

        structureDisplayImage.src = structureType.image

        structureDisplayChild.appendChild(structureDisplayImage)

        let structureDisplayHeader = document.createElement("h3")
        structureDisplayHeader.classList.add("structureDisplayHeader")

        structureDisplayHeader.innerHTML = structureType.displayName

        structureDisplayChild.appendChild(structureDisplayHeader)
    }
}

// Create players

let playerNames = ["Carson", "Hive"]

createPlayers()

function createPlayers() {

    for (let playerName of playerNames) {

        players[playerName] = new Player({
            name: "Carson"
        })
    }
}

// Music

let musicPlaying = false

document.addEventListener("mousedown", playMusic)
document.addEventListener("keydown", playMusic)

function playMusic() {

    if (musicPlaying) return

    let music = new Audio("materials/sounds/song1.mp4")
    music.loop = true
    music.play()

    musicPlaying = true
}

// Allows user to scroll to zoom

let scale = 1

document.onwheel = function zoom(event) {

    scale += event.deltaY * -0.001;

    scale = Math.min(Math.max(0.75, scale), 2);

    map.style.transform = "scale(" + scale + ")"
}

// Define events for when user presses a key

let upPos = 0
let leftPos = 0

window.onkeydown = function(event) {

    let key = event.key

    if (key == hotkeys.panUp) {

        startMove("up")

    } else if (key == hotkeys.panDown) {

        startMove("down")
    }
    if (key == hotkeys.panLeft) {

        startMove("left")

    } else if (key == hotkeys.panRight) {

        startMove("right")
    }

    if (key == hotkeys.stopPlacing) {

        stopPlacing()
    }

    if (key == hotkeys.moveUp) {

        movePlayer("up")
    }
    if (key == hotkeys.moveLeft) {

        movePlayer("left")
    }
    if (key == hotkeys.moveDown) {

        movePlayer("down")
    }
    if (key == hotkeys.moveRight) {

        movePlayer("right")
    }

    if (key == hotkeys.exitBuildMode) exitBuildMode()
}

window.onkeyup = function(event) {

    let key = event.key

    if (key == hotkeys.panUp) {

        endMove("up")
    } else if (key == hotkeys.panDown) {

        endMove("down")
    } else if (key == hotkeys.panLeft) {

        endMove("left")
    } else if (key == hotkeys.panRight) {

        endMove("right")
    }
}

let move = false

function startMove(direction) {

    if (direction == "up") {

        move = {
            direction: "up",
            qualifier: "positive"
        }

    } else if (direction == "down") {

        move = {
            direction: "up",
            qualifier: "negative"
        }

    }
    if (direction == "left") {

        move = {
            direction: "left",
            qualifier: "positive"
        }

    } else if (direction == "right") {

        move = {
            direction: "left",
            qualifier: "negative"
        }
    }
}

function endMove() {

    move = false
}

setInterval(changeDirection, 40)

function changeDirection() {

    if (!move) return

    if (move.direction == "up") {

        if (move.qualifier == "positive") {

            upPos += 40

        } else {

            upPos -= 40
        }
    } else {

        if (move.qualifier == "positive") {

            leftPos += 40

        } else {

            leftPos -= 40
        }
    }

    map.style.top = upPos + "px"
    map.style.left = leftPos + "px"

}

// When placing something show graphic

window.addEventListener("load", createPlacePreview)

function createPlacePreview() {

    let el = document.createElement("div")

    el.classList.add("placePreview")

    mapEl.appendChild(el)

    globalThis.placePreviewEl = el
}

function enablePlacePreview() {

    // Make place preview shadow follow the cursor

    window.addEventListener("mousemove", followCursor)
    window.addEventListener("wheel", followCursor)
    window.addEventListener("keydown", followCursor)
}

function disablePlacePreview() {

    // Disable place preview

    window.removeEventListener("mousemove", followCursor)
    window.removeEventListener("wheel", followCursor)
    window.removeEventListener("keydown", followCursor)
}

let placePreviewSize = 0

function followCursor(e) {

    mapEl.style.cursor = "none"

    let el = placePreviewEl

    // adjust placePreview size to match structure

    el.style.width = placePreviewSize * gridPartDimensions + "px"
    el.style.height = placePreviewSize * gridPartDimensions + "px"

    // Get cursor distance from top and divide by map distance from top to get cursor distance from top of map

    let top = Math.floor((((e.pageY - mapEl.getBoundingClientRect().top) / scale) - (el.offsetHeight * 0.5)) / gridPartDimensions) * gridPartDimensions
    let left = Math.floor((((e.pageX - mapEl.getBoundingClientRect().left) / scale) - (el.offsetHeight * 0.5)) / gridPartDimensions) * gridPartDimensions

    // Make sure top stays inside the map

    top = Math.min(top, gridPartDimensions * gridSize - gridPartDimensions * 3)
    top = Math.max(top, 0)

    // Make sure left stays inside the map

    left = Math.min(left, gridPartDimensions * gridSize - gridPartDimensions * 3)
    left = Math.max(left, 0)

    el.style.top = top + "px"
    el.style.left = left + "px"
}

// Place game objects

placeStartingStructures()

function placeStartingStructures() {

    // Create starting command center

    let commandCenter = new CommandCenter({
        owner: "Carson",
        x: 5,
        y: 10,
    })

    placeStructure(commandCenter)
}

function placeStructure(structure) {

    let el = structure.el

    // Give class

    el.classList.add(structure.type)

    // Apply stylings

    el.style.backgroundImage = "url(" + structure.image + ")"

    el.style.position = "absolute"

    el.style.backgroundPosition = "center"
    el.style.backgroundSize = "cover"

    el.style.width = structure.width * gridPartDimensions + "px"
    el.style.height = structure.height * gridPartDimensions + "px"

    el.style.top = structure.y * gridPartDimensions + "px"
    el.style.left = structure.x * gridPartDimensions + "px"

    // Add element to map

    mapEl.appendChild(el)

    // Add structure to structure list

    structures[structure.id] = structure
}

// Build mode

let buildMode = false

function enterBuildMode(structure) {

    if (buildMode) return

    // place preview logic

    placePreviewSize

    enablePlacePreview()
}

function exitBuildMode() {

    if (!buildMode) return



    disablePlacePreview()
}

// Destroying structures

function destroyStructure(structure) {


}

// Draw outline for selecting units or buildings

function createOutline() {


}

function drawOutline() {


}

// Generate resources

setInterval(generateResources, 250)

function generateResources() {

    for (let playerName in players) {

        let player = players[playerName]
        let resources = player.resources

        for (let resourceName in resources) {

            let resource = resources[resourceName]

            resource.amount += resource.income
            resource.el.innerHTML = resource.amount
        }
    }
}