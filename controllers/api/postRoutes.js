const router = require('express').Router();
const {Post} = require('../../models');
const withAuth = require('../../utils/auth');

router.post("/", withAuth, async (req, res) => {
    console.log("post", req.body, req.session);
    try {
      const newPost = await Post.create({
        ...req.body,
        user_id: req.session.user_id,
        
      });
  
      res.status(200).json(newPost);
    } catch (err) {
      res.status(400).json(err);
    }
  });

  //GET existing post
  router.get("/", withAuth, async (req, res) => {
    try {
      const postData = await Post.findAll({
        where: {
          user_id: req.session.user_id,
        },
      });
  
      const post = postData.map((post) => post.get({ plain: true }));
      res.status(200).json(post);
    } catch (err) {
      res.status(500).json(err);
    }
  });


  //Update existing post
router.put("/:id", withAuth, async (req, res) => {
  console.log(req.body.updatedTitle, req.body.updatedContent);
  BlogPosts.update(
    {
      title: req.body.updatedTitle,
      content: req.body.updatedContent,
    },
    {
      where: {
        id: req.params.id,
      },
    }
  )
    .then(() => res.sendStatus(200))
    .catch((err) => res.status(500).json(err));
});


// Delete existing post
  router.delete('/:id', withAuth, async (req, res) => {
    try {
      const postData = await Post.destroy({
        where: {
          id: req.params.id,
          user_id: req.session.user_id,
        },
      });
  
      if (!postData) {
        res.status(404).json({ message: 'No post fount with this id!' });
        return;
      }
  
      res.status(200).json(postData);
    } catch (err) {
      res.status(500).json(err);
    }
  });

  
module.exports = router;