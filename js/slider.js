
window.addEventListener('load', function () {
  new Glider(document.querySelector('.carousel__list'), {
    slidesToShow: 1,
    dots: '.carousel__dots',
    draggable: false,
    arrows: {
      prev: '.carousel__prev',
      next: '.carousel__next'
    }
  });
})