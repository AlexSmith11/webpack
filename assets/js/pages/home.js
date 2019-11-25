import $ from 'jquery';
import OwlCarousel from '../modules/owlcarousel';
import AOS from '../modules/aos';
import Foundation from '../modules/foundation';

import Page from '../modules/page';

Page.name = 'home';
Page.loadNow = function () {
    console.info('Loading now');
};

$(document).ready(function () {
    Page.setup();
    AOS.setup();
    Foundation.setup();
    OwlCarousel.setup('.owl-carousel', {
        loop: true,
        margin: 10,
        nav: true,
        delay: true,
        responsive: {
            0: {
                items: 1
            },
            600: {
                items: 3
            },
            1000: {
                items: 5
            }
        }
    });
    console.info('Home Page');
});
