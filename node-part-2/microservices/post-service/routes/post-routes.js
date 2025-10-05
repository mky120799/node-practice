const router = require('express').Router()
const { authenticateRequest } = require('../middleware/authMiddleware')

const { createPost, getAllPosts, getPost } = require('../controllers/post-controller')

router.use(authenticateRequest)

// middleware - > this will tell if the user is an auth user or not

router.post('/create-post', createPost)
router.get('/all-posts',getAllPosts)
router.get('/:id',getPost)
module.exports = router