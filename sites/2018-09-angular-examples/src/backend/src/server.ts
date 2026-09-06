import * as request from 'request';
import * as express from 'express';
import * as bodyParser from 'body-parser';
import * as multer from 'multer';
const cors = require('cors'); // can't use typings because RegExp not working in typings...
const multipart = multer();
const sgMail = require('@sendgrid/mail');

/**
 * SETUP
 */
const server = express();
server.use(cors({
  origin: [
    'http://localhost:4200',
    'https://taskbase-homepage.firebaseapp.com',
    /\.taskbase\.com$/
  ], credentials: true
}));

/**
 * MAILCHIMP
 */
const jsonForMailchimp = function (mergeFields) {
  return {
    'email_address': mergeFields.EMAIL,
    'status': 'pending',
    'merge_fields': mergeFields
  };
};

const options = {
  url: undefined, // added dynamically
  body: undefined, // added dynamically
  json: true,
  auth: {
    user: process.env.USER,
    pass: process.env.KEY
  },
  method: 'POST',
  headers: {
    'content-type': 'application/json'
  }
};

// parse application/json
server.use(bodyParser.json());
server.use(bodyParser.urlencoded({extended: true}));

server.get('/', function (req, res) {
  res.status(200).send('Welcome!');
});

server.post('/subscribe', multipart.fields([]), function (req, res) {

  if (req.query && req.query.listid) {
    const optionsCopy = {...options};

    optionsCopy.url = `${process.env.URL}/lists/${req.query.listid}/members/`;

    if (req.body && req.body.EMAIL) {

      optionsCopy.body = jsonForMailchimp(req.body);

      request(optionsCopy, function (err, mailchimpResponse) {

        if (err) {
          console.error('error posting json: ', err);
          throw err;
        }

        const headers = mailchimpResponse.headers;
        const statusCode = mailchimpResponse.statusCode;

        res.status(statusCode).send(mailchimpResponse);
      });
    } else {
      res.status(400).send('You need a payload with an "EMAIL" property');
    }

  } else {
    res.status(400).send('You need to have the listid query parameter');
  }

});

/**
 * SENDGRID
 */
server.post('/contact', multipart.fields([]), function (req, res) {
  if (req.body) {
    sgMail.setApiKey(process.env.SENDGRID_API_KEY);
    const msg = {
      to: 'samuel@taskbase.com',
      from: req.body.email || 'unknown@taskbase.com',
      subject: `Nachricht via Homepage Formular von ${req.body.name || 'Unbekannt'}`,
      text: req.body.message,
      html: `<pre>${req.body.message}</pre>`,
    };
    sgMail.send(msg).then(() => {
      res.status(200).send({});
    }).catch((err) => {
      res.status(395).send(err);
    });
  } else {
    res.status(400).send({});
  }
});


const port = process.env.PORT || 5000;
server.listen(port, function () {
  console.log(`server started on ${port}`);
  console.log(process.env.USER);
});
