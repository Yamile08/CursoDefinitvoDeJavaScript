var page = require('page');
var empty = require('empty-element');
var template = require('./template');
var title = require('title');
var request = require('superagent');
var header = require('../header');
var axios = require('axios');
var webcam = require('webcamjs');
var picture = require('../picture-card');

page('/', header, loading, asyncLoad, function (ctx, next) {
  title('Platzigram');
  var main = document.getElementById('main-container');

  empty(main).appendChild(template(ctx.pictures));

  const picturePreview = $('#picture-preview');
  const camaraInput = $('#camara-input');
  const cancelPicture = $('#cancelPicture');
  const shootButton = $('#shoot');
  const uploadButton = $('#uploadButton');

  function reset() {
    picturePreview.addClass('hide');
    cancelPicture.addClass('hide');
    uploadButton.addClass('hide');
    shootButton.removeClass('hide');
    camaraInput.removeClass('hide');
  }

  cancelPicture.click(reset);

  $('.modal-trigger').leanModal({
    ready:function(){
      Webcam.attach('#camara-input');
      shootButton.click((ev) => {
        Webcam.snap((data_uri) => {
          picturePreview.html (`<img src="${data_uri}"/>`);
          picturePreview.removeClass('hide');
          cancelPicture.removeClass('hide');
          uploadButton.removeClass('hide');
          shootButton.addClass('hide');
          camaraInput.addClass('hide');
          uploadButton.off('click');
          uploadButton.click(() => {
              const pic = {
                url: data_uri,
                likes: 0,
                liked: false,
                createAt: +new Date(),
                user: {
                    username: 'Yamile',
                    avatar: 'https://scontent.fbog2-1.fna.fbcdn.net/v/t1.0-9/13939415_10154480949099686_6188701234441477833_n.jpg?oh=c071f62fd52318321c538fcedd5799f1&oe=5B15D88F'
                  }
                }

                $('#picture-cards').prepend(picture(pic));
                reset();
                $('#modalCamara').modal('close');
              })
            });
          })
        },
    complete: function(){
      Webcam.reset();
      reset();
    }
  })
})

function loading(ctx, next) {
  var container = document.createElement('div');
  var loadingEl = document.createElement('div');
  container.classList.add('loader-container');
  loadingEl.classList.add('loader');
  container.appendChild(loadingEl);
  var main = document.getElementById('main-container');
  empty(main).appendChild(container);
  next();
}

function loadPictures(ctx, next) {
  request
    .get('/api/pictures')
    .end(function (err, res) {
      if (err) return console.log(err);

      ctx.pictures = res.body;
      next();
    })
}

function loadPicturesAxios(ctx, next) {
  axios
    .get('/api/pictures')
    .then(function (res) {
      ctx.pictures = res.data;
      next();
    })
    .catch(function (err) {
      console.log(err);
    })
}

function loadPicturesFetch(ctx, next) {
  fetch('/api/pictures')
    .then(function (res) {
      return res.json();
    })
    .then(function (pictures) {
      ctx.pictures = pictures;
      next();
    })
    .catch(function (err) {
      console.log(err);
    })
}

async function asyncLoad(ctx, next) {
  try {
    ctx.pictures = await fetch('/api/pictures').then(res => res.json());
    next();
  } catch (err) {
    return console.log(err);
  }
}