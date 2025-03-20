import { type Context } from 'hono';

// server/api/v1/rand/thing.ts


const things = [
  // 动物类
  { type: 'animal', value: 'cat' },
  { type: 'animal', value: 'dog' },
  { type: 'animal', value: 'elephant' },
  { type: 'animal', value: 'lion' },
  { type: 'animal', value: 'tiger' },
  { type: 'animal', value: 'rabbit' },
  { type: 'animal', value: 'horse' },
  { type: 'animal', value: 'giraffe' },
  { type: 'animal', value: 'penguin' },
  { type: 'animal', value: 'koala' },

  // 车辆类
  { type: 'vehicle', value: 'car' },
  { type: 'vehicle', value: 'bike' },
  { type: 'vehicle', value: 'train' },
  { type: 'vehicle', value: 'plane' },
  { type: 'vehicle', value: 'boat' },
  { type: 'vehicle', value: 'motorcycle' },
  { type: 'vehicle', value: 'helicopter' },
  { type: 'vehicle', value: 'truck' },
  { type: 'vehicle', value: 'bus' },
  { type: 'vehicle', value: 'scooter' },

  // 水果类
  { type: 'fruit', value: 'apple' },
  { type: 'fruit', value: 'banana' },
  { type: 'fruit', value: 'orange' },
  { type: 'fruit', value: 'grape' },
  { type: 'fruit', value: 'watermelon' },
  { type: 'fruit', value: 'pineapple' },
  { type: 'fruit', value: 'mango' },
  { type: 'fruit', value: 'strawberry' },
  { type: 'fruit', value: 'kiwi' },
  { type: 'fruit', value: 'blueberry' },

  // 家具类
  { type: 'furniture', value: 'chair' },
  { type: 'furniture', value: 'table' },
  { type: 'furniture', value: 'sofa' },
  { type: 'furniture', value: 'bed' },
  { type: 'furniture', value: 'lamp' },
  { type: 'furniture', value: 'bookshelf' },
  { type: 'furniture', value: 'desk' },
  { type: 'furniture', value: 'cabinet' },
  { type: 'furniture', value: 'wardrobe' },
  { type: 'furniture', value: 'mirror' },

  // 颜色类
  { type: 'color', value: 'blue' },
  { type: 'color', value: 'red' },
  { type: 'color', value: 'green' },
  { type: 'color', value: 'yellow' },
  { type: 'color', value: 'purple' },
  { type: 'color', value: 'orange' },
  { type: 'color', value: 'pink' },
  { type: 'color', value: 'black' },
  { type: 'color', value: 'white' },
  { type: 'color', value: 'brown' },

  // 城市类
  { type: 'city', value: 'New York' },
  { type: 'city', value: 'London' },
  { type: 'city', value: 'Paris' },
  { type: 'city', value: 'Tokyo' },
  { type: 'city', value: 'Berlin' },
  { type: 'city', value: 'Sydney' },
  { type: 'city', value: 'Moscow' },
  { type: 'city', value: 'Los Angeles' },
  { type: 'city', value: 'Beijing' },
  { type: 'city', value: 'Mumbai' },

  // 电子设备类
  { type: 'gadget', value: 'phone' },
  { type: 'gadget', value: 'laptop' },
  { type: 'gadget', value: 'tablet' },
  { type: 'gadget', value: 'smartwatch' },
  { type: 'gadget', value: 'camera' },
  { type: 'gadget', value: 'headphones' },
  { type: 'gadget', value: 'drone' },
  { type: 'gadget', value: 'TV' },
  { type: 'gadget', value: 'gaming console' },
  { type: 'gadget', value: 'speaker' },

  // 昆虫类
  { type: 'insect', value: 'butterfly' },
  { type: 'insect', value: 'bee' },
  { type: 'insect', value: 'ant' },
  { type: 'insect', value: 'spider' },
  { type: 'insect', value: 'dragonfly' },
  { type: 'insect', value: 'ladybug' },
  { type: 'insect', value: 'mosquito' },
  { type: 'insect', value: 'fly' },
  { type: 'insect', value: 'beetle' },
  { type: 'insect', value: 'cricket' },

  // 植物类
  { type: 'plant', value: 'rose' },
  { type: 'plant', value: 'tulip' },
  { type: 'plant', value: 'cactus' },
  { type: 'plant', value: 'bamboo' },
  { type: 'plant', value: 'orchid' },
  { type: 'plant', value: 'fern' },
  { type: 'plant', value: 'sunflower' },
  { type: 'plant', value: 'oak tree' },
  { type: 'plant', value: 'pine tree' },
  { type: 'plant', value: 'lily' },

  // 星球类
  { type: 'planet', value: 'Mars' },
  { type: 'planet', value: 'Earth' },
  { type: 'planet', value: 'Venus' },
  { type: 'planet', value: 'Jupiter' },
  { type: 'planet', value: 'Saturn' },
  { type: 'planet', value: 'Neptune' },
  { type: 'planet', value: 'Mercury' },
  { type: 'planet', value: 'Uranus' },
  { type: 'planet', value: 'Pluto' },
  { type: 'planet', value: 'Exoplanet X' },

  // 书籍类
  { type: 'book', value: '1984' },
  { type: 'book', value: 'Harry Potter' },
  { type: 'book', value: 'Pride and Prejudice' },
  { type: 'book', value: 'Moby Dick' },
  { type: 'book', value: 'The Hobbit' },
  { type: 'book', value: 'To Kill a Mockingbird' },
  { type: 'book', value: 'The Great Gatsby' },
  { type: 'book', value: 'War and Peace' },
  { type: 'book', value: 'Crime and Punishment' },
  { type: 'book', value: 'The Catcher in the Rye' },

  // 乐器类
  { type: 'instrument', value: 'guitar' },
  { type: 'instrument', value: 'piano' },
  { type: 'instrument', value: 'violin' },
  { type: 'instrument', value: 'drums' },
  { type: 'instrument', value: 'flute' },
  { type: 'instrument', value: 'saxophone' },
  { type: 'instrument', value: 'trumpet' },
  { type: 'instrument', value: 'harmonica' },
  { type: 'instrument', value: 'cello' },
  { type: 'instrument', value: 'ukulele' },

  // 运动类
  { type: 'sport', value: 'soccer' },
  { type: 'sport', value: 'basketball' },
  { type: 'sport', value: 'tennis' },
  { type: 'sport', value: 'cricket' },
  { type: 'sport', value: 'swimming' },
  { type: 'sport', value: 'baseball' },
  { type: 'sport', value: 'golf' },
  { type: 'sport', value: 'cycling' },
  { type: 'sport', value: 'skiing' },
  { type: 'sport', value: 'boxing' },
];



export const getRandomThing = (c: Context) => {
  const randomThing = things[Math.floor(Math.random() * things.length)];

  return c.json({
    type: randomThing.type,
    value: randomThing.value,
  });
};