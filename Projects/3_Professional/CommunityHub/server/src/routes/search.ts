import express from 'express'
import { prisma } from '../lib/prisma'
import { optionalAuth, AuthRequest } from '../middleware/auth'

const router = express.Router()

// Search posts, communities, and users
router.get('/', optionalAuth, async (req: AuthRequest, res) => {
  try {
    const { q, type = 'all', limit = 10 } = req.query
    const userId = req.user?.id

    if (!q || typeof q !== 'string') {
      return res.status(400).json({ error: 'Search query required' })
    }

    const searchQuery = q.toLowerCase()
    const results: any = {}

    if (type === 'all' || type === 'posts') {
      const posts = await prisma.post.findMany({
        where: {
          OR: [
            { title: { contains: searchQuery } },
            { content: { contains: searchQuery } }
          ]
        },
        take: Number(limit),
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
        },
        orderBy: { votes: 'desc' }
      })

      results.posts = posts.map(post => ({
        ...post,
        commentCount: post._count.comments,
        userVote: userId && post.postVotes.length > 0 ? post.postVotes[0].type : null,
        postVotes: undefined,
        _count: undefined
      }))
    }

    if (type === 'all' || type === 'communities') {
      const communities = await prisma.community.findMany({
        where: {
          OR: [
            { name: { contains: searchQuery } },
            { displayName: { contains: searchQuery } },
            { description: { contains: searchQuery } }
          ]
        },
        take: Number(limit),
        include: {
          _count: {
            select: { members: true }
          },
          members: userId ? {
            where: { userId },
            select: { role: true }
          } : false
        },
        orderBy: { createdAt: 'desc' }
      })

      results.communities = communities.map(community => ({
        ...community,
        memberCount: community._count.members,
        isMember: userId ? community.members.length > 0 : false,
        isModerator: userId ? community.members.some(m => m.role === 'moderator' || m.role === 'admin') : false,
        members: undefined,
        _count: undefined
      }))
    }

    if (type === 'all' || type === 'users') {
      const users = await prisma.user.findMany({
        where: {
          OR: [
            { username: { contains: searchQuery } },
            { bio: { contains: searchQuery } }
          ]
        },
        take: Number(limit),
        select: {
          id: true,
          username: true,
          avatar: true,
          bio: true,
          karma: true,
          createdAt: true
        },
        orderBy: { karma: 'desc' }
      })

      results.users = users
    }

    res.json(results)
  } catch (error) {
    console.error('Search error:', error)
    res.status(500).json({ error: 'Internal server error' })
  }
})

export default router