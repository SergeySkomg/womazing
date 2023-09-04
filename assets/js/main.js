// Свайпер
const swiper = new Swiper('.swiper', {
    direction: 'horizontal',
    loop: true,
  
    pagination: {
      el: '.swiper-pagination',
    },
  
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    },
  
  });
// Конец свайпера

// Слайд 
  const prev = document.getElementById('btn-prev'),
      next = document.getElementById('btn-next'),
      slides = document.querySelectorAll('.slide'),
      dots = document.querySelectorAll('.dot'),
      slidesWrap = document.querySelectorAll('.slider__wrapper');

let index = 0;

const activeSlide = n =>  {
   for(slide of slides) {
    slide.classList.remove('active');
   }
   slides[n].classList.add('active');
}

const activeDot = n =>  {
    for(dot of dots) {
     dot.classList.remove('active');
    }
    dots[n].classList.add('active');
 }

const prepareCurrentSlide = ind => {
    activeSlide(ind);
    activeDot(ind);
} 

const nextSlide = () => {
     if(index == slides.length - 1){
        index = 0; 
        prepareCurrentSlide(index)
     } else {
        index++;
        prepareCurrentSlide(index)
     }
}

const prevSlide = () => {
    if(index == 0 ){
        index = slides.length - 1;
        prepareCurrentSlide(index)
    } else {
       index--;
       prepareCurrentSlide(index) 
    }
}

dots.forEach((item,indexDot) => {
    item.addEventListener('click', () => {
        index = indexDot;
        prepareCurrentSlide(index)
    })
})

next.addEventListener('click', nextSlide);
prev.addEventListener('click', prevSlide);

// Конец слайда 





//Модальное окно

document.getElementById('open-modal-btn').addEventListener("click",function(){
    document.getElementById('my-modal').classList.add("open")
    document.getElementById('close-my-modal-btn').classList.add("open")
})

document.getElementById('close-my-modal-btn').addEventListener("click",function(){
    document.getElementById('my-modal').classList.remove("open")
    document.getElementById('close-my-modal-btn').classList.remove("open")
});
// Конец модального окна


// Валидация
    // регулярные выражения для инпутов

    
// $.validator.addMethod('regex', function(value, element,regexp){
//     let regExsp = new RegExp(regexp);
//     return this.optional(element) || regExsp.test(value)
// }, 'please check your input');
//     // Конец регулярных выражений


// $('form').validate({
//     rules : {
//         name : {
//             required : true ,
//             regex : "[А-Яа-я]{1,32}" 
//         },
//         phone : {
//             required : true,
//             digits: true,
//             minlength : 10,
//             maxlength : 12,
//             regex : "[0-9]+"
//         }
//     },
//     messages : {
//         name : 'Введите имя правильно',
//         phone : 'Введите номер телефона правильно'
//     }
// })
// Конец валидации


//Валидация и отправка формы
$(document).ready(function() {
    $('[data-submit]').on('click', function(e) {
        e.preventDefault();
        $(this).parent('form').submit();
    })
    $.validator.addMethod(
        "regex",
        function(value, element, regexp) {
            var re = new RegExp(regexp);
            return this.optional(element) || re.test(value);
        },
        "Please check your input."
    );
  
    // Функция валидации и вывода сообщений
    function valEl(el) {
        el.validate({
            rules: {
              phone: {
                    required: true,
                    regex: '^([\+]+)*[0-9\x20\x28\x29\-]{5,20}$'
                },
                name: {
                    required: true
                },
                email: {
                    required: true,
                    email: true
                }
            },
            messages: {
              phone: {
                    required: 'Поле обязательно для заполнения',
                    regex: 'Телефон может содержать символы + - ()'
                },
                name: {
                    required: 'Поле обязательно для заполнения',
                },
                email: {
                    required: 'Поле обязательно для заполнения',
                    email: 'Неверный формат E-mail'
                }
            },
  
            // Начинаем проверку id="" формы
            submitHandler: function(form) {
                $('#preloader-active').fadeIn();
                var $form = $(form);
                var $formId = $(form).attr('id');
                switch ($formId) {
                    // Если у формы id="goToNewPage" - делаем:
                    case 'popupResult':
                        $.ajax({
                                type: 'POST',
                                url: $form.attr('action'),
                                data: $form.serialize(),
                            })
                            .always(function() {
                                //ссылка на страницу "спасибо" - редирект
                                location.href = 'https://wayup.in/lm/landing-page-marathon/success';
                                //отправка целей в Я.Метрику и Google Analytics
                                ga('send', 'event', 'masterklass7', 'register');
                                yaCounter27714603.reachGoal('lm17lead');
                            });
                        break;
                    // Если у формы id="popupResult" - делаем:
                    case 'form-top':
                        $.ajax({
                                type: 'POST',
                                url: $form.attr('action'),
                                data: $form.serialize()
                            })
                            .done(function() {
                                console.log('Success');
                            })
                            .fail(function() {
                                console.log('Fail');
                            })
                            .always(function() {
                                console.log('Always');
                                setTimeout(function() {
                                    $('#message-for-user').fadeIn();
                                    $form.trigger('reset');
                                    //строки для остлеживания целей в Я.Метрике и Google Analytics
                                }, 1100);
                                $('#message-for-user').on('click', function(e) {
                                    $(this).fadeOut();
                                });
  
                            });
                        break;
                }
                return false;
            }
        })
    }
  
    // Запускаем механизм валидации форм, если у них есть класс .js-form
    $('.js-form').each(function() {
        valEl($(this));
    });
    
  });



//   Гамбургер меню
let menuBtn = document.querySelector('.header__burger');
let burger = document.querySelector('.header__hamburger');

menuBtn.addEventListener('click', function(){
    menuBtn.classList.toggle('active'), 
    burger.classList.toggle('active'); 
});



