import $ from 'jquery';
import 'owl.carousel';
import 'intersection-observer';

function setupWhenOnScreen (selector, options) {
    const elements = document.querySelectorAll(selector);
    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.intersectionRatio > 0) {
                console.info(`Owl Carousel for selector "${selector}" has been setup`);
                $(entry.target).owlCarousel(options);
            }
        });
    }, {
        root: null,
        rootMargin: '0px',
    });

    for (let i = 0; i < elements.length; i++) {
        observer.observe(elements[i]);
    }
}

function setupNow (selector, options) {
    $(selector).owlCarousel(options);
    console.info(`Owl Carousel for selector "${selector}" has been setup`);
}

function setup (selector, options) {
    const delay = typeof options.delay !== 'undefined' && options.delay;
    delete options.delay;

    if (delay) {
        setupWhenOnScreen(selector, options);
    } else {
        setupNow(selector, options);
    }
}

export default {
    setup,
};
