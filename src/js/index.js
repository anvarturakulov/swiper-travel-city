// Main js file

import Swiper, { Navigation, Pagination } from 'swiper';
Swiper.use([Navigation, Pagination]);
import 'swiper/swiper-bundle.css';

const myData =require('./data');

const dataInformation = new myData();


let swiper;

  let categoryItem = document.querySelectorAll('.category__item');
  let swiperSlide;


  function fillDataInformation(flag) {
    let container = document.querySelector('.swiper-container .swiper-wrapper');
    container.innerHTML = '';
    if (flag == true) {
        dataInformation.forEach(item => {
            //let element = document.createElement('div');
            container.innerHTML += ` 
                <div class="swiper-slide" data-category=${item.category}>
                    <img src="/assets/img/countries/${item.image}" alt="">
                    <div class="citi-box">
                        <div class="city">${item.city}</div>
                        <div class="country">${item.country}</div>
                    </div>
                    <div class="content">
                        ${item.content} 
                    </div>
                </div>`;    
        });
        swiperSlide = document.querySelectorAll('.swiper-slide');
    } else {
        swiperSlide.forEach(item =>{
            container.append(item);
        });
    }
    
  }

  function constructNewSlider() {
    swiper = new Swiper('.swiper-container', {
        slidesPerView: 6,
        slidesPerColumn: 2,
        //spaceBetween: 30,
        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
        },
      }); 
  }
  
  fillDataInformation(true);
  constructNewSlider();

  function showSliderByCategory(category) {
    fillDataInformation(false);
    constructNewSlider();

    if (category != 'All') {
        swiperSlide.forEach(item =>{
            if (item.getAttribute('data-category') != category) {
                item.remove();
            }
        });
        swiper.update();
    }
  }

  categoryItem.forEach((item) => {
      item.addEventListener('click',(e)=>{
        showSliderByCategory(e.target.getAttribute('data-category'));
      });
  });

  categoryItem[0].classList.add('active-link');
