
   maptilersdk.config.apiKey = MapToken;

   const map = new maptilersdk.Map({
    container: 'map', // container id
    style: maptilersdk.MapStyle.STREETS,
    center: listingGeometry.length ? listingGeometry : [77.0, 20.0], // fallback: India center
     zoom: 9,
  });

  
// Add marker
if (listingGeometry.length) {
  new maptilersdk.Marker({color:"red"})
    .setLngLat(listingGeometry) // [lng, lat]
  
    .addTo(map);
}
