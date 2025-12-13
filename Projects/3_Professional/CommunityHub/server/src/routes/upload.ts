import express from 'express'
import { authenticateToken, AuthRequest } from '../middleware/auth'
import { uploadSingle } from '../middleware/upload'

const router = express.Router()

// Upload image
router.post('/image', authenticateToken, (req: AuthRequest, res) => {
  uploadSingle(req, res, (err) => {
    if (err) {
      return res.status(400).json({ error: err.message })
    }

    if (!req.file) {
      return res.status(400).json({ error: 'No file uploaded' })
    }

    const imageUrl = `/uploads/${req.file.filename}`
    res.json({ imageUrl, filename: req.file.filename })
  })
})

export default router