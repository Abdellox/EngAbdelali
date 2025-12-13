import express from 'express'
import { prisma } from '../lib/prisma'
import { authenticateToken, AuthRequest } from '../middleware/auth'

const router = express.Router()

// Get user notifications
router.get('/', authenticateToken, async (req: AuthRequest, res) => {
  try {
    const userId = req.user!.id
    const { limit = 20, offset = 0 } = req.query

    const notifications = await prisma.notification.findMany({
      where: { userId },
      orderBy: { createdAt: 'desc' },
      take: Number(limit),
      skip: Number(offset)
    })

    res.json(notifications)
  } catch (error) {
    console.error('Get notifications error:', error)
    res.status(500).json({ error: 'Internal server error' })
  }
})

// Mark notification as read
router.put('/:id/read', authenticateToken, async (req: AuthRequest, res) => {
  try {
    const { id } = req.params
    const userId = req.user!.id

    const notification = await prisma.notification.findUnique({
      where: { id }
    })

    if (!notification) {
      return res.status(404).json({ error: 'Notification not found' })
    }

    if (notification.userId !== userId) {
      return res.status(403).json({ error: 'Not authorized' })
    }

    const updatedNotification = await prisma.notification.update({
      where: { id },
      data: { read: true }
    })

    res.json(updatedNotification)
  } catch (error) {
    console.error('Mark notification read error:', error)
    res.status(500).json({ error: 'Internal server error' })
  }
})

// Mark all notifications as read
router.put('/read-all', authenticateToken, async (req: AuthRequest, res) => {
  try {
    const userId = req.user!.id

    await prisma.notification.updateMany({
      where: { userId, read: false },
      data: { read: true }
    })

    res.json({ message: 'All notifications marked as read' })
  } catch (error) {
    console.error('Mark all notifications read error:', error)
    res.status(500).json({ error: 'Internal server error' })
  }
})

// Get unread notification count
router.get('/unread-count', authenticateToken, async (req: AuthRequest, res) => {
  try {
    const userId = req.user!.id

    const count = await prisma.notification.count({
      where: { userId, read: false }
    })

    res.json({ count })
  } catch (error) {
    console.error('Get unread count error:', error)
    res.status(500).json({ error: 'Internal server error' })
  }
})

export default router