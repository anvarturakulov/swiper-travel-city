// Main js file

import Swiper, { Navigation, Pagination } from 'swiper';
Swiper.use([Navigation, Pagination]);
import 'swiper/swiper-bundle.css';

const swiper = new Swiper('.swiper-container', {
    slidesPerView: 6,
    slidesPerColumn: 2,
    spaceBetween: 30,
    pagination: {
      el: '.swiper-pagination',
      clickable: true,
    },
    navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
    },
    scrollbar: {
        el: '.swiper-scrollbar',
    },
  }); 

  const categoryItem = document.querySelectorAll('.category__item');
  const swiperSlide = document.querySelectorAll('.swiper-slide');

  categoryItem.forEach((item) => {
      item.addEventListener('click',(e)=>{
        //console.log(e.target.getAttribute('data-category'));
        showSliderByCategory(e.target.getAttribute('data-category'));
      });
  });

  function showSliderByCategory(category) {
    swiperSlide.forEach(item =>{
        item.classList.remove('hide');
    });
    if (category != 'All') {
        swiperSlide.forEach(item =>{
            if (item.getAttribute('data-category') != category) {
                item.classList.add('hide');
            }
        });
    }
  }



