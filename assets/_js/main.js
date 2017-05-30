'use strict';
var $ = require("jquery");
var scrollsmoothly = require('./scrollsmoothly.js');
var xlScreen = 768;

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
   var $logo = $('.js-dojocon-logo');
  if( $logo.length ) {
    $(window).on('load resize',function() {
      var logoWidth = $logo.width();
      $('.js-dojocon-copy').css('width',logoWidth + 'px');
    });
  }
});
