const mockProducts = [
  {
    id: 1,
    title: "The Dark Side of the Moon",
    price: 29.99,
    description: "The iconic album by Pink Floyd, featuring timeless tracks like 'Money' and 'Time'.",
    category: { id: 1, name: "Rock" },
    images: ["https://m.media-amazon.com/images/I/61R7gJadP7L._UF1000,1000_QL80_.jpg"],
    genre: "Rock",
    decade: "1970s",
    condition: "Near Mint"
  },
  {
    id: 2,
    title: "Kind of Blue",
    price: 24.99,
    description: "Miles Davis' masterpiece of modal jazz, considered one of the greatest albums of all time.",
    category: { id: 2, name: "Jazz" },
    images: ["https://upload.wikimedia.org/wikipedia/commons/a/ad/Kind_of_Blue_%281959%2C_CL_1355%29_album_cover.jpg"],
    genre: "Jazz",
    decade: "1960s",
    condition: "Very Good Plus"
  },
  {
    id: 3,
    title: "Rumours",
    price: 27.99,
    description: "Fleetwood Mac's Grammy-winning album featuring hits like 'Go Your Own Way' and 'Dreams'.",
    category: { id: 1, name: "Rock" },
    images: ["https://m.media-amazon.com/images/I/71BekDJBb3L._UF1000,1000_QL80_.jpg"],
    genre: "Rock",
    decade: "1970s",
    condition: "Mint"
  },
  {
    id: 4,
    title: "Back to Black",
    price: 22.99,
    description: "Amy Winehouse's second and final studio album that solidified her as a music icon.",
    category: { id: 3, name: "Soul" },
    images: ["https://i.scdn.co/image/ab67616d0000b2738c4a104d853a7cd74d2757c7"],
    genre: "Soul",
    decade: "2000s",
    condition: "Near Mint"
  },
  {
    id: 5,
    title: "Thriller",
    price: 34.99,
    description: "Michael Jackson's iconic album, one of the best-selling albums of all time.",
    category: { id: 4, name: "Pop" },
    images: ["https://upload.wikimedia.org/wikipedia/en/5/55/Michael_Jackson_-_Thriller.png"],
    genre: "Pop",
    decade: "1980s",
    condition: "Very Good"
  },
  {
    id: 6,
    title: "Abbey Road",
    price: 28.99,
    description: "The Beatles' eleventh studio album with iconic cover art and timeless songs.",
    category: { id: 1, name: "Rock" },
    images: ["https://upload.wikimedia.org/wikipedia/en/4/42/Beatles_-_Abbey_Road.jpg"],
    genre: "Rock",
    decade: "1960s",
    condition: "Very Good Plus"
  },
  {
    id: 7,
    title: "Blue Train",
    price: 21.99,
    description: "John Coltrane's hard bop jazz album, considered one of his finest works.",
    category: { id: 2, name: "Jazz" },
    images: ["https://upload.wikimedia.org/wikipedia/en/6/68/John_Coltrane_-_Blue_Train.jpg"],
    genre: "Jazz",
    decade: "1950s",
    condition: "Good"
  },
  {
    id: 8,
    title: "Random Access Memories",
    price: 32.99,
    description: "Daft Punk's Grammy-winning album featuring 'Get Lucky' and 'Lose Yourself to Dance'.",
    category: { id: 5, name: "Electronic" },
    images: ["https://upload.wikimedia.org/wikipedia/en/2/26/Daft_Punk_-_Random_Access_Memories.png"],
    genre: "Electronic",
    decade: "2010s",
    condition: "Mint"
  },
  {
    id: 9,
    title: "Nevermind",
    price: 25.99,
    description: "Nirvana's breakthrough album that defined the grunge era with 'Smells Like Teen Spirit'.",
    category: { id: 1, name: "Rock" },
    images: ["https://external-preview.redd.it/T3uLsq3fAGl6dPtFMOsJw10odsUvS2rrxzWlXEiDJAg.gif?format=png8&s=487bdb860d7e5ff2640fd18a448483bc1e6226b1"],
    genre: "Rock",
    decade: "1990s",
    condition: "Very Good"
  },
  {
    id: 10,
    title: "Illmatic",
    price: 23.99,
    description: "Nas' debut album, widely regarded as one of the greatest hip-hop albums of all time.",
    category: { id: 6, name: "Hip Hop" },
    images: ["https://upload.wikimedia.org/wikipedia/en/2/27/IllmaticNas.jpg"],
    genre: "Hip Hop",
    decade: "1990s",
    condition: "Near Mint"
  },
  {
    id: 11,
    title: "What's Going On",
    price: 26.99,
    description: "Marvin Gaye's concept album addressing themes of poverty, drug abuse, and war.",
    category: { id: 3, name: "Soul" },
    images: ["https://upload.wikimedia.org/wikipedia/en/8/84/MarvinGayeWhat%27sGoingOnalbumcover.jpg"],
    genre: "Soul",
    decade: "1970s",
    condition: "Very Good Plus"
  },
  {
    id: 12,
    title: "Highway 61 Revisited",
    price: 27.99,
    description: "Bob Dylan's influential album featuring 'Like a Rolling Stone'.",
    category: { id: 7, name: "Folk Rock" },
    images: ["https://upload.wikimedia.org/wikipedia/en/9/95/Bob_Dylan_-_Highway_61_Revisited.jpg"],
    genre: "Folk Rock",
    decade: "1960s",
    condition: "Good"
  }
];

export default mockProducts; 