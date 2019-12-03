
window.onload = function(){
    var max_width = window.innerWidth -65; //-65 added to keep the ship inside the viewing area without scroll bars
    var max_height = window.innerHeight -65; 
    
    var directions = {left:1,up:2,right:3,down:4}
    var direction = getRandomDirection();
    var distance = getRandomDistance();
    
    var target = document.getElementById("Ship");
    var target_pos = {top:0,left:0}
    
    var i = 0;
    
    var render_rate = 10;
    var move_step = 5;
    
    setInterval(function(){
        i++;
        if(i > distance){
           distance = getRandomDistance();
           direction = getRandomDirection();
           i = 0;
        }
        move(target,direction,move_step)
    },render_rate)
    
    function getRandomDistance(){
        return Math.floor((Math.random() * 20) + 1) + 5;
    }
    
    function getRandomDirection(){
        return Math.floor((Math.random() * 4) + 1);
    }
    
    function move(el,direction,step){
      switch(direction){
         case directions.left: {
           if(target_pos.left < max_width){
               target_pos.left += step;
               target.style.left = target_pos.left + "px";
           }
           break;
         }
         case directions.up: {
           if(target_pos.top < max_height){
               target_pos.top += step;
               target.style.top = target_pos.top + "px";
           }
           break;
         }
          
         case directions.right: {
           if(target_pos.left > 0){
              target_pos.left -= step;
              target.style.left = target_pos.left + "px";
           }
           break;
         }
          
         case directions.down: {
           if(target_pos.top > 0){
              target_pos.top -= step;
              target.style.top = target_pos.top + "px";
           }
           break;
         }
      }
    }
  }