(function($) {
  'use strict';

  var $win = window.innerWidth ? window.innerWidth: $(window).width();
  var imgDir = '/assets/img/';

  /*
   * HamburgerMenu
   **/
  $(function() {

    var trigger = $('.js-hmenu');

    $(trigger).on('click', function() {

      var $menu = $('.l-header-menu');
      var $body = $('body');

      if ($(this).hasClass('is-active')) {

        $(this).removeClass('is-active').find('.m-header-hmenu__line span').text('開く');
        $menu.fadeOut(200);
        $body.removeClass('is-fixed');

      } else {

        $(this).addClass('is-active').find('.m-header-hmenu__line span').text('閉じる');
        $menu.fadeIn(200);
        $body.addClass('is-fixed');

      }

      return false;
    });
  });


  /*
   * PageTop
   **/
  $(window).on('ready load', function() {

    var $win = window.innerWidth ? window.innerWidth: $(window).width();
    var target = $('.m-footer-pagetop');

    /*
     * PositionControl
     **/
    $(window).scroll(function(e) {

      if ($(this).scrollTop() >= 110) {

        $(target).fadeIn(300);

      } else {

        $(target).fadeOut(300);

      }

      var bottomY = 15;
      var $window = $(e.currentTarget);
      var windowHeight = window.innerHeight;
      var scrollTop = $window.scrollTop();
      var documentHeight = $(document).height();
      var footerHeight = $('.l-footer').height();
      var bottomHeight = footerHeight + windowHeight + scrollTop + bottomY - documentHeight;

      if (scrollTop >= documentHeight - windowHeight - footerHeight + bottomY -15) {

        $('.m-footer-pagetop').css({bottom: bottomHeight - bottomY+15});

      } else{

        $('.m-footer-pagetop').css({bottom: bottomY});

      }
    });

    /*
     * SmoothScroll
     **/
    var trigger = $('.js-pagetop');

    $(trigger).on('click', function() {

      var href = $(this).attr('href'),
        trigger = $(href === '#' || href === '' ? 'html' : href),
        position = trigger.offset().top;

      $('body, html').animate({scrollTop: position}, 500, 'swing');

      return false;
    });

  });


  /*
   * Accordion
   **/
  $(function() {

    var target = $('.js-acc');

    $(target).on('click', function() {

      var thisId = $(this).attr('href');

      if ($(this).hasClass('is-active')) {

        $(this).removeClass('is-active').find('span>span').text('開く');
        $(thisId).slideUp(300);

      } else {

        $(this).addClass('is-active').find('span>span').text('閉じる');
        $(thisId).slideDown(300);
      }

      return false;
    });
  });


  /*
   * AddIcon
   **/
  $(function() {

    var target = $('a').not(':has(img)');

    $(target).each(function() {

      var alt = '別ウィンドウ、タブで開きます';
      var blank = '<img src="' + imgDir + 'icn_blank.svg' + '" alt="' + alt + '" class="m-icn-blank">';
      var blankW = '<img src="' + imgDir + 'icn_blank_white.svg' + '" alt="' + alt + '" class="m-icn-blank">';
      var pdf = '<img src="' + imgDir + 'icn_pdf.svg' + '" alt="' + alt + '" class="m-icn-pdf">';
      var thisHref = $(this).attr('href');

      if ($(this).attr('target') === '_blank') {

        if ($(this).hasClass('m-btn')) {
          if (thisHref.indexOf('.pdf') > -1) {
            $(this).addClass('is-icn').append(pdf);
          } else {
            $(this).addClass('is-icn').append(blank);
          }
        } else if ($(this).hasClass('m-btn-cv')) {
          if (thisHref.indexOf('.pdf') > -1) {
            $(this).addClass('is-icn').append(pdf);
          } else {
            $(this).addClass('is-icn').append(blankW);
          }
        } else if ($(this).closest('ul').hasClass('m-list-news')) {
          if (thisHref.indexOf('.pdf') > -1) {
            $(this).find('.m-list-news__txt').append(pdf);
          } else {
            $(this).find('.m-list-news__txt').append(blank);
          }
        } else {
          if (thisHref.indexOf('.pdf') > -1) {
            $(this).append(pdf);
          } else {
            $(this).append(blank);
          }
        }
      } else {
        if ($(this).hasClass('js-modal')) {
          $(this).append(blank);
        }
      }

    });
  });


  /*
   * Carousel
   **/
  $(function() {

    // MainVisualCarousel
    $('.m-carousel[data-type="mv"]').slick({
      autoplay: true,
      autoplaySpeed: 6000,
      pauseOnHover: true,
      pauseOnDotsHover: true,
      slidesToShow: 1,
      slidesToScroll: 1,
      dots: true,
      responsive: [{
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        }
      }]
    });

    // CardCarousel
    $('.m-carousel[data-type="card"]').slick({
      autoplay: true,
      arrows: false,
      slidesToShow: 2,
      slidesToScroll: 1,
      pauseOnHover: true,
      pauseOnDotsHover: true,
      dots: true,
      responsive: [{
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        }
      }]
    });

    // BannerCarousel
    $('.m-carousel[data-type="bnr"]').slick({
      autoplay: true,
      arrows: false,
      centerMode: false,
      slidesToShow: 4,
      slidesToScroll: 1,
      pauseOnHover: true,
      pauseOnDotsHover: true,
      dots: true,
      responsive: [{
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        }
      }]
    });

    // CarouselControl
    var $target = $('.m-carousel');
    var flag = 'play';

    for (var i = 0; i < $target.length; i++) {

      var $elem = $($target[i]);
      var $dots = $elem.find('.slick-dots');
      var code = '<button type="button" class="m-carousel-control">' +
        '<span class="m-carousel-control--start"><span>再生</span></span>' +
        '<span class="m-carousel-control--stop"><span>停止</span></span></button>';
      $dots.append(code);

      var $btn = $elem.find('.m-carousel-control');
      var $btnStart = $btn.find('.m-carousel-control--start');
      var $btnStop = $btn.find('.m-carousel-control--stop');
      $btnStart.hide();

      $btn.on('click', function() {

        var $this = $(this);

        if (flag === 'play') {

          flag = 'stop';
          $(this).find('.m-carousel-control--start').show();
          $(this).find('.m-carousel-control--stop').hide();
          $this.closest('.m-carousel').slick('slickPause');

        } else {

          flag = 'play';
          $(this).find('.m-carousel-control--start').hide();
          $(this).find('.m-carousel-control--stop').show();
          $this.closest('.m-carousel').slick('slickPlay');
        }

        return false;

      });
    } 
  });


  /*
   * TabPanel
   **/
  $(function() {

    var target = $('.m-tab');

    $(target).each(function() {

      var data = $(this).attr('data-type');
      var panel = $(this).find('.m-tab__panel');
      var content = $(this).find('.m-tab__content');
      var anc = $(panel).find('a');

      if (data === 'acc') {
        var elem = $(this).find('.m-tab__content');
        $(elem).each(function() {
          var id = $(this).attr('data-tab');
          var target = $('a[href="' + id +'"]').parent('li');
          $(this).clone(true).appendTo(target);
          $('.m-tab[data-type="acc"] .m-tab__panel > li.is-current .m-tab__content').show();
        });
      } else if(data === 'drop') {
        var text = $(this).find('.m-tab__panel li.is-current').text();
        $(this).prepend('<button type="button" class="m-tab__btn">' + text + '</button>');

        var btn = $('.m-tab__btn');

        $(btn).on('click', function() {
          if ($(this).hasClass('is-active')) {
            $(this).removeClass('is-active');
            $(this).closest('.m-tab').find('.m-tab__panel').fadeOut('300');
          } else {
            $(this).addClass('is-active');
            $(this).closest('.m-tab').find('.m-tab__panel').fadeIn('300');
          }

          $('body').on('click', function() {
            $(btn).removeClass('is-active');
            $(btn).closest('.m-tab').find('.m-tab__panel').fadeOut('300');
            return false;
          });
          return false;
        });
      }
      
      $(panel).find('a').on('click', function() {

        var $win = window.innerWidth ? window.innerWidth: $(window).width();
        var $this = $(this);
        var id = $this.attr('href');

        if (768 >= $win) {

          if (data.indexOf('drop') > -1) {
            var text = $(this).text();
            $(this).closest('.m-tab').find('.m-tab__btn').removeClass('is-active').text(text);
            $(this).closest('.m-tab').find('.m-tab__panel').fadeOut('300');
            def();
          } else if (data.indexOf('acc') > -1) {
            if ($(this).parent('li').hasClass('is-current')) {
              return false;
            } else {
              $(this).closest('.m-tab').find('li').removeClass('is-current').find('.m-tab__content').slideUp(300);
              $(this).parent('li').addClass('is-current').find('.m-tab__content').slideDown(300);
              $(content).removeClass('is-current');
              $('.m-tab__content[data-tab="' + id + '"]').addClass('is-current');
            }
          } else {
            def();
          }
          
        } else {
          def();
        }

        function def() {
          var text = $this.text();
          $this.closest('.m-tab').find('.m-tab__btn').removeClass('is-active').text(text);
          $(anc).parent('li').removeClass('is-current').find('.m-tab__content').hide();
          $this.parent('li').addClass('is-current').find('.m-tab__content').show();
          $(content).removeClass('is-current');
          $('.m-tab__content[data-tab="' + id + '"]').addClass('is-current');
        }

      return false;
      });

    });

  });


  /*
   * ModalWindow
   **/
  var $modal = $('.m-modal');
  var $trigger = $('.js-modal');
  var actCla = 'is-active';
  var fixCla = 'm-modal-fixed';
  var trgCla = 'm-modal-trigger';

  $trigger.on('click', function(e) {

    e.preventDefault();

    var $this = $(this);
    var src = $this.attr('href');
    var modal = '<div class="m-modal">' +
      '<div class="m-modal-inner">' +
      '<div class="m-modal-content" tabindex="0">' +
      '<div class="m-modal-content__inner">' +
      '<\/div>' +
      '<button type="button" class="m-modal-close">閉じる<\/button>' +
      '<\/div>' +
      '<div class="m-modal-overlay"><\/div>' +
      '<\/div>' +
      '<\/div>';

    $('html').addClass(fixCla).find('body').append(modal);
    $this.addClass(trgCla);

    var $target = $('.m-modal');
    var $content = $('.m-modal-content__inner');
    var $contentbox = $('.m-modal-content');

    modalCreate();
    modalShow();
    modalSizeAdjust();

    function modalCreate() {
      $(src).clone(true).show().appendTo($content);
    }

    function modalShow() {
      setTimeout(function() {
        $target.addClass(actCla).fadeIn(400).find('.m-modal-content').css('margin-top', '1px').focus();
        $('body *').not('.m-modal *').attr('tabindex', '-1');
      }, 100);
    }

    function modalSizeAdjust() {

      var height = window.innerHeight ? window.innerHeight: $(window).height();
      var width = window.innerWidth ? window.innerWidth: $(window).width();
      var marginSp = 100;
      var marginTb = 120;
      var marginNt = 160;
      var marginPc = 200;
      var $content = $('.m-modal-content');
      var $inner = $('.m-modal-content__inner');
      
      var contentHeight = $(_src).height();
      breakPoint();

      $(window).resize(function() {
        var height = window.innerHeight ? window.innerHeight: $(window).height();
        breakPoint();
      });

      function breakPoint() {

        var contentHeightIframe = $target.contents().find('body').height();
        var height = window.innerHeight ? window.innerHeight: $(window).height();

        if (width <= 559) {

          if (height <= contentHeight+marginSp) {
            $content.height(height-marginSp);
            $inner.height(height-marginSp);
          }

        } else if(width >= 560 && width <= 819) {

          if (height <= contentHeight+marginTb) {
            $content.height(height-marginTb);
            $inner.height(height-marginTb);
          }

        } else if(width >= 820 && width <= 1199) {

          if (height <= contentHeight+marginNt) {
            $content.height(height-marginNt);
            $inner.height(height-marginNt);
          }

        } else if(width >= 1200) {

          if (height <= contentHeight+marginPc) {
            $content.height(height-marginPc);
            $inner.height(height-marginPc);
          }

        }
      }
    }

  });

  $(document).keydown(escKey).on('click', '.m-modal-close, .m-modal-overlay', function() {
    $modal.modalClose();
  });

  function escKey(e) {
    if (e.keyCode === 27) {
      $modal.modalClose();
    }
  }

  $.fn.modalClose = function() {

    var $modal = $('.m-modal');
    setTimeout(function() {
      var $this = $('.m-modal-trigger');
      $modal.fadeOut(400);
      $('html').removeClass(fixCla);
      $('body *').not('.m-modal *').removeAttr('tabindex');
      $this.focus().removeClass(trgCla);
    }, 100);

    setTimeout(function() {
      $modal.remove();
    }, 500);
  }

})(jQuery);
