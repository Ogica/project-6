var debug=false;
var ROWS=9;
var COLS=9;
var GRASS=0;
var STONE=1;
var PLAYERONE=2;
var PLAYERTWO=3;
var BOMB=4;
var MACHINEGUN=5;
var TOMPSON=6;
var PISTOL=7;
var KNIFE=8;
var curentCount=0;
var bomb=new Weapon(BOMB,50,"images/bomb.png");
var machineGun=new Weapon(MACHINEGUN,40,"images/mg42.png");
var tompson=new Weapon(TOMPSON,30,"images/tompson.png");
var pistol=new Weapon(PISTOL,20,"images/colt_45.png");
var knife=new Weapon(KNIFE,10,"images/knife_1.png");
var player1=new Player(PLAYERONE,knife);
var player2=new Player(PLAYERTWO,knife);
var curentPlayer=player1;
var otherPlayer=player2;
var MAX_MOVES=3;
var objectNames=["grass","stone","player1","player2","bomb","machine gun","pistol","tompson"];
var map=[];

function draw(){
  var gridThree=document.getElementById('gridThree');
  gridThree.innerHTML="";
  for(x=0;x<ROWS; x++){
    for(y=0;y<COLS;y++){
      var box= document.createElement("div");
      var style="box ";
      switch(map[x][y]){
        case GRASS:break;
        case STONE:style+="stone";break;
        case PLAYERONE:style+="playerOne";break;
        case PLAYERTWO:style+="playerTwo";break;
        case BOMB:style+="bomb";break;
        case MACHINEGUN:style+="machineGun";break;
        case TOMPSON:style+="tompson";break;
        case PISTOL:style+="pistol";break;
        case KNIFE:style+="knife";break;
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
  document.getElementById("player1_weapon").setAttribute("src",player1.weapon.image);
  document.getElementById("player2_health").innerHTML=player2.health;
  document.getElementById("player2_weapon").setAttribute("src",player2.weapon.image);
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
function Weapon(id,damage,image){
  this.id=id;
  this.x;
  this.y;
  this.damage=damage;
  this.image=image;
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
  if ((validPosition(leftx,lefty)==true && map[leftx][lefty]==otherPlayer.id && map[newx][newy] != STONE) || (validPosition(rightx,righty)==true && map[rightx][righty]==otherPlayer.id && map[newx][newy] != STONE)
  || (validPosition(upx,upy)==true && map[upx][upy]==otherPlayer.id && map[newx][newy] != STONE) || (validPosition(downx,downy)==true && map[downx][downy]==otherPlayer.id && map[newx][newy] != STONE)){
    document.removeEventListener("keydown",keyCode);
    if (curentPlayer==player1){
      document.getElementById('battledialog').innerHTML=" Player1 do you want to attack Player2 or do you want to defend yourself ?";
    } else if (curentPlayer==player2){
      document.getElementById('battledialog').innerHTML=" Player2 do you want to attack Player1 or do you want to defend yourself ?";
    }
    if (curentCount==MAX_MOVES){
      $( "#dialog-rules" ).dialog("open");

    } else if(curentCount<MAX_MOVES){
      $( "#dialog-confirm" ).dialog("open");
    }
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
  if (validPosition(newx,newy)==true){
    if(map[newx][newy]==GRASS){
      map[oldx][oldy]=GRASS;
      map[newx][newy]=curentPlayer.id;
      curentPlayer.x=newx;
      curentPlayer.y=newy;
      incrementCount();
      draw();
      checkBattleConditions(newx,newy);
    }else if(map[newx][newy]== bomb.id || map[newx][newy]== machineGun.id || map[newx][newy]== pistol.id || map[newx][newy]== tompson.id || map[newx][newy]== knife.id){
      if(map[newx][newy]== bomb.id){
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
      incrementCount();
      draw();
      checkBattleConditions(newx,newy);
  }
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
  if (curentCount>=MAX_MOVES){
    changePlayer();
    resetCount();
  }
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
    if (player1.health <=0) { document.getElementById("gameoverdialog").innerHTML =" VICTORY FOR PLAYER 2 <br> Do you want to play again? ";
  } else if (player2.health<=0){
    document.getElementById("gameoverdialog").innerHTML =" VICTORY FOR PLAYER 1 <br> Do you want to play again? " ;
  }
    $( "#dialog-gameover" ).dialog("open")
    }
}
function start(){
  resetGame();
  generateBoard();
  draw();
}
document.addEventListener("keydown",keyCode);
start();
