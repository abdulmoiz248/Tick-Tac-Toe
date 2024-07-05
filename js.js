const API_KEY = 'hidden';
const API_URL = 'https://api.your-service.com/v1/generative-model/gemini-1.5-flash:generateContent'; 
import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(API_KEY);

async function run(prompt) {

  const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash"});

 

  const result = await model.generateContent(prompt);
  const response = await result.response;
  const text = response.text();
  console.log(text);
  mark_ai_move(text);
}

let board_places=[true,true,true,true,true,true,true,true,true];
let boxes=document.querySelectorAll('.box');
const listener=[];

let firstmove=(()=>{
  if(Math.random()>0.5){
    return 'User Turn First';
  }else{
    return 'AI Turn First';
  }
})();

let modal=document.querySelector('.modal');
let tick=document.querySelector('.tick');
let cross=document.querySelector('.cross');
let user_symbol;
let ai_symbol;
tick.addEventListener('click',()=>{
      modal.style.display='none';
      user_symbol='tick.png';
      ai_symbol='cross.png';
      alert(firstmove);
      start();
});

cross.addEventListener('click',()=>{
  modal.style.display='none';
  user_symbol='cross.png';
  ai_symbol='tick.png';
  alert(firstmove);
  start();
});


let check_board = () => {
 

  setTimeout( () => {
    check_col();
     check_row();
    diagonal_check();
     check_tie();
  }, 500);
}

let check_tie=()=>{
  let true_exists=false;
  for(board of board_places){
    if(board==true){
      true_exists=true;
    }
  }

  if(!true_exists){
    alert('Its a Tie..!!');
    location.reload();
  }
}
let diagonal_check=()=>{
  if(board_places[0]=='a' && board_places[4]=='a' && board_places[8]=='a'){
    alert('AI wins');
   location.reload();

  }else if(board_places[2]=='a' && board_places[4]=='a' && board_places[6]=='a'){
    alert('AI wins');
   location.reload();
  }else  if(board_places[0]=='u' && board_places[4]=='u' && board_places[8]=='u'){
    alert('User wins');
   location.reload();

  }else if(board_places[2]=='u' && board_places[4]=='u' && board_places[6]=='u'){
    alert('User wins');
   location.reload();
  }
} 

let check_col=()=>{
  if(board_places[0]=='a' && board_places[3]=='a' && board_places[6]=='a'){
    alert('AI wins');
   location.reload();
   
  }else  if(board_places[1]=='a' && board_places[4]=='a' && board_places[7]=='a'){
    alert('AI wins');
    location.reload();
  } if(board_places[2]=='a' && board_places[5]=='a' && board_places[8]=='a'){
    alert('AI wins');
    location.reload();
   
  }else if(board_places[0]=='u' && board_places[3]=='u' && board_places[6]=='u'){
    alert('User wins');
    location.reload();
  }else  if(board_places[1]=='u' && board_places[4]=='u' && board_places[7]=='u'){
    alert('User wins');
    location.reload();
   
  } if(board_places[2]=='u' && board_places[5]=='u' && board_places[8]=='u'){
    alert('User wins');
    location.reload();
   
  }

  
}


let check_row=()=>{
  if(board_places[0]=='a' && board_places[1]=='a' && board_places[2]=='a'){
    alert('AI wins');
   location.reload();
   
  }else  if(board_places[3]=='a' && board_places[4]=='a' && board_places[5]=='a'){
    alert('AI wins');
    location.reload();
  } if(board_places[6]=='a' && board_places[7]=='a' && board_places[8]=='a'){
    alert('AI wins');
    location.reload();
   
  }else if(board_places[0]=='u' && board_places[1]=='u' && board_places[2]=='u'){
    alert('User wins');
    location.reload();
  }else  if(board_places[3]=='u' && board_places[4]=='u' && board_places[5]=='u'){
    alert('User wins');
    location.reload();
   
  } if(board_places[6]=='u' && board_places[7]=='u' && board_places[8]=='u'){
    alert('User wins');
    location.reload();
   
  }

  
}
let board=`

1 | 2 | 3
---------
4 | 5 | 6
---------
7 | 8 | 9

`;

let prompt=`
**The Board:** Imagine a 3x3 grid with spaces numbered 1 to 9, like this:

\`\`\`
${board}
\`\`\`

- 'a' represents an AI move
- 'u' represents a user move

Current board state: \`${firstmove}\`

It's your turn. Provide your choice as a single number (1-9).
first check that if game is drawn user win or ai win then select your move check correctly
dont select already selected location
Return only a single number. No statements or additional text.
`;
let Ai_turn=()=>{
  
  run(prompt);
}  


let start=()=>{
   if(firstmove=='AI Turn First'){
     Ai_turn();

   }
  }
let select_box=(box,index)=>{
  return function(event) {
    let img=document.createElement('img');
    img.src=user_symbol; 
    img.style.height='80px';
    img.style.width='80px'
    box.appendChild(img);   
    updateboarduser(index+1); 
  }
 

}

let updates_moves=(move)=>{

  boxes[move-1].classList.remove('hoverClass');
  boxes[move-1].removeEventListener('click',listener[move-1]);
  check_board();
}
 
let updateboardai=(move)=>{
   prompt+=`Ai marks at ${move} \n`;  
   board_places[move-1]='a'; 
   updates_moves(move);
  

}

let updateboarduser=(move)=>{
  prompt+=`User marks at ${move} \n`;
  board_places[move-1]='u'; 
  updates_moves(move);
  Ai_turn();
}

let mark_ai_move=(move)=>{
  
  if(board_places[move-1]!=true) {
    console.log(prompt);
    prompt+=`Already marked at ${move} change your move!!! \n`;  
    Ai_turn();
    return;
  }
  let box;
  let img;


  switch (Number(move)) {
    case 1:
      box=document.querySelector('.r1-1');
      img=document.createElement('img');
      img.src=ai_symbol; 
      img.style.height='80px';
       img.style.width='80px'
      box.appendChild(img);
      break;
    case 2:
       box=document.querySelector('.r1-2');
       img=document.createElement('img');
       img.src=ai_symbol; 
       img.style.height='80px';
        img.style.width='80px'
       box.appendChild(img);
      break;
    case 3:
     
       box=document.querySelector('.r1-3');
       img=document.createElement('img');
       img.src=ai_symbol; 
       img.style.height='80px';
        img.style.width='80px'
       box.appendChild(img);

      break;
    case 4:
       box=document.querySelector('.r2-1');
       img=document.createElement('img');
       img.src=ai_symbol; 
       img.style.height='80px';
        img.style.width='80px'
       box.appendChild(img);
      break;
    case 5:
      box=document.querySelector('.r2-2');
      img=document.createElement('img');
      img.src=ai_symbol; 
      img.style.height='80px';
       img.style.width='80px'
      box.appendChild(img);
      break;
    case 6:
      box=document.querySelector('.r2-3');
      img=document.createElement('img');
      img.src=ai_symbol; 
      img.style.height='80px';
       img.style.width='80px'
      box.appendChild(img);
      break;
    case 7:
      box=document.querySelector('.r3-1');
      img=document.createElement('img');
      img.src=ai_symbol; 
      img.style.height='80px';
       img.style.width='80px'
      box.appendChild(img);
      break;
    case 8:
      box=document.querySelector('.r3-2');
      img=document.createElement('img');
      img.src=ai_symbol; 
      img.style.height='80px';
       img.style.width='80px'
      box.appendChild(img);
      break;
    case 9:
      box=document.querySelector('.r3-3');
      img=document.createElement('img');
      img.src=ai_symbol; 
      img.style.height='80px';
      img.style.width='80px'
      box.appendChild(img);
      break;
    default:
     if(move==10)
     {
      alert('draw');
    return;
  }else if(move==11){
     alert('user won');
     return;
    }else{
      alert('Ai won');
    }
      break;
  }
  updateboardai(move);  
  
}

boxes.forEach((box,index)=>{
  listener[index]=select_box(box,index);
  box.addEventListener('click',listener[index]);

});
