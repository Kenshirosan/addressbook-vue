import jqueryGetRequest from '../modules/jqueryAjax/jqueryGetRequest.js';
import jqueryPostRequest from '../modules/jqueryAjax/jqueryPostRequest.js';

(function() {
    $('form').on('submit', jqueryGetRequest);
    $('form').on('submit', jqueryPostRequest);
})();
