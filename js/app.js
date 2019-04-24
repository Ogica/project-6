
window.onload = function() {
  document.getElementById('gridOne').style.display = 'none';
  document.getElementById('gridTwo').style.display = 'none';
  document.getElementById('gridThree').style.display = 'none';
}
function chooseGame(){
  var gridOne=document.getElementById('gridOne');
  var gridTwo=document.getElementById('gridTwo');
  var gridThree=document.getElementById('gridThree');

  if (document.getElementById('firstGrid').checked) {
    gridOne.style.display="grid";
    gridTwo.style.display="none";
    gridThree.style.display="none"
  } else if(document.getElementById('secondGrid').checked) {
    gridOne.style.display="none";
    gridTwo.style.display="grid";
    gridThree.style.display="none"
  } else if(document.getElementById('thirdGrid').checked) {
    gridOne.style.display="none";
    gridTwo.style.display="none";
    gridThree.style.display="grid"
  }
}
