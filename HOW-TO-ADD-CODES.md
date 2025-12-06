# 🔑 How to Add New Unlock Codes

## Quick Steps (Every Time You Get a Ko-fi Supporter)

### 1. Generate a Code
1. Open `generate-codes.html` (double-click it on your computer)
2. Click "Generate Random Code"
3. **Copy the code** (e.g., `ABC12345`)

### 2. Add Code to System
1. Open `js/unlock-system.js` in your code editor
2. Find the `getValidCodes()` function (around line 15)
3. Add your new code to the array:

```javascript
getValidCodes() {
  return [
    'GOLDEN2025',
    'PREMIUM2025',
    'SUPPORTER2025',
    'ABC12345',  // ← Add your new code here
    // Add more codes below
  ];
}
```

### 3. Update GitHub
```bash
git add js/unlock-system.js
git commit -m "Add new unlock code for supporter"
git push origin main
```

### 4. Give Code to Supporter
- Send the code via Ko-fi message or email
- They enter it on your website
- Golden Projects unlock for them!

---

## Example Workflow

**Supporter pays $5 on Ko-fi:**

1. You receive Ko-fi notification
2. Open `generate-codes.html` locally
3. Generate code: `XYZ789AB`
4. Edit `js/unlock-system.js`:
   ```javascript
   return [
     'GOLDEN2025',
     'XYZ789AB',  // New code for John Doe
   ];
   ```
5. Save file
6. Run: `git add js/unlock-system.js`
7. Run: `git commit -m "Add code for supporter"`
8. Run: `git push origin main`
9. Message supporter: "Your unlock code is: XYZ789AB"
10. Done! ✅

---

## Important Notes

- ⚠️ **NEVER upload admin.html or generate-codes.html to GitHub**
- ✅ These files are in .gitignore (automatically protected)
- ✅ Only push js/unlock-system.js with new codes
- 💡 Keep a record of which supporter has which code
- 🔄 Codes work immediately after pushing to GitHub

---

## Revoking a Code

If you need to remove a code:

1. Open `js/unlock-system.js`
2. Delete the code from the array
3. Push to GitHub
4. Code becomes invalid immediately

---

## Testing

To test if a code works:

1. Open your website
2. Click a locked Golden Project
3. Enter the code
4. Should unlock successfully!

---

**Your codes are now secure and only YOU control them!** 🎉
