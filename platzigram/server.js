var express = require('express');
var multer  = require('multer');
var ext = require('file-extension');

var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './uploads')
  },
  filename: function (req, file, cb) {
    cb(null, +Date.now() + '.' + ext(file.originalname))
  }
})
 
var upload = multer({ storage: storage }).single('picture');

var app = express();

app.set('view engine', 'pug');

app.use(express.static('public'));

app.get('/', function (req, res) {
  res.render('index', { title: 'Platzigram' });
})

app.get('/signup', function (req, res) {
  res.render('index', { title: 'Platzigram - Signup' });
})

app.get('/signin', function (req, res) {
  res.render('index', { title: 'Platzigram - Signin' });
})

app.get('/api/pictures', function (req, res, next) {
  var pictures = [
    {
      user: {
        username: 'Yamile',
        avatar: 'https://www.google.com.co/imgres?imgurl=http%3A%2F%2Fwww.cuidadodeflores.com%2FImagenes%2Flas-10-mejores-flores-medicinales.jpg&imgrefurl=http%3A%2F%2Fwww.cuidadodeflores.com%2Flas-10-mejores-flores-medicinales&docid=TBvj5fwe-EKqoM&tbnid=iPU7G4yrzizwaM%3A&vet=10ahUKEwixxYG347fZAhUMy1MKHa_mDPIQMwg4KAkwCQ..i&w=1100&h=613&bih=637&biw=1366&q=flores&ved=0ahUKEwixxYG347fZAhUMy1MKHa_mDPIQMwg4KAkwCQ&iact=mrc&uact=8'
      },
      url: 'office.jpg',
      likes: 0,
      liked: false,
      createdAt: new Date().getTime()
    },
    {
      user: {
        username: 'Yamile',
        avatar: 'https://www.google.com.co/imgres?imgurl=http%3A%2F%2Fwww.cuidadodeflores.com%2FImagenes%2Flas-10-mejores-flores-medicinales.jpg&imgrefurl=http%3A%2F%2Fwww.cuidadodeflores.com%2Flas-10-mejores-flores-medicinales&docid=TBvj5fwe-EKqoM&tbnid=iPU7G4yrzizwaM%3A&vet=10ahUKEwixxYG347fZAhUMy1MKHa_mDPIQMwg4KAkwCQ..i&w=1100&h=613&bih=637&biw=1366&q=flores&ved=0ahUKEwixxYG347fZAhUMy1MKHa_mDPIQMwg4KAkwCQ&iact=mrc&uact=8'
      },
      url: 'office.jpg',
      likes: 1,
      liked: true,
      createdAt: new Date().setDate(new Date().getDate() - 10)
    }
  ];

  setTimeout(function () {
    res.send(pictures);  
  }, 2000)
});

app.post('/api/pictures', function (req, res) {
  upload(req, res, function (err) {
    if (err) {
      return res.send(500, "Error uploading file");
    }
    res.send('File uploaded');
  })
})

app.get('/api/user/:username', (req, res) => {
  const user = {
    username: 'platzi',
    avatar: 'https://www.google.com.co/imgres?imgurl=http%3A%2F%2Fimages.nationalgeographic.com.es%2Fmedio%2F2015%2F12%2F21%2Fbf63ef82rio_narcea_tineo_720x480.jpg&imgrefurl=http%3A%2F%2Fwww.nationalgeographic.com.es%2Fviajes%2Flos-paisajes-mas-bonitos-de-asturias_9995&docid=h2HJipC11F0LAM&tbnid=vhRem5F-vy3P3M%3A&vet=10ahUKEwiun-ukw7fZAhVJq1kKHXMsBWQQMwgyKAAwAA..i&w=720&h=480&bih=637&biw=1366&q=paisajes&ved=0ahUKEwiun-ukw7fZAhVJq1kKHXMsBWQQMwgyKAAwAA&iact=mrc&uact=8',
    pictures: [
      {
        id: 1,
        src: 'https://www.google.com.co/imgres?imgurl=https%3A%2F%2Fi.ytimg.com%2Fvi%2FPTGOxqKyE4M%2Fmaxresdefault.jpg&imgrefurl=https%3A%2F%2Fwww.youtube.com%2Fwatch%3Fv%3DPTGOxqKyE4M&docid=bIJa32Kz38WKKM&tbnid=2RZ3I2cwM7L7tM%3A&vet=10ahUKEwiun-ukw7fZAhVJq1kKHXMsBWQQMwg4KAYwBg..i&w=1280&h=720&bih=637&biw=1366&q=paisajes&ved=0ahUKEwiun-ukw7fZAhVJq1kKHXMsBWQQMwg4KAYwBg&iact=mrc&uact=8',
        likes: 3
      },
      {
        id: 2,
        src: 'https://www.google.com.co/imgres?imgurl=http%3A%2F%2Fwww.fotonostra.com%2Ffotografia%2Ffotos%2Ffotografiarpaisajes.jpg&imgrefurl=http%3A%2F%2Fwww.fotonostra.com%2Ffotografia%2Ffotografiarpaisajes.htm&docid=5a6uqXhDdTNHdM&tbnid=nkUB-rd2OPwRNM%3A&vet=10ahUKEwiun-ukw7fZAhVJq1kKHXMsBWQQMwg-KAwwDA..i&w=500&h=303&bih=637&biw=1366&q=paisajes&ved=0ahUKEwiun-ukw7fZAhVJq1kKHXMsBWQQMwg-KAwwDA&iact=mrc&uact=8',
        likes: 1
      },
      {
        id: 3,
        src: 'https://www.google.com.co/imgres?imgurl=https%3A%2F%2Fdependiendo.com%2Fwp-content%2Fuploads%2F2016%2F09%2Fpaisajes.png&imgrefurl=https%3A%2F%2Fdependiendo.com%2Fpaisajes-hermosos-de-nuestro-planeta%2F&docid=fJZHTVEGLUNGnM&tbnid=P8U-9w49jf-D8M%3A&vet=10ahUKEwiun-ukw7fZAhVJq1kKHXMsBWQQMwhhKCUwJQ..i&w=800&h=509&bih=637&biw=1366&q=paisajes&ved=0ahUKEwiun-ukw7fZAhVJq1kKHXMsBWQQMwhhKCUwJQ&iact=mrc&uact=8',
        likes: 10
      },
      {
        id: 4,
        src: 'https://www.google.com.co/imgres?imgurl=https%3A%2F%2Fugc.kn3.net%2Fi%2Forigin%2Fhttp%3A%2F%2F1.bp.blogspot.com%2F-kjh6bxfAaqU%2FT7Pjw5hs9lI%2FAAAAAAAAN14%2F7x932jj3HU0%2Fs1600%2FFondos%2Bde%2Bpantalla%2Bcon%2Bbellos%2Brincones%2Bde%2Bla%2Bnaturaleza%2B(72).jpg&imgrefurl=https%3A%2F%2Fwww.taringa.net%2Fposts%2Fimagenes%2F14816535%2FFondos-de-Pantalla-Paisajes-Naturales.html&docid=LocFt5zgm9YtBM&tbnid=_KdoJKX00SbhUM%3A&vet=10ahUKEwiun-ukw7fZAhVJq1kKHXMsBWQQMwhkKCgwKA..i&w=1600&h=900&bih=637&biw=1366&q=paisajes&ved=0ahUKEwiun-ukw7fZAhVJq1kKHXMsBWQQMwhkKCgwKA&iact=mrc&uact=8',
        likes: 0
      },
      {
        id: 5,
        src: 'https://www.google.com.co/imgres?imgurl=https%3A%2F%2Fi0.wp.com%2Fmedioambienteynaturaleza.com%2Fwp-content%2Fuploads%2F2015%2F06%2FFondos-de-pantalla-de-paisajes-naturales29.jpg&imgrefurl=http%3A%2F%2Fmedioambienteynaturaleza.com%2Ffondos-de-pantalla-de-paisajes-naturales%2F&docid=ENDZvAl3F6XWvM&tbnid=qBDVSeoisG4mFM%3A&vet=10ahUKEwiun-ukw7fZAhVJq1kKHXMsBWQQMwiJAShMMEw..i&w=1498&h=1000&bih=637&biw=1366&q=paisajes&ved=0ahUKEwiun-ukw7fZAhVJq1kKHXMsBWQQMwiJAShMMEw&iact=mrc&uact=8',
        likes: 23
      },
      {
        id: 6,
        src: 'https://www.google.com.co/imgres?imgurl=https%3A%2F%2Fwww.gratistodo.com%2Fwp-content%2Fuploads%2F2016%2F10%2Foto%25C3%25B1o-paisajes-fondos-hd.jpg&imgrefurl=https%3A%2F%2Fwww.gratistodo.com%2Fpaisajes-de-otono-fondos-de-pantalla%2F&docid=fKRYp1zUddwMCM&tbnid=VfIVqM4FbC3jcM%3A&vet=10ahUKEwi2qN_k4rfZAhVF21MKHaEzC6w4ZBAzCEAoPjA-..i&w=1920&h=1080&bih=637&biw=1366&q=paisajes&ved=0ahUKEwi2qN_k4rfZAhVF21MKHaEzC6w4ZBAzCEAoPjA-&iact=mrc&uact=8',
        likes: 11
      }
    ]
  }

  res.send(user);
})

app.get('/:username', function (req, res) {
  res.render('index', { title: `Platzigram - ${req.params.username}` });
})

app.get('/:username/:id', function (req, res) {
  res.render('index', { title: `Platzigram - ${req.params.username}` });
})

app.listen(3000, function (err) {
  if (err) return console.log('Hubo un error'), process.exit(1);

  console.log('Platzigram escuchando en el puerto 3000');
})