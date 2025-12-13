import express from 'express'
import { body, validationResult } from 'express-validator'
import { prisma } from '../lib/prisma'
import { authenticateToken, AuthRequest } from '../middleware/auth'

const router = express.Router()

// Get user profile
router.get('/:username', async (req, res) => {
  try {
    const { username } = req.params

    const user = await prisma.user.findUnique({
      where: { username },
      select: {
        id: true,
        username: true,
        avatar: true,
        bio: true,
        karma: true,
        createdAt: true,
        _count: {
          select: {
            posts: true,
            comments: true,
            followers: true,
            following: true
          }
        }
      }
    })

    if (!user) {
      return res.status(404).json({ error: 'User not found' })
    }

    res.json({
      ...user,
      postCount: user._count.posts,
      commentCount: user._count.comments,
      followerCount: user._count.followers,
      followingCount: user._count.following,
      _count: undefined
    })
  } catch (error) {
    console.error('Get user error:', error)
    res.status(500).json({ error: 'Internal server error' })
  }
})

// Update user profile
router.put('/profile', authenticateToken, [
  body('bio').optional().isLength({ max: 200 }),
  body('avatar').optional().isURL()
], async (req: AuthRequest, res) => {
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() })
  }

  try {
    const { bio, avatar } = req.body
    const userId = req.user!.id

    const updatedUser = await prisma.user.update({
      where: { id: userId },
      data: { bio, avatar },
      select: {
        id: true,
        username: true,
        email: true,
        avatar: true,
        bio: true,
        karma: true,
        createdAt: true
      }
    })

    res.json(updatedUser)
  } catch (error) {
    console.error('Update profile error:', error)
    res.status(500).json({ error: 'Internal server error' })
  }
})

// Follow user
router.post('/:id/follow', authenticateToken, async (req: AuthRequest, res) => {
  try {
    const { id } = req.params
    const userId = req.user!.id

    if (id === userId) {
      return res.status(400).json({ error: 'Cannot follow yourself' })
    }

    const targetUser = await prisma.user.findUnique({
      where: { id }
    })

    if (!targetUser) {
      return res.status(404).json({ error: 'User not found' })
    }

    // Check if already following
    const existingFollow = await prisma.follow.findUnique({
      where: {
        followerId_followingId: {
          followerId: userId,
          followingId: id
        }
      }
    })

    if (existingFollow) {
      return res.status(400).json({ error: 'Already following this user' })
    }

    await prisma.follow.create({
      data: {
        followerId: userId,
        followingId: id
      }
    })

    res.json({ message: 'User followed successfully' })
  } catch (error) {
    console.error('Follow user error:', error)
    res.status(500).json({ error: 'Internal server error' })
  }
})

// Unfollow user
router.delete('/:id/follow', authenticateToken, async (req: AuthRequest, res) => {
  try {
    const { id } = req.params
    const userId = req.user!.id

    const follow = await prisma.follow.findUnique({
      where: {
        followerId_followingId: {
          followerId: userId,
          followingId: id
        }
      }
    })

    if (!follow) {
      return res.status(400).json({ error: 'Not following this user' })
    }

    await prisma.follow.delete({
      where: { id: follow.id }
    })

    res.json({ message: 'User unfollowed successfully' })
  } catch (error) {
    console.error('Unfollow user error:', error)
    res.status(500).json({ error: 'Internal server error' })
  }
})

// Get user posts
router.get('/:username/posts', async (req, res) => {
  try {
    const { username } = req.params
    const { limit = 20, offset = 0 } = req.query

    const user = await prisma.user.findUnique({
      where: { username }
    })

    if (!user) {
      return res.status(404).json({ error: 'User not found' })
    }

    const posts = await prisma.post.findMany({
      where: { authorId: user.id },
      orderBy: { createdAt: 'desc' },
      take: Number(limit),
      skip: Number(offset),
      include: {
        author: {
          select: { id: true, username: true, avatar: true, karma: true }
        },
        community: {
          select: { id: true, name: true, displayName: true }
        },
        _count: {
          select: { comments: true }
        }
      }
    })

    const formattedPosts = posts.map(post => ({
      ...post,
      commentCount: post._count.comments,
      userVote: null,
      _count: undefined
    }))

    res.json(formattedPosts)
  } catch (error) {
    console.error('Get user posts error:', error)
    res.status(500).json({ error: 'Internal server error' })
  }
})

export default router