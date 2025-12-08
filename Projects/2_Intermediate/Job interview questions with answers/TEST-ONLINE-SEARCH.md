# 🧪 Test the Online Search Feature

## Quick Test Steps

### 1. Open the Website
```
http://localhost:8000
```

### 2. Test Local Search (Fast)
Type in search box:
- "Administrative" → Should show local results instantly
- "Customer Service" → Should show local results instantly
- "Nurse" → Should show local results instantly

### 3. Test Online Search (New!)
Type in search box:
- **"Astronaut"** → Should search online (not in database)
- **"YouTuber"** → Should search online
- **"Blockchain Developer"** → Should search online
- **"AI Engineer"** → Should search online

### 4. What to Look For

#### Online Search Indicators:
1. **Loading message**: "🌐 Searching online..."
2. **Green border** on result card
3. **"LIVE" badge** (pulsing animation)
4. **"📡 Questions fetched from online sources"** text
5. **10 questions** displayed

#### Result Card Should Show:
```
🌐 Online Search Results
Found 10 questions online
• [Job Name] LIVE

📡 Questions fetched from online sources
```

### 5. Click the Result
- Should show mode selection (Practice/Exam)
- Click "Start Practice" or "Start Exam"
- Should show 10 interview questions
- Questions should be relevant to the job

### 6. Check Browser Console (F12)
You should see:
```
Searching online for: [job name]
DuckDuckGo search...
Wikipedia search...
Generating smart questions...
```

## 🎯 Test Different Job Types

### Tech Jobs:
```
Machine Learning Engineer
DevOps Engineer
Cloud Architect
Full Stack Developer
```

### Creative Jobs:
```
Content Creator
Video Editor
Podcast Host
3D Artist
```

### Modern Jobs:
```
Social Media Manager
Influencer
Drone Pilot
E-sports Coach
```

### Traditional Jobs (should find local):
```
Teacher
Accountant
Nurse
Manager
```

## ✅ Success Criteria

### Online Search Works If:
1. ✅ Shows "Searching online..." message
2. ✅ Returns results within 3 seconds
3. ✅ Displays green card with LIVE badge
4. ✅ Shows 10 questions
5. ✅ Questions are relevant to job
6. ✅ Can start Practice or Exam mode
7. ✅ No errors in console

### Error Handling Works If:
1. ✅ Shows error message if no internet
2. ✅ Provides fallback questions
3. ✅ Offers "Try Again" button
4. ✅ Doesn't crash the app

## 🐛 Troubleshooting

### If Online Search Doesn't Work:

1. **Check Internet Connection**
   - Open another website
   - Ensure you're online

2. **Check Browser Console (F12)**
   - Look for error messages
   - Check if APIs are blocked

3. **Try Different Job Names**
   - Use common job titles
   - Check spelling

4. **Refresh Page**
   - Hard refresh: Ctrl+Shift+R
   - Clear cache if needed

### Common Issues:

**"CORS Error"**
- Some APIs might be blocked
- Try different browser
- Check firewall settings

**"No Results"**
- Try more common job titles
- Check spelling
- Try variations

**"Slow Loading"**
- Normal for first search
- APIs need time to respond
- Wait 3-5 seconds

## 📊 Expected Behavior

### Timeline:
```
0.0s → User types
0.5s → Search starts (debounce)
0.6s → Shows "Searching..."
1.0s → Searches local DB
1.5s → Starts online search
2.0s → Fetches from APIs
3.0s → Displays results
```

### API Calls:
1. DuckDuckGo API (job info)
2. Wikipedia API (job description)
3. Smart question generation
4. Combine all results

## 🎉 Success!

If you see:
- ✅ Green card with LIVE badge
- ✅ 10 relevant questions
- ✅ Can practice or take exam
- ✅ Questions make sense

**Then the online search is working perfectly!** 🚀

---

**Now you can search for ANY job in the world and get interview questions!** 🌍
