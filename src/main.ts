import Gekko from './gekko';

const gekko = new Gekko({ speed: 1000, isDuration: true, header: '.header', offset: 0 });
console.log(gekko);

// gekko.scroll("#section-04");
// gekko.destroy();

gekko.on('beforeScroll', (anchor) => {
  console.log('beforeScroll', anchor);
});

gekko.on('afterScroll', (anchor) => {
  console.log('afterScroll', anchor);
});

document.getElementById('set')?.addEventListener('click', function () {
  gekko.options({ speed: 500 });
});

document.getElementById('options')?.addEventListener('submit', function (e: SubmitEvent) {
  e.preventDefault();

  const op: { [key: string]: any } = {};
  const data = new FormData(e.target as HTMLFormElement);
  data.forEach((value, key) => {
    if (key === 'isDuration') {
      op[key] = value === 'on';
    } else {
      op[key] = isNaN(Number(value)) ? value : Number(value);
    }
  });

  console.log(op);

  gekko.options(op);
});
