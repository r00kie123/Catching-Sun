

let canvas = document.getElementById('mycanv');
let ctx = canvas.getContext('2d');
canvas.style.border = 'none';



let startBtn = document.querySelector('#start')
let restartBtn = document.querySelector('#restart')


//style buttons here or in CSS?



//console.log(restartBtn)

// load all images
let mySpace = new Image();
mySpace.src = './milky-way-67504_640.jpg';



let wonderWoman = new Image();
wonderWoman.src = './wonderwoman.png (2).png'

let sun = new Image();
sun.src = './sun.png'

let thunder = new Image();
thunder.src = './thunder.png'

let intervalId = 0;   //oder null?
let gameOver = false;
let lifepoints = 100;


let suns = [
    {x: 200, y: 0}, 
   // {x: 400, y: 100}
]


let thunders = [
    {x: 300, y: 80}, 
    //{x: 350, y: 150}
]


let wonderwomanX = 30, wonderwomanY = 50


let falling = true


function draw(){




   
    ctx.drawImage( mySpace, 0, 0)
    ctx.drawImage( wonderWoman, wonderwomanX, wonderwomanY)

    
    ctx.font = '23px Comic Sans MS'
     ctx.fillStyle = "white"
    ctx.fillText(`Lifepoints: ${lifepoints}`, 20, canvas.height - 20)

  
    for(let i=0 ; i< suns.length; i++){
        ctx.drawImage(sun, suns[i].x, suns[i].y )
        //ctx.drawImage(pipeSouth, pipes[i].x,  pipes[i].y + gap)
        suns[i].x -= 1

       
        if (suns[i].x + sun.width < 0) {
            suns[i] = {
                x: 400,
                y: Math.floor(Math.random() * (canvas.height -50))
            }
       } 
       
       
       //Collision logic and dieser Stelle!! 1. Frontale collision:

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
     





    
    }

      


    for(let i=0 ; i< thunders.length; i++){
        ctx.drawImage(thunder, thunders[i].x, thunders[i].y )
        //ctx.drawImage(pipeSouth, pipes[i].x,  pipes[i].y + gap)
        thunders[i].x -= 1

        if (thunders[i].x + thunder.width < 0) {
            thunders[i] = {
                x: 400,
                y: Math.floor(Math.random() * (canvas.height -50))
            }
       } 

    }

    //if wonderwoman leaves canvas oben/unten -> gameover
    if (wonderwomanY + wonderWoman.height >= canvas.height || lifepoints==0 || wonderwomanY < 0) {
       gameOver=true;
    }



   
else {
    if (falling) {
        wonderwomanY += 2
    }
    else {
        wonderwomanY -= 5
    }    
}
            
          
    if (gameOver) {
        
        cancelAnimationFrame(intervalId)
        canvas.style.display = 'none'
        restartBtn.style.display = "block"
        
    }
    else {
        intervalId = requestAnimationFrame(draw)

    }  


}






//Everything begins here
window.addEventListener('load', () => {
    canvas.style.display = 'none'
     restartBtn.style.display = 'none'   
     startBtn.style.display = 'block'
     
 
 //ÄNDERUNGEN HIER
 
 
 document.addEventListener("keydown", (event) => {

    if (event.code == 'ArrowUp'){

        falling = false;
    }

 
    })


    //jumps: not completely working yet, event.code ist richtig, 
    //aber Bewegung soll anders aussehen??
    document.addEventListener("keydown", (event) => {


        if (event.code == 'Space'){

            falling = false;
            wonderwomanX +=80;
        }
    
        

        })

    
    
    
    document.addEventListener('keyup', ()=> {
    
       
        falling = true;
    
    })
 
    /* document.addEventListener('keydown', (event) =>{
 
         if (event.code == 'ArrowRight') {
             isRight = true
             isLeft = false
         }
         if (event.code == 'ArrowLeft') {
             isRight = false
             isLeft = true
         }
     })
 
     document.addEventListener('keyup', () =>{
         isRight = false
         isLeft = false
     })   */
 
 
     startBtn.addEventListener('click', () => {
      
     canvas.style.display = 'block'
     restartBtn.style.display = 'none'
     startBtn.style.display = 'none'
     draw()
     //startAudio.play()
     })
 
     restartBtn.addEventListener('click', () => {
     // reset the values + 
    gameOver = false;
    lifepoints = 100
     canvas.style.display = 'block'
     restartBtn.style.display = 'none'
     startBtn.style.display = 'none'
     draw()
      
         //X = 50; hier koordinaten Wonderwoman einfügen?
         //Y = 50;   hier koordinate wonedrwoman
         //canvas.style.display = 'block'??
         
       
         //location.reload()
    

     }) 
 
 })
 
     
