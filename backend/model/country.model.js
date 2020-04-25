const mongoose = require("mongoose");

const Country = mongoose.model(
  "Country",
  new mongoose.Schema({
    code: String,
    name: String,
    level: Number,
    color: String,
    icon: String,
    regions:
      [
        {
          code: String,
          name: String,
          departements:
            [
              {
                code: String,
                name: String,
                villes:
                  [
                    {
                      code: String,
                      name: String,
                      quartiers:
                        [
                          {
                            code: String,
                            name: String
                          }
                        ]
                    }
                  ]
              }
            ]
        }
      ]
  })
);

module.exports = Country;
