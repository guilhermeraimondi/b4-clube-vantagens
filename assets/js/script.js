$(document).ready(function(){
  var cardHeight = $('.fancy-hover__fancy').innerHeight();
  $('.card-flip__content--back').height(cardHeight);
  var classClicked = 'clicked';

  $("#divInterna").height(50);
  $('.card-flip').click(function() {
    if($(this).hasClass(classClicked)) {
      $(this).removeClass(classClicked);
    }
    else {
      $(this).addClass(classClicked);
    }
  }).mouseleave(function() {
    $(this).removeClass(classClicked);
  });

      $('.owl1').owlCarousel({
        responsive:{
          items:1,
          0:{
              items:2
          },
          600:{
              items:4
          },
          1000:{
              items:6
          }
        },
        margin: 20,
        loop:true,
        // nav:true,
        center: true,
        // autoplay:true,
        // fluidSpeed: true,
        // autoplayHoverPause:true,
        autoHeight: false
      });

      $('.owl2').owlCarousel({
        items:1,
        loop:true,
        dots:false,
        nav:true,
        // nav:true,
        // center: true,
        // autoplay:true,
        fluidSpeed: true,
        autoplayHoverPause:true,
        autoHeight: false
      });

      var owl2 = $('.owl3').owlCarousel({
         responsive:{
          0:{
              items:2
          },
          600:{
              items:3
          }
        },
        margin: 10,
        loop:false,
        autoHeight: true
      });
});

$(window).scroll(function() {
  console.log("chamou");
    var currentScrollHeight = $(this).scrollTop();
    var homeHeight = $(".hero").innerHeight();

    if (currentScrollHeight > homeHeight) {
        $('.back2top').fadeIn(200); 
    } else {
        $('.back2top').fadeOut(50);
    }
});

// Ease Scroll
$(".navbar-mobile__nav__item__link, .fa-angle-down, .back2top-link").click(function(e){
  e.preventDefault(); //nao usar o 'teleporte' padrao do html
  var id = $(this).attr('href'), // attr puxa o atributo q vc quer
      targetOffset = $(id).offset().top; // pegar distancia do topo
      console.log(id, targetOffset);
  $('html, body').animate({
    scrollTop: targetOffset //animar o scrolltop para o local da div
  }, 700);
});

// Debounce do Lodash: evita que a func seja chamada varias vezes a cada pequeno scroll
debounce = function(func, wait, immediate){
  var timeout;
  return function(){
    var context = this, args = arguments;
    var later = function(){
      timeout = null;
      if(!immediate) func.apply(context, args);
    };

    var callNow = immediate && !timeout;
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
    if(callNow) func.apply(context, args);
  };
};


// Anime div when scrolling
(function(){ // evitar conflito tornando variaveis locais, apenas para essa funcao 
  var $target = $('.animate-top, .animate-right'), //seleciona as classes que quer animar
      animationClass = 'animate-start',
      offset = $(window).height() * 4/5; // nunca deixar mais do que 3/4 da janela em branco
  function animateScroll(){
    var distDocumentTop = $(document).scrollTop(); 
    $target.each(function(){
      var distItemTop = $(this).offset().top;
      if(distDocumentTop > distItemTop - offset){
        $(this).addClass(animationClass);
      } else{
        $(this).removeClass(animationClass);
      }
    });
  }
  animateScroll(); 
  // mantem essa ativacao inical pois quando vc entra no site pela primeira
  // vez vc n da scroll e quando ja tem um item na tela que possa ser animado ele o sera

  $(document).scroll(debounce(function(){
    animateScroll();
  }, 50));
}());