import express from 'express'
import { body, validationResult } from 'express-validator'
import { prisma } from '../lib/prisma'
import { authenticateToken, optionalAuth, AuthRequest } from '../middleware/auth'

const router = express.Router()

// Get posts
router.get('/', optionalAuth, async (req: AuthRequest, res) => {
  try {
    const { community, sort = 'hot', limit = 20, offset = 0 } = req.query
    const userId = req.user?.id

    let orderBy: any = { createdAt: 'desc' }
    
    if (sort === 'hot') {
      orderBy = { votes: 'desc' }
    } else if (sort === 'top') {
      orderBy = { votes: 'desc' }
    }

    const where: any = {}
    if (community) {
      const communityRecord = await prisma.community.findUnique({
        where: { name: community as string }
      })
      if (communityRecord) {
        where.communityId = communityRecord.id
      }
    }

    const posts = await prisma.post.findMany({
      where,
      orderBy,
      take: Number(limit),
      skip: Number(offset),
      include: {
        author: {
          select: { id: true, username: true, avatar: true, karma: true }
        },
        community: {
          select: { id: true, name: true, displayName: true }
        },
        postVotes: userId ? {
          where: { userId },
          select: { type: true }
        } : false,
        savedPosts: userId ? {
          where: { userId },
          select: { id: true }
        } : false,
        _count: {
          select: { comments: true }
        }
      }
    })

    const formattedPosts = posts.map(post => ({
      ...post,
      commentCount: post._count.comments,
      userVote: userId && post.postVotes.length > 0 ? post.postVotes[0].type : null,
      saved: userId && post.savedPosts.length > 0,
      postVotes: undefined,
      savedPosts: undefined,
      _count: undefined
    }))

    res.json(formattedPosts)
  } catch (error) {
    console.error('Get posts error:', error)
    res.status(500).json({ error: 'Internal server error' })
  }
})

// Get single post
router.get('/:id', optionalAuth, async (req: AuthRequest, res) => {
  try {
    const { id } = req.params
    const userId = req.user?.id

    const post = await prisma.post.findUnique({
      where: { id },
      include: {
        author: {
          select: { id: true, username: true, avatar: true, karma: true }
        },
        community: {
          select: { id: true, name: true, displayName: true }
        },
        postVotes: userId ? {
          where: { userId },
          select: { type: true }
        } : false,
        _count: {
          select: { comments: true }
        }
      }
    })

    if (!post) {
      return res.status(404).json({ error: 'Post not found' })
    }

    const formattedPost = {
      ...post,
      commentCount: post._count.comments,
      userVote: userId && post.postVotes.length > 0 ? post.postVotes[0].type : null,
      postVotes: undefined,
      _count: undefined
    }

    res.json(formattedPost)
  } catch (error) {
    console.error('Get post error:', error)
    res.status(500).json({ error: 'Internal server error' })
  }
})

// Create post
router.post('/', authenticateToken, [
  body('title').isLength({ min: 1, max: 300 }),
  body('type').isIn(['text', 'image', 'link', 'video']),
  body('communityId').exists()
], async (req: AuthRequest, res) => {
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() })
  }

  try {
    const { title, content, type, url, communityId } = req.body
    const userId = req.user!.id

    // Verify community exists and user is member
    const community = await prisma.community.findUnique({
      where: { id: communityId },
      include: {
        members: {
          where: { userId }
        }
      }
    })

    if (!community) {
      return res.status(404).json({ error: 'Community not found' })
    }

    const post = await prisma.post.create({
      data: {
        title,
        content,
        type,
        url,
        authorId: userId,
        communityId
      },
      include: {
        author: {
          select: { id: true, username: true, avatar: true, karma: true }
        },
        community: {
          select: { id: true, name: true, displayName: true }
        }
      }
    })

    res.status(201).json({
      ...post,
      commentCount: 0,
      userVote: null
    })
  } catch (error) {
    console.error('Create post error:', error)
    res.status(500).json({ error: 'Internal server error' })
  }
})

// Vote on post
router.post('/:id/vote', authenticateToken, [
  body('type').optional().isIn(['up', 'down'])
], async (req: AuthRequest, res) => {
  try {
    const { id } = req.params
    const { type } = req.body
    const userId = req.user!.id

    const post = await prisma.post.findUnique({
      where: { id }
    })

    if (!post) {
      return res.status(404).json({ error: 'Post not found' })
    }

    // Check existing vote
    const existingVote = await prisma.vote.findUnique({
      where: {
        userId_postId: {
          userId,
          postId: id
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
          postId: id
        }
      })
      voteChange = type === 'up' ? 1 : -1
    }

    // Update post votes
    const updatedPost = await prisma.post.update({
      where: { id },
      data: {
        votes: {
          increment: voteChange
        }
      }
    })

    res.json({
      votes: updatedPost.votes,
      userVote: type || null
    })
  } catch (error) {
    console.error('Vote post error:', error)
    res.status(500).json({ error: 'Internal server error' })
  }
})

// Get post comments
router.get('/:id/comments', optionalAuth, async (req: AuthRequest, res) => {
  try {
    const { id } = req.params
    const userId = req.user?.id

    const comments = await prisma.comment.findMany({
      where: { postId: id },
      orderBy: { createdAt: 'asc' },
      include: {
        author: {
          select: { id: true, username: true, avatar: true }
        },
        commentVotes: userId ? {
          where: { userId },
          select: { type: true }
        } : false
      }
    })

    // Build comment tree
    const commentMap = new Map()
    const rootComments: any[] = []

    comments.forEach(comment => {
      const formattedComment = {
        ...comment,
        userVote: userId && comment.commentVotes.length > 0 ? comment.commentVotes[0].type : null,
        replies: [],
        commentVotes: undefined
      }
      commentMap.set(comment.id, formattedComment)
    })

    comments.forEach(comment => {
      const formattedComment = commentMap.get(comment.id)
      if (comment.parentId) {
        const parent = commentMap.get(comment.parentId)
        if (parent) {
          parent.replies.push(formattedComment)
        }
      } else {
        rootComments.push(formattedComment)
      }
    })

    res.json(rootComments)
  } catch (error) {
    console.error('Get comments error:', error)
    res.status(500).json({ error: 'Internal server error' })
  }
})

// Create comment
router.post('/:id/comments', authenticateToken, [
  body('content').isLength({ min: 1 })
], async (req: AuthRequest, res) => {
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() })
  }

  try {
    const { id } = req.params
    const { content, parentId } = req.body
    const userId = req.user!.id

    const post = await prisma.post.findUnique({
      where: { id }
    })

    if (!post) {
      return res.status(404).json({ error: 'Post not found' })
    }

    let depth = 0
    if (parentId) {
      const parent = await prisma.comment.findUnique({
        where: { id: parentId }
      })
      if (parent) {
        depth = parent.depth + 1
      }
    }

    const comment = await prisma.comment.create({
      data: {
        content,
        authorId: userId,
        postId: id,
        parentId,
        depth
      },
      include: {
        author: {
          select: { id: true, username: true, avatar: true }
        }
      }
    })

    // Update post comment count
    await prisma.post.update({
      where: { id },
      data: {
        commentCount: {
          increment: 1
        }
      }
    })

    res.status(201).json({
      ...comment,
      userVote: null,
      replies: []
    })
  } catch (error) {
    console.error('Create comment error:', error)
    res.status(500).json({ error: 'Internal server error' })
  }
})

export default router