
//canvas
let canvas = document.getElementById('mycanv');
let ctx = canvas.getContext('2d');
canvas.style.border = 'none';


//buttons
let startBtn = document.querySelector('#start')
let restartBtn = document.querySelector('#restart')



// images
let mySpace = new Image();
mySpace.src='./milky-way-67504_640.jpg'


let wonderWoman = new Image();
wonderWoman.src = './wonderwoman.png (2).png'

let sun = new Image();
sun.src = './sun.png'

let thunder = new Image();
thunder.src = './thunder.png'


//audios 
let joyscream = new Audio();
joyscream.src="./joysound.wav"

let painScream = new Audio();
painScream.src="./touchThunderSound.wav"

let startAudio = new Audio();
startAudio.src = "./gameMusic.mp3"

let gameOverAudio = new Audio();
//gameOverAudio.src=""


//variables, primitives
let intervalId = 0;   //or null?  
let gameOver = false;
let lifepoints = 100;
let falling = true
let wonderwomanX = 30, wonderwomanY = 50


//variables, composites
let suns = [
    {x: 200, y: 0}, 
   // {x: 400, y: 100}
]


let thunders = [
    {x: 300, y: 80}, 
    //{x: 350, y: 150}
]



//functions

function start(){

    intervalId = 0;    //or null???
    gameOver = false;
    lifepoints = 100;
    falling = true
    wonderwomanX = 30, 
    wonderwomanY = 50
    canvas.style.display = 'block'
    restartBtn.style.display = 'none'   
    startBtn.style.display = 'none'
    startAudio.play()    //why is this not playing??              
    playGame()

}


function endGame(){

    cancelAnimationFrame(intervalId)
    canvas.style.display = 'none'
    restartBtn.style.display = "block"
    startBtn.style.display = 'none'
    startAudio.pause();
    //gameOverAudio.play();

}


function animateThunder(){

    for(let i=0 ; i< thunders.length; i++){
        ctx.drawImage(thunder, thunders[i].x, thunders[i].y )
    
        thunders[i].x -= 1

        if (thunders[i].x + thunder.width < 0) {
            thunders[i] = {
                x: 400,
                y: Math.floor(Math.random() * (canvas.height -50))
            }
       } 

    }


}


function animateSun(){

    for(let i=0 ; i< suns.length; i++){
        ctx.drawImage(sun, suns[i].x, suns[i].y )
        
        suns[i].x -= 1

       
        if (suns[i].x + sun.width < 0) {
            suns[i] = {
                x: 400,
                y: Math.floor(Math.random() * (canvas.height -50))
            }
            console.log(suns)
       } 

       if(wonderwomanX + wonderWoman.width >= suns[i].x && wonderwomanX <= suns[i].x + sun.width)//(wonderwomanY <= suns[i].y + sun.height || wonderwomanY + wonderWoman.height >= suns[i].y)){
        {
        
            if(wonderwomanY + wonderWoman.height < suns[i].y + sun.height && wonderwomanY + wonderWoman.height > suns[i].y) {
        
                lifepoints +=10;    //chceks 60 times/sec, thats why score so extrem hoch

                //update the X-coordinate
            }
        
        
        
        }




    }

}

function animateWonderwoman(){


    if (falling) {
        wonderwomanY += 2
    }
    else {
        wonderwomanY -= 5
    }    

}


function animateAllObjects(){

    animateThunder();

    animateSun();
 
    animateWonderwoman();

}







function playGame(){

 

draw();     
 
animateAllObjects();



//Game over/play conditions
if (wonderwomanY + wonderWoman.height >= canvas.height || lifepoints==0 || wonderwomanY < 0) {
    gameOver=true;
 }
     
       
 if (gameOver) {
     
    endGame();
     
 }
 else {
     intervalId = requestAnimationFrame(playGame)

 }  


//Increasing & decreasing score conditions


 



//sun collision 



//top/buttom collision




}










function draw(){


    ctx.drawImage( mySpace, 0, 0)
    ctx.drawImage( wonderWoman, wonderwomanX, wonderwomanY)


    ctx.font = '23px Comic Sans MS'
    ctx.fillStyle = "white"
    ctx.fillText(`Lifepoints: ${lifepoints}`, 20, canvas.height - 20)

     
}
       
       
       //Collision logic and dieser Stelle!! 1. Frontale collision:

       //function collision(){.....}



      /* if(wonderwomanY+wonderWoman.height>= suns[i].y && wonderwomanY <= suns[i].y + sun.height && wonderwomanX<= suns[i].x + sun.width){

lifepoints +=10;

       }  */

/*
       if (wonderwomanX < suns[i].x + sun.width &&
        wonderwomanX + wonderWoman.width > suns[i].x &&
        wonderwomanY < suns[i].y + sun.height &&
        wonderwomanY + wonderWoman.height > suns[i].y) {
       

            lifepoints +=10;

     }   */
     


    
    

    








//Event listeners

window.addEventListener('load', () => {
    canvas.style.display = 'none'
     restartBtn.style.display = 'none'   
     startBtn.style.display = 'block'
     

 
 
 document.addEventListener("keydown", (event) => {

    if (event.code == 'ArrowUp'){

        falling = false;
    }

 
    })


    //jumps: event.code ist richtig,aber Bewegung soll anders aussehen??
    document.addEventListener("keydown", (event) => {


        if (event.code == 'Space'){

            falling = false;
            wonderwomanX +=80;
        }
    
        

        })

    
    
    
    document.addEventListener('keyup', ()=> {
    
       
        falling = true;
    
    })
 
    
 
 
     startBtn.addEventListener('click', () => {
      
     
     start()

    

     })
 
     restartBtn.addEventListener('click', () => {
     
      start()
       

     })
 
 })
 
     
