// Reddit-style hot ranking algorithm
export const calculateHotScore = (votes: number, createdAt: Date): number => {
  const now = new Date()
  const ageInHours = (now.getTime() - createdAt.getTime()) / (1000 * 60 * 60)
  
  // Base score from votes
  let score = votes
  
  // Apply logarithmic scaling for votes
  if (votes > 0) {
    score = Math.log10(Math.max(votes, 1))
  } else if (votes < 0) {
    score = -Math.log10(Math.max(-votes, 1))
  }
  
  // Time decay - posts lose relevance over time
  const timeDecay = Math.pow(ageInHours + 2, -1.8)
  
  return score * timeDecay
}

// Calculate trending score (for communities)
export const calculateTrendingScore = (memberCount: number, recentActivity: number): number => {
  const memberScore = Math.log10(Math.max(memberCount, 1))
  const activityScore = Math.log10(Math.max(recentActivity, 1))
  
  return memberScore * 0.3 + activityScore * 0.7
}