const router = require("express").Router();
const { Post } = require("../models");
const withAuth = require("../utils/auth");


router.get("/", withAuth, async (req, res) => {
    try {
      const postData = await Post.findAll({
        where: {
          user_id: req.session.user_id,
        },
      });
  
      const posts = postData.map((post) => post.get({ plain: true }));
      res.status(200).json(posts);
    } catch (err) {
        res.redirect('login');
    }
  });

 
 router.get('/new', withAuth, (req, res) => {
    res.render('new-post') 
});




  module.exports = router;