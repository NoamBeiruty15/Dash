const routesContainer = document.getElementById("routes-container");
const errorContainer = document.getElementById("error-container");

function getTransitRoutes(data) {
  const itineraries = data.plan.itineraries;
  const routes = [];

  itineraries.forEach((itinerary, index) => {
    let route = `<div class="route-option"><h2>Option ${index + 1}</h2>`;
    itinerary.legs.forEach((leg) => {
      if (leg.mode === "WALK") {
        route += `<p class="leg">Walk from ${leg.from.name} to ${leg.to.name}.</p>`;
      } else if (leg.mode === "BUS") {
        route += `<p class="leg">Take bus line ${
          leg.routeShortName || leg.route
        } from ${leg.from.name} to ${leg.to.name}.</p>`;
      }
    });
    route += `</div>`;
    routes.push(route);
  });

  return routes;
}

fetch("api_test.json")
  .then((response) => {
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    return response.json();
  })
  .then((data) => {
    const routes = getTransitRoutes(data);
    routes.forEach((route) => {
      routesContainer.innerHTML += route;
    });
  })
  .catch((error) => {
    errorContainer.textContent = "Could not fetch transit data: " + error;
  });
