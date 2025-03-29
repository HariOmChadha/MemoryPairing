# Memory Pair-Association Game

Memory Pairing is a React-based web app to test memory and pair association skills by matching card pairs in two rounds: one without music and one with music (order randomized). It collects user data and submits results to a Google Sheet. Deployed on GitHub Pages. The data collected here is used for the ECE286 course project to look for any correlation (of the lack of) in memory and listening to music.

## Features
- Two rounds: One without music, one with music (randomized order).
- 2-second delay for music rounds to allow playback.
- Collects user data (first name, last name, demographics).
- Submits results to a Google Sheet via Google Apps Script.
- Polished UI with blue/green theme.
- Hosted on GitHub Pages: [https://hariomchadha.github.io/MemoryParing/](https://hariomchadha.github.io/MemoryParing/)

## Usage
1. Enter your details on the main page and click "Start Game".
2. Play Round 1 (randomly with or without music; 2-second delay if with music).
3. Click "Next" to play Round 2 (opposite of Round 1).
4. View results; they’re auto-submitted to the Google Sheet for analysis.

## Tech Stack
- React, JavaScript, CSS
- Google Apps Script (backend)
- GitHub Pages (hosting)
- YouTube Iframe API (music)
