import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { Users } from 'lucide-react'
import { useAppSelector } from '../hooks/redux'
import api from '../services/api'

interface CommunityForm {
  name: string
  displayName: string
  description: string
  rules?: string
}

const CreateCommunity = () => {
  const { user } = useAppSelector((state) => state.auth)
  const navigate = useNavigate()
  const { register, handleSubmit, formState: { errors } } = useForm<CommunityForm>()
  const [isSubmitting, setIsSubmitting] = useState(false)

  const onSubmit = async (data: CommunityForm) => {
    setIsSubmitting(true)
    try {
      const response = await api.post('/communities', data)
      navigate(`/r/${response.data.name}`)
    } catch (error: any) {
      alert(error.response?.data?.error || 'Failed to create community')
    } finally {
      setIsSubmitting(false)
    }
  }

  if (!user) {
    return (
      <div className="text-center py-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Please log in</h2>
        <p className="text-gray-600">You need to be logged in to create a community.</p>
      </div>
    )
  }

  return (
    <div className="max-w-2xl mx-auto">
      <div className="card p-6">
        <div className="flex items-center space-x-3 mb-6">
          <Users className="w-6 h-6 text-reddit-blue" />
          <h1 className="text-2xl font-bold text-gray-900">Create Community</h1>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Community Name
            </label>
            <div className="flex">
              <span className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-gray-300 bg-gray-50 text-gray-500 text-sm">
                r/
              </span>
              <input
                {...register('name', {
                  required: 'Community name is required',
                  minLength: { value: 3, message: 'Name must be at least 3 characters' },
                  maxLength: { value: 21, message: 'Name must be less than 21 characters' },
                  pattern: {
                    value: /^[a-zA-Z0-9_]+$/,
                    message: 'Only letters, numbers, and underscores allowed'
                  }
                })}
                className="flex-1 rounded-r-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-reddit-orange focus:border-transparent"
                placeholder="communityname"
              />
            </div>
            {errors.name && <p className="mt-1 text-sm text-red-600">{errors.name.message}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Display Name
            </label>
            <input
              {...register('displayName', {
                required: 'Display name is required',
                minLength: { value: 3, message: 'Display name must be at least 3 characters' },
                maxLength: { value: 50, message: 'Display name must be less than 50 characters' }
              })}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-reddit-orange focus:border-transparent"
              placeholder="Community Display Name"
            />
            {errors.displayName && <p className="mt-1 text-sm text-red-600">{errors.displayName.message}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Description
            </label>
            <textarea
              {...register('description', {
                required: 'Description is required',
                minLength: { value: 10, message: 'Description must be at least 10 characters' },
                maxLength: { value: 500, message: 'Description must be less than 500 characters' }
              })}
              rows={4}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-reddit-orange focus:border-transparent resize-none"
              placeholder="What is this community about?"
            />
            {errors.description && <p className="mt-1 text-sm text-red-600">{errors.description.message}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Rules (Optional)
            </label>
            <textarea
              {...register('rules')}
              rows={6}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-reddit-orange focus:border-transparent resize-none"
              placeholder="Community rules and guidelines..."
            />
          </div>

          <div className="flex justify-end space-x-3">
            <button
              type="button"
              onClick={() => navigate(-1)}
              className="px-6 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? 'Creating...' : 'Create Community'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default CreateCommunity