var target = document.getElementsByClassName('mdl-content');

for (var i = 0; i < target.length; i++) {

  var elem = target[i].innerHTML;
  var num = i+1;
  var code = '<div class="mdl-code" id="mdl-code' + num + '"><textarea readonly>' + elem + '<\/textarea><\/div>';
  document.write(code);

}

(function ($) {
  'use strict';

  $(function () {

    var $target = $('.mdl-content');

    for (var i = 0; i < $target.length; i++) {
      var num = i+1;
      var id = 'mdl-code' + num;
      $($target[i]).attr('data-type', id);

      $('#' + id).appendTo('.mdl-content[data-type="' + id + '"]').addClass('is-active');
    }

  });

})(jQuery);
