# Debug Instructions

## To test Practice Mode:

1. **Refresh the page** in your browser (Ctrl+F5 or Cmd+Shift+R)
2. **Open browser console** (Press F12, then click "Console" tab)
3. **Select a job** (e.g., Administrative Assistant)
4. **You should see the Mode Selection screen** with two cards:
   - Practice Mode
   - Exam Mode
5. **Click "Start Practice"** button
6. **Check console** for these messages:
   - "Practice mode clicked"
   - "Calling showPracticeQuestions with: [category] [job]"
   - "showPracticeQuestions called with: [category] [job]"
   - "Questions loaded: X"

## If Practice Mode doesn't work:

### Check Console for Errors:
- Look for any red error messages
- Common issues:
  - "showPracticeQuestions is not defined" → Script loading order issue
  - "Cannot read property of null" → DOM element not found
  - "Mode buttons not found!" → HTML structure issue

### Verify HTML Structure:
- Open DevTools (F12)
- Go to "Elements" tab
- Search for `id="practiceMode"` - should exist
- Search for `id="modeSelection"` - should exist

### Verify Scripts Loaded:
- In Console, type: `typeof showPracticeQuestions`
- Should return: "function"
- If returns "undefined", scripts didn't load properly

## Expected Flow:

1. Click job → `showQuestions()` called
2. `showQuestions()` calls → `showModeSelection()`
3. Mode selection screen appears
4. Click "Start Practice" → `showPracticeQuestions()` called
5. Practice view appears with questions

## Quick Fix:

If nothing works, try:
```javascript
// In browser console, paste this:
showPracticeQuestions('Administrative & Office', 'Administrative Assistant');
```

This will directly show practice mode for testing.
