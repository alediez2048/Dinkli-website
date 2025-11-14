# Local Development Guide

This guide will help you set up a local development environment to preview changes on the `develop` branch before deploying to production.

## Quick Start

### Method 1: Using the Start Script (Recommended)

1. Make sure you're on the `develop` branch:
   ```bash
   git checkout develop
   ```

2. Start the local server:
   ```bash
   ./start-server.sh
   ```

3. Open your browser to: http://localhost:8000

4. The server will automatically reload when you make changes to files

5. Press `Ctrl+C` to stop the server

### Method 2: Using Python (Built-in on macOS)

1. Navigate to the project directory:
   ```bash
   cd /Users/jorgealejandrodiez/Desktop/Dinkli
   ```

2. Start the server:
   ```bash
   python3 -m http.server 8000
   ```

3. Open http://localhost:8000 in your browser

4. Press `Ctrl+C` to stop

### Method 3: Using Node.js

1. Install dependencies (first time only):
   ```bash
   npm install
   ```

2. Start the server:
   ```bash
   npm start
   ```

   Or if you prefer:
   ```bash
   npx http-server -p 8000
   ```

3. Open http://localhost:8000 in your browser

### Method 4: VS Code Live Server (Best for Development)

1. Install the "Live Server" extension in VS Code
2. Right-click on `index.html` in the file explorer
3. Select "Open with Live Server"
4. The browser will open automatically and auto-reload on changes

## Development Workflow

1. **Switch to develop branch:**
   ```bash
   git checkout develop
   ```

2. **Make your changes** to HTML, CSS, or JS files

3. **Preview locally** using one of the methods above

4. **Test thoroughly** before committing

5. **Commit and push:**
   ```bash
   git add .
   git commit -m "Your commit message"
   git push
   ```

6. **When ready for production:**
   ```bash
   git checkout main
   git merge develop
   git push
   ```

## Tips

- **Auto-reload**: VS Code Live Server and `http-server` with `-o` flag will auto-reload
- **Different port**: Change the port number if 8000 is in use (e.g., `8001`, `3000`)
- **Mobile testing**: Use browser dev tools to simulate mobile devices
- **Network access**: To access from other devices on your network, use your computer's IP address instead of `localhost`

## Troubleshooting

**Port already in use:**
```bash
# Use a different port
python3 -m http.server 8001
```

**Images not loading:**
- Make sure you're running a local server (not opening file:// directly)
- Check that image paths in HTML are correct
- Verify images exist in the `images/` directory

**Changes not showing:**
- Hard refresh your browser: `Cmd+Shift+R` (Mac) or `Ctrl+Shift+R` (Windows)
- Clear browser cache
- Make sure you saved your files

## Recommended Setup

For the best development experience, I recommend:
- **VS Code** with the **Live Server** extension
- This gives you automatic reloading and easy access

