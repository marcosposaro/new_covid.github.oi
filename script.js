document.addEventListener('DOMContentLoaded', function(){
  function ScrollScreen(){
  var __self = this;
 
  var i;
  var counter = 0;
  var activeSlide = 1;
  var max = 9;
  var $sections = $('section');
  var canScroll = true;
  var $pagerItem =  $('.pag-item');
  var body = document.body;
  var starty = 0;
  dist = 0;
  var direction;
  var flag = false;
  var clickEventType = document.ontouchstart !== null ? 'click':'touchstart';
    console.log(clickEventType);
 var event = new Event('touchstart');
    
  this.init = function(){

    this.registrationEvents();
  }
  
  this.registrationEvents = function(){
   
    window.addEventListener('wheel', this.wheelListerner);
    body.addEventListener('touchstart', this.touchstart, false);
    // body.addEventListener('click', this.touchstart);
    body.addEventListener('touchend', this.touchend, false);
    body.addEventListener('touchmove', this.touchmove, false);
     body.addEventListener('click', this.click, false);
    // hammertime.on('press panstart panend pandown panup', this.panEnd);
    body.addEventListener('touchcancel', this.touchcancel, false);
    
   $pagerItem.on('click', this.pagClicker);
  }
  this.click = function(e){
  // body.dispatchEvent(event);
    textfield.innerHTML = 'type ' +e.type ;
    // return false;
  }
  this.pagClicker = function(e){
    var $th = $(this),
        pageData = $th.attr('data-page');
   if(pageData !== activeSlide){
     __self.scroller({from: activeSlide, to: pageData});
    activeSlide = +pageData;
    // $th.addClass('active').siblings().removeClass('active');
     __self.pagerRender(pageData);
   } 
    
  }
  this.wheelListerner = function(e){
     
    var direction =  e.deltaY > 0 ? 1: -1;
    __self.scrollCalculate(direction);
  }
  
  this.touchstart = function(e){
      // alert(e.type);
      
      starty = parseInt(e.changedTouches[0].clientY);
      textfield.innerHTML = 'type ' +e.type ;
   
    // console.log('panstart '+e.center.y);
    
    // dist = starty;
   
    // e.preventDefault();
//      e.preventDefault();
// e.stopPropagation();
  }
  
  this.touchend = function(e){
    
    textfield.innerHTML = "end ";
    // e.preventDefault();
    // e.preventDefault();
    // e.stopPropagation();
  }
  
   this.touchcancel = function(e){
   
    textfield.innerHTML = "cancel ";
     // e.preventDefault();
      e.preventDefault();
    e.stopPropagation();
  }
  
  this.touchmove= function(e){
    var dist = parseInt(e.changedTouches[0].clientY) - starty;
    var direction = dist > 0 ? 1: -1;
    
      __self.scrollCalculate(direction);
    
//     console.log('direction ' + e.direction);
//     console.log('event ' + e.additionalEvent);
//      var dist = parseInt(e.changedTouches[0].pageY) - starty;
//     var direction = dist > 0 ? 1: -1;
    
//       __self.scrollCalculate(direction);
    
  
    textfield.innerHTML = 'touchmove ' + e.target.tagName;
  
      e.preventDefault();
    e.stopPropagation();
    
  }
  
  this.scrollCalculate = function(direction){
    console.log('scrollCalculate ' + direction);
    if(!canScroll) return;
    canScroll = false;

    var newSlide = activeSlide + direction;
    console.log('activeSlide ' + activeSlide);
    setTimeout(function(){
        canScroll = true;
      }, 1300);
    
    if(newSlide > max || newSlide < 1) return;
      this.scroller({from: activeSlide, to: newSlide});
      activeSlide = newSlide;
      __self.pagerRender(newSlide);
  }
  
  this.scroller = function(slides){
    console.log('scroller!');
     var $currentSlide = $('[data-slide='+slides.from+']');
     var $newSlide = $('[data-slide='+slides.to+']');
     var $title = $currentSlide.find('h2');
     var $newTitle = $newSlide.find('h2')
     var currentAnimation;
     var newAnimation;
    
    console.log( $currentSlide.attr('data-slide'));
    console.log( $newSlide.attr('data-slide'));
    if(slides.from < slides.to){
      currentAnimation = {y: '-100%'};
      newAnimation = {y: '100%'};
    }else{
       currentAnimation = {y: '100%'};
      newAnimation = {y: '-100%'};
    }
      var tl = new TimelineMax();
    $currentSlide.css('z-index', 1);
    $newSlide.css('z-index', 2);
    tl.to($title, .3, {y:'-20%', opacity: 0})
      .to($currentSlide, 1, currentAnimation)
      .fromTo($newSlide, 1, newAnimation, {y: '0%', opacity: 1}, .3)
       .fromTo($newTitle, 0.3, {y: '-20%', opacity: 0}, {y:'0%', opacity: 1});
  }
  
  this.pagerRender = function(newSlide){
    $pagerItem.filter(function(index){
      // console.log($(this).attr('data-page') == newSlide);
    $(this).filter('[data-page='+newSlide+']')
      .addClass('active')
      .siblings().removeClass('active');
      
    });
  }
}
var scroll = new ScrollScreen;
scroll.init();
});


/* ==== COUNTER ==== */

var total = 15518; 
var amountPerSecond = total/86400; 
console.log("per second amount is "+amountPerSecond);
var runningTotal = 0// set a running total which will change

function updateAmount(){   console.log("updateAmount running");
  console.log(runningTotal);
 var integer = parseInt(runningTotal);
   runningTotal = runningTotal+amountPerSecond;
  document.getElementById('counter').innerHTML = integer;
}
setInterval(updateAmount, 1000);