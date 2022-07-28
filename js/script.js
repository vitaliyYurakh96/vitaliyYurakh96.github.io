$(document).ready(function(){

    // слайди

    $('.carousel__inner').slick({
        speed: 1200,
        prevArrow:'<button class="slick-prev"><img src="../icons/left.svg"></button>', 
        nextArrow:'<button class="slick-next"><img src="../icons/right.svg"></button>',
        responsive: [
            {
                breakpoint: 992,
                settings: {
                  dots: true,
                  arrows: false 
                }   
            }
        ]
    });

    // таби
    
    $('ul.catalog__tabs').on('click', 'li:not(.catalog__tab_active)', function() {
        $(this)
          .addClass('catalog__tab_active').siblings().removeClass('catalog__tab_active')
          .closest('div.container').find('div.catalog__content').removeClass('catalog__content_active').eq($(this).index()).addClass('catalog__content_active');
    });
    
    // карточки

    function toggleSlide(item){
        $(item).each(function(i){
            $(this).on('click', function(e){
                e.preventDefault();
                $('.catalog-item__content').eq(i).toggleClass('catalog-item__content_active');
                $('.catalog-item__list, .catalog-item__back').eq(i).toggleClass('catalog-item__list_active');
            })
        })
    };

    toggleSlide('.catalog-item__link');
    toggleSlide('.catalog-item__back');

    // окна

    $('[data-modal=consultation]').on('click', function(){
        $('.overlay, #consultation').fadeIn('slow');
    });

    $('.modal__close').on('click', function(){
        $('.overlay, #consultation, #thanks, #order').fadeOut('slow');
    });

    $('.button_mini').each(function(i) {
        $(this).on('click', function() {
            $('#order .modal__descr').text($('.catalog-item__subtitle').eq(i).text());
            $('.overlay, #order').fadeIn('slow');
        })
    });

    // валидация

    function validateForm(form){
        $(form).validate({
            rules: {
                name: {
                    required: true,
                    minlength: 2
                },
                phone: "required",
                email: {
                    required : true,
                    email: true
                }
            },
            messages: {
                name: {
                    required: "Пожалуйста введите свое имя",
                    minlength: jQuery.validator.format("Введите {0} символа")
                },
                phone: "Пожалуйста введите свой телефон",
                email: {
                  required: "Пожалуйста введите свою почту",
                  email: "Неправильно введен адрес name@domain.com"
                }
            }
        });
    };

    validateForm('#consultation-form');
    validateForm('#consultation form');
    validateForm('#order form');

    // Маска телефона

    $('input[name=phone]').mask("+380(99)-999-99-99");

    // отправка форм на сервер

    $('form').submit(function(e){
        e.preventDefault();

        if(!$(this).valid()) {
            return;
        };

        $.ajax({
            type:"POST",
            url: "mailer/smart.php",
            data: $(this).serialize()
        }).done(function(){
            $(this).find("input").val("");
            $('#consultation, #order').fadeOut();
            $('.overlay, #thanks').fadeIn('slow');
            $('form').trigger('reset');
        });
        return false;
    });

    // скрол вверх по сайту

    $(window).scroll(function(){
        if($(this).scrollTop() > 1600){
            $('.pageup').fadeIn();
        } else {
            $('.pageup').fadeOut();
        }
    });

    $("a[href=#up]").click(function(){
        const _href = $(this).attr("href");
        $("html, body").animate({
            scrollTop: $(_href).offset().top+"px"
        });
        return false;
    });
  
    new WOW().init();
});


