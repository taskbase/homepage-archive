const imagemin = require('imagemin');
const imageminJpegtran = require('imagemin-jpegtran');
const imageminPngquant = require('imagemin-pngquant');

imagemin(['src/assets/img/**/*.{jpg,png}'], 'build/images', {
  plugins: [
    imageminJpegtran(),
    imageminPngquant({quality: '80-90'})
  ]
}).then(files => {
  console.log(files);
});
