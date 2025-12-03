# Arabic Text-to-Speech (TTS) Web App 🎙️

## محول النص العربي إلى صوت طبيعي

A fully functional, open-source Arabic Text-to-Speech web application that converts Arabic text into natural-sounding speech with multiple voice options.

## ✨ Features

- 🎯 **Natural Arabic Voices**: 8 different voices (4 male, 4 female) with regional dialects
- 🌍 **Multiple Dialects**: Egyptian, Saudi, UAE, and Moroccan accents
- 📱 **Responsive Design**: Works seamlessly on desktop and mobile devices
- 🎨 **Modern UI**: Clean, intuitive interface with RTL support
- 🔊 **Voice Preview**: Listen to voice samples before generating
- 💾 **Download Audio**: Save generated speech as MP3 files
- 🚀 **Dual Engine**: Uses Google TTS backend with browser fallback
- 🆓 **100% Free**: Open source and free for everyone

## 🎤 Available Voices

### Male Voices (أصوات رجالية)
- **أحمد** - Egyptian dialect
- **خالد** - Saudi dialect
- **عمر** - UAE dialect
- **علي** - Moroccan dialect

### Female Voices (أصوات نسائية)
- **فاطمة** - Egyptian dialect
- **عائشة** - Saudi dialect
- **ليلى** - UAE dialect
- **نور** - Moroccan dialect

## 🚀 Quick Start

### Prerequisites
- Python 3.7+
- pip (Python package manager)

### Installation

1. **Clone the repository**
```bash
git clone https://github.com/yourusername/arabic-tts.git
cd arabic-tts
```

2. **Install dependencies**
```bash
pip install -r requirements.txt
```

3. **Run the application**
```bash
python app.py
```

4. **Open your browser**
Navigate to `http://localhost:5000`

## 📦 Dependencies

- Flask - Web framework
- Flask-CORS - Cross-origin resource sharing
- gTTS - Google Text-to-Speech
- Modern web browser with JavaScript enabled

## 🎯 How to Use

1. **Enter Arabic Text**: Type or paste your Arabic text in the text area (up to 500 characters)
2. **Choose a Voice**: Select from 8 different natural-sounding voices
3. **Preview (Optional)**: Click the speaker icon to hear a voice sample
4. **Generate Speech**: Click "توليد الصوت" to convert text to speech
5. **Listen & Download**: Play the audio and download it as an MP3 file

## 🛠️ Technology Stack

- **Backend**: Python Flask
- **Frontend**: HTML5, CSS3, JavaScript
- **TTS Engine**: Google Text-to-Speech (gTTS)
- **Fallback**: Web Speech API (browser-based)
- **Icons**: Font Awesome
- **Fonts**: Google Fonts (Tajawal)

## 🌐 Browser Support

- Chrome/Edge (recommended)
- Firefox
- Safari
- Opera
- Any modern browser with JavaScript enabled

## 📱 Mobile Support

Fully responsive design that works on:
- iOS devices (iPhone, iPad)
- Android devices
- Tablets
- Desktop browsers

## 🤝 Contributing

We welcome contributions! This is an open-source project to help people convert Arabic text to natural voices.

### How to Contribute

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

This project is open source and available to everyone. Feel free to use, modify, and distribute.

## 🎯 Use Cases

- **Accessibility**: Help visually impaired users access Arabic content
- **Language Learning**: Practice Arabic pronunciation
- **Content Creation**: Generate voiceovers for videos
- **Education**: Create audio materials for students
- **Audiobooks**: Convert Arabic text to audio format
- **Announcements**: Generate audio announcements

## 🔧 Configuration

The app uses different TTS engines based on availability:

1. **Primary**: Google TTS via gTTS library (requires internet)
2. **Fallback**: Browser's Web Speech API (works offline)

## 🐛 Troubleshooting

**Issue**: Audio not generating
- **Solution**: Check internet connection (required for Google TTS)
- **Alternative**: Browser fallback will activate automatically

**Issue**: Voice sounds robotic
- **Solution**: Ensure backend server is running for natural voices

**Issue**: Download not working
- **Solution**: Generate audio first, then click download

## 📞 Support

For issues, questions, or suggestions:
- Open an issue on GitHub
- Contribute to the project
- Share with others who might benefit

## 🌟 Acknowledgments

- Google Text-to-Speech for providing natural Arabic voices
- The open-source community
- All contributors and users

## 🎉 Future Enhancements

- [ ] More voice options
- [ ] Speed and pitch control
- [ ] Batch text processing
- [ ] API for developers
- [ ] More Arabic dialects
- [ ] Text highlighting during speech
- [ ] Save favorite voices
- [ ] History of generated speeches

---

**Made with ❤️ for the Arabic-speaking community**

مشروع مفتوح المصدر لخدمة المجتمع العربي
