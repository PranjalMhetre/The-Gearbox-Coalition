const axios = require("axios");

export default async function useGeo(init, final) {
  const res = await axios.get(`https://api.mapbox.com/directions/v5/mapbox/driving/${init.lon},${init.lat};${final.lon},${final.lat}?geometries=geojson&access_token=pk.eyJ1IjoibGF2YXdhZmZsZSIsImEiOiJjbDI4MnE2ZnMwNWZvM2xvMW96eDdndXc4In0.hpG9-aeBSEHWFmfwqYObkw`)
    .then((res) => {
      console.log(res.data.routes)
      return {
        success: true,
        response: res.data.routes
      }
    })
    .catch((err) => {
      return {
        success: false,
        reason: err
      }
    })
    
}