export interface User {
  id: string
  username: string
  email: string
  avatar?: string
  bio?: string
  karma: number
  createdAt: string
}

export interface Community {
  id: string
  name: string
  displayName: string
  description: string
  rules?: string
  memberCount: number
  createdAt: string
  isMember?: boolean
  isModerator?: boolean
}

export interface Post {
  id: string
  title: string
  content?: string
  type: 'text' | 'image' | 'link' | 'video'
  url?: string
  imageUrl?: string
  author: User
  community: Community
  votes: number
  userVote?: 'up' | 'down'
  commentCount: number
  createdAt: string
  saved?: boolean
}

export interface Comment {
  id: string
  content: string
  author: User
  postId: string
  parentId?: string
  votes: number
  userVote?: 'up' | 'down'
  replies?: Comment[]
  createdAt: string
  depth: number
}

export interface Vote {
  id: string
  type: 'up' | 'down'
  userId: string
  postId?: string
  commentId?: string
}

export interface Notification {
  id: string
  type: 'comment' | 'reply' | 'mention' | 'follow'
  message: string
  read: boolean
  createdAt: string
  relatedId?: string
}