const { UserInputError } = require("apollo-server");

const validurl = require("valid-url");
const shortid = require("shortid");

const Url = require("../models/Url");
const { baseUrl } = require("../config");

module.exports = {
  Mutation: {
    shortenURL: async (_, { longUrl }, context) => {
      if (!validurl.isUri(baseUrl)) {
        throw new Error("Base url must be a valid url");
      }

      if (validurl.isUri(longUrl)) {
        const url = await Url.findOne({ longUrl });

        if (url) {
          return url;
        } else {
          const urlCode = shortid.generate();
          const shortUrl = baseUrl + "/" + urlCode;

          const newUrl = new Url({
            urlCode,
            shortUrl,
            longUrl,
          });

          await newUrl.save();

          return newUrl;
        }
      } else {
        throw new UserInputError("Long url must be a valid url");
      }
    },
  },
  Query: {
    getLongUrl: async (_, { urlCode }, context) => {
      const url = await Url.findOne({ urlCode });

      if (url) {
        return url.longUrl;
      } else {
        throw new UserInputError("url not found");
      }
    },
  },
};
