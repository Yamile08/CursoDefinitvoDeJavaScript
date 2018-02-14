var page = require('page');
var empty = require('empty-element');
var template = require('./template');
var title = require('title');

page('/', function (ctx, next) {
  title('Platzigram');
  var main = document.getElementById('main-container');

  var pictures = [
    {
      user: {
        username: 'Yamile',
        avatar: 'https://scontent.fbog2-1.fna.fbcdn.net/v/t1.0-9/13939415_10154480949099686_6188701234441477833_n.jpg?oh=c071f62fd52318321c538fcedd5799f1&oe=5B15D88F'
      },
      url: 'office.jpg',
      likes: 10,
      liked: true
    },
    {
      user: {
        username: 'Miguel',
        avatar: 'https://scontent.fbog2-1.fna.fbcdn.net/v/t1.0-9/15747749_10154906357844686_3080866391470467298_n.jpg?oh=93423a350983380afa9f686e3403c029&oe=5B0CFE49'
      },
      url: 'office.jpg',
      likes: 2,
      liked: true
    }
  ];

  empty(main).appendChild(template(pictures));
})
