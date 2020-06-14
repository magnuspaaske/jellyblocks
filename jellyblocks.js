(function() {
  console.log('Hello World from Jelly Blocks');

  // Stuff for slide carousel
  $.fn.extend({
    makeSlideSection: function() {
      return $(this).each(function(i, section) {
        var $carousel, $section, activeSlide, dots, slideLeft, slideRight, slideToSlide, slides;
        $section = $(section);
        $carousel = $section.find('.carousel-container');
        // Find slides
        slides = $carousel.find('section');
        activeSlide = 0;
        dots = $section.find('ul.active-slide-dots li');
        slideToSlide = (slide) => {
          dots.removeClass('active');
          slide = Number(slide);
          return $carousel.animate({
            left: slide * -100 + 'vw'
          }, {
            duration: 300,
            done: () => {
              if (activeSlide === slide) {
                return $(dots[slide]).addClass('active');
              }
            }
          });
        };
        slideToSlide(0);
        slideRight = function() {
          activeSlide++;
          if (activeSlide >= slides.length) {
            activeSlide = 0;
          }
          slideToSlide(activeSlide);
          return false;
        };
        slideLeft = function() {
          activeSlide--;
          if (activeSlide < 0) {
            activeSlide = slides.length - 1;
          }
          slideToSlide(activeSlide);
          return false;
        };
        dots.click(function() {
          activeSlide = $(this).data('slide-to');
          return slideToSlide(activeSlide);
        });
        $section.find('a.nav.next').click(slideRight);
        return $section.find('a.nav.prev').click(slideLeft);
      });
    }
  });

  // Todo: moving from end to end
  $('.slide-carousel').makeSlideSection();

}).call(this);
