CoSeMe.namespace('http', (function(){
  'use strict';

  var logger = new CoSeMe.common.Logger('http');

  return {
    doRequest: function _doRequest(operation, params, onready, onerror) {

      // Get the URI
      var URL = 'https://v.whatsapp.net/v2/' +
                operation + '?' + CoSeMe.utils.urlencode(params);
      logger.log('Request:', URL);

      // Perform the query
      var xhr = new XMLHttpRequest({mozSystem: true});
      xhr.onload = function() {
        logger.log(this.response);
        onready && onready.call(this, this.response);
      };
      xhr.onerror = onerror;
      xhr.open('GET', URL);
      xhr.overrideMimeType('json');
      xhr.responseType = 'json';
      xhr.setRequestHeader('User-Agent', CoSeMe.config.tokenData['u']);
      xhr.setRequestHeader('Accept', 'text/json');
      xhr.send();
    },

    doContactsRequest: function _doContactsRequest(authField, params, onready, onerror) {
      var xhr = new XMLHttpRequest({mozSystem: true});
      xhr.onload = function() { onready && onready.call(this, this.response); };
      xhr.onerror = onerror;
      if (params) {
        xhr.open(CoSeMe.config.contacts.method, CoSeMe.config.contacts.url_query);
      } else {
        xhr.open(CoSeMe.config.contacts.method, CoSeMe.config.contacts.url_auth);
      }
      xhr.overrideMimeType('json');
      xhr.responseType = 'json';
      xhr.setRequestHeader('User-Agent', CoSeMe.config.tokenData['u']);
      xhr.setRequestHeader('Authorization', authField);
      xhr.setRequestHeader('Accept', 'text/json');
      if (params) {
        var data = CoSeMe.utils.urlencode(params);
        logger.log('Contact request parameters:', data);
        xhr.send(data);
      } else {
        xhr.send();
      }
    }
  };
}()));
