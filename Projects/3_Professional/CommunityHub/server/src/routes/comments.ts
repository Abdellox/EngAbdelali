import express from 'express'
import { body, validationResult } from 'express-validator'
import { prisma } from '../lib/prisma'
import { authenticateToken, AuthRequest } from '../middleware/auth'

const router = express.Router()

// Vote on comment
router.post('/:id/vote', authenticateToken, [
  body('type').optional().isIn(['up', 'down'])
], async (req: AuthRequest, res) => {
  try {
    const { id } = req.params
    const { type } = req.body
    const userId = req.user!.id

    const comment = await prisma.comment.findUnique({
      where: { id }
    })

    if (!comment) {
      return res.status(404).json({ error: 'Comment not found' })
    }

    // Check existing vote
    const existingVote = await prisma.vote.findUnique({
      where: {
        userId_commentId: {
          userId,
          commentId: id
        }
      }
    })

    let voteChange = 0

    if (existingVote) {
      if (type && existingVote.type !== type) {
        // Change vote
        await prisma.vote.update({
          where: { id: existingVote.id },
          data: { type }
        })
        voteChange = existingVote.type === 'up' ? -2 : 2
      } else if (!type) {
        // Remove vote
        await prisma.vote.delete({
          where: { id: existingVote.id }
        })
        voteChange = existingVote.type === 'up' ? -1 : 1
      }
    } else if (type) {
      // Create new vote
      await prisma.vote.create({
        data: {
          type,
          userId,
          commentId: id
        }
      })
      voteChange = type === 'up' ? 1 : -1
    }

    // Update comment votes
    const updatedComment = await prisma.comment.update({
      where: { id },
      data: {
        votes: {
          increment: voteChange
        }
      }
    })

    res.json({
      votes: updatedComment.votes,
      userVote: type || null
    })
  } catch (error) {
    console.error('Vote comment error:', error)
    res.status(500).json({ error: 'Internal server error' })
  }
})

// Delete comment
router.delete('/:id', authenticateToken, async (req: AuthRequest, res) => {
  try {
    const { id } = req.params
    const userId = req.user!.id

    const comment = await prisma.comment.findUnique({
      where: { id },
      include: {
        author: true
      }
    })

    if (!comment) {
      return res.status(404).json({ error: 'Comment not found' })
    }

    if (comment.authorId !== userId) {
      return res.status(403).json({ error: 'Not authorized to delete this comment' })
    }

    await prisma.comment.delete({
      where: { id }
    })

    // Update post comment count
    await prisma.post.update({
      where: { id: comment.postId },
      data: {
        commentCount: {
          decrement: 1
        }
      }
    })

    res.json({ message: 'Comment deleted successfully' })
  } catch (error) {
    console.error('Delete comment error:', error)
    res.status(500).json({ error: 'Internal server error' })
  }
})

// Edit comment
router.put('/:id', authenticateToken, [
  body('content').isLength({ min: 1 })
], async (req: AuthRequest, res) => {
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() })
  }

  try {
    const { id } = req.params
    const { content } = req.body
    const userId = req.user!.id

    const comment = await prisma.comment.findUnique({
      where: { id }
    })

    if (!comment) {
      return res.status(404).json({ error: 'Comment not found' })
    }

    if (comment.authorId !== userId) {
      return res.status(403).json({ error: 'Not authorized to edit this comment' })
    }

    const updatedComment = await prisma.comment.update({
      where: { id },
      data: { content },
      include: {
        author: {
          select: { id: true, username: true, avatar: true }
        }
      }
    })

    res.json({
      ...updatedComment,
      userVote: null,
      replies: []
    })
  } catch (error) {
    console.error('Edit comment error:', error)
    res.status(500).json({ error: 'Internal server error' })
  }
})

export default router