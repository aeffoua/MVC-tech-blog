const router = require("express").Router();
const { Post } = require("../models");
const withAuth = require("../utils/auth");

router.get("/", withAuth, async (req, res) => {
    try {
      const dbBlogPostData = await BlogPosts.findAll({
        where: {
          user_id: req.session.user_id,
        },
      });
      // res.status(200).json(dbBlogPostData);
      if (dbBlogPostData.length) {
        const allBlogs = dbBlogPostData.map((post) => post.get({ plain: true }));
        res.render("dashboard", {
          allBlogs,
          loggedIn: req.session.loggedIn,
        });
      } else {
        res.render("dashboard");
      }
    } catch (err) {
      res.status(500).json(err);
    }
  });