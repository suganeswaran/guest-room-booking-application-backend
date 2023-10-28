const { default: mongoose } = require("mongoose");
const Country = require("../Models/Country.model");
const State = require("../Models/State.model");
const City = require("../Models/City.model");
const Locality = require("../Models/Locality.model");
const { errorHelper } = require("../Utils/errorHelper");
const { uniq, includes } = require("lodash");

exports.createLocality = async (req, res) => {
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const country = req.body;
    // creating countries
    const createdCountry = await Country.create({
      name: country.name,
      isoCode: country.isoCode,
    });
    const { states } = country;
    await Promise.all(
      // creating states for the created country
      states.map(async (state) => {
        const createdState = await State.create({
          name: state.name,
          country: createdCountry._id,
        });
        const { cities } = state;

        await Promise.all(
          // creating cities for the created states
          cities.map(async (city) => {
            const createdCity = await City.create({
              name: city.name,
              state: createdState._id,
            });
            const { localities } = city;

            await Promise.all(
              // creating localities for the created cities
              uniq(localities).map(async (locality) => {
                await Locality.create({
                  name: locality,
                  city: createdCity._id,
                });
              })
            );
          })
        );
      })
    );

    await session.commitTransaction();
    session.endSession();

    res.status(200).json({
      message: "Localities created successfully",
    });
  } catch (error) {
    await session.abortTransaction();
    session.endSession();
    errorHelper(res, 500, error, "Locality creation error");
  }
};

exports.getLocalities = async (req, res) => {
  try {
    const localities = await Locality.find({})
      .populate({
        path: "city",
        select: "name",
        populate: {
          path: "state",
          select: "name",
          populate: {
            path: "country",
            select: ["name", "isoCode"],
          },
        },
      })
      .exec();
    res.status(200).json(localities);
  } catch (error) {
    errorHelper(res, 500, error, "Getting locality error");
  }
};
