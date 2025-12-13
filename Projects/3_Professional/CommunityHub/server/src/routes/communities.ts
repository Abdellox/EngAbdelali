import express from 'express'
import { body, validationResult } from 'express-validator'
import { prisma } from '../lib/prisma'
import { authenticateToken, optionalAuth, AuthRequest } from '../middleware/auth'

const router = express.Router()

// Get all communities
router.get('/', optionalAuth, async (req: AuthRequest, res) => {
  try {
    const userId = req.user?.id

    const communities = await prisma.community.findMany({
      orderBy: { createdAt: 'desc' },
      include: {
        _count: {
          select: { members: true }
        },
        members: userId ? {
          where: { userId },
          select: { role: true }
        } : false
      }
    })

    const formattedCommunities = communities.map(community => ({
      ...community,
      memberCount: community._count.members,
      isMember: userId ? community.members.length > 0 : false,
      isModerator: userId ? community.members.some(m => m.role === 'moderator' || m.role === 'admin') : false,
      members: undefined,
      _count: undefined
    }))

    res.json(formattedCommunities)
  } catch (error) {
    console.error('Get communities error:', error)
    res.status(500).json({ error: 'Internal server error' })
  }
})

// Get single community
router.get('/:name', optionalAuth, async (req: AuthRequest, res) => {
  try {
    const { name } = req.params
    const userId = req.user?.id

    const community = await prisma.community.findUnique({
      where: { name },
      include: {
        _count: {
          select: { members: true }
        },
        members: userId ? {
          where: { userId },
          select: { role: true }
        } : false
      }
    })

    if (!community) {
      return res.status(404).json({ error: 'Community not found' })
    }

    const formattedCommunity = {
      ...community,
      memberCount: community._count.members,
      isMember: userId ? community.members.length > 0 : false,
      isModerator: userId ? community.members.some(m => m.role === 'moderator' || m.role === 'admin') : false,
      members: undefined,
      _count: undefined
    }

    res.json(formattedCommunity)
  } catch (error) {
    console.error('Get community error:', error)
    res.status(500).json({ error: 'Internal server error' })
  }
})

// Create community
router.post('/', authenticateToken, [
  body('name').isLength({ min: 3, max: 21 }).matches(/^[a-zA-Z0-9_]+$/),
  body('displayName').isLength({ min: 3, max: 50 }),
  body('description').isLength({ min: 10, max: 500 })
], async (req: AuthRequest, res) => {
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() })
  }

  try {
    const { name, displayName, description, rules } = req.body
    const userId = req.user!.id

    // Check if community name exists
    const existingCommunity = await prisma.community.findUnique({
      where: { name }
    })

    if (existingCommunity) {
      return res.status(400).json({ error: 'Community name already exists' })
    }

    const community = await prisma.community.create({
      data: {
        name,
        displayName,
        description,
        rules
      }
    })

    // Make creator an admin
    await prisma.communityMember.create({
      data: {
        userId,
        communityId: community.id,
        role: 'admin'
      }
    })

    res.status(201).json({
      ...community,
      memberCount: 1,
      isMember: true,
      isModerator: true
    })
  } catch (error) {
    console.error('Create community error:', error)
    res.status(500).json({ error: 'Internal server error' })
  }
})

// Join community
router.post('/:id/join', authenticateToken, async (req: AuthRequest, res) => {
  try {
    const { id } = req.params
    const userId = req.user!.id

    const community = await prisma.community.findUnique({
      where: { id }
    })

    if (!community) {
      return res.status(404).json({ error: 'Community not found' })
    }

    // Check if already a member
    const existingMember = await prisma.communityMember.findUnique({
      where: {
        userId_communityId: {
          userId,
          communityId: id
        }
      }
    })

    if (existingMember) {
      return res.status(400).json({ error: 'Already a member' })
    }

    await prisma.communityMember.create({
      data: {
        userId,
        communityId: id
      }
    })

    res.json({ message: 'Joined community successfully' })
  } catch (error) {
    console.error('Join community error:', error)
    res.status(500).json({ error: 'Internal server error' })
  }
})

// Leave community
router.post('/:id/leave', authenticateToken, async (req: AuthRequest, res) => {
  try {
    const { id } = req.params
    const userId = req.user!.id

    const membership = await prisma.communityMember.findUnique({
      where: {
        userId_communityId: {
          userId,
          communityId: id
        }
      }
    })

    if (!membership) {
      return res.status(400).json({ error: 'Not a member' })
    }

    await prisma.communityMember.delete({
      where: { id: membership.id }
    })

    res.json({ message: 'Left community successfully' })
  } catch (error) {
    console.error('Leave community error:', error)
    res.status(500).json({ error: 'Internal server error' })
  }
})

export default router