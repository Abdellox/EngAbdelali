# AI Template Generator 🎨

An open-source tool that generates beautiful website templates from natural language descriptions using pure HTML5, CSS3, and JavaScript. **Completely FREE** - powered by Hugging Face's free AI models!

## Features

- 🆓 **100% FREE** - No API keys required from users!
- 🤖 AI-powered template generation using Hugging Face
- 🎨 Pure HTML5, CSS3, and JavaScript output
- ✨ Live preview and instant editing
- 💾 Download generated templates
- 🚀 Easy to deploy and use
- 🌍 Open source for everyone

## Quick Start

### Installation

1. Clone this repository:
```bash
git clone <your-repo-url>
cd ai-template-generator
```

2. Install dependencies:
```bash
npm install
```

3. (Optional) Create a `.env` file for higher rate limits:
```bash
cp .env.example .env
# Add your free Hugging Face token from https://huggingface.co/settings/tokens
```

4. Start the server:
```bash
npm start
```

5. Open your browser to `http://localhost:3000`

## How It Works

1. User describes their desired template (e.g., "modern coffee shop landing page")
2. Backend calls Hugging Face's free AI models (Mistral or Zephyr)
3. AI generates clean HTML, CSS, and JavaScript
4. User previews, edits, and downloads the template
5. No API keys needed from users - everything is handled server-side!

## Tech Stack

**Frontend:**
- Pure HTML5, CSS3, JavaScript
- No frameworks - just vanilla code

**Backend:**
- Node.js + Express
- Hugging Face Inference API (FREE!)
- Fallback template generator

## Deployment

Deploy for free on:
- **Vercel**: `vercel deploy`
- **Render**: Connect your GitHub repo
- **Railway**: One-click deploy
- **Heroku**: `git push heroku main`

## Why Hugging Face?

- ✅ Completely free to use
- ✅ No credit card required
- ✅ Good quality AI models (Mistral, Zephyr)
- ✅ No API key needed for basic usage
- ✅ Optional token for higher rate limits

## Contributing

We love contributions! See [CONTRIBUTING.md](CONTRIBUTING.md) for details.

## License

MIT - Free for everyone to use and modify

---

Made with ❤️ for the open-source community | Powered by Hugging Face 🤗
