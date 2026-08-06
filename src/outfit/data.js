// Product catalogue + shared helpers for the "Build Your Look" journey.
import {
  bag,
  bag2,
  dress,
  earrings,
  heels,
  rings,
  shoes,
  svaraBag2,
  svaraBag3,
  svaraHeels2,
  svaraHeels3,
  svaraBag4,
  svaraBag5,
  svaraBag6,
  svaraHeels4,
  svaraHeels5,
  svaraHeels6,
  accessory1,
  accessory2,
  accessory3,
  accessory4,
  outfitBag1,
  outfitBag2,
  outfitBag3,
  outfitBag4,
  outfitBag5,
  outfitDress1,
  outfitDress2,
  outfitDress3,
  outfitDress4,
  outfitDress5,
  outfitDress6,
  outfitFootwear1,
  outfitFootwear2,
  outfitFootwear3,
  outfitFootwear4,
  outfitFootwear5,
  outfitFootwear6,
} from '../assets';

export const CATEGORIES = [
  {
    key: 'dress',
    label: 'Dress',
    sub: 'choose your dress',
    icon: 'ti-dress',
    options: [
      { name: 'Amara wrap dress', color: '#7A342B', icon: 'ti-dress', image: dress },
      { name: 'Outfit Dress 1', color: '#7A342B', icon: 'ti-dress', image: outfitDress1 },
      { name: 'Outfit Dress 2', color: '#3A3F35', icon: 'ti-dress', image: outfitDress2 },
      { name: 'Outfit Dress 3', color: '#D9C7A3', icon: 'ti-dress', image: outfitDress3 },
      { name: 'Outfit Dress 4', color: '#5B4636', icon: 'ti-dress', image: outfitDress4 },
      { name: 'Outfit Dress 5', color: '#8C7A6B', icon: 'ti-dress', image: outfitDress5 },
      { name: 'Outfit Dress 6', color: '#A9803F', icon: 'ti-dress', image: outfitDress6 },
    ],
  },
  {
    key: 'shoes',
    label: 'Shoes',
    sub: 'choose your shoes',
    icon: 'ti-shoe',
    options: [
      { name: 'Kali strap heel', color: '#221E19', icon: 'ti-shoe', image: heels },
      { name: 'Vera block heel', color: '#7A342B', icon: 'ti-shoe', image: svaraHeels2 },
      { name: 'Nila flat mule', color: '#A9803F', icon: 'ti-shoe', image: svaraHeels3 },
      { name: 'Suri pointed pump', color: '#3A3F35', icon: 'ti-shoe', image: shoes },
      { name: 'Svara heel 4', color: '#5B4636', icon: 'ti-shoe', image: svaraHeels4 },
      { name: 'Svara heel 5', color: '#8C7A6B', icon: 'ti-shoe', image: svaraHeels5 },
      { name: 'Svara heel 6', color: '#A9803F', icon: 'ti-shoe', image: svaraHeels6 },
      { name: 'Outfit Footwear 1', color: '#221E19', icon: 'ti-shoe', image: outfitFootwear1 },
      { name: 'Outfit Footwear 2', color: '#7A342B', icon: 'ti-shoe', image: outfitFootwear2 },
      { name: 'Outfit Footwear 3', color: '#A9803F', icon: 'ti-shoe', image: outfitFootwear3 },
      { name: 'Outfit Footwear 4', color: '#3A3F35', icon: 'ti-shoe', image: outfitFootwear4 },
      { name: 'Outfit Footwear 5', color: '#D9C7A3', icon: 'ti-shoe', image: outfitFootwear5 },
      { name: 'Outfit Footwear 6', color: '#5B4636', icon: 'ti-shoe', image: outfitFootwear6 },
    ],
  },
  {
    key: 'bag',
    label: 'Bag',
    sub: 'choose your bag',
    icon: 'ti-bag',
    options: [
      { name: 'Tana leather tote', color: '#5B4636', icon: 'ti-bag', image: bag },
      { name: 'Meera mini bag', color: '#221E19', icon: 'ti-bag', image: bag2 },
      { name: 'Lila woven clutch', color: '#A9803F', icon: 'ti-bag', image: svaraBag2 },
      { name: 'Anya saddle bag', color: '#7A342B', icon: 'ti-bag', image: svaraBag3 },
      { name: 'Svara bag 4', color: '#3A3F35', icon: 'ti-bag', image: svaraBag4 },
      { name: 'Svara bag 5', color: '#D9C7A3', icon: 'ti-bag', image: svaraBag5 },
      { name: 'Svara bag 6', color: '#8C7A6B', icon: 'ti-bag', image: svaraBag6 },
      { name: 'Outfit Bag 1', color: '#5B4636', icon: 'ti-bag', image: outfitBag1 },
      { name: 'Outfit Bag 2', color: '#221E19', icon: 'ti-bag', image: outfitBag2 },
      { name: 'Outfit Bag 3', color: '#A9803F', icon: 'ti-bag', image: outfitBag3 },
      { name: 'Outfit Bag 4', color: '#7A342B', icon: 'ti-bag', image: outfitBag4 },
      { name: 'Outfit Bag 5', color: '#3A3F35', icon: 'ti-bag', image: outfitBag5 },
    ],
  },
  {
    key: 'acc',
    label: 'Accessories',
    sub: 'choose your accessory',
    icon: 'ti-diamond',
    options: [
      { name: 'Thread drop earrings', color: '#A9803F', icon: 'ti-diamond', image: earrings },
      { name: 'Gold rings', color: '#D9C7A3', icon: 'ti-circle-dot', image: rings },
      { name: 'Outfit Accessory 1', color: '#A9803F', icon: 'ti-diamond', image: accessory1 },
      { name: 'Outfit Accessory 2', color: '#D9C7A3', icon: 'ti-circle-dot', image: accessory2 },
      { name: 'Outfit Accessory 3', color: '#7A342B', icon: 'ti-ribbon-health', image: accessory3 },
      { name: 'Outfit Accessory 4', color: '#3A3F35', icon: 'ti-certificate', image: accessory4 },
    ],
  },
];

export const emptyOutfit = () => ({
  dress: null,
  shoes: null,
  bag: null,
  acc: null,
});

export const isComplete = (outfit) =>
  CATEGORIES.every((cat) => outfit[cat.key] !== null && outfit[cat.key] !== undefined);

export const getItem = (outfit, catKey) => {
  const index = outfit[catKey];
  if (index === null || index === undefined) {
    return null;
  }
  const cat = CATEGORIES.find((c) => c.key === catKey);
  return cat ? cat.options[index] : null;
};

// Prices removed: outfitTotal and currency helper removed
