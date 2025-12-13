import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { Type, Image, Link as LinkIcon, Video } from 'lucide-react'
import { useAppSelector, useAppDispatch } from '../hooks/redux'
import { fetchCommunities } from '../store/slices/communitiesSlice'
import { createPost } from '../store/slices/postsSlice'
import ImageUpload from '../components/Upload/ImageUpload'

interface PostForm {
  title: string
  content?: string
  url?: string
  communityId: string
}

const CreatePost = () => {
  const { user } = useAppSelector((state) => state.auth)
  const { communities } = useAppSelector((state) => state.communities)
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const { register, handleSubmit, formState: { errors }, watch } = useForm<PostForm>()
  
  const [postType, setPostType] = useState<'text' | 'image' | 'link' | 'video'>('text')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [uploadedImageUrl, setUploadedImageUrl] = useState<string>('')

  const selectedCommunityId = watch('communityId')

  useEffect(() => {
    if (!user) {
      navigate('/login')
      return
    }
    dispatch(fetchCommunities())
  }, [user, navigate, dispatch])

  const onSubmit = async (data: PostForm) => {
    if (!user) return

    setIsSubmitting(true)
    try {
      const postData = {
        ...data,
        type: postType,
        imageUrl: postType === 'image' ? uploadedImageUrl : undefined
      }
      
      const result = await dispatch(createPost(postData))
      if (result.meta.requestStatus === 'fulfilled') {
        const community = communities.find(c => c.id === data.communityId)
        navigate(`/r/${community?.name}`)
      }
    } finally {
      setIsSubmitting(false)
    }
  }

  const postTypes = [
    { key: 'text', label: 'Text', icon: Type },
    { key: 'image', label: 'Image', icon: Image },
    { key: 'link', label: 'Link', icon: LinkIcon },
    { key: 'video', label: 'Video', icon: Video },
  ]

  if (!user) {
    return null
  }

  return (
    <div className="max-w-2xl mx-auto">
      <div className="card p-6">
        <h1 className="text-2xl font-bold text-gray-900 mb-6">Create a post</h1>

        {/* Community selection */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Choose a community
          </label>
          <select
            {...register('communityId', { required: 'Please select a community' })}
            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-reddit-orange focus:border-transparent"
          >
            <option value="">Select a community</option>
            {communities.map((community) => (
              <option key={community.id} value={community.id}>
                r/{community.name}
              </option>
            ))}
          </select>
          {errors.communityId && (
            <p className="mt-1 text-sm text-red-600">{errors.communityId.message}</p>
          )}
        </div>

        {/* Post type selection */}
        <div className="mb-6">
          <div className="flex space-x-1 bg-gray-100 p-1 rounded-lg">
            {postTypes.map(({ key, label, icon: Icon }) => (
              <button
                key={key}
                type="button"
                onClick={() => setPostType(key as typeof postType)}
                className={`flex items-center space-x-2 px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                  postType === key
                    ? 'bg-white text-reddit-orange shadow-sm'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                <Icon className="w-4 h-4" />
                <span>{label}</span>
              </button>
            ))}
          </div>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {/* Title */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Title
            </label>
            <input
              {...register('title', {
                required: 'Title is required',
                maxLength: {
                  value: 300,
                  message: 'Title must be less than 300 characters'
                }
              })}
              type="text"
              placeholder="An interesting title"
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-reddit-orange focus:border-transparent"
            />
            {errors.title && (
              <p className="mt-1 text-sm text-red-600">{errors.title.message}</p>
            )}
          </div>

          {/* Content based on post type */}
          {postType === 'text' && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Text (optional)
              </label>
              <textarea
                {...register('content')}
                placeholder="Text (optional)"
                className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-reddit-orange focus:border-transparent resize-none"
                rows={8}
              />
            </div>
          )}

          {postType === 'image' && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Upload Image
              </label>
              <ImageUpload
                onImageUploaded={setUploadedImageUrl}
                onRemove={() => setUploadedImageUrl('')}
                currentImage={uploadedImageUrl}
              />
            </div>
          )}

          {(postType === 'link' || postType === 'video') && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                URL
              </label>
              <input
                {...register('url', {
                  required: `${postType} URL is required`,
                  pattern: {
                    value: /^https?:\/\/.+/,
                    message: 'Please enter a valid URL'
                  }
                })}
                type="url"
                placeholder={`Enter ${postType} URL`}
                className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-reddit-orange focus:border-transparent"
              />
              {errors.url && (
                <p className="mt-1 text-sm text-red-600">{errors.url.message}</p>
              )}
            </div>
          )}

          {/* Submit buttons */}
          <div className="flex justify-end space-x-3">
            <button
              type="button"
              onClick={() => navigate(-1)}
              className="px-6 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting || !selectedCommunityId || (postType === 'image' && !uploadedImageUrl)}
              className="btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? 'Posting...' : 'Post'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default CreatePost