import { Server, Socket } from 'socket.io'
import jwt from 'jsonwebtoken'
import { prisma } from './lib/prisma'

interface AuthenticatedSocket extends Socket {
  userId?: string
}

export const setupSocketIO = (io: Server) => {
  // Authentication middleware
  io.use(async (socket: any, next) => {
    try {
      const token = socket.handshake.auth.token
      if (!token) {
        return next(new Error('Authentication error'))
      }

      const decoded = jwt.verify(token, process.env.JWT_SECRET || 'fallback-secret') as any
      const user = await prisma.user.findUnique({
        where: { id: decoded.userId }
      })

      if (!user) {
        return next(new Error('User not found'))
      }

      socket.userId = user.id
      next()
    } catch (error) {
      next(new Error('Authentication error'))
    }
  })

  io.on('connection', (socket: AuthenticatedSocket) => {
    console.log(`User ${socket.userId} connected`)

    // Join user to their personal room for notifications
    if (socket.userId) {
      socket.join(`user:${socket.userId}`)
    }

    // Join post room for real-time comments
    socket.on('join-post', (postId: string) => {
      socket.join(`post:${postId}`)
      console.log(`User ${socket.userId} joined post ${postId}`)
    })

    // Leave post room
    socket.on('leave-post', (postId: string) => {
      socket.leave(`post:${postId}`)
      console.log(`User ${socket.userId} left post ${postId}`)
    })

    // Handle new comment
    socket.on('new-comment', (data: any) => {
      // Broadcast to all users in the post room
      socket.to(`post:${data.postId}`).emit('comment-added', data)
    })

    // Handle vote updates
    socket.on('vote-update', (data: any) => {
      if (data.postId) {
        socket.to(`post:${data.postId}`).emit('post-vote-updated', data)
      }
    })

    // Handle typing indicators
    socket.on('typing-start', (data: any) => {
      socket.to(`post:${data.postId}`).emit('user-typing', {
        userId: socket.userId,
        username: data.username
      })
    })

    socket.on('typing-stop', (data: any) => {
      socket.to(`post:${data.postId}`).emit('user-stopped-typing', {
        userId: socket.userId
      })
    })

    socket.on('disconnect', () => {
      console.log(`User ${socket.userId} disconnected`)
    })
  })

  return io
}

// Helper functions to emit events from API routes
export const emitNotification = (io: Server, userId: string, notification: any) => {
  io.to(`user:${userId}`).emit('new-notification', notification)
}

export const emitCommentAdded = (io: Server, postId: string, comment: any) => {
  io.to(`post:${postId}`).emit('comment-added', comment)
}

export const emitVoteUpdate = (io: Server, postId: string, voteData: any) => {
  io.to(`post:${postId}`).emit('post-vote-updated', voteData)
}