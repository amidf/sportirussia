$(document).ready(function() { // makes sure the whole site is loaded 
    $('#loader').fadeOut(); // will first fade out the loading animation 
    $('#preloader').delay(350).fadeOut('slow'); // will fade out the white DIV that covers the website. 
    $('body').delay(350).css({'overflow':'visible'});
    $('body').delay(350).addClass('active');

    if (window.innerWidth <= 992) {
      $('.wow').removeClass('wow');
    }

    $('.btn--toggle').on('click', () => {
      $('.header__top__nav').addClass('active');
    });

    $('.header__top__nav li').on('click', () => {
      $('.header__top__nav').removeClass('active');
    });

    $('.header__top__nav .btn--close').on('click', () => {
      $('.header__top__nav').removeClass('active');
    });

    $('.warning .btn--close').on('click', () => {
      $('body').removeClass('active');
    });

    (function () {
      const allImgs = document.querySelectorAll('.gallery .item');
      for (let i = 0; i < allImgs.length; i++) {
        allImgs[i].style.backgroundImage = `url(${allImgs[i].href})`;
      }
    })();

    new WOW().init();

    $('a[href*="#"]')
  // Remove links that don't actually link to anything
  .not('[href="#"]')
  .not('[href="#0"]')
  .click(function(event) {
    // On-page links
    if (
      location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') 
      && 
      location.hostname == this.hostname
    ) {
      // Figure out element to scroll to
      var target = $(this.hash);
      target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
      // Does a scroll target exist?
      if (target.length) {
        // Only prevent default if animation is actually gonna happen
        event.preventDefault();
        $('html, body').animate({
          scrollTop: target.offset().top
        }, 1000, function() {
          // Callback after animation
          // Must change focus!
          var $target = $(target);
          $target.focus();
          if ($target.is(':focus')) { // Checking if the target was focused
            return false;
          } else {
            $target.attr('tabindex','-1'); // Adding tabindex for elements not focusable
            $target.focus(); // Set focus again
          }
        });
      }
    }
  });

  $(window).on('scroll', () => {
    window.pageYOffset >= 300 ? $('.up').show() : $('.up').hide();
  });

  $(window).on('resize', () => {
    if (window.innerWidth <= 1200 && window.innerWidth >= 992) {
      $('.header__top .container').addClass('container-fluid');
      $('.header__top .container-fluid').removeClass('container');
    } else {
      $('.header__top .container-fluid').addClass('container');
      $('.header__top .container').removeClass('container-fluid');
    }
  });

  $('.up').on('click', () => {
      window.scrollTo({
          top: 0,
          left: 0,
          behavior: 'smooth'
      });
  });

  $('.detail').on('click', (event) => {
    if ($(event.target).is('.detail--football')) {
      $('.projects__content__block--main--football').addClass('active');
    } else if ($(event.target).is('.detail--basketball')) {
      $('.projects__content__block--main--basketball').addClass('active');
    } else if ($(event.target).is('.detail--arni')) {
      $('.projects__content__block--secondary--arni').addClass('active');
      $('.projects__content__block--secondary--park').addClass('hide');
    } else if ($(event.target).is('.detail--park')) {
      $('.projects__content__block--secondary--park').addClass('active');
      $('.projects__content__block--secondary--arni').addClass('hide');
    }
  });

  $('.btn--back, .btn--back i').on('click', (event) => {
    if ($(event.target).is('.btn--back--football')) {
      $('.projects__content__block--main--football').removeClass('active');
    } else if ($(event.target).is('.btn--back--basketball')) {
      $('.projects__content__block--main--basketball').removeClass('active');
    } else if ($(event.target).is('.btn--back--arni')) {
      $('.projects__content__block--secondary--arni').removeClass('active');
      setTimeout(() => {
        $('.projects__content__block--secondary--park').removeClass('hide');
      }, 200);
    } else if ($(event.target).is('.btn--back--park')) {
      $('.projects__content__block--secondary--park').removeClass('active');
      setTimeout(() => {
        $('.projects__content__block--secondary--arni').removeClass('hide');
      }, 200);
    }
  });

  $('.btn--time').on('click', (event) => {
    $('.btn--time').removeClass('active');
    $(event.target).addClass('active');

    if ($(event.target).is('.btn--time--before')) {
      $(event.target).parent().parent().find('.gallery.before').addClass('active');
      $(event.target).parent().parent().find('.gallery.before').removeClass('hide');
      $(event.target).parent().parent().find('.gallery.after').removeClass('active');
      $(event.target).parent().parent().find('.gallery.after').addClass('hide');
    } else {
      $(event.target).parent().parent().find('.gallery.after').addClass('active');
      $(event.target).parent().parent().find('.gallery.after').removeClass('hide');
      $(event.target).parent().parent().find('.gallery.before').removeClass('active');
      $(event.target).parent().parent().find('.gallery.before').addClass('hide');
    }
  });

  const allGalleries = document.querySelectorAll('.gallery');

  for (let i = 0; i < allGalleries.length; i++) {
    lightGallery(allGalleries[i]);
  }

});

