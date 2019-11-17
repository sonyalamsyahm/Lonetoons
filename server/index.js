const express = require("express");
const bodyParser = require("body-parser");
const multer = require("multer");
const path = require("path");
require("express-group-routes");

const app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.json());

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.fieldname);
  }
});

const upload = multer({ storage });

//controllers
const AuthController = require("./controllers/auth");
const Register = require("./controllers/auth");
const Webtoon = require("./controllers/Lonetoon");
const getMethod = require("./controllers/get");
const putMethod = require("./controllers/put");
//midleware
const { authenticated, authorized } = require("./middleware");

//middlewares

app.group("/api/v1", router => {
  //auth API
  router.post("/login", AuthController.login);
  router.post("/register", Register.register);

  router.put(
    "/user/:user_id/profile",
    authenticated,
    authorized,
    putMethod.changeProfile
  );

  //Content
  //getProfile
  router.get(
    "/user/:user_id/profile",
    authenticated,
    authorized,
    getMethod.getProfile
  );

  //show all webtoon
  router.get("/webtoons", Webtoon.AllToon);
  //show all webtoons for private
  router.get(
    "/user/:user_id/all_webtoons",
    authenticated,
    authorized,
    Webtoon.all_webtoons
  );

  //show episode
  router.get("/webtoon/:id_webtoon/episodes", Webtoon.EpisodeToon);
  //show detail page
  router.get("/webtoon/:id_webtoon/episode/:id_episode", Webtoon.PageEpisode);

  //show my toon
  router.get(
    "/user/:user_id/webtoons",
    authenticated,
    authorized,
    Webtoon.showMyToon
  );

  //create my toon
  router.post(
    "/user/:user_id/webtoon",
    authenticated,
    authorized,
    Webtoon.createMyToon
  );

  //Update my Toon
  router.put(
    "/user/:user_id/webtoon/:webtoon_id",
    authenticated,
    authorized,
    Webtoon.updateMyToon
  );

  //DeleteMyToon
  router.delete(
    "/user/:user_id/webtoon/:webtoon_id",
    authenticated,
    authorized,
    Webtoon.deleteMyToon
  );

  //getEpisode:user
  router.get(
    "/user/:user_id/webtoon/:webtoon_id/episodes",
    authenticated,
    authorized,
    Webtoon.getEpisodeUser
  );

  //create Episode
  router.post(
    "/user/:user_id/webtoon/:webtoon_id/episode",
    authenticated,
    authorized,
    Webtoon.createMyEpisode
  );

  router.get(
    "/user/:user_id/webtoon/:webtoon_id/episode/:episode_id/images",
    authenticated,
    authorized,
    Webtoon.getMyToonImage
  );

  router.put(
    "/user/:user_id/webtoon/:webtoon_id/episode/:episode_id",
    authenticated,
    authorized,
    Webtoon.updateMyEpisode
  );

  router.delete(
    "/user/:user_id/webtoon/:webtoon_id/episode/:episode_id",
    authenticated,
    authorized,
    Webtoon.deleteMyEpisode
  );

  router.post(
    "/user/:user_id/webtoon/:webtoon_id/episode/:episode_id/image",
    authenticated,
    authorized,
    Webtoon.createMyPage
  );

  router.delete(
    "/user/:user_id/webtoon/:webtoon_id/episode/:episode_id/image/:image_id",
    authenticated,
    authorized,
    Webtoon.deleteMyPage
  );

  router.get(
    "/user/:user_id/webtoon/favorites",
    authenticated,
    authorized,
    Webtoon.getFavorite
  );

  router.post(
    "/user/:user_id/webtoon/:webtoon_id/favorite",
    authenticated,
    authorized,
    Webtoon.createFavorite
  );

  router.delete(
    "/user/:user_id/webtoon/:webtoon_id/favorite",
    authenticated,
    authorized,
    Webtoon.deleteFavorite
  );
});

app.use((err, req, res, next) => {
  if (err.name === "UnauthorizedError") {
    res.status(401).json({ message: "You're Unauthorize" });
  } else {
    next(err);
  }
});

app.listen(port, () => console.log(`Listening on port ${port}!`));
