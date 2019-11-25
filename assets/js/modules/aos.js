import ResizeObserver from "resize-observer-polyfill";
import AOS from 'aos';

function onBodyResize (entries, observer) {
    AOS.refresh();
}

function setup () {
    AOS.init();

    const observer = new ResizeObserver(onBodyResize);
    observer.observe(document.body);

    console.info('AOS has been setup');
}

export default {
    setup
};
