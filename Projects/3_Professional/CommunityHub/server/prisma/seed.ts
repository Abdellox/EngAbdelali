import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'

const prisma = new PrismaClient()

async function main() {
  console.log('🌱 Starting database seed...')

  // Create users
  const hashedPassword = await bcrypt.hash('password123', 12)

  const user1 = await prisma.user.create({
    data: {
      username: 'john_doe',
      email: 'john@example.com',
      password: hashedPassword,
      bio: 'Software developer passionate about web technologies',
      karma: 1250
    }
  })

  const user2 = await prisma.user.create({
    data: {
      username: 'jane_smith',
      email: 'jane@example.com',
      password: hashedPassword,
      bio: 'Designer and frontend enthusiast',
      karma: 890
    }
  })

  const user3 = await prisma.user.create({
    data: {
      username: 'tech_guru',
      email: 'guru@example.com',
      password: hashedPassword,
      bio: 'Technology enthusiast and startup founder',
      karma: 2340
    }
  })

  console.log('✅ Created users')

  // Create communities
  const webdevCommunity = await prisma.community.create({
    data: {
      name: 'webdev',
      displayName: 'Web Development',
      description: 'A community for web developers to share knowledge, ask questions, and discuss the latest trends in web development.',
      rules: '1. Be respectful\n2. No spam\n3. Stay on topic\n4. Help others learn'
    }
  })

  const programmingCommunity = await prisma.community.create({
    data: {
      name: 'programming',
      displayName: 'Programming',
      description: 'General programming discussions, tips, and help for developers of all skill levels.',
      rules: '1. Be helpful and constructive\n2. No homework dumps\n3. Search before posting\n4. Include relevant code'
    }
  })

  const reactCommunity = await prisma.community.create({
    data: {
      name: 'reactjs',
      displayName: 'React.js',
      description: 'Everything about React.js - the popular JavaScript library for building user interfaces.',
      rules: '1. React-related content only\n2. No job postings\n3. Use code blocks for code\n4. Be patient with beginners'
    }
  })

  const techCommunity = await prisma.community.create({
    data: {
      name: 'technology',
      displayName: 'Technology',
      description: 'Latest technology news, gadgets, and innovations.',
      rules: '1. Technology-related content\n2. No clickbait titles\n3. Verify sources\n4. Respectful discussions'
    }
  })

  console.log('✅ Created communities')

  // Add users to communities
  await prisma.communityMember.create({ data: { userId: user1.id, communityId: webdevCommunity.id, role: 'admin' } })
  await prisma.communityMember.create({ data: { userId: user1.id, communityId: programmingCommunity.id, role: 'member' } })
  await prisma.communityMember.create({ data: { userId: user1.id, communityId: reactCommunity.id, role: 'moderator' } })
  await prisma.communityMember.create({ data: { userId: user2.id, communityId: webdevCommunity.id, role: 'member' } })
  await prisma.communityMember.create({ data: { userId: user2.id, communityId: reactCommunity.id, role: 'member' } })
  await prisma.communityMember.create({ data: { userId: user2.id, communityId: techCommunity.id, role: 'member' } })
  await prisma.communityMember.create({ data: { userId: user3.id, communityId: programmingCommunity.id, role: 'admin' } })
  await prisma.communityMember.create({ data: { userId: user3.id, communityId: techCommunity.id, role: 'admin' } })
  await prisma.communityMember.create({ data: { userId: user3.id, communityId: webdevCommunity.id, role: 'member' } })

  console.log('✅ Added users to communities')

  // Create posts
  const post1 = await prisma.post.create({
    data: {
      title: 'Getting Started with React Hooks - A Comprehensive Guide',
      content: `React Hooks have revolutionized how we write React components. Here's everything you need to know:

## What are Hooks?
Hooks are functions that let you "hook into" React state and lifecycle features from function components.

## Most Common Hooks:
- **useState**: Manage component state
- **useEffect**: Handle side effects
- **useContext**: Access React context
- **useReducer**: Complex state management

## Example:
\`\`\`javascript
import React, { useState, useEffect } from 'react';

function Counter() {
  const [count, setCount] = useState(0);
  
  useEffect(() => {
    document.title = \`Count: \${count}\`;
  }, [count]);
  
  return (
    <div>
      <p>You clicked {count} times</p>
      <button onClick={() => setCount(count + 1)}>
        Click me
      </button>
    </div>
  );
}
\`\`\`

What's your favorite hook and why?`,
      type: 'text',
      authorId: user1.id,
      communityId: reactCommunity.id,
      votes: 45
    }
  })

  const post2 = await prisma.post.create({
    data: {
      title: 'Best VS Code Extensions for Web Development in 2024',
      content: `Here are my top picks for VS Code extensions that every web developer should have:

## Essential Extensions:
1. **Prettier** - Code formatter
2. **ESLint** - JavaScript linter
3. **Live Server** - Local development server
4. **Auto Rename Tag** - Automatically rename paired HTML tags
5. **Bracket Pair Colorizer** - Colorize matching brackets
6. **GitLens** - Supercharge Git capabilities
7. **Thunder Client** - REST API client
8. **Path Intellisense** - Autocomplete filenames

## React Specific:
- **ES7+ React/Redux/React-Native snippets**
- **React Developer Tools**

What extensions do you use? Any hidden gems?`,
      type: 'text',
      authorId: user2.id,
      communityId: webdevCommunity.id,
      votes: 78
    }
  })

  const post3 = await prisma.post.create({
    data: {
      title: 'The Future of Web Development: What to Expect in 2024',
      content: `Web development is evolving rapidly. Here are the trends I'm watching:

## Key Trends:
- **AI Integration**: ChatGPT, GitHub Copilot changing how we code
- **Edge Computing**: Faster, more distributed applications
- **WebAssembly**: Near-native performance in browsers
- **Micro-frontends**: Scalable frontend architecture
- **Serverless**: Focus on business logic, not infrastructure

## New Frameworks:
- **Astro**: Static site generation with islands architecture
- **Remix**: Full-stack React framework
- **SvelteKit**: Svelte's answer to Next.js
- **Qwik**: Resumable applications

The landscape is changing fast. What excites you most?`,
      type: 'text',
      authorId: user3.id,
      communityId: webdevCommunity.id,
      votes: 123
    }
  })

  const post4 = await prisma.post.create({
    data: {
      title: 'How I Built a Reddit Clone with React and Node.js',
      content: `Just finished building a full-stack Reddit clone! Here's my tech stack and lessons learned:

## Tech Stack:
**Frontend:**
- React with TypeScript
- Redux Toolkit for state management
- TailwindCSS for styling
- Socket.io for real-time features

**Backend:**
- Node.js with Express
- PostgreSQL database
- Prisma ORM
- JWT authentication

## Key Features:
- User authentication
- Communities (subreddits)
- Posts with voting
- Nested comments
- Real-time updates
- Search functionality

## Biggest Challenges:
1. **Real-time updates** - Socket.io integration
2. **Nested comments** - Tree structure in database
3. **Vote system** - Preventing duplicate votes
4. **Performance** - Optimizing database queries

## What I Learned:
- TypeScript is amazing for large projects
- Prisma makes database work enjoyable
- Real-time features add complexity but huge value
- Good state management is crucial

The project took about 3 weeks. Happy to answer questions!`,
      type: 'text',
      authorId: user1.id,
      communityId: programmingCommunity.id,
      votes: 234
    }
  })

  const post5 = await prisma.post.create({
    data: {
      title: 'Amazing React Performance Optimization Techniques',
      type: 'link',
      url: 'https://react.dev/learn/render-and-commit',
      authorId: user2.id,
      communityId: reactCommunity.id,
      votes: 67
    }
  })

  console.log('✅ Created posts')

  // Create comments
  const comment1 = await prisma.comment.create({
    data: {
      content: 'Great explanation! I\'ve been struggling with useEffect dependencies. This really helps clarify when to include them.',
      authorId: user2.id,
      postId: post1.id,
      votes: 12
    }
  })

  const comment2 = await prisma.comment.create({
    data: {
      content: 'Thanks! The key is to think about what values from component scope your effect uses. If it uses a value that might change, include it in the dependencies array.',
      authorId: user1.id,
      postId: post1.id,
      parentId: comment1.id,
      depth: 1,
      votes: 8
    }
  })

  const comment3 = await prisma.comment.create({
    data: {
      content: 'I would add Thunder Client to this list. It\'s a great alternative to Postman right inside VS Code.',
      authorId: user3.id,
      postId: post2.id,
      votes: 15
    }
  })

  const comment4 = await prisma.comment.create({
    data: {
      content: 'Good point! I actually mentioned Thunder Client in the list. It\'s definitely a game-changer for API testing.',
      authorId: user2.id,
      postId: post2.id,
      parentId: comment3.id,
      depth: 1,
      votes: 5
    }
  })

  const comment5 = await prisma.comment.create({
    data: {
      content: 'This is an impressive project! How did you handle the real-time voting updates? Did you use WebSockets for that too?',
      authorId: user2.id,
      postId: post4.id,
      votes: 18
    }
  })

  const comment6 = await prisma.comment.create({
    data: {
      content: 'Yes! I used Socket.io for real-time voting. When someone votes, it emits an event to all users viewing that post. The tricky part was preventing race conditions with multiple simultaneous votes.',
      authorId: user1.id,
      postId: post4.id,
      parentId: comment5.id,
      depth: 1,
      votes: 22
    }
  })

  console.log('✅ Created comments')

  // Create some votes
  await prisma.vote.create({ data: { type: 'up', userId: user2.id, postId: post1.id } })
  await prisma.vote.create({ data: { type: 'up', userId: user3.id, postId: post1.id } })
  await prisma.vote.create({ data: { type: 'up', userId: user1.id, postId: post2.id } })
  await prisma.vote.create({ data: { type: 'up', userId: user3.id, postId: post2.id } })
  await prisma.vote.create({ data: { type: 'up', userId: user1.id, postId: post3.id } })
  await prisma.vote.create({ data: { type: 'up', userId: user2.id, postId: post3.id } })
  await prisma.vote.create({ data: { type: 'up', userId: user2.id, postId: post4.id } })
  await prisma.vote.create({ data: { type: 'up', userId: user3.id, postId: post4.id } })
  await prisma.vote.create({ data: { type: 'up', userId: user1.id, commentId: comment1.id } })
  await prisma.vote.create({ data: { type: 'up', userId: user3.id, commentId: comment1.id } })
  await prisma.vote.create({ data: { type: 'up', userId: user2.id, commentId: comment3.id } })
  await prisma.vote.create({ data: { type: 'up', userId: user1.id, commentId: comment5.id } })

  console.log('✅ Created votes')

  // Update post comment counts
  await prisma.post.update({
    where: { id: post1.id },
    data: { commentCount: 2 }
  })

  await prisma.post.update({
    where: { id: post2.id },
    data: { commentCount: 2 }
  })

  await prisma.post.update({
    where: { id: post4.id },
    data: { commentCount: 2 }
  })

  console.log('✅ Updated post comment counts')

  console.log('🎉 Database seeded successfully!')
  console.log('\n📝 Test accounts created:')
  console.log('Email: john@example.com | Password: password123')
  console.log('Email: jane@example.com | Password: password123')
  console.log('Email: guru@example.com | Password: password123')
}

main()
  .catch((e) => {
    console.error('❌ Seed failed:', e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })