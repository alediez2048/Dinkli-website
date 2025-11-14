#!/bin/bash

# Dinkli Local Development Server
# This script starts a local web server to preview the website

PORT=8000

echo "🚀 Starting Dinkli local development server..."
echo "📍 Server running at: http://localhost:$PORT"
echo "📱 Open http://localhost:$PORT in your browser"
echo ""
echo "Press Ctrl+C to stop the server"
echo ""

# Check if Python 3 is available
if command -v python3 &> /dev/null; then
    python3 -m http.server $PORT
elif command -v python &> /dev/null; then
    python -m SimpleHTTPServer $PORT
else
    echo "❌ Error: Python is not installed"
    echo "Please install Python or use an alternative method (see README.md)"
    exit 1
fi

