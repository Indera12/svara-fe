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
} from '../assets';

export const CATEGORIES = [
  {
    key: 'dress',
    label: 'Dress',
    sub: 'choose your dress',
    icon: 'ti-dress',
    options: [
      { name: 'Amara wrap dress', color: '#7A342B', icon: 'ti-dress', image: dress },
      { name: 'Noor slip dress', color: '#3A3F35', icon: 'ti-dress', image: dress },
      { name: 'Meher bias gown', color: '#D9C7A3', icon: 'ti-dress', image: dress },
      { name: 'Ira midi dress', color: '#5B4636', icon: 'ti-dress', image: dress },
      { name: 'Zara satin dress', color: '#8C7A6B', icon: 'ti-dress', image: dress },
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
    ],
  },
  {
    key: 'acc',
    label: 'Accessories',
    sub: 'choose your accessory',
    icon: 'ti-diamond',
    options: [
      { name: 'Thread drop earrings', color: '#A9803F', icon: 'ti-diamond', image: earrings },
      { name: 'Layered gold chain', color: '#D9C7A3', icon: 'ti-circle-dot', image: rings },
      { name: 'Silk hair scarf', color: '#7A342B', icon: 'ti-ribbon-health', image: earrings },
      { name: 'Pearl bracelet', color: '#3A3F35', icon: 'ti-certificate', image: rings },
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
