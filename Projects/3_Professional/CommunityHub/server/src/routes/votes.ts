import express from 'express'
import { prisma } from '../lib/prisma'
import { authenticateToken, AuthRequest } from '../middleware/auth'

const router = express.Router()

// Get user's votes for posts
router.get('/posts', authenticateToken, async (req: AuthRequest, res) => {
  try {
    const userId = req.user!.id
    const { postIds } = req.query

    if (!postIds) {
      return res.status(400).json({ error: 'postIds query parameter required' })
    }

    const ids = Array.isArray(postIds) ? postIds : [postIds]

    const votes = await prisma.vote.findMany({
      where: {
        userId,
        postId: { in: ids as string[] }
      },
      select: {
        postId: true,
        type: true
      }
    })

    const voteMap = votes.reduce((acc, vote) => {
      if (vote.postId) {
        acc[vote.postId] = vote.type
      }
      return acc
    }, {} as Record<string, string>)

    res.json(voteMap)
  } catch (error) {
    console.error('Get post votes error:', error)
    res.status(500).json({ error: 'Internal server error' })
  }
})

// Get user's votes for comments
router.get('/comments', authenticateToken, async (req: AuthRequest, res) => {
  try {
    const userId = req.user!.id
    const { commentIds } = req.query

    if (!commentIds) {
      return res.status(400).json({ error: 'commentIds query parameter required' })
    }

    const ids = Array.isArray(commentIds) ? commentIds : [commentIds]

    const votes = await prisma.vote.findMany({
      where: {
        userId,
        commentId: { in: ids as string[] }
      },
      select: {
        commentId: true,
        type: true
      }
    })

    const voteMap = votes.reduce((acc, vote) => {
      if (vote.commentId) {
        acc[vote.commentId] = vote.type
      }
      return acc
    }, {} as Record<string, string>)

    res.json(voteMap)
  } catch (error) {
    console.error('Get comment votes error:', error)
    res.status(500).json({ error: 'Internal server error' })
  }
})

export default router