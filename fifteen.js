
var mypuzzle = [];
var backPiece = [];

window.onload = function() {
    mypuzzle = $$("#puzzlearea div");
    var row = 0, right = 0, top = 0;
  for (var i=0; i<mypuzzle.length; i++){
      mypuzzle[i].addClassName("puzzlepiece");
      mypuzzle[i].style.float = "left";
      mypuzzle[i].style.backgroundSize = "400px 400px";
      backPiece[i] = [];
      backPiece[i][0] = right;
      backPiece[i][1] = top;
      mypuzzle[i].style.backgroundPosition = "-"+backPiece[i][0]+"px -"+backPiece[i][1]+"px";
      row ++;
      if (row === 4){
          top += 100; right = 0; row = 0; 
      } 
      else {
          right +=100;
      }
    }

  var freemove = document.createElement("div");
   $("puzzlearea").appendChild(freemove);          //creates a div that acts as the free move 
   blankPiece(freemove);


   mypuzzle = $$("#puzzlearea div");              // "reassign" the puzzle array with the new div created
   $("shufflebutton").observe('click', shuffle);
   movepiece();
};

//blankPiece creates the blank background for the space that represents the available move
var blankPiece = function(el){
  el.removeClassName("movablepiece");
  el.addClassName("puzzlepiece");
  el.style.float = "left";
  el.style.backgroundImage = "none";
  el.style.border = "2px solid white";
};

//backgroundPos is used to place the background piece to the number on the puzzlepiece.
var backgroundPos = function(piece , item){
  piece.style.backgroundPosition = "-"+backPiece[item-1][0]+"px -"+backPiece[item-1][1]+"px";
};

//regularP is used to apply the background to a numbered piece. 
var regularP = function(p){
      p.addClassName("puzzlepiece");
      p.style.border = "2px solid black";
     
      p.style.backgroundSize = "400px 400px";
};

//the shuffluePuzzle function is used to shullfe each puzzle on the page.
function shuffle(){
	var nArray = [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15];
	for (var i=mypuzzle.length; i>0; i){
		var j = Math.floor(Math.random() * i);
		var x = nArray[--i];
		var test = nArray[j];
		if(test == "0") { 
			mypuzzle[i].addClassName("puzzlepiece");
	 		blankPiece(mypuzzle[i]);
	 		mypuzzle[i].innerHTML = "";
					}
		else{
     			mypuzzle[i].innerHTML = nArray[j];
      			regularP(mypuzzle[i]);
      			backgroundPos(mypuzzle[i], test);
          }
			nArray[j] = x;
    }
  	moveable();
   }

//this function places the class movablepiece
var move = function(piece){
  mypuzzle[piece].addClassName("movablepiece");
};

//the movepiece function is used to actually move the piece that is clicked on into the space.
var movepiece = function(){
    var move = this.innerHTML;
    var yon = this.hasClassName('movablepiece');
    var blank = 0;
    if (yon){
      	for (var i=0;i<mypuzzle.length;i++){
        	blank = mypuzzle[i].innerHTML;
         	if (mypuzzle[i].innerHTML == ""){
          		mypuzzle[i].innerHTML = move;
          		this.innerHTML = blank;

          		regularP(mypuzzle[i]);
          		blankPiece(this);

        		 moveable();
        		 backgroundPos(mypuzzle[i], move);
      }    
     } 
   }
         };

// used to determine which pieces are beside the empty space and are able to move, therefore, applying the 'movablepiece' class
var moveable = function(){
	for (var i=0;i<mypuzzle.length;i++){
		mypuzzle[i].removeClassName("movablepiece");	}
		  for (var i=0; i<mypuzzle.length; i++){
  			if (mypuzzle[i].innerHTML == ""){         
 				  mypuzzle[i].removeClassName("movablepiece");

  				switch(i){
  					case 0:
  						move(i+1);
  						move(i+4);
              					break;
  					case 1:
  					case 2:
  						move(i-1);
  						move(i+1);
        					move(i+4);
  						break;
  					case 3:
  						move(i-1);
  						move(i+4);
  						break;
  					case 4:
  						move(i-4);
  						move(i+4);
  						move(i+1);
  						break;
  					case 5:
  					case 6:
  					case 9:
  					case 10:
  						move(i-4);
  						move(i+4);
  						move(i+1);
  						move(i-1);
              					break;
  					case 7: 
  					case 11:
  						move(i-4);
  						move(i+4);
  						move(i-1);
              					break;
  					case 8:
  						move(i-4);
  						move(i+1);
  						move(i+4);
  						break;
  					case 12:
  						move(i-4);
  						move(i+1);
  						break;
  					case 13: 
  					case 14:
  						move(i-4);
  						move(i-1);
  						move(i+1);
  						break;
  					case 15:
  						move(i-4);
  						move(i-1);
  						break;
  					}       	
  		}
      			mypuzzle[i].observe('click', movepiece); }  
  	};
  