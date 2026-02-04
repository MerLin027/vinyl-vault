#!/bin/bash
export CI=false
chmod +x node_modules/.bin/* 2>/dev/null || true
npx react-scripts build
