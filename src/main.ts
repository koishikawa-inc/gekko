import Gekko from './gekko';

const gekko = new Gekko({ speed: 3000, isDuration: true, header: '.header', offset: 0 });
console.log(gekko);

// gekko.scroll("#section-04");
// gekko.destroy();

gekko.on('beforeScroll', (anchor) => {
  console.log('beforeScroll', anchor);
});
gekko.on('afterScroll', (anchor) => {
  console.log('afterScroll', anchor);
});
