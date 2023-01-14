/*
 *****************************************************
 *	CUSTOM JS DOCUMENT                              *
 *	Single window load event                        *
 *   "use strict" mode on                            *
 *****************************************************
 */
$(window).on("load", function() {
    
    "use strict";

    var preLoader = $('.preloader');
    var countNumber = $(".count-number");
    var faqsAccordion = $('#faqs-accordion');
    var fancybox = $('.fancybox');
    var linksListsItem = $('.links-lists li');

    // ============================================
    // PreLoader On window Load
    // =============================================

    preLoader.addClass('loaderout');

    // ============================================
    // Fun Factor / Counter
    // =============================================	

    countNumber.appear(function() {
        $(this).each(function() {
            var datacount = $(this).attr('data-count');
            $(this).find('.counter').delay(6000).countTo({
                from: 10,
                to: datacount,
                speed: 3000,
                refreshInterval: 50,
            });
        });
    });



    //========================================
    // Accordion 
    //======================================== 	

    if (faqsAccordion.length) {
        faqsAccordion.accordion();
    }

    //========================================
    // LightBox / Fancybox
    //======================================== 	

    if (fancybox.length) {
        fancybox.fancybox();
    }

    //========================================
    // List Toggle 
    //======================================== 	

    linksListsItem.on('click', function(e) {

        if ($(this).find('>ul').hasClass('active')) {

            $(this).children('ul').removeClass('active').children('li').slideUp();

            linksListsItem.parent('ul').children('li').removeClass('active');

            $(this).addClass('active');
            if ($(this).hasClass('collapse-link')) {
                $(this).children('a').children('i').removeClass('fa-minus-circle');
                $(this).children('a').children('i').addClass('fa-plus-circle');
                e.preventDefault();
            }

            e.stopPropagation();
        } else {
            $(this).children('ul').addClass('active').children('li').slideDown();

            linksListsItem.parent('ul').children('li').removeClass('active');
            $(this).addClass('active');
            if ($(this).hasClass('collapse-link')) {
                $(this).children('a').children('i').removeClass('fa-plus-circle');
                $(this).children('a').children('i').addClass('fa-minus-circle');
            }
            e.stopPropagation();
        }
    });


    //***************************************
    // Map initialization function Calling
    //****************************************

    initMap();


    //***************************************
    // All Owl Carousel function Calling
    //****************************************

    owlCarouselInit();


}); // End of the window load event


//***************************************
// Contact Page Map
//****************************************  

function initMap() {
    "use strict";

    var mapDiv = $('#gmap_canvas');

    if (mapDiv.length) {
        var myOptions = {
            zoom: 10,
            scrollwheel: false,
            draggable: true,
            center: new google.maps.LatLng(-37.81614570000001, 144.95570680000003),
            mapTypeId: google.maps.MapTypeId.ROADMAP
        };
        var map = new google.maps.Map(document.getElementById('gmap_canvas'), myOptions);
        var marker = new google.maps.Marker({
            map: map,
            position: new google.maps.LatLng(-37.81614570000001, 144.95570680000003)
        });
        var infowindow = new google.maps.InfoWindow({
            content: '<strong>Envato</strong><br>Envato, King Street, Melbourne, Victoria<br>'
        });
        google.maps.event.addListener(marker, 'click', function() {
            infowindow.open(map, marker);
        });

        infowindow.open(map, marker);
    }

}


//***************************************
// All owl Carousels 
//****************************************   

function owlCarouselInit() {

    "use strict";

    //==========================================
    // owl carousels settings
    //===========================================

    var home1MainSlider = $('#home1-main-slider');
    var testimonialSection2 = $('#testimonial-section2');
    var ourTeamCarousel = $('#our-team-carousel');
    var homeBlogCarousel = $("#home-blog-carousel");
    var waPartnerCarousel = $('.wa-partner-carousel');

    if (home1MainSlider.length) {
        home1MainSlider.owlCarousel({
            autoPlay: true,
            items: 1,
            singleItem: true,
            navigation: true,
            pagination: true,

        });
    }

    if (testimonialSection2.length) {
        testimonialSection2.owlCarousel({
            autoPlay: false,
            items: 3,
            navigation: true,
            pagination: false,
            itemsDesktop: [1199, 3],
            itemsDesktopSmall: [979, 3]

        });
    }

    if (ourTeamCarousel.length) {
        ourTeamCarousel.owlCarousel({
            autoPlay: false,
            items: 5,
            itemsDesktop: [1199, 4],
            itemsDesktopSmall: [979, 3],
            navigation: true,
            pagination: false

        });
    }

    if (homeBlogCarousel.length) {
        homeBlogCarousel.owlCarousel({
            autoPlay: false,
            items: 3,
            navigation: true,
            pagination: false,
            itemsDesktop: [1199, 3],
            itemsDesktopSmall: [979, 3]

        });
    }

    if (waPartnerCarousel.length) {
        waPartnerCarousel.owlCarousel({
            autoPlay: true,
            items: 4,
            itemsDesktop: [1199, 4],
            itemsDesktopSmall: [979, 3],
            margin: 5,
            navigation: false,
            pagination: false

        });
    }

}