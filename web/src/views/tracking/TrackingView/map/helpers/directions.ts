import polyline from "google-polyline";

export const calculateAndDisplayRoute = (directionsService, directionsRenderer, maps, origin, destination) => {
    const waypts = [];  
  
//   waypts.push({
//           location: new google.maps.LatLng('40.79889', '-74.014549'),
//           stopover: true
//         });
        
//         waypts.push({
//           location: new google.maps.LatLng('40.799456', '-74.004302'),
//           stopover: true
//         });
        
   console.log("originoriginorigin", origin)
  
    directionsService.route(
      {
        origin,
        destination,
        waypoints: waypts,
        optimizeWaypoints: true,
        travelMode: maps.TravelMode.BICYCLING
      },
      (response, status) => {
        if (status === "OK") {
          directionsRenderer.setDirections(response);
          const route = response.routes[0];
         
         
         let fullRoute = [];
         
       route.legs.forEach(leg => {
       console.log("leg", leg);
          leg.steps.forEach(step => {
            const durationInSeconds = step.duration.value;
            const points = polyline.decode(step.polyline.points);
            const secondsPerPoint = durationInSeconds / points.length;
            points.forEach(point => {
                    fullRoute = [...fullRoute, point];
              
            });
                      //    console.error("route.legs", route.legs, durationInSeconds, points)
          
          });
        });
        
              console.log("fullRoute", fullRoute);
        
     //  const customMarker = addMarker()
            
    // let position = 0
    //   const interval = setInterval(t => { 
    //   if(position < fullRoute.length){
    //       const pos = {lat: fullRoute[position][0], lng: fullRoute[position][1]}
    //     customMarker.setPosition(pos);
    //         position++; 
    //     }else{
    //         clearInterval(interval)
    //     }
    //       },500)
    }
      }
    );
  }
  