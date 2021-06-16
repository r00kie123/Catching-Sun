
//canvas 
let canvas = document.getElementById('mycanv');
let ctx = canvas.getContext('2d');
canvas.style.border = 'none';


//wireframes/pages
let avatpage = document.getElementById('avatPage');
let endpage = document.getElementById('endPage');


//buttons
let startBtn = document.querySelector('#start')
//let restartBtn = document.querySelector('#restart')
let anissaBtn = document.querySelector('#avatanissa')
let wonderwomanBtn = document.querySelector('#avatwonderwoman')



// images & gifs
let mySpace = new Image();
mySpace.src='./milky-way-67504_640.jpg'


let sun = new Image();
sun.src = './sun.png'

let thunder = new Image();
thunder.src = './thunder.png'

let smallAvatanissa = new Image();
smallAvatanissa.src="./anissaFly2.png"

let smallAvatWonderWoman= new Image();
smallAvatWonderWoman.src="./wonderwoman.png (2).png"

let gameOvergif = new Image();
gameOvergif.src ="./game over gif.gif"





//audios 
let joyscream = new Audio();
joyscream.src="./joysound.wav"
joyscream.volume = 0.1;

let painScream = new Audio();
painScream.src="./touchThunderSound.wav"
painScream.volume = 0.1;

let startAudio = new Audio();
startAudio.src = "./gameMusic.mp3"
startAudio.volume = 0.1;

let gameOverAudio = new Audio();
gameOverAudio.src="./gameoverSound.wav"
gameOverAudio.volume = 0.1;

let gameOverVoice = new Audio();
gameOverVoice.src ="./gameOverVoice.wav";
gameOverVoice.volume = 0.1;




//variables, primitives, defaults
let intervalId = 0;   //or null?  
let gameOver = false;
let lifepoints = 100;
let falling = true
let avatarX = 30, avatarY = 50;
let avatar = smallAvatanissa;     //default value 

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
    avatarX = 30, 
    avatarY = 50   
    canvas.style.display = 'block' 
    startBtn.style.display = 'none'
    avatpage.style.display ="none"
    endpage.style.display="none"
    startAudio.play()                
    playGame()

}


function endGame(){

    cancelAnimationFrame(intervalId)
    canvas.style.display = 'none'
    startBtn.style.display = 'none'
    startAudio.pause();
    endpage.style.display = "block";

    gameOverAudio.play();

    setTimeout(()=>{

        gameOverVoice.play();

    },1500)
  

    setTimeout(()=>{                //fix bug. countdown starts at 6 etc. sometimes

    location.reload();

    }, 9000)

    


}




function animateThunder(){

    for(let i=0 ; i< thunders.length; i++){
        ctx.drawImage(thunder, thunders[i].x, thunders[i].y )
    
        thunders[i].x -= 1

        if (thunders[i].x + thunder.width < 0) {
            thunders[i] = {
                x: canvas.width+1,   
                y: Math.floor(Math.random() * (canvas.height -50))
            }
       } 


       if(avatarX + avatar.width >= thunders[i].x && avatarX <= thunders[i].x + thunder.width)
       {
       
           if(avatarY + avatar.height < thunders[i].y + thunder.height && avatarY + avatar.height > thunders[i].y) {
       
               painScream.play();
               lifepoints -=20;    
               thunders[i].x=canvas.width+1;   
               thunders[i].y = Math.floor(Math.random() * (canvas.height -50))

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
                x: canvas.width+1,        
                y: Math.floor(Math.random() * (canvas.height -50))
            }
            
       } 

       if(avatarX + avatar.width >= suns[i].x && avatarX <= suns[i].x + sun.width)
        {
        
            if(avatarY + avatar.height < suns[i].y + sun.height && avatarY + avatar.height > suns[i].y) {
        
                joyscream.play();
                lifepoints +=10;  

                //update the X-coordinate
                suns[i].x=canvas.width+1;       //hier eventuell nochmal ändern zu width+10 oder so 
                suns[i].y = Math.floor(Math.random() * (canvas.height -50))
            }
        
        
        
        }




    }

}

function animateAvatar(){


    if (falling) {
        avatarY += 2
    }
    else {
        avatarY -= 5
    }    

}


function animateAllObjects(){

    animateThunder();

    animateSun();
 
    animateAvatar();

}







function playGame(){

 

draw();     
 
animateAllObjects();



//Game over/play conditions
if (avatarY + avatar.height >= canvas.height || lifepoints==0 || avatarY < 0) {
    gameOver=true;
 }
     
       
 if (gameOver) {
     
    endGame();
     
 }
 else {
     intervalId = requestAnimationFrame(playGame)

 } 




}






function draw(){


    ctx.drawImage( mySpace, 0, 0)
    ctx.drawImage( avatar, avatarX, avatarY)


    ctx.font = '23px Comic Sans MS'
    ctx.fillStyle = "white"
    ctx.fillText(`Lifepoints: ${lifepoints}`, 20, canvas.height - 20)

     
}
       
       
     

    
    

    








//Event listeners

window.addEventListener('load', () => {
     canvas.style.display = 'none'
     //restartBtn.style.display = 'none'   
       
     startBtn.style.display = 'block'
     avatpage.style.display ="block";
     endpage.style.display ="none";

    
   
 
     

 
 
 document.addEventListener("keydown", (event) => {

    if (event.code == 'ArrowUp'){

        falling = false;
    }

 
    })


    //jumps: event.code ist richtig,aber Bewegung soll anders aussehen??
    document.addEventListener("keydown", (event) => {


        if (event.code == 'Space'){

            falling = false;
            avatarX +=80;
            
        }
    
        

        })

    
    
    
    document.addEventListener('keyup', ()=> {
    
       
        falling = true;
    
    })
 
    
 
 
     startBtn.addEventListener('click', () => {
      
     
     start()

    

     })
 
     /*restartBtn.addEventListener('click', () => {
     
      start()
       

     })  */


     anissaBtn.addEventListener('click', ()=>{


      avatar = smallAvatanissa;

     })


     wonderwomanBtn.addEventListener('click', ()=>{

        avatar = smallAvatWonderWoman;
     })
 
 })
 
     
