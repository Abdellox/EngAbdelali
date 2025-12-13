import express from 'express'
import { prisma } from '../lib/prisma'
import { authenticateToken, AuthRequest } from '../middleware/auth'

const router = express.Router()

// Get saved posts
router.get('/', authenticateToken, async (req: AuthRequest, res) => {
  try {
    const userId = req.user!.id
    const { limit = 20, offset = 0 } = req.query

    const savedPosts = await prisma.savedPost.findMany({
      where: { userId },
      take: Number(limit),
      skip: Number(offset),
      orderBy: { id: 'desc' },
      include: {
        post: {
          include: {
            author: {
              select: { id: true, username: true, avatar: true, karma: true }
            },
            community: {
              select: { id: true, name: true, displayName: true }
            },
            postVotes: {
              where: { userId },
              select: { type: true }
            },
            _count: {
              select: { comments: true }
            }
          }
        }
      }
    })

    const posts = savedPosts.map(savedPost => ({
      ...savedPost.post,
      commentCount: savedPost.post._count.comments,
      userVote: savedPost.post.postVotes.length > 0 ? savedPost.post.postVotes[0].type : null,
      saved: true,
      postVotes: undefined,
      _count: undefined
    }))

    res.json(posts)
  } catch (error) {
    console.error('Get saved posts error:', error)
    res.status(500).json({ error: 'Internal server error' })
  }
})

// Save/unsave post
router.post('/:postId', authenticateToken, async (req: AuthRequest, res) => {
  try {
    const { postId } = req.params
    const userId = req.user!.id

    const post = await prisma.post.findUnique({
      where: { id: postId }
    })

    if (!post) {
      return res.status(404).json({ error: 'Post not found' })
    }

    const existingSave = await prisma.savedPost.findUnique({
      where: {
        userId_postId: {
          userId,
          postId
        }
      }
    })

    if (existingSave) {
      // Unsave
      await prisma.savedPost.delete({
        where: { id: existingSave.id }
      })
      res.json({ saved: false, message: 'Post unsaved' })
    } else {
      // Save
      await prisma.savedPost.create({
        data: { userId, postId }
      })
      res.json({ saved: true, message: 'Post saved' })
    }
  } catch (error) {
    console.error('Save/unsave post error:', error)
    res.status(500).json({ error: 'Internal server error' })
  }
})

export default router