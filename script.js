
//canvas 
let canvas = document.getElementById('mycanv');
let ctx = canvas.getContext('2d');
canvas.style.border = 'none';


//wireframes/different screens
let avatpage = document.getElementById('avatPage');
let endpage = document.getElementById('endPage');


//buttons
let startBtn = document.querySelector('#start')
let anissaBtn = document.querySelector('#avatanissa')
let wonderwomanBtn = document.querySelector('#avatwonderwoman')
let musicbutton = document.getElementById('playmusic')


let finalscore = document.querySelector('#finalscore');   
let finallevel =document.querySelector('#finallevel');           


// images & gifs
let mySpace = new Image();
mySpace.src='./Images/milky-way-67504_640.jpg'

let sun = new Image();
sun.src ='./Images/sun.png'

let thunder = new Image();
thunder.src = './Images/thunder.png'

let smallAvatanissa = new Image();
smallAvatanissa.src='./Images/anissaFly2.png'

let smallAvatWonderWoman= new Image();
smallAvatWonderWoman.src='./Images/wonderwoman.png (2).png'

let countdownNum = document.getElementById('countdown');
    




//audios 
let joyscream = new Audio();
joyscream.src="./sounds/joysound.wav"
joyscream.volume = 0.1;

let painScream = new Audio();
painScream.src="./sounds/touchThunderSound.wav"
painScream.volume = 0.1;

let startAudio = new Audio();
startAudio.src = "./sounds/gameMusic.mp3"
startAudio.volume = 0.1;

let gameOverAudio = new Audio();
gameOverAudio.src="./sounds/gameoverSound.wav"
gameOverAudio.volume = 0.1;

let gameOverVoice = new Audio();
gameOverVoice.src ="./sounds/gameOverVoice.wav"
gameOverVoice.volume = 0.1;

let click = new Audio();
click.src="./sounds/click.wav"
click.volume=0.1;

let avatmusic= new Audio();
avatmusic.src="./sounds/startmusic.m4a"
avatmusic.volume=0.1;




//variables, primitives, defaults
let intervalId = 0;   //or null?  
let gameOver = false;
let lifepoints = 100;
let falling = true
let isUp = false;
let isRight= false;
let isLeft = false;
let isJumping = false;
let avatarX = 30, avatarY = 50;
let avatar = smallAvatanissa;   
let level = 1;  
          



//variables, composites
let suns = [
    {x: 200, y: 0}, 
   
]


let thunders = [
    {x: 300, y: 80}, 

]



//functions

function start(){

    intervalId = 0;   
    gameOver = false;
    lifepoints = 100;
    falling = true
    avatarX = 30, 
    avatarY = 50   
    canvas.style.display = 'block' 
    startBtn.style.display = 'none'
    avatpage.style.display ="none"
    endpage.style.display="none"
    avatmusic.pause();
    
    startAudio.play();
    setInterval(() => {
        startAudio.play()    
    }, 28700);
    
    playGame()

}


function endGame(){

    cancelAnimationFrame(intervalId)
    canvas.style.display = 'none'
    startBtn.style.display = 'none'
    startAudio.pause();
    endpage.style.display = "block";
    gameOverAudio.play();
    finallevel.innerHTML = level;
    finalscore.innerHTML = lifepoints;

    setTimeout(()=>{

        gameOverVoice.play();

    },1500)
  
    let countID = setInterval(()=> {      

       countdownNum.innerText = Number(countdownNum.innerText) -1


    }, 1000)
   

    setTimeout(()=> {      //<-----clear Interval??????????????????


        location.reload();
        endpage.style.display="none"       //Das hier geändert 



    }, 9000)


   


}





function animateThunder(){

    for(let i=0 ; i< thunders.length; i++){
        ctx.drawImage(thunder, thunders[i].x, thunders[i].y )
    
        thunders[i].x -= 1

        let level2Time = setTimeout(()=>{

            thunders[i].x -= 2 
            level =2;    
           // finallevel=2;               //auch Level updaten?? also unten "Level: {level}"???
    
            },20000)

          let level3Time = setTimeout(()=>{
            clearTimeout(level2Time)
                thunders[i].x -= 3  
                level =3;  
              //  finallevel=3;            //auch Level updaten?? also unten "Level: {level}"???
                
                },40000)

                  



                   

                   

        if (thunders[i].x + thunder.width < 0) {
            thunders[i] = {
                x: canvas.width+1,   
                y: Math.floor(Math.random() * (canvas.height -50))
            }

            setTimeout(()=>{      //das hier geändert
                clearTimeout(level2Time)  
                clearTimeout(level3Time)
    
                thunders[i].x= Math.floor(Math.random() * canvas.width)
                thunders[i].x -=1 
                thunders[i].y = Math.floor(Math.random() * (canvas.height -50)) 
                thunders[i].y +=1  
                level =4;
               // finallevel=4;
        
              },60000) 
       } 

                        

       


       




       if(avatarX + avatar.width >= thunders[i].x && avatarX <= thunders[i].x + thunder.width)
       {
       
           if(avatarY + avatar.height < thunders[i].y + thunder.height && avatarY + avatar.height > thunders[i].y) {
       
               painScream.play();

               if(lifepoints>=100){

               lifepoints= Math.round(lifepoints/2);  
               thunders[i].x=canvas.width+1;   
               thunders[i].y = Math.floor(Math.random() * (canvas.height -50))

               } else {

                gameOver=true; 
               }
            

           }
       
       
       
       }




    }


}



function animateSun(){

    for(let i=0 ; i< suns.length; i++){
        ctx.drawImage(sun, suns[i].x, suns[i].y ) 
        suns[i].x -= 1

       let level2Time= setTimeout(()=>{

       
        suns[i].x -= 2   
        level =2;   
      

        },20000)

       let level3Time= setTimeout(()=>{
          clearTimeout(level2Time)
            suns[i].x -= 3   
            level =3;  
           // finallevel=3;
    
            },40000)

           /* setTimeout(()=>{

                suns[i].x -= 3  
                level =4;     
                finallevel=4;         
        
                },60000)*/

       
        if (suns[i].x + sun.width < 0) {
            suns[i] = {
                x: canvas.width+1,        
                y: Math.floor(Math.random() * (canvas.height -50))
            }
            setTimeout(()=>{      //das hier geändert
                   clearTimeout(level2Time) 
                   clearTimeout(level3Time)
    
                suns[i].x= Math.floor(Math.random() * canvas.width)
                suns[i].x -=1 
                suns[i].y = Math.floor(Math.random() * (canvas.height -50)) 
                suns[i].y +=1  
                level =4;              //hier geändert
               // finallevel=4;
        
              },60000) 
       } 

       if(avatarX + avatar.width >= suns[i].x && avatarX <= suns[i].x + sun.width)
        {
        
            if(avatarY + avatar.height < suns[i].y + sun.height && avatarY + avatar.height > suns[i].y) {
        
                joyscream.play();
                lifepoints +=10;  

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
    else if(isUp){
        avatarY -= 5
    }  
    else if (isRight){

        avatarX +=5
    }
    else if(isLeft){

        avatarX -=5;
    }

    else if (isJumping){         ///PABLO FRAGEN ob ich das hier behalte!!!!!!

        avatarX +=80;
        setTimeout(()=>{
        avatarX -=80;

        },300)
    }

   if(avatarX+avatar.width >= canvas.width){            //<---------das funktioniert nicht! 

    
    isRight=false;
    avatarX -=10;

    } 

    else if(avatarX <= 0){
        
        isLeft=false;
        avatarX +=10;
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


    
    ctx.font = '23px MIXCOMIC'
    ctx.fillStyle = "white"
    ctx.fillText(`Lifepoints: ${lifepoints}    Level: ${level}`, 20, canvas.height - 20)

     
}
       
       
     

    
    

    








//Event listeners

window.addEventListener('load', () => {
    
   
     //avatmusic.play(); 
     canvas.style.display = 'none'  
     startBtn.style.display = 'block'
     avatpage.style.display ="block";
     endpage.style.display ="none";
    


 
 
 document.addEventListener("keydown", (event) => {

    if (event.code == 'ArrowUp'){

        falling = false;
        isUp = true;
        isRight=false;
        isLeft = false;
        isJumping = false; 

    }


    if (event.code == 'ArrowRight'){
    
        falling = false;
        isRight=true;
        isLeft = false;
        isJumping = false; 
        isUp = false;

    }

    if (event.code == 'ArrowLeft'){

      falling = false; 
      isLeft = true;
      isJumping = false; 
      isRight = false;
      isUp = false;
    }

    if (event.code == 'Space'){ //das noch drin lassen?//////

        falling = false;
        isJumping = true; 
        isRight = false;
        isLeft = false;
        isUp = false;
        
    }

 
    })




    
    
    document.addEventListener('keyup', ()=> {
    
       
        falling = true;
    
    })
 
    
 
 
     startBtn.addEventListener('click', () => {
      
     
     start()


    

     })

     startBtn.addEventListener('mouseover', () => {
      
     
       click.play();
   
       
   
        })
   

 

     anissaBtn.addEventListener('click', ()=>{


      avatar = smallAvatanissa;

     })

     anissaBtn.addEventListener('mouseover', ()=>{


        avatar = smallAvatanissa;
        click.play();
  
       })
  

     wonderwomanBtn.addEventListener('click', ()=>{

        avatar = smallAvatWonderWoman;
     })


     wonderwomanBtn.addEventListener('mouseover', ()=>{

        avatar = smallAvatWonderWoman;
        click.play();
     })


     musicbutton.addEventListener('click', ()=>{

        avatmusic.play();
     })
 
 
 })
 
     
