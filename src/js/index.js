import 'jquery';

$(() => {

  $('circle').on('click', (e) => {
    console.log($(e.target).data('point'), $(e.target).attr('class'));
    $('.js-log').text($(e.target).data('point') + ',' + $(e.target).attr('class'))
  });

});

