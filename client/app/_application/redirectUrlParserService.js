"use strict";

require('./_module')
  .service('RedirectUrlParserService',
    [
      function() {
        // We expect ArgGIS Online to direct to a url of this form after the user signs in
        var pathRegex = /\/access_token=([^&]*)&expires_in=[^&]*&username=(.*)/;
        return {
          parse: function(url) {
            var result = pathRegex.exec(url);
            return {
              accessToken: result[1],
              username: result[2]
            }
          }
        };
      }
    ]
  );
