/* ==========================================================================
Prefixed Animation EventListener
========================================================================== */
var pfx = ["webkit", "moz", "MS", "o", ""];
function PrefixedEvent(element, type, callback) {
  for (var p = 0; p < pfx.length; p++) {
    if (!pfx[p]) type = type.toLowerCase();
    element.addEventListener(pfx[p]+type, callback, false);
  }
}


/* ==========================================================================
SIMPLE LOADER
========================================================================== */
var listenerSelector;

function pageLoader(options) {


  var $showbarchargement      = "";
  var $showinfoschargement    = "";
  var loadingFinished         = false;
  var animationFinished       = false;

  var OPTIONS = $.extend({
    barchargement         : true,         // Affichage de la barre de chargement
    infoschargement       : true,         // Affichage du pourcentage de chargement
    bgcolor               : '#201f20',    // Couleur de fond
    barcolor              : '#ffffff',    // Couleur de la barre de chargement
    infocolor             : '#ffffff',    // Couleur du texte de chargement
    devMode               : false,        // Mode developpeur
    animationListener     : '',           // Classe ou Id sur laquelle on écoute la fin d'une animation CSS
    maxLoadingTime        : 4000,         // Temps de chargement maximum, pour forcer l'apparition du contenu
    onInit                : function(){}, // Fonction déclenchée à l'initialisation du loader
    afterLoad             : function(){}  // Fonction déclenchée à la disparition du loader
  }, options );


  if(OPTIONS.barchargement){
    $showbarchargement = "<div id='chargement-bar'></div>";
  }

  if(OPTIONS.infoschargement){
    $showinfoschargement = "<div id='chargement-infos'></div>";
  }

  if (OPTIONS.animationListener !== '') {
    var selecOpt = OPTIONS.animationListener;
    listenerSelector = document.querySelector(selecOpt);

    PrefixedEvent(listenerSelector, "AnimationStart",function(e) {
      if (OPTIONS.devMode) {
          console.log("Animation CSS commencée : "+e.animationName);
      }
    });
    PrefixedEvent(listenerSelector, "AnimationEnd",function(e) {
      if (OPTIONS.devMode) {
        console.log("Animation CSS terminée.");
      }
      animationFinished = true;
    });

  }


  // $( "body" ).prepend("<div id='loader' class='valign'><div id='loader-logo'></div>"+$showinfoschargement+$showbarchargement+"</div>");
  $( "body" ).addClass('page-is-loading');

  $('#loader').css( "background-color", OPTIONS.bgcolor);
  $('#chargement-bar').css( "background-color", OPTIONS.barcolor);
  $('#chargement-infos').css( "color", OPTIONS.infocolor);

  // Selection des images en src="
  var $elements = $('html').find('img[src]');
  // Selection des images en background-image
  $.each(function() {
    var src = $(this).css('background-image').replace(/^url\(["']?/, '').replace(/["']?\)$/, '');
    if(src && src != 'none') {
      $elements = $elements.add($('<img src="' + src + '"/>'));
    }
  });


  var $chargement         = $('#loader');
  var $chargementInfos    = $('#chargement-infos');
  var elementsCharges     = 0;
  var dureeMs             = 1000;

  function onInitOpt () {
    OPTIONS.onInit();
  }


  function animateStep(now, fx) {
    $chargementInfos.text('Chargement '+parseInt(now)+'%');
    $("#chargement-bar").css({'width': parseInt(now)+'%'});
  }

  function chargementEnCours() {
    //$('body').css('overflow', 'auto');
    onInitOpt();
    

    var pourcentage = 0;
    if($elements.length) {
      pourcentage = parseInt((elementsCharges / $elements.length) * 100);
    }

    // Affichage du pourcentage
    $chargementInfos.stop(); // stop les anciennes animations


    $chargement.stop() // stop les anciennes animations
    .animate({pourcentage:pourcentage}, {
      duration: dureeMs,
      step: animateStep
    });

  }


  function disparitionLoader() {
    if (OPTIONS.devMode) {
      console.log('############################################');
      console.log('Réapparition Dev Mode');
      console.log('############################################');
      // $chargement.fadeIn();
    } else{
      $( "body" ).removeClass('page-is-loading');
      $('#loader').remove();
    }
  }



function chargementTermine() {
  var pourcentage = 100;   

  // Affichage du pourcentage
  $chargementInfos
  .stop() // stop les anciennes animations
  .animate({width:pourcentage + '%'}, (dureeMs / 2));
  $chargement
  .stop() // stop les anciennes animations
  .animate({pourcentage:pourcentage}, {
    duration: (dureeMs / 2),
    step: animateStep,
    complete: function() {

      if (OPTIONS.devMode) {
        console.log('chargementTermine');
      }

      if (OPTIONS.animationListener !== ''){

        if (OPTIONS.devMode) {
          console.log('Écouteur de fin d\'animation utilisé sur : '+ selecOpt);
        }

        if (animationFinished) {
          // Si l'animation écoutée s'est terminée avant le chargement du contenu

            $chargement.fadeOut( 800, function() {

            // Animation complete
            OPTIONS.afterLoad();

            disparitionLoader();

            loadingFinished = true;
            });

        } else{
          // Sinon écoute de la fin de l'animation avant de faire disparaitre le loader

          PrefixedEvent(listenerSelector, "AnimationEnd",function(e){

            if (OPTIONS.devMode) {
              console.log('Event AnimationEnd. Animation CSS terminée.');
            }

            $chargement.fadeOut( 800, function() {

            // Animation complete
            OPTIONS.afterLoad();

            disparitionLoader();

            loadingFinished = true;



            });

          });

        }

      }else{

        $chargement.fadeOut( 800, function() {

          if (OPTIONS.devMode) {
            console.log('Pas d\'écouteur d\'animation. Appel de afterLoad()');
          }
          // Animation complete
          OPTIONS.afterLoad();

          disparitionLoader();

          loadingFinished = true;

        });
      }

    }

  });  

  // Apparition du contenu forcée après 5 secondes
  setTimeout(function() {
    if (!loadingFinished) {

      if (OPTIONS.devMode) {
        console.log('Apparition Forcée.');
      }else{

        $chargement.fadeOut( 800, function() {


          // Animation complete
          OPTIONS.afterLoad();

          disparitionLoader();


        }); 
      }               
    }
  }, OPTIONS.maxLoadingTime);

  }


    
  chargementEnCours();
  // La page contient des elements permettant d'afficher une barre de progression
  if($elements.length) {

    $elements.load(function() {
      $(this).off('load');
      elementsCharges++;
      chargementEnCours();
    });
  }

  $( window ).load(function() {
    chargementTermine();
  });

}


/* ==========================================================================
   LOADER CONTENU EXTERN
   ========================================================================== */


function pageTransition(options) {


    var OPTIONS = $.extend({
        linkSelector        : '.page-transition',
        targetContentClass  : 'cd-main-content',
        containerSelector   : '.content-transition-slide',
        loadingType         : 'replace', // 'append' | 'prepend' | 'replace'
        createContainer     : true,
        afterLoad           : function(){},
        onLinkClick         : function(clickedLink){}
    }, options );

    var link            = OPTIONS.linkSelector;
    var isAnimating     = false,
    firstLoad           = false;

  $('body').append('<div class="cd-cover-layer"></div><div class="cd-loading-bar"></div>');
  
  //trigger smooth transition from the actual page to the new one 
  $('body').on('click', link, function(event){
    event.preventDefault();

    var thisLink = $(this);
    
    OPTIONS.onLinkClick(thisLink);


    //detect which page has been selected
    var newPage = $(this).attr('href');

    //if the page is not already being animated - trigger animation
    if( !isAnimating ) changePage(newPage, true);
    firstLoad = true;
  });

  //detect the 'popstate' event - e.g. user clicking the back button
  $(window).on('popstate', function() {

    if( firstLoad ) {
      /*
      Safari emits a popstate event on page load - check if firstLoad is true before animating
      if it's false - the page has just been loaded 
      */
        var newPageArray    = location.pathname.split('/'),
        //this is the url of the page to be loaded 
        newPage             = newPageArray[newPageArray.length - 1];
       // if( !isAnimating ) changePage(newPage, false);
    }

    firstLoad = true;

    });

    function changePage(url, bool) {
    isAnimating = true;
    // trigger page animation
    $('body').addClass('page-is-changing');
    $('.cd-loading-bar').one('webkitTransitionEnd otransitionend oTransitionEnd msTransitionEnd transitionend', function(){
        loadNewContent(url, bool);
      $('.cd-loading-bar').off('webkitTransitionEnd otransitionend oTransitionEnd msTransitionEnd transitionend');
    });
    //if browser doesn't support CSS transitions
    if( !transitionsSupported() ) loadNewContent(url, bool);
    }

    function loadNewContent(url, bool) {
        url = ('' == url) ? 'index.html' : url;
    // var newSection = 'cd-'+url.replace('.html', '');
    var section = $('<div class="'+OPTIONS.targetContentClass+' loaded-content"></div>');

    section.load(url+' .'+OPTIONS.targetContentClass+' > *', function(event){
      // load new content and replace <main> content with the new one
      var sectionContent = section;
      if (OPTIONS.createContainer) {
        sectionContent = section;
      }else{
        sectionContent = section.html();

      }
      switch(OPTIONS.loadingType) {
          case 'replace':
              $(OPTIONS.containerSelector).html(sectionContent);
              break;
          case 'append':
              $(OPTIONS.containerSelector).append(sectionContent);
              break;
          case 'prepend':
              $(OPTIONS.containerSelector).prepend(sectionContent);
              break;
          default:
              $(OPTIONS.containerSelector).html(sectionContent);
      }


      //if browser doesn't support CSS transitions - dont wait for the end of transitions
      var delay = ( transitionsSupported() ) ? 3500 : 0;
      setTimeout(function(){
        //wait for the end of the transition on the loading bar before revealing the new content
       // ( section.hasClass('cd-about') ) ? $('body').addClass('cd-about') : $('body').removeClass('cd-about');
        $('body').removeClass('page-is-changing');
        $('.cd-loading-bar').one('webkitTransitionEnd otransitionend oTransitionEnd msTransitionEnd transitionend', function(){
          isAnimating = false;

          $('.cd-loading-bar').off('webkitTransitionEnd otransitionend oTransitionEnd msTransitionEnd transitionend');

          
          OPTIONS.afterLoad();

        });


        if( !transitionsSupported() ) isAnimating = false;
      }, delay);
      
      if(url!=window.location && bool){
        //add the new page to the window.history
        //if the new page was triggered by a 'popstate' event, don't add it
         window.history.pushState({path: url},'',url);
      }
    });
  }

  function transitionsSupported() {
    return $('html').hasClass('csstransitions');
  }
}