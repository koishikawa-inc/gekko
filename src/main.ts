import Gekko from './gekko';

const gekko = new Gekko({
  speed: 1000,
  isSpeedAsDuration: false,
  header: '.header',
  offset: 0,
});

// gekko.scroll("#section-04");
// gekko.destroy();

gekko.on('beforeScroll', (anchor) => {
  console.log('beforeScroll', anchor);
});

gekko.on('afterScroll', (anchor) => {
  console.log('afterScroll', anchor);
});

document.getElementById('options')?.addEventListener('submit', function (e: SubmitEvent) {
  e.preventDefault();

  const newOptions: { [key: string]: any } = {};
  const formData = new FormData(e.target as HTMLFormElement);
  formData.forEach((value, key) => {
    if (key === 'isSpeedAsDuration') {
      newOptions[key] = value === 'on';
    } else {
      newOptions[key] = isNaN(Number(value)) ? value : Number(value);
    }
  });

  gekko.options(newOptions);
});
