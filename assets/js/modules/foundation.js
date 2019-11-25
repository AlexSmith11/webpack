import $ from 'jquery';
import 'foundation-sites';

function setup () {
   $(document).foundation();
   console.info('Foundation has been setup');
}

export default {
    setup,
};
