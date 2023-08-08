const menu = document.querySelector(".menu");
const sideCard = document.querySelector(".sideCard");
const darkModeBtn = document.querySelector(".darkMode");

let count=0;
menu.addEventListener("click",()=>{
    if(count==0){
   sideCard.style.left="-100%"
   count=1;
    }
    else if(count==1){
        sideCard.style.left = 0;
        count=0;
    }
})

let color=0;
darkModeBtn.addEventListener("click",()=>{
    
     if (color == 0) {
      document.body.style.backgroundColor = "black";
       color = 1;
     } else if (color == 1) {
       document.body.style.backgroundColor = "white";
       color = 0;
     }
})