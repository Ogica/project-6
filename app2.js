const debug=true;
const ROWS=9;
const COLS=9;
function draw(){
  let gridThree=document.getElementById('gridThree');
  gridThree.innerHTML="";
  for(x=0;x<ROWS; x++){
    for(y=0;y<COLS;y++){
      let box= document.createElement("div");
      let style="box ";
      switch(map[x][y]){
        case 0:break;
        case 1:style+="stone";break;
        case 2:style+="playerOne";break;
        case 3:style+="playerTwo";break;
        case 4:style+="bomb";break;
        case 5:style+="machineGun";break;
        case 6:style+="pistol";break;
        case 7:style+="tompson";break;
        case 8:style+="knife";break;

      }
      if (debug==true){
        style+=" debug";
        box.innerHTML="("+x+","+y+")";
      }
      box.setAttribute("class", style);
      gridThree.appendChild(box);
    }
  }
  updateDashboard();
}
function updateDashboard(){
  document.getElementById("player1_health").innerHTML=player1.health;
  document.getElementById("player1_weapon").innerHTML=player1.weapon;
  document.getElementById("player2_health").innerHTML=player2.health;
  document.getElementById("player2_weapon").innerHTML=player2.weapon;
  if(curentPlayer==player1){
    document.getElementById("player1").className="scores myturn";
    document.getElementById("player2").className="scores";
  } else{
    document.getElementById("player2").className="scores myturn";
    document.getElementById("player1").className="scores";
  } if (player1.shield==false){
    document.getElementById("player1_shield").innerHTML="Off";
  } else{
    document.getElementById("player1_shield").innerHTML="On";
  }
  if (player2.shield==false){
    document.getElementById("player2_shield").innerHTML="Off";
  } else{
    document.getElementById("player2_shield").innerHTML="On";
  }
}
function Weapon(id,damage){
  this.id=id;
  this.x;
  this.y;
  this.damage=damage;
}

function Player(id,weapon){
  this.id=id;
  this.x;
  this.y;
  this.health=100;
  this.weapon=weapon;
  this.shield=false;
  this.takeDamage= function (dp){
    if(this.shield==true){
      this.health -= dp/2;
      this.shield=false;
    }else{
      this.health-=dp;
    }
  }

}
var GRASS=0;
var STONE=1;
var curentCount=0;
var bomb=new Weapon(4,50);
var machineGun=new Weapon(5,40);
var tompson=new Weapon(6,30);
var pistol=new Weapon(7,20);
var knife=new Weapon(8,10);
var player1=new Player(2,knife);
var player2=new Player(3,knife);
var curentPlayer=player1;
var otherPlayer=player2;
var MAX_MOVES=3;
var objectNames=["grass","stone","player1","player2","bomb","machine gun","pistol","tompson"];
var map=[];
function validPosition(newx,newy){
  if(newx<0 || newy<0  || newx>=ROWS || newy>=COLS){
    return false;
  } else{
    return true;
  }
}
function checkBattleConditions(newx,newy){
  let upx=newx-1;
  let upy=newy;
  let downx=newx+1;
  let downy=newy;
  let rightx=newx;
  let righty=newy+1;
  let leftx=newx;
  let lefty=newy-1;
  if ((validPosition(leftx,lefty)==true && map[leftx][lefty]==otherPlayer.id) || (validPosition(rightx,righty)==true && map[rightx][righty]==otherPlayer.id)
  || (validPosition(upx,upy)==true && map[upx][upy]==otherPlayer.id) || (validPosition(downx,downy)==true && map[downx][downy]==otherPlayer.id)){
    document.removeEventListener("keydown",keyCode);
        $( "#dialog-confirm" ).dialog("open");
  }
}
function move(direction){
  var oldx=curentPlayer.x;
  var oldy=curentPlayer.y;
  var newx=oldx;
  var newy=oldy;
  switch (direction) {
    case "up": newx++;break;
    case "down":newx--;break;
    case "left":newy--;break;
    case "right":newy++;break;
  }
  checkBattleConditions(newx,newy);
  if (validPosition(newx,newy)==true){
    if(map[newx][newy]==GRASS){
      map[oldx][oldy]=GRASS;
      map[newx][newy]=curentPlayer.id;
      curentPlayer.x=newx;
      curentPlayer.y=newy;
    }else if(map[newx][newy]== bomb.id || map[newx][newy]== machineGun.id || map[newx][newy]== pistol.id || map[newx][newy]== tompson.id || map[newx][newy]== knife.id){
      if(map[newx][newy]== bomb.id){
        //curentPlayer weapon should be bomb//
        let previousWeapon=curentPlayer.weapon;
        curentPlayer.weapon=bomb;
        map[newx][newy]=curentPlayer.id;
        curentPlayer.x=newx;
        curentPlayer.y=newy;
        map[oldx][oldy]=previousWeapon.id;

      } else if(map[newx][newy]== machineGun.id){
        let previousWeapon=curentPlayer.weapon;
        curentPlayer.weapon=machineGun;
        map[newx][newy]=curentPlayer.id;
        curentPlayer.x=newx;
        curentPlayer.y=newy;
        map[oldx][oldy]=previousWeapon.id;
      } else if(map[newx][newy]== pistol.id){
        let previousWeapon=curentPlayer.weapon;
        curentPlayer.weapon=pistol;
        map[newx][newy]=curentPlayer.id;
        curentPlayer.x=newx;
        curentPlayer.y=newy;
        map[oldx][oldy]=previousWeapon.id;
      } else if(map[newx][newy]== tompson.id){
        let previousWeapon=curentPlayer.weapon;
        curentPlayer.weapon=tompson;
        map[newx][newy]=curentPlayer.id;
        curentPlayer.x=newx;
        curentPlayer.y=newy;
        map[oldx][oldy]=previousWeapon.id;
      }else if(map[newx][newy]== knife.id){
        let previousWeapon=curentPlayer.weapon;
        curentPlayer.weapon=knife;
        map[newx][newy]=curentPlayer.id;
        curentPlayer.x=newx;
        curentPlayer.y=newy;
        map[oldx][oldy]=previousWeapon.id;
      }
    }
  }
  draw();
  incrementCount();
}
function changePlayer(){
  if (curentPlayer==player1){
    curentPlayer=player2;
    otherPlayer=player1;
  }else if(curentPlayer==player2) {
    curentPlayer=player1;
    otherPlayer=player2;
  }
}
function resetCount(){
  curentCount=0;
}
function incrementCount(){
  curentCount+=1;
  if (curentCount==MAX_MOVES){
    changePlayer();
    resetCount();
  }
}

function keyCode(event) {
  event.preventDefault();
  let x = event.which;
  switch(x){
    case 37:move("left");break;
    case 38:move("down");break;
    case 39: move("right");break;
    case 40: move("up");break;
  }
}
function generateMap(){
  map=[];
  for (let i=0;i<ROWS;i++){
    let row=[];
    for(let j=0;j<COLS;j++){
      row.push(GRASS);
    }
    map.push(row);
  }

}
function generateStones(){
  var stone_counter=0;
  let number_of_stones=Math.ceil((10/100)*(ROWS*COLS));
  while(stone_counter<number_of_stones){
    let x=Math.floor(Math.random()*ROWS);
    let y=Math.floor(Math.random()*COLS);
    if (map[x][y]==GRASS){
      map[x][y]=STONE;
      stone_counter+=1;
    }
  }
}
function generateWeapons(){
  let weapons=[4,5,6,7];
  let weapons_counter=0;
  while(weapons_counter<weapons.length){
    let x=Math.floor(Math.random()*ROWS);
    let y=Math.floor(Math.random()*COLS);
    if (map[x][y]==GRASS){
      map[x][y]=weapons[weapons_counter];
      weapons_counter+=1;
    }
  }
}
function generatePlayer1(){
  let player_counter=0;
  let number_of_players=1;
  while (player_counter<number_of_players){
    let x=Math.floor(Math.random()*(ROWS/2));
    let y=Math.floor(Math.random()*COLS);
    if (map[x][y]==GRASS){
      map[x][y]=player1.id;
      player1.x=x;
      player1.y=y;
      player_counter+=1;
    }
  }
}
function generatePlayer2(){
  let player_counter=0;
  let number_of_players=1;
  while (player_counter<number_of_players){
    let x=Math.floor(Math.random()*(ROWS/2)+ROWS/2);
    let y=Math.floor(Math.random()*COLS);
    if (map[x][y]==GRASS){
      map[x][y]=player2.id;
      player2.x=x;
      player2.y=y;
      player_counter+=1;
    }
  }
}
function resetGame(){
  map=[];
  curentCount=0;
  player1=new Player(2,knife);
  player2=new Player(3,knife);
  curentPlayer=player1;
  otherPlayer=player2;

}
function generateBoard(){
  generateMap();
  generateStones();
  generateWeapons();
  generatePlayer1();
  generatePlayer2();
}

function gameOver(){
  if( player1.health <=0 || player2.health<=0 ){
    $( "#dialog-gameover" ).dialog("open")
    if ( $( "#dialog-gameover" ).buttons=="Play"){
      start();
    } else if ( $( "#dialog-gameover" ).buttons=="End Game"){

    }
  }
}
function start(){
  resetGame();
  generateBoard();
  draw();

}
document.addEventListener("keydown",keyCode);
start();

if (curentPlayer==player1){
  document.getElementById('battledialog').innerHTML=" bla bla bla";
} else if (curentPlayer==player2){
  document.getElementById('battledialog').innerHTML=" clo clo clo";

}
