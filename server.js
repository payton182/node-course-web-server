const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

const port = process.env.PORT || 3000;
let app = express();

//load Handlebars and set static directory
hbs.registerPartials(__dirname + '/views/partials');
app.set('view engine', 'hbs');
app.use(express.static(__dirname + '/public'));

//page logger middleware
app.use((req, res, next) => {
  let now = new Date().toString();
  let log = (`${now}: ${req.method} ${req.url}`);
  console.log(log);
  fs.appendFile('server.log', log + '\n', (err) => {
    if (err) {
      console.log('Unable to append to server.log')
    }
  });
  next();
});



hbs.registerHelper('getCurrentYear', () => {
  return new Date().getFullYear()
});

app.get('/home', (req, res) => {
  res.render('home.hbs', {
    pageTitle: 'Home Page'
  });
});

app.get('/about', (req, res) => {
  res.render('about-page.hbs', {
    pageTitle: 'About Page'
  });
});

app.get('/', (req, res) => {
  res.render('home.hbs', {
    pageTitle: 'Home Page'
  });
});

app.get('/bad', (req, res) => {
  res.send({
    error: 'Unable to handle request'
  });
});


app.listen(port, () => {
  console.log(`Server is up on port ${port}`);
});
