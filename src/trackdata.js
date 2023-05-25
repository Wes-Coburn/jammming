import Track from "./assets/javascript/Track";
import Album from "./assets/javascript/Album";

const albumData = [
  new Album("Album1", [new Track("Sweet Home Alabama", "Lynyrd Skynyrd")]),
  new Album("Album2", [new Track("Sex and Drugs", "Hyper Crush")]),
];

const trackData = [];

albumData.forEach(album => {
    album.tracks.forEach(track => {
        trackData.push(track);
    });
});

export default trackData;
