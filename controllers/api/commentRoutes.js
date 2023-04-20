const router = require('express').Router();
const { Comment } = require('../../models');
const withAuth = require('../../utils/auth');

router.get("/", withAuth, async (req, res) => {
    try {
      const commentData = await Comment.findAll({
        where: {
          user_id: req.session.user_id,
        },
      });
  
      const comments = commentData.map((comment) => comment.get({ plain: true }));

      res.status(200).json(comments);
    } catch (err) {
      res.status(500).json(err);
    }
  });


  router.post("/", withAuth, async (req, res) => {
    console.log("post", req.body, req.session);
    try {
      const newComment = await Comment.create({
        ...req.body,
        user_id: req.session.user_id,
        
      });
  
      res.status(200).json(newComment);
    } catch (err) {
      res.status(400).json(err);
    }
  });


  module.exports = router;
  