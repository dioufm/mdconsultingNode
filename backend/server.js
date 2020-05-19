const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const dbConfig = require("./database/db");
const fs = require('fs');

// Download the helper library from https://www.twilio.com/docs/node/install
// Your Account Sid and Auth Token from twilio.com/console
// DANGER! This is insecure. See http://twil.io/secure
const accountSid = 'AC29e0da17aaf1c492375d2a19d355ac6e';
const authToken = 'e333785147d12a4508ade9fb2b07edfc';
const client = require('twilio')(accountSid, authToken);

const multer = require('multer');
const GridFsStorage = require("multer-gridfs-storage");
const MongoGridFSStore = require('mongo-gridfs-storage');

const app = express();

var corsOptions = {
  origin: "http://localhost:8082"
};

app.use(cors(corsOptions));

// parse requests of content-type - application/json
app.use(bodyParser.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

const db = require("./model");
const Role = db.role;
const Categorie = db.categorie;
const Country = db.country;


db.mongoose
  .connect(dbConfig.db, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => {
    console.log("Successfully connect to MongoDB.");
    initial();
    initialCategories();
    initialCountry();
  })
  .catch(err => {
    console.error("Connection error", err);
    process.exit();
  });

// simple route
app.get("/", (req, res) => {
  res.json({ message: "Welcome to bezkoder application." });
});


// routes
require("./routes/auth.routes")(app);
require("./routes/user.routes")(app);
require("./routes/product.routes")(app);
require("./routes/upload.routes")(app);

// POST File
//app.post('/api/upload', upload.single('image'));

// set port, listen for requests
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);

});

/*

client.messages.create({
  mediaUrl: ['https://images.unsplash.com/photo-1545093149-618ce3bcf49d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=668&q=80'],
  from: 'whatsapp:+14155238886',
  body: `It's taco time!`,
  to: 'whatsapp:+33698558093'
}).then(message => console.log(message.sid));

*/

function initial() {
  Role.estimatedDocumentCount((err, count) => {
    if (!err && count === 0) {
      new Role({
        name: "user"
      }).save(err => {
        if (err) {
          console.log("error", err);
        }

        console.log("added 'user' to roles collection");
      });

      new Role({
        name: "moderator"
      }).save(err => {
        if (err) {
          console.log("error", err);
        }

        console.log("added 'moderator' to roles collection");
      });

      new Role({
        name: "admin"
      }).save(err => {
        if (err) {
          console.log("error", err);
        }

        console.log("added 'admin' to roles collection");
      });
    }
  });
}



function initialCategories() {
  Categorie.estimatedDocumentCount((err, count) => {
    if (!err && count === 0) {
      new Categorie({
        code: "IMO",
        name: "Immobilier",
        level: 1,
        color: "btn-primary",
        icon: "fas fa-home",
        subcategories:
          [
            {
              code: "LOC",
              name: "Location",
              level: 1
            },
            {
              code: "VTI",
              name: "Ventes immobilières",
              level: 1
            },
            {
              code: "BUC",
              name: "Bureaux & Commerces",
              level: 1
            },
            {
              code: "COL",
              name: "Colocation",
              level: 1
            }
          ],
        typeLogements:
          [
            {
              code: "MAI",
              name: "Maison",
              icon: 'house_icon'
            },
            {
              code: "APA",
              name: "Appartement",
              icon: 'appart_icon'
            },
            {
              code: "TER",
              name: "Terrain",
              icon: 'terrain_icon'
            },
            {
              code: "AUT",
              name: "Autre",
              icon: 'autre_icon'
            }
          ]
      }).save(err => {
        if (err) {
          console.log("error", err);
        }

        console.log("added 'categorie Immobilier' to categories collection");
      });

      new Categorie({
        code: "VEH",
        name: "Véhicules",
        level: 1,
        color: "btn-success",
        icon: "fas fa-car",
        subcategories:
          [
            {
              code: "VOT",
              name: "Voitures",
              level: 1
            },
            {
              code: "MOT",
              name: "Motos",
              level: 1
            },
            {
              code: "EAU",
              name: "Équipement auto",
              level: 1
            },
            {
              code: "EMO",
              name: "Équipement moto",
              level: 1
            }
          ]
      }).save(err => {
        if (err) {
          console.log("error", err);
        }

        console.log("added 'vehicule' to categories collection");
      });

      new Categorie({
        code: "MTM",
        name: "Multimédia",
        level: 1,
        color: "btn-info",
        icon: "fas fa-mobile-alt",
        subcategories:
          [
            {
              code: "TEL",
              name: "Téléphonie",
              level: 1
            },
            {
              code: "PCO",
              name: "Ordinateur & PC",
              level: 1
            },
            {
              code: "INF",
              name: "Informatique",
              level: 1
            },
            {
              code: "IMS",
              name: "Image & Son",
              level: 1
            },
            {
              code: "CJV",
              name: "Consoles & Jeux vidéo",
              level: 2
            }
          ]
      }).save(err => {
        if (err) {
          console.log("error", err);
        }

        console.log("added 'Multimédia' to categories collection");
      });

      new Categorie({
        code: "EMP",
        name: "Emploi",
        level: 1,
        color: "btn-info",
        icon: "fa fa-briefcase",
        subcategories: [
          {
            code: "OEM",
            name: "Offres d'emploi",
            level: 1
          }
        ]
      }).save(err => {
        if (err) {
          console.log("error", err);
        }

        console.log("added 'Emploi' to categories collection");
      });


      new Categorie({
        code: "SVC",
        name: "Services",
        level: 1,
        color: "btn-info",
        icon: "fa fa-server",
        subcategories: [
          {
            code: "PRS",
            name: "Prestations de services",
            level: 1
          },
          {
            code: "CPA",
            name: "Cours particuliers",
            level: 1
          }
        ]
      }).save(err => {
        if (err) {
          console.log("error", err);
        }

        console.log("added 'Services' to categories collection");
      });

      new Categorie({
        code: "VAC",
        name: "Vacances",
        level: 2,
        color: "btn-info",
        icon: "fa fa-globe",
        subcategories: [
          {
            code: "VLG",
            name: "Locations & Gîtes",
            level: 1
          },
          {
            code: "VCH",
            name: "Chambres d'hôtes",
            level: 1
          }
        ]
      }).save(err => {
        if (err) {
          console.log("error", err);
        }

        console.log("added 'Vacances' to categories collection");
      });


      new Categorie({
        code: "MAS",
        name: "Maison",
        level: 2,
        color: "btn-info",
        icon: "fa fa-home",
        subcategories: [
          {
            code: "AME",
            name: "Ameublement",
            level: 1
          },
          {
            code: "EME",
            name: "Électroménager",
            level: 1
          },
          {
            code: "DEC",
            name: "Décoration",
            level: 1
          },
          {
            code: "BRI",
            name: "Bricolage",
            level: 1
          }
        ]
      }).save(err => {
        if (err) {
          console.log("error", err);
        }

        console.log("added 'Maison' to categories collection");
      });

      new Categorie({
        code: "MOD",
        name: "Mode",
        level: 2,
        color: "btn-info",
        icon: "fa fa-female",
        subcategories: [
          {
            code: "VET",
            name: "Vêtements",
            level: 1
          },
          {
            code: "CHA",
            name: "Chaussures",
            level: 1
          },
          {
            code: "MTB",
            name: "Montres & Bijoux",
            level: 1
          },
          {
            code: "ACB",
            name: "Accessoires & Bagagerie",
            level: 1
          }
        ]
      }).save(err => {
        if (err) {
          console.log("error", err);
        }

        console.log("added 'Mode' to categories collection");
      });


      new Categorie({
        code: "LOS",
        name: "Loisirs",
        level: 1,
        color: "btn-info",
        icon: "fa fa-gamepad",
        subcategories: [
          {
            code: "SPH",
            name: "Sports & Hobbies",
            level: 1
          },
          {
            code: "INM",
            name: "Instruments de musique",
            level: 1
          },
          {
            code: "JJO",
            name: "Jeux & Jouets",
            level: 1
          },
          {
            code: "LIV",
            name: "Livres",
            level: 1
          },
          {
            code: "CD",
            name: "CD / DVD",
            level: 1
          }
        ]
      }).save(err => {
        if (err) {
          console.log("error", err);
        }

        console.log("added 'Loisirs' to categories collection");
      });

      new Categorie({
        code: "DIV",
        name: "Divers",
        level: 1,
        color: "btn-info",
        icon: "fa fa-question-circle",
        subcategories: [
          {
            code: "AUT",
            name: "Autres",
            level: 1
          }
        ]
      }).save(err => {
        if (err) {
          console.log("error", err);
        }

        console.log("added 'Divers' to categories collection");
      });
    }
  });
}


function initialCountry() {
  Country.estimatedDocumentCount((err, count) => {
    if (!err && count === 0) {
      let rawdata = fs.readFileSync('datas/datasCountry.json');
      let countries = JSON.parse(rawdata);
      console.log(countries);
      //var datasCountry = JSON.parse(countries.data);

      countries.forEach(country => {
        new Country(country)
          .save(err => {
            if (err) {
              console.log("error", err);
            }
          });
      });
    }
  });
}