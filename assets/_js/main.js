'use strict';
var $ = require("jquery");
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
 * Child menu in the global menu
 */
var icon;
$('.js-child-menu-trigger').attr('href', '').on('click', function (e) {
  icon = $(this).attr('data-icon');
  $(this).attr('data-icon', icon == '＋' ? '−' : '＋');
  $(this).siblings('.js-child-menu').toggleClass('active');
  e.preventDefault();
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
});
