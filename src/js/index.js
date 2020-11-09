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
                        <div class="content-text">
                            ${item.content}
                        </div>
                        <div class="content-link">
                            <a href="#">Подробнее</a>
                        </div>
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
        spaceBetween: 0,
        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
        },
        pagination: {
            el: '.swiper-pagination',
            type: 'bullets',
          },
        breakpoints: {
            319: {
              slidesPerView: 1,
              slidesPerColumn: 2
            },

            374: {
              slidesPerView: 2,
              slidesPerColumn: 2
            },

            520: {
              slidesPerView: 3,
              slidesPerColumn: 2
            },
            850: {
                slidesPerView: 4,
                slidesPerColumn: 2
            },
            1000: {
                slidesPerView: 5,
                slidesPerColumn: 2
            },
            1300: {
                slidesPerView: 6,
                slidesPerColumn: 2
              }
          }
      }); 
  }
  
  fillDataInformation(true);
  constructNewSlider();
  hoverInfoBoxPosition();

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
    hoverInfoBoxPosition();
  }

  categoryItem.forEach((item) => {
      item.addEventListener('click',(e)=>{
        categoryItem.forEach(item => {
            item.classList.remove('active-link');
        });
        showSliderByCategory(e.target.getAttribute('data-category'));
        e.target.classList.add('active-link');
      });
  });


  let selectForm = document.querySelector('.select__form form select');
  
  selectForm.addEventListener('change', (e) => {
    showSliderByCategory(e.target.value);
  });




  function hoverInfoBoxPosition () {
    let swiperEl = document.querySelectorAll('.swiper-slide');
    let swiperContainer = document.querySelector('.swiper-container');
    swiperEl.forEach(item =>{
        item.addEventListener('mouseenter', ()=> {
            let infoWindow = item.querySelector('.content');
            infoWindow.style.width = '400px';
            if (+window.innerWidth <= 700) {
                infoWindow.style.width = '325px';
            } 
            //infoWindow.style.display = 'block';
            if (+window.innerWidth >= 500) {
                let itemSize = item.getBoundingClientRect();
                let imgSize = item.querySelector('img').getBoundingClientRect();
                let imgRightSideSize = window.innerWidth - imgSize.right-(window.innerWidth-swiperContainer.getBoundingClientRect().right);

                let imgLeftSideSize = imgSize.right-imgSize.width;
                //console.log(`Left ${imgLeftSideSize} === Rigth ${imgRightSideSize} == winfow ${window.innerWidth}`);
                if (imgRightSideSize >= parseInt(infoWindow.style.width)) {
                    infoWindow.style.left = `${imgSize.width+((itemSize.width-imgSize.width)/2)}px`;
                } else if (imgLeftSideSize >= parseInt(infoWindow.style.width)) {
                    infoWindow.style.left = `-${parseInt(infoWindow.style.width)-((itemSize.width-imgSize.width)/2)}px`;
                }
            } else{
                   infoWindow.style.display = 'none';
                   item.querySelector('img').style.cursor = 'pointer';
                // let wrapperSize = document.querySelector('.swiper-wrapper').getBoundingClientRect();
                // let mobileInfoBox = document.querySelector('.mobile__info-box');
                // mobileInfoBox.querySelector('.img-box').style.cssText = `background-image: url(${item.querySelector('img').src});`;
                // mobileInfoBox.querySelector('.content-text').textContent = item.querySelector('.content-text').textContent;
                // mobileInfoBox.style.top = `${wrapperSize.top}px`;
                // mobileInfoBox.style.display = 'block';
            }
        });
    });

    swiperEl.forEach(item =>{
        item.addEventListener('click', ()=> {
            let infoWindow = item.querySelector('.content');
            if (+window.innerWidth >= 500) {
            } else{
                infoWindow.style.display = 'none';
                let wrapperSize = document.querySelector('.swiper-wrapper').getBoundingClientRect();
                let mobileInfoBox = document.querySelector('.mobile__info-box');
                mobileInfoBox.querySelector('.img-box').style.cssText = `background-image: url(${item.querySelector('img').src});`;
                mobileInfoBox.querySelector('.content-text').textContent = item.querySelector('.content-text').textContent;
                mobileInfoBox.style.top = `${wrapperSize.top}px`;
                mobileInfoBox.style.display = 'block';
            }
        });
    });

}

    let mobileInfoBox = document.querySelector('.mobile__info-box');
    mobileInfoBox.querySelector('.close').addEventListener('click', () => {
        mobileInfoBox.style.display = 'none';
    });

    categoryItem[0].classList.add('active-link');
