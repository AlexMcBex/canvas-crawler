// requirements and goals 
// make a simple crawler game using canvas that we manipulate in js

// we need two entities, a hero and an ogre
// the hero should move with the WASD or ARROW keys(display hero coords)
// the ogre(for now) will be stationary
// the hero and the ogre should be able to collide to make something happen
// when the hero collides with the ogre, ogre is removed from the screen, the game stops, and sends a message to the user that they have won.

// first we grab our HTML elements for easy reference later
const game = document.getElementById('canvas')
const movement = document.getElementById('movement')
const status = document.getElementById('status')

// if we want to test if we got the right elements, you can do this:
// movement.innerText = 'some stuff'
// status.innerText = 'whats up how are you'

// we need to SET the game's context to be 2d
// we also want to save that context to a variable for reference later
// this is how we tell code to work within the context of the canvas
const ctx = game.getContext('2d')

console.log('game before setting w and H', game)

// one thing we need to do, is get the computed size of our canvas
// then we save that attribute to our canvas so we can refer to it later
// once we have the exact size of our canvas, we can use those dimensions to simulate movement in interesting ways.
// these two lines will set the width and height attributes according to the way they look in your browser at the time the code runs
game.setAttribute('width', getComputedStyle(game)['width'])
game.setAttribute('height', getComputedStyle(game)['height'])
game.height = 360

console.log('this is game after setting width and height')
console.log(game)


// const hero = {
//     x: 10,
//     y: 10,
//     color: 'hotpink',
//     width: 20,
//     height: 20,
//     alive: true,
//     render: function () {
//         // we can use builtin canvas methods for drawing basic shapes
//         ctx.fillStyle = this.color
//         ctx.fillRect(this.x, this.y, this.width, this.height)
//     }
// }

// const ogre = {
//     x: 200,
//     y: 100,
//     color: "#bada55",
//     width: 60,
//     height: 120,
//     alive: true,
//     render: function () {
//         ctx.fillStyle = this.color
//         // this built in function creates a rectangle
//         // must pass the following args in the following order:
//         // x coord, y coord, width in px, height in px
//         ctx.fillRect(this.x, this.y, this.width, this.height)
//     }
// }


// since hero and ogre are basically the same we can keep our code dry by mkaing a class
class Crawler {
    constructor (x, y, width, height, color ){
        this.x = x
        this.y = y
        this.width = width
        this.height = height
        this.color = color
        this.alive = true
        this.render = function () {
            ctx.fillStyle = this.color
            ctx.fillRect(this.x, this.y, this.width, this.height)
        }
    }
}

const player = new Crawler (10, 10, 16, 16, 'lightsteelblue')
const ogre = new Crawler (200, 50, 32, 48, '#bada55')


// player.render()
// ogre.render()

//our movement handler function tells our code how and when to move the player around

const movementHandler = (e) =>{
    //here the e is standing for 'event' => specifically a keydown event
    //we're going to use keycodes to tell it to do different movements for different keys
    //here are some basic keycodes:
    // w=87, a=65, s=83, d=68
    // up=38, left=37, down=40, right=39
    //by linkning these keycodes to a function (or codeblock)
    //we can change the player x or y values
    console.log(`what the heck is e` , e.keyCode)
    // conditional statements if keycode than do this
    // im going to use a switch case
    // switch is my condition and it opens up for a multitude of cases
    switch (e.keyCode) {
        //move up
        case (87) :
            //this moves player 10px
            player.y -= 10
            // to break from the case we need the break keyword
            break
        //move  left
            case(65) :
            player.x -= 10
            break
        //move down
        case(83) :
        player.y += 10
        break
        //move right
        case(68) :
        player.x += 10
        break
    }
}

/////////////GAME LOOP/////////////////
//we're going to set a gameLoop func
// this will be attached to an interval
// this func will run every interval (amount of ms)
// this is how we will animate our game

const gameLoop = () =>{
    //no console logs in here if you can avoid them
    //for testing it's ok but final version should not have any
    player.render( )

    if (ogre.alive) {
        ogre.render( )
    }
    movement.textContent = `${player.x}, ${player.y}`
}

///////////////DOM CONTENT EVENT LISTENER////////////

//we'll add an event listener when the DOM content loads run the game on an interval
//eventually this event willl have more in it
document.addEventListener('DOMContentLoaded', function () {
    //this is where I'll link the movementHandler
    document.addEventListener('keydown', movementHandler)
    //here is our gameLoop interval
    setInterval(gameLoop, 60)
})
