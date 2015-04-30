/* jslint node: true */
"use strict";

var AGO = require('esri-portal-api');

module.exports = {
  getAllUsers: function() {
    var ago = new AGO();
    return ago.portal.users(
      'Gz4_3fTmMIGWtiiIHvFxo-fM6x9qcBvaV8YsSNTHDvoj8M-7I_3Vj4zP3HYgaayZhHa8jHCMsm62x_0FlTbARe7wB76K4wea3pHMQUcThnYvywVOi6vBRROr6rPr2O1sXDmvJp4nU_2JPw3Casi0CgeEnZMSsbW8bvRp1agwkSU7eMYGyWOJFTeGKC0_scrT',
      'self');
  }
};
