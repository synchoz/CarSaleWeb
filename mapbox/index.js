const mbxClient = require('@mapbox/mapbox-sdk');
require('dotenv').config();
const mbxStyles = require('@mapbox/mapbox-sdk/services/geocoding');
const baseClient = mbxClient({ accessToken: process.env.MAPBOX_TOKEN });
const geocodingService = mbxStyles(baseClient);
console.log(process.env.MAPBOX_TOKEN);
geocodingService.forwardGeocode({
    query: 'israel haifa',
    limit: 2
  })
    .send()
    .then(response => {
      const match = response.body;
      console.log(match);
    });