console.log 'Hello World from Jelly Blocks'

# Stuff for slide carousel
$.fn.extend {
  makeSlideSection: () ->
    $(this).each((i, section) ->
      $section = $(section)
      $carousel = $section.find('.carousel-container')
      # Find slides
      slides = $carousel.find('section')
      activeSlide = 0
      dots = $section.find('ul.active-slide-dots li')
      console.log dots[0]

      slideToSlide = (slide) =>
        dots.removeClass('active')
        $carousel.animate {
          left: slide * -100 + 'vw'
        }, {
          duration: 300
          done: () =>
            $(dots[slide]).addClass 'active'
        }
      slideToSlide(0)

      slideRight = () ->
        activeSlide++
        if activeSlide >= slides.length
          activeSlide = 0
        slideToSlide activeSlide
        return false

      slideLeft = () ->
        activeSlide--
        if activeSlide < 0
          activeSlide = slides.length - 1
        slideToSlide activeSlide
        return false

      $section.find('a.nav.next').click slideRight
      $section.find('a.nav.prev').click slideLeft

      console.log $section.find('a.nav')
    )
    # Todo: moving from end to end
}

$('.slide-carousel').makeSlideSection()
console.log $('.slide-carousel')
