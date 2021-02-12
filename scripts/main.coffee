console.log 'Hello World from Jelly Blocks'

###
Set up menu
###
$hamburger = $('.menu a.hamburger')
$menu = $('.menu .right-menu')

$(window).resize( ->
  $menu.removeClass 'shown'
)

$('.menu a.hamburger').click( ->
  $menu.toggleClass 'shown'
  return false
)


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

      slideToSlide = (slide) =>
        dots.removeClass('active')
        slide = Number(slide)
        $carousel.animate {
          left: slide * -100 + 'vw'
        }, {
          duration: 300
          done: () =>
            if activeSlide == slide
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

      dots.click( ->
        activeSlide = $(this).data('slide-to')
        slideToSlide activeSlide
      )

      $section.find('a.nav.next').click slideRight
      $section.find('a.nav.prev').click slideLeft
    )
    # Todo: moving from end to end
}

$('.slide-carousel').makeSlideSection()
