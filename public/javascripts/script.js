const menu = document.querySelector(".menu");
const sideCard = document.querySelector(".sideCard");

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