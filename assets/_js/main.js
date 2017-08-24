'use strict';
var jQuery = require('jquery');
var $ = jQuery;
var scrollsmoothly = require('./scrollsmoothly.js');
var matchHeight = require('jquery-match-height');
var xlScreen = 768;

var url =  window.location.href;
var switchAnchor = '#sponsor';
var domainArray = ['http://localhost:4000/','https://dojocon-japan.github.io/dojocon2017teaser/','http://dojocon2017.coderdojo.jp/'];
if( url.substr(url.length - switchAnchor.length, switchAnchor.length)  === switchAnchor ){
  for( var i = 0; i < domainArray.length; i++){
    if(url.indexOf(domainArray[i]) === 0){
      window.location.href = domainArray[i];
    }
  }
}

function getBackgroundImageByCSS(fileRegExp, selectorRegExp) {
  var results = [];
  var sheets = document.styleSheets;
  for(var i = 0; i < sheets.length; i++) {
    if(String(sheets[i].href).match(fileRegExp)){
      var rules = sheets[i].cssRules;
      for(var j = 0; j < rules.length; j++) {
        var url = rules[j].style['background-image'].match(/^url\("(.+?)"\)$/);
        if(rules[j].selectorText.match(selectorRegExp) && url) {
          results.push(url[1])
        }
      }
    }
  }
  return results;
}


$(function(){

  /**
   * Global menu on mobiles and tablets
   */
  $('.js-menu-trigger, .js-menu-screen, .js-menu-close').on('click touchstart', function (e) {
    $('.js-menu, .js-menu-screen').toggleClass('is-visible');
    e.preventDefault();
  });

  $('.js-menu .nav a:not(.js-child-menu-trigger)').on('click', function () {
    if ($(window).width() < xlScreen) {
      $('.js-menu, .js-menu-screen').toggleClass('is-visible');
    }
  });

  /**
   * Global menu on desktops
   */
  var timer = false;
  $(window).on('load scroll', function () {
    if (timer) clearTimeout(timer);
    timer = setTimeout(function () {
      if ($(window).scrollTop() > 70) {
        $('.js-menu').addClass('scrolled');
      } else {
        $('.js-menu').removeClass('scrolled');
      }
    }, 100);
  });

  /**
   * hero
   */
  var $hero = $('.js-hero');
  var $logo = $('.js-dojocon-logo');
  if( $hero.length ) {
    var logoWidth = $logo.width();
    $('.js-dojocon-copy').css('width',logoWidth + 'px').addClass('is-border-white').delay(500).queue(function(next) {
      $hero.addClass('is-visible');
      next();
    });
  }

  if( $logo.length ) {
    $(window).on('resize',function() {
      logoWidth = $logo.width();
      $('.js-dojocon-copy').css('width',logoWidth + 'px').addClass('is-border-white');
    });
  }

  /**
   * staff
   */
   var $staff = $('.js-staff-members li');
  if( $staff.length ) {
    $staff.matchHeight().delay(500).queue(function(next) {
      $('.js-staff-members').addClass('is-visible');
      next();
    });
  }

  /**
   * Google Maps
   * @require Google Maps API
   */
  if ( document.getElementById('map') != null ) {
    google.maps.event.addDomListener(window, 'load', function (){
      var latlng = new google.maps.LatLng(34.809931, 135.562625);
      var options = {
        zoom: 17,
        center: latlng,
        mapTypeId: google.maps.MapTypeId.ROADMAP,
        scrollwheel: false,
        // draggable: false,
      };
      var map = new google.maps.Map(document.getElementById('map'), options);
      var marker = new google.maps.Marker({
        position: latlng,
        map: map
      });
    });
  }
});
