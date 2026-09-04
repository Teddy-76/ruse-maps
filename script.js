const maps = [
  { name: "Bagration", image: "images/bagration.png" },
  { name: "Centre de gravité", image: "images/centre-de-gravite.png" },
  { name: "Feux et fleurs", image: "images/feux-et-fleurs.png" },
  { name: "Hiver nucléaire", image: "images/hiver-nucleaire.png" },
  { name: "Triple-Entente", image: "images/triple-entente.png" },
];

const image = document.querySelector("#map-image");
const name = document.querySelector("#map-name");
const counter = document.querySelector("#map-counter");
const previous = document.querySelector("#previous");
const next = document.querySelector("#next");
let current = 0;

function showMap(index) {
  current = (index + maps.length) % maps.length;
  const map = maps[current];
  image.src = map.image;
  image.alt = `${map.name} — lobby et vue de la map`;
  name.textContent = map.name;
  counter.textContent = `Map ${current + 1} sur ${maps.length}`;

  // Le navigateur met les maps voisines en cache pour rendre les clics suivants rapides.
  for (const neighbour of [(current + 1) % maps.length, (current - 1 + maps.length) % maps.length]) {
    const preload = new Image();
    preload.src = maps[neighbour].image;
  }
}

previous.addEventListener("click", () => showMap(current - 1));
next.addEventListener("click", () => showMap(current + 1));

document.addEventListener("keydown", event => {
  if (event.key === "ArrowLeft") showMap(current - 1);
  if (event.key === "ArrowRight") showMap(current + 1);
});
