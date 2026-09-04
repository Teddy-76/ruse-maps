const maps = [
  { name: "Bagration", image: "images/bagration.png" },
  { name: "Centre de gravité", image: "images/centre-de-gravite.png" },
  { name: "Feux et fleurs", image: "images/feux-et-fleurs.png" },
  { name: "Hiver nucléaire", image: "images/hiver-nucleaire.png" },
  { name: "Triple-Entente", image: "images/triple-entente.png" },
];

const image = document.querySelector("#map-image");
const counter = document.querySelector("#map-counter");
const previous = document.querySelector("#previous");
const next = document.querySelector("#next");
const thumbnails = document.querySelector("#map-thumbnails");
const openFullscreen = document.querySelector("#open-fullscreen");
const dialog = document.querySelector("#map-dialog");
const dialogImage = document.querySelector("#dialog-image");
const closeDialog = document.querySelector("#close-dialog");
let current = 0;

maps.forEach((map, index) => {
  const button = document.createElement("button");
  button.type = "button";
  button.className = "thumbnail";
  button.setAttribute("aria-label", `Afficher ${map.name}`);
  button.innerHTML = `<img src="${map.image}" alt="" width="320" height="180" loading="lazy">`;
  button.addEventListener("click", () => showMap(index));
  thumbnails.append(button);
});

function showMap(index) {
  current = (index + maps.length) % maps.length;
  const map = maps[current];
  image.src = map.image;
  image.alt = `${map.name} — lobby et vue de la map`;
  counter.innerHTML = `Map <strong>${current + 1}</strong> sur ${maps.length}`;
  dialogImage.src = map.image;
  dialogImage.alt = `${map.name} — lobby et vue de la map en grand`;
  [...thumbnails.children].forEach((thumbnail, thumbnailIndex) => {
    thumbnail.toggleAttribute("aria-current", thumbnailIndex === current);
  });

  // Le navigateur met les maps voisines en cache pour rendre les clics suivants rapides.
  for (const neighbour of [(current + 1) % maps.length, (current - 1 + maps.length) % maps.length]) {
    const preload = new Image();
    preload.src = maps[neighbour].image;
  }
}

previous.addEventListener("click", () => showMap(current - 1));
next.addEventListener("click", () => showMap(current + 1));
openFullscreen.addEventListener("click", () => dialog.showModal());
closeDialog.addEventListener("click", () => dialog.close());
dialog.addEventListener("click", event => {
  if (event.target === dialog) dialog.close();
});

document.addEventListener("keydown", event => {
  if (event.key === "ArrowLeft") showMap(current - 1);
  if (event.key === "ArrowRight") showMap(current + 1);
});

showMap(0);
