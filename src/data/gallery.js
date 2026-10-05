/**
 * Gallery data (placeholder photos).
 *
 * These use picsum.photos: free random photos, one fixed photo per "seed",
 * so the pictures stay the same every time the page loads.
 *
 * To use pictures from YOUR computer instead:
 *   1. Create the folder   public/gallery/
 *   2. Copy your images into it (e.g. public/gallery/my-app.png)
 *   3. Change an item's image to   "/gallery/my-app.png"
 *
 * Want a different random photo? Change the word after /seed/ in the URL.
 */

const photo = (seed) => `https://picsum.photos/seed/${seed}/600/640`;

const gallery = [
  {
    id: 1,
    title: "Sample 01",
    category: "Sample",
    image: photo("aurora"),
  },
  {
    id: 2,
    title: "Sample 02",
    category: "Sample",
    image: photo("harbor"),
  },
  {
    id: 3,
    title: "Sample 03",
    category: "Sample",
    image: photo("meadow"),
  },
  {
    id: 4,
    title: "Sample 04",
    category: "Sample",
    image: photo("summit"),
  },
  {
    id: 5,
    title: "Sample 05",
    category: "Sample",
    image: photo("lantern"),
  },
  {
    id: 6,
    title: "Sample 06",
    category: "Sample",
    image: photo("canyon"),
  },
  {
    id: 7,
    title: "Sample 07",
    category: "Sample",
    image: photo("harvest"),
  },
  {
    id: 8,
    title: "Sample 08",
    category: "Sample",
    image: photo("skyline"),
  },
  {
    id: 9,
    title: "Sample 09",
    category: "Sample",
    image: photo("ember"),
  },
  {
    id: 10,
    title: "Sample 10",
    category: "Sample",
    image: photo("glacier"),
  },
  {
    id: 11,
    title: "Sample 11",
    category: "Sample",
    image: photo("orchard"),
  },
  {
    id: 12,
    title: "Sample 12",
    category: "Sample",
    image: photo("dune"),
  },
  {
    id: 13,
    title: "Sample 13",
    category: "Sample",
    image: photo("studio"),
  },
  {
    id: 14,
    title: "Sample 14",
    category: "Sample",
    image: photo("monsoon"),
  },
];

export default gallery;
