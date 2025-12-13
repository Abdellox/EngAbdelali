import { useState, useRef } from 'react'
import { Upload, X, Image as ImageIcon } from 'lucide-react'
import api from '../../services/api'

interface ImageUploadProps {
  onImageUploaded: (imageUrl: string) => void
  onRemove?: () => void
  currentImage?: string
}

const ImageUpload = ({ onImageUploaded, onRemove, currentImage }: ImageUploadProps) => {
  const [uploading, setUploading] = useState(false)
  const [dragOver, setDragOver] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleFileSelect = async (file: File) => {
    if (!file.type.startsWith('image/')) {
      alert('Please select an image file')
      return
    }

    if (file.size > 5 * 1024 * 1024) {
      alert('File size must be less than 5MB')
      return
    }

    setUploading(true)
    try {
      const formData = new FormData()
      formData.append('image', file)

      const response = await api.post('/upload/image', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      })

      onImageUploaded(`http://localhost:5000${response.data.imageUrl}`)
    } catch (error) {
      console.error('Upload error:', error)
      alert('Failed to upload image')
    } finally {
      setUploading(false)
    }
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    setDragOver(false)
    
    const files = Array.from(e.dataTransfer.files)
    if (files.length > 0) {
      handleFileSelect(files[0])
    }
  }

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (files && files.length > 0) {
      handleFileSelect(files[0])
    }
  }

  if (currentImage) {
    return (
      <div className="relative">
        <img
          src={currentImage}
          alt="Uploaded"
          className="max-w-full h-auto rounded-lg border border-gray-300"
        />
        {onRemove && (
          <button
            onClick={onRemove}
            className="absolute top-2 right-2 p-1 bg-red-500 text-white rounded-full hover:bg-red-600 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        )}
      </div>
    )
  }

  return (
    <div
      className={`border-2 border-dashed rounded-lg p-6 text-center transition-colors ${
        dragOver
          ? 'border-reddit-orange bg-orange-50'
          : 'border-gray-300 hover:border-gray-400'
      }`}
      onDrop={handleDrop}
      onDragOver={(e) => {
        e.preventDefault()
        setDragOver(true)
      }}
      onDragLeave={() => setDragOver(false)}
    >
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={handleFileInput}
        className="hidden"
      />
      
      {uploading ? (
        <div className="flex flex-col items-center space-y-2">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-reddit-orange"></div>
          <p className="text-sm text-gray-600">Uploading...</p>
        </div>
      ) : (
        <div className="flex flex-col items-center space-y-2">
          <ImageIcon className="w-12 h-12 text-gray-400" />
          <div>
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              className="text-reddit-orange hover:text-orange-600 font-medium"
            >
              Click to upload
            </button>
            <span className="text-gray-600"> or drag and drop</span>
          </div>
          <p className="text-xs text-gray-500">PNG, JPG, GIF up to 5MB</p>
        </div>
      )}
    </div>
  )
}

export default ImageUpload