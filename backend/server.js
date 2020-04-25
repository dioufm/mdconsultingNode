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
const Photo = db.photo;


const SubCategorie = db.subcategorie;


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

const DIR = "./uploads";

let storagefile = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, DIR);
  },
  filename: (req, file, cb) => {
    cb(null, file.fieldname + '-' + Date.now() + '.png');
  }
});

// Storage
const storageold = new GridFsStorage({
  url: db,
  file: (req, file) => {
    if (file.mimetype === 'image/jpeg') {
      return {
        bucketName: 'photos'
      };
    } else {
      return null;
    }
  }
});

const storage = new GridFsStorage({
  url: dbConfig.db,
  file: (res, file) => {
    //1. Load the mongoose driver
    var mongooseDrv = require("mongoose");
    //2. Connect to MongoDB and its database
    mongooseDrv.connect(dbConfig.db);
    //3. The Connection Object
    var connection = mongooseDrv.connection;
    if (connection !== "undefined") {
      console.log(connection.readyState.toString());
      //4. The Path object
      var path = require("path");
      //5. The grid-stream
      var grid = require("gridfs-stream");
      //6. The File-System module
      //7.Read the video/image file from the videoread folder
      var filesrc = path.join(__dirname, "./uploads/" + file.originalname);
      //8. Establish connection between Mongo and GridFS
      grid.mongo = mongooseDrv.mongo;
      //9.Open the connection and write file
      connection.once("open", () => {
        try {
          console.log("Connection Open");
          var gridfs = grid(connection.db);
          if (gridfs) {
            //9a. create a stream, this will be
            //used to store file in database
            var streamwrite = gridfs.createWriteStream({
              //the file will be stored with the name
              filename: file.originalname
            }).catch(err => {
              console.error("Connection error", err);
              res.status(200).send({
                success: true
              });
            });;
            //9b. create a readstream to read the file
            //from the filestored folder
            //and pipe into the database
            fs.createReadStream(filesrc).pipe(streamwrite);
            //9c. Complete the write operation
            streamwrite.on("close", function (file) {
              console.log("Write written successfully in database");

            });
          } else {
            console.log("Sorry No Grid FS Object");
          }

        } catch (err) {
          console.log(err);
          db.fs.files.find({ filename: file.originalname }).sort({ uploadDate: 1 })
        }

      });
    } else {
      console.log('Sorry not connected');
    }
  }
});


let upload = multer({ storage: storage });



// routes
require("./routes/auth.routes")(app);
require("./routes/user.routes")(app);
require("./routes/product.routes")(app);

// POST File
app.post('/api/upload', upload.single('image'));

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