function easeIn(t) {
  return t * t * t;
}
function easeOut(t) {
  return 1 - (1-t) * (1-t) * (1-t);
}
function easeInOut(t) {
  if(t <= 0.5) {
    return easeIn(t*2)/2;
  }else{
    return easeOut( (t - 0.5)*2 ) / 2 + 0.5;
  }
}
var isPageLoaded = false;
    var SIZE = 40,
        MARGIN = 20,
        SPEED = 220;

    var canvas = document.getElementById("loader"),
        ctx = canvas.getContext("2d");

    var isGoingRight = true,
        step = 0,
        lastId = 1,
        lastMove = Date.now();

    function Square(x, y) {
      this.id = lastId++;
      this.prevX = x;
      this.prevY = y;
      this.nextX = x;
      this.nextY = y;
      this.x = x;
      this.y = y;
      this.animation = 0;

      Square.squares.push(this);
    }
    Square.squares = [];
    Square.prototype.animate = function() {
      //this.animation = Math.min(this.animation + 0.05, 1);
      this.animation = (Date.now() - lastMove) / SPEED;
      var t = easeInOut(this.animation);

      this.x = this.prevX + (this.nextX - this.prevX) * t;
      this.y = this.prevY + (this.nextY - this.prevY) * t;

      return this;
    };
    Square.prototype.draw = function(_ctx) {
      var x = (canvas.width / 2) + (MARGIN / 2) +(SIZE*this.x) - (SIZE*2);
      var y = (canvas.height / 2) + (MARGIN / 2) + (SIZE*this.y) - (SIZE*2);
      _ctx.clearRect(x, y, SIZE - (MARGIN / 2), SIZE - (MARGIN / 2));
    };

    new Square(0, 1);
    new Square(1, 1);
    new Square(2, 1);
    new Square(3, 1);

    new Square(0, 0);
    function loop() {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;

      ctx.fillStyle = "#232323";
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      for(var i = 0; i < Square.squares.length; i++)
        Square.squares[i].animate().draw(ctx);
    
      $("#loader").css("background-color", "transparent");
      if(!isPageLoaded)
        requestAnimationFrame(loop);
    }
    requestAnimationFrame(loop);

    setInterval(function(){
      lastMove = Date.now();
      for(var i = 0; i < Square.squares.length; i++){
        var target = Square.squares[i];
        target.animation = 0;
        target.x = target.nextX;
        target.y = target.nextY;

        target.prevX = target.nextX;
        target.prevY = target.nextY;
      }
      switch(step) {
        case 0:
          var target = null;

          for(var i = 0; i < Square.squares.length; i++)
            if(Square.squares[i].nextY == 0)
              target = Square.squares[i];

          target.nextY += 1;

          for(var i = 0; i < Square.squares.length; i++){
            if(Square.squares[i].nextX == target.nextX &&
                Square.squares[i].nextY == target.nextY && Square.squares[i].id != target.id){
              target = Square.squares[i];
              break;
            }
          }

          target.nextY += 1;
          if(!isGoingRight && target.nextX == 0)
            isGoingRight = true;
        break;

        case 1:
          var target = null;

          for(var i = 0; i < Square.squares.length; i++)
            if(Square.squares[i].nextY == 2)
              target = Square.squares[i];

          target.nextX += isGoingRight ? 1 : -1;
        break;

        case 2:
          var target = null;

          for(var i = 0; i < Square.squares.length; i++)
            if(Square.squares[i].nextY == 2)
              target = Square.squares[i];

          target.nextY -= 1;

          for(var i = 0; i < Square.squares.length; i++){
            if(Square.squares[i].nextX == target.nextX &&
                Square.squares[i].nextY == target.nextY && Square.squares[i].id != target.id){
              target = Square.squares[i];
              break;
            }
          }

          if(target.nextX == 3)
            isGoingRight = false;
          target.nextY -= 1;
        break;

        case 3:
          var target = null;

          for(var i = 0; i < Square.squares.length; i++)
            if(Square.squares[i].nextY == 0)
              target = Square.squares[i];

          target.nextX += isGoingRight ? 1 : -1;
        break;
      }
      step = (step + 1) % 4;
    }, SPEED);

    window.onload = function() {
        $(".preload").fadeOut(200);
        $("#loader").fadeOut(200);
        $("main").css("display", "initial");
        $("main").fadeIn;
        isPageLoaded = true;
      };


