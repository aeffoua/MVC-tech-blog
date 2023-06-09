const router = require("express").Router();
const { Post, User, Comment} = require("../models");
const withAuth = require("../utils/auth");



router.get("/", async (req, res) => {
    try {
      // Get all posts and JOIN with user data
      const postData = await Post.findAll({
        include: [
          {
            model: User,
            attributes: ["name"],
          },
        ],
      });
  
      
      const posts = postData.map((post) => post.get({ plain: true }));
  
     
      if (req.session.logged_in) {
        res.render("homepage", {
          posts,
          logged_in: req.session.logged_in,
        });
      } else {
        res.render("landingpage");
      }
    } catch (err) {
      res.status(500).json(err);
    }
  });

  router.get("/post/:id", async (req, res) => {
    try {
      const postData = await Post.findByPk(req.params.id, {
        include: [
          {
            model: User,
            attributes: ["name"],
          },
        ],
      });
  
      const post = postData.get({ plain: true });
  
      res.render("post", {
        ...post,
        logged_in: req.session.logged_in,
      });
    } catch (err) {
      res.status(500).json(err);
    }
  });

  router.get("/profile", withAuth, async (req, res) => {
    try {
      // Find the logged in user based on the session ID
      const userData = await User.findByPk(req.session.user_id, {
        attributes: { exclude: ["password"] },
        include: [{ model: Post }],
      });
  
      const user = userData.get({ plain: true });
  
      res.render("profile", {
        ...user,
        logged_in: true,
      });
    } catch (err) {
      res.status(500).json(err);
    }
  });
  // login route
  router.get("/login", (req, res) => {
    
    if (req.session.logged_in) {
      res.redirect("/profile");
      return;
    }
  
    res.render("login");
  });
  
  // Sign up route
router.get("/signup", (req, res) => {
  if (req.session.loggedIn) {
    res.redirect("/");
    return;
  }
  res.render("sign-up");
});

  module.exports = router;