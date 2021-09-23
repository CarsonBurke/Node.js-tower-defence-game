// Assign variables

let properties = {
    mapDimensions: 1000,
    gridPartDimensions: 20,
    nextId: 0,
    mapEl: document.getElementById("map"),
    cursorEl: document.getElementById("cursor"),
    resourceTypes: {
        credits: {
            amount: 0,
            income: 2,
            description: "",
            el: document.getElementById("creditsAmount"),
        },
        oil: {
            amount: 0,
            income: 0,
            description: "",
            el: document.getElementById("oilAmount"),
        },
        steel: {
            amount: 0,
            income: 0,
            description: "",
            el: document.getElementById("steelAmount"),
        },
        concrete: {
            amount: 0,
            income: 0,
            description: "",
            el: document.getElementById("concreteAmount"),
        },
    },
    positions: {


    },
    structures: {

    },
    structureTypes: {
        commandCenter: {
            owner: undefined,
            width: 5,
            height: 5,
            displayName: "Command Center",
            creditCost: 300,
            image: "materials/images/commandCenter.png",
            income: {
                credits: 15,
                oil: 0.5,
                steel: 0.25,
            },
            upgrades: {
                tier2: {

                },
                tier3: {

                },
            },
            units: {
                harvester: {

                },
                scout: {

                }
            },
        },
        pumpjack: {
            owner: undefined,
            width: 2,
            height: 2,
            displayName: "Pumpjack",
            creditCost: 300,
            image: "materials/images/pumpjack.png",
            income: {
                credits: 15,
                oil: 0.5,
                steel: 0.25,
            },
            upgrades: {
                tier2: {

                },
                tier3: {

                },
            },
        },
    },
    terrainTypes: {
        grass: {
            traversable: {
                land: true,
                water: false,
                air: true,
            },
        },
        sand: {
            traversable: {
                land: true,
                water: false,
                air: true,
            },
        },
        mountain: {
            traversable: {
                land: false,
                water: false,
                air: true,
            },
        },
        water: {
            traversable: {
                land: false,
                water: true,
                air: true,
            },
        },
    },
    hotkeys: {
        moveUp: "ArrowUp",
        moveLeft: "ArrowLeft",
        moveDown: "ArrowDown",
        moveRight: "ArrowRight",

        panUp: "w",
        panDown: "s",
        panLeft: "a",
        panRight: "d",

        exitBuildMode: "x",
    },
    buildNotificationEl: document.getElementById("buildNotificationParent"),
    players: {

    },
    nextId: 0,
    findWithId(id) {

        return objects[id]
    },
    newId() {

        nextId++
        return nextId - 1
    },
    GridPart: class {
        constructor(pos) {

            this.x = pos.x
            this.y = pos.y

            this.type = "gridPart"
            this.id = newId()
            this.el = document.createElement("div")
        }
    },
    Structure: class {
        constructor(opts) {

            this.x = opts.x
            this.y = opts.y

            this.type = opts.type
            this.id = newId()
            this.el = document.createElement("div")
        }
    },
    CommandCenter: class {
        constructor(opts) {

            this.type = "commandCenter"
            this.x = opts.x
            this.y = opts.y

            this.id = newId()
            this.el = document.createElement("div")

            for (let propertyName in structureTypes[this.type]) {

                let property = structureTypes[this.type][propertyName]

                this[propertyName] = property
            }
        }
    },
    Player: class {
        constructor(opts) {

            // Add options to player

            this.name = opts.name

            // 

            this.id = newId()

            // Add resources to player

            this.resources = {}

            for (let resourceName in resourceTypes) {

                let resource = resourceTypes[resourceName]

                this.resources[resourceName] = resource
            }


        }
    },
}


// Assign variables to globalThis

for (let propertyName in properties) {

    let property = properties[propertyName]

    globalThis[propertyName] = property
}