// Ширина экрана
let documentWidth = document.documentElement.clientWidth


//ширина контейнера слайдера
let swiperWindow = getComputedStyle(document.querySelector('.similar__swiper'))
swiperWindow = parseInt(swiperWindow.getPropertyValue('width'));

// создаем слайдер
const similarSwiper = new Swiper('.similar__swiper', {
    width: 288,
    spaceBetween: 16,
    slidesPerView: 'auto',
    // параметр, отвечающий за отсановку последнего слайда вровень у левой границы контейнера
    // параметр равен:ШИРИНА 1 СЛАЙДА вычесть ШИРИНА ВСЕГО КОНТЕЙНЕРА СЛАЙДЕРА 
    slidesOffsetAfter: (288 - swiperWindow),
    // ставим свободную прокрутку
    freeMode: {
        enable: true,
        momentumBounce: false,
        momentum: false,
    },
    breakpoints: {
        1440: {
            width: 250,
            spaceBetween: 22,
            slidesOffsetAfter: (250 - swiperWindow),
        },
    },
})

//ширина всего слайдера без ограничений
let slidesArr = document.querySelectorAll('.similar__item')
let swiperWidth = similarSwiper.params.width * slidesArr.length + similarSwiper.params.spaceBetween * (slidesArr.length - 1)
// сразу отключаем слайдер если он полностью влазит в экран
if (swiperWidth >= swiperWindow) {
    similarSwiper.disable()
}


// функция, реагирующая на изменения ширины
similarSwiper.on('resize', function () {
    // обновляем ширину экрана
    documentWidth = document.documentElement.clientWidth
    // обновляем ширину контейнера слайдера
    swiperWindow = getComputedStyle(document.querySelector('.similar__swiper'))
    swiperWindow = parseInt(swiperWindow.getPropertyValue('width'));
    // обновляем ширину слайдера без ограничений
    swiperWidth = similarSwiper.params.width * slidesArr.length + similarSwiper.params.spaceBetween * (slidesArr.length - 1)
    // если контейнер слайдера больше чем весь слайдер
    if (swiperWindow >= swiperWidth) {
        // прокручиваем к первому слайду
        similarSwiper.slideTo(0, 0, true)
        // отключаем слайдер
        similarSwiper.disable()
    } else {
        // включаем слайдер
        similarSwiper.enable()
        // меняем параметр, отвечающий за правильную остановку последнего слайда
        similarSwiper.params.slidesOffsetAfter = (similarSwiper.params.width - swiperWindow)
    }
})