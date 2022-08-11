

$(document).ready(function () {



    //check tab nav
    $('.group_tab .tab_item').click(function () {
        var id = $(this).data('id');
        $('.group_tab .tab_item').removeClass('active');
        $(this).addClass('active');

        $(this).parents('.group_tab').find('.content_tab').removeClass('active');
        $(this).parents('.group_tab').find('.content_tab'+id).addClass('active');
    });

    // check has menu
    if($('.nav-menu').hasClass('active')){
        $('.wrapper').addClass('hasMenu');
    } else{
        $('.wrapper').removeClass('hasMenu');
    }

    // check has button fixBottom
    if($('.fixBottom').hasClass('active')){
        $('.wrapper').addClass('hasFix');
    } else{
        $('.wrapper').removeClass('hasFix');
    }


    // show hide num money card
    $('.card_value_eye').click(function () {
        if ($(this).hasClass('icon_eye_close')) {
            $(this).removeClass('icon_eye_close');
            $(this).parents('.card_value').find('.value_show').addClass('active');
            $(this).parents('.card_value').find('.value_hidden').removeClass('active');
        } else {
            $(this).addClass('icon_eye_close');
            $(this).parents('.card_value').find('.value_show').removeClass('active');
            $(this).parents('.card_value').find('.value_hidden').addClass('active');
        }
    });

    // show hide input password
    $('.icon_eye').click(function () {
        if ($(this).hasClass('icon_eye_close')) {
            $(this).removeClass('icon_eye_close');
            $(this).parents('.form-group').find('input[type="text"]').attr('type', 'password');
        } else {
            $(this).addClass('icon_eye_close');
            $(this).parents('.form-group').find('input[type="password"]').attr('type', 'text');
        }
    });

    // show hide icon remove value input
    $('.form-group-close').append(' <a href="javascript:void(0);" class="icon_close"></a>');

    $('.form-group-close input').each(function () {
        if($(this).val()){
            $(this).parents('.form-group-close').find('.icon_close').show();
        };
    });


    $('.form-group-close input').bind("change keyup input keypress", function () {
        var value1 = $(this).val();
        if (!value1) {
            $(this).parents('.form-group-close').find('.icon_close').hide();
        } else {
            $(this).parents('.form-group-close').find('.icon_close').show();
        }
    });
    $('.icon_close').click(function () {
        $(this).parents('.form-group-close').find('input').val('');
        $(this).hide();
    });

    // question
    $('.qs_title').click(function () {
        if($(this).parents('.question_item').hasClass('active')){
            $(this).parents('.group_question').find('.question_item').removeClass('active').find('.qs_des').slideUp(300);
        } else{
            $(this).parents('.group_question').find('.question_item').removeClass('active').find('.qs_des').slideUp(300);
            $(this).parents('.question_item').addClass('active').find('.qs_des').slideDown(300);
        }
    });


    new Swiper(".swiperIntro", {
        pagination: {
            el: ".swiper-pagination",
            clickableClass: true,
        },
        mousewheel: true,
    });

    new Swiper(".swiperBanner", {
        spaceBetween: 16,
        pagination: {
            el: ".swiper-pagination",
        },
    });

    // drag ticket
    if($('.scroll--x').length){
        $('.scroll--x').each(function () {
            const slider = this;
            const preventClick = (e) => {
                e.preventDefault();
                e.stopImmediatePropagation();
            };
            let isDown = false;
            let isDragged = false;
            let startX;
            let scrollLeft;

            slider.addEventListener("mousedown", e => {
                isDown = true;
                slider.classList.add("active");
                startX = e.pageX - slider.offsetLeft;
                scrollLeft = slider.scrollLeft;
            });
            slider.addEventListener("mouseleave", () => {
                isDown = false;
                slider.classList.remove("active");
            });
            slider.addEventListener("mouseup", (e) => {
                isDown = false;
                const elements = document.querySelectorAll("a");
                if(isDragged){
                    for(let i = 0; i<elements.length; i++){
                        elements[i].addEventListener("click", preventClick);
                    }
                }
                else{
                    for(let i = 0; i<elements.length; i++){
                        elements[i].removeEventListener("click", preventClick);
                    }
                }
                slider.classList.remove("active");
                isDragged =  false;
            });
            slider.addEventListener("mousemove", e => {
                if (!isDown) return;
                isDragged =  true;
                e.preventDefault();
                const x = e.pageX - slider.offsetLeft;
                const walk = (x - startX) * 2;
                slider.scrollLeft = scrollLeft - walk;
            });
        });

    }


    // back to top
    $(window).scroll(function() {
        if ($(window).scrollTop() > 0) {
            $('.backTop').addClass('show');
            $('.header').addClass('boxShadow');
        } else {
            $('.backTop').removeClass('show');
            $('.header').removeClass('boxShadow');
        }
    });
    $('.backTop').on('click', function(e) {
        e.preventDefault();
        $('html, body').animate({scrollTop:0}, '300');
    });

});

// count width-hiehgt window ios
const windowHeight = () => {
    const doc = document.documentElement
    doc.style.setProperty('--window-height', `${window.innerHeight}px`)
    doc.style.setProperty('--window-width', `${window.innerWidth}px`)
    doc.style.setProperty('--header-height', `${$('.header').innerHeight()}px`)
    doc.style.setProperty('--nav-height', `${$('.nav-menu').innerHeight()}px`)
    doc.style.setProperty('--fixBottom-height', `${$('.fixBottom').innerHeight()}px`)
};
window.addEventListener('resize', windowHeight);
windowHeight();

