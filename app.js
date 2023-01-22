const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const fetch = require('node-fetch');

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

app.post('/signup', (req, res) => {
  // console.log("13",req.body);
  const { firstName, lastName, email } = req.body;

  // check feilds are not empty
  // i am using bootwatch bootstrap
  if (!firstName || !lastName || !email) {
    console.log("empty");
    return;
  }

  // body should be in same formate as shown below 
  // email is mendatory
  // other fields are optional but you can make is mendatory from dash board
  const data = {
    members: [
      {
        email_address: email,
        status: 'subscribed',
        merge_fields: {
          FNAME: firstName,
          LNAME: lastName
        }
      }
    ]
  };

  const postData = JSON.stringify(data);
/**
 * dc = data center add your data center from mailchimp dashboard or your url here (dc is us14)
 * lists/list_id here list id is cb5d887614
 */
  fetch('https://us14.api.mailchimp.com/3.0/lists/cb5d887614', { 
    method: 'POST',
    headers: {
      Authorization: 'auth [your api key here]' //api key
    },
    body: postData
  })
    .then(res.statusCode === 200 ?
     res.redirect('/success.html'):
      console.log('fail to add'))
    .catch(err => console.log(err))
})

const PORT = 5000;

app.listen(PORT, console.log(`Server started on ${PORT}`));
