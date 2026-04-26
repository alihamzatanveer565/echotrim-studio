# EchoTrim Studio - Web Audio Cleaner

A web application that automatically removes silence from audio files and makes them ready for production.  
**No downloads required - everything runs directly in your browser.**

## Live Demo

**Try it now:** [https://echotrim-studio.vercel.app/](https://echotrim-studio.vercel.app/)

## Features

- 🎵 **Smart Silence Detection**: Automatically detects and removes silence based on threshold and duration
- 📁 **Batch Processing**: Process multiple audio files at once (up to 8)
- 🔀 **File Reordering**: Reorder selected files before processing
- 🎚️ **Configurable Threshold**: Adjustable silence detection sensitivity
- ⏱️ **Duration Control**: Set minimum silence duration
- 🔒 **Privacy First**: All processing happens in your browser
- 🎯 **High Quality**: Uses FFmpeg.wasm for professional-grade audio processing
- 📱 **Responsive UI**: Works on desktop and mobile

## How To Use

1. Visit [https://echotrim-studio.vercel.app/](https://echotrim-studio.vercel.app/)
2. Upload audio files by drag-and-drop or file picker
3. Adjust silence threshold and minimum duration
4. Click **Process Audio Files**
5. Download your cleaned output file

## Supported Formats

- **Input**: MP3, WAV, M4A, OGG
- **Output**: WAV

## How It Works

The app uses:

1. **FFmpeg.wasm** for in-browser audio processing
2. **Silence detection filters** to locate removable sections
3. **Client-side processing** so your files never leave your device

## Tech Stack

- **Frontend**: React + Vite
- **Styling**: Tailwind CSS
- **Animations**: Framer Motion
- **Audio Processing**: FFmpeg.wasm
- **Deployment**: Vercel

## Local Development

1. Install dependencies:

   ```bash
   npm install
   ```

2. Start development server:

   ```bash
   npm run dev
   ```

3. Open in browser: [http://localhost:5173](http://localhost:5173)

## Production Build

```bash
npm run build
npm run preview
```

## Browser Compatibility

- ✅ Chrome 80+
- ✅ Firefox 75+
- ✅ Safari 13+
- ✅ Edge 80+

## Privacy & Security

- **No server processing**: Audio processing is fully client-side
- **No data upload**: Your files stay on your device
- **No tracking by default**: No analytics required for core functionality
- **Open source**: Transparent and auditable

## Use Cases

- 🎙️ Podcasters: Remove dead air from episodes
- 🎵 Musicians: Clean raw recordings quickly
- 🎬 Content creators: Prepare voice/audio tracks for editing
- 📚 Educators: Clean lecture recordings
- 🎧 Audio editors: Quick preprocessing workflow

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m "Add amazing feature"`)
4. Push to your branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- [FFmpeg](https://ffmpeg.org/)
- [FFmpeg.wasm](https://github.com/ffmpegwasm/ffmpeg.wasm)
- [WebAssembly](https://webassembly.org/)
