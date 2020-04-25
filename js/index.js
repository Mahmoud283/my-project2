let music=document.getElementById("music");
let fail=document.getElementById("fail");
let score=document.getElementById("score");
let over=document.getElementById("over");
let startContainer=document.querySelector(".start-container");
let overContainer=document.querySelector(".over-container");
let playagain=document.getElementById("playagain")
let gameBlock=document.querySelector(".memory-games-blocks .game-block")
var tries=document.querySelector(".tries span")
var good=document.querySelector(".good span")

var container;

if (localStorage.getItem("highScore") == null) {
    container = [];
}
else {
    container = JSON.parse(localStorage.getItem("highScore"));
    display();
}


$(".start-container span").click(function(){

    let name =prompt("enter your name?")
    if(name==null||name=="")
    {
     document.querySelector(".name span").innerHTML="unknown"   
    }
    else{
        document.querySelector(".name span").innerHTML=name;   

    }
    startContainer.style.display="none";
    music.play();
})

let duration=1000;
let blockContainer=document.querySelector(".memory-games-blocks")
let blocks=Array.from(blockContainer.children)
let orderRange=[...Array(blocks.length).keys()]
shuffle(orderRange)
blocks.forEach((block,index)=>{
    block.style.order=orderRange[index];
    block.addEventListener('click',function(){
    flipBlock(block);

    })
})

function shuffle(array){

let current=array.length,
temp,random;

while(current>0)
{
    random=Math.floor(Math.random() * current);
    current--;
    temp=array[current]
    array[current]=array[random];
    array[random]=temp;

}
return array;
}
function flipBlock(selector){
selector.classList.add("isflip");
let allflipedblocks=blocks.filter(block=>block.classList.contains("isflip"));
if(allflipedblocks.length===2)
{
    (function clicking(){
        blockContainer.classList.add("no-clicking");
        setTimeout(()=>{
        blockContainer.classList.remove("no-clicking");

        },duration)
    })();
    check(allflipedblocks[0],allflipedblocks[1])
   
}
}
function check(fristblock,secondblock){
    if(fristblock.dataset.emotions===secondblock.dataset.emotions)
    {
        fristblock.classList.remove("isflip")
        secondblock.classList.remove("isflip")
        fristblock.classList.add("ismatch")
        secondblock.classList.add("ismatch")
        good.innerHTML=parseInt(good.innerHTML)+1;

        score.play();
    }
    else
    {
        tries.innerHTML=parseInt(tries.innerHTML)+1;
        gameover(tries.innerHTML)

        fail.play();
        setTimeout(()=>{
        fristblock.classList.remove("isflip")
        secondblock.classList.remove("isflip")

        },duration*2)
    }


}
function gameover(tries){
if(tries==6)
{
    over.play();
    let player={name: document.querySelector(".name span").innerHTML,
        wrong:document.querySelector(".tries span").innerHTML,
        correct:good.innerHTML}
        container.push(player)
        localStorage.setItem("highScore", JSON.stringify(container));
        display();

    setTimeout(()=>{
    document.querySelector(".tries span").innerHTML= 0;
    good.innerHTML= 0;
    overContainer.style.display="block";
    playagain.addEventListener("click",function(){
    overContainer.style.display="none";
    startContainer.style.display="block";
    })
    blocks.forEach((block)=>{
        block.classList.remove("ismatch");
        
        
    })
    
    },duration*3)

}

}

function display() {
    var temp = "";
 for (var i = 0; i < container.length; i++) {
        temp += `
        <tr>
               <td >${container[i].name}</td>
               <td> ${container[i].wrong}</td>
               <td> ${container[i].correct} </td>
        </tr>`;
    }


    document.getElementById("highscore").innerHTML = temp;

}