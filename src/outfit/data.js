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
      { name: 'Amara wrap dress', price: 4200, color: '#7A342B', icon: 'ti-dress', image: dress },
      { name: 'Noor slip dress', price: 3600, color: '#3A3F35', icon: 'ti-dress', image: dress },
      { name: 'Meher bias gown', price: 5400, color: '#D9C7A3', icon: 'ti-dress', image: dress },
      { name: 'Ira midi dress', price: 2900, color: '#5B4636', icon: 'ti-dress', image: dress },
      { name: 'Zara satin dress', price: 4800, color: '#8C7A6B', icon: 'ti-dress', image: dress },
    ],
  },
  {
    key: 'shoes',
    label: 'Shoes',
    sub: 'choose your shoes',
    icon: 'ti-shoe',
    options: [
      { name: 'Kali strap heel', price: 2200, color: '#221E19', icon: 'ti-shoe', image: heels },
      { name: 'Vera block heel', price: 1900, color: '#7A342B', icon: 'ti-shoe', image: svaraHeels2 },
      { name: 'Nila flat mule', price: 1500, color: '#A9803F', icon: 'ti-shoe', image: svaraHeels3 },
      { name: 'Suri pointed pump', price: 2600, color: '#3A3F35', icon: 'ti-shoe', image: shoes },
    ],
  },
  {
    key: 'bag',
    label: 'Bag',
    sub: 'choose your bag',
    icon: 'ti-bag',
    options: [
      { name: 'Tana leather tote', price: 3400, color: '#5B4636', icon: 'ti-bag', image: bag },
      { name: 'Meera mini bag', price: 2800, color: '#221E19', icon: 'ti-bag', image: bag2 },
      { name: 'Lila woven clutch', price: 2400, color: '#A9803F', icon: 'ti-bag', image: svaraBag2 },
      { name: 'Anya saddle bag', price: 3100, color: '#7A342B', icon: 'ti-bag', image: svaraBag3 },
    ],
  },
  {
    key: 'acc',
    label: 'Accessories',
    sub: 'choose your accessory',
    icon: 'ti-diamond',
    options: [
      { name: 'Thread drop earrings', price: 900, color: '#A9803F', icon: 'ti-diamond', image: earrings },
      { name: 'Layered gold chain', price: 1200, color: '#D9C7A3', icon: 'ti-circle-dot', image: rings },
      { name: 'Silk hair scarf', price: 600, color: '#7A342B', icon: 'ti-ribbon-health', image: earrings },
      { name: 'Pearl bracelet', price: 1290, color: '#3A3F35', icon: 'ti-certificate', image: rings },
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

export const outfitTotal = (outfit) =>
  CATEGORIES.reduce((sum, cat) => {
    const item = getItem(outfit, cat.key);
    return sum + (item ? item.price : 0);
  }, 0);

export const inr = (n) => '\u20B9' + n.toLocaleString('en-IN');
