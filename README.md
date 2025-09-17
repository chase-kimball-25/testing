# Field Audit Tool

A mobile-optimized web application for conducting field audits with step-by-step interview processes, document verification, and progress tracking.

> **🚀 No Server Required!** This app runs directly from your computer - just double-click `index.html` to start testing.

## Features

- **Mobile-First Design**: Optimized for smartphones and tablets
- **Progressive Web App**: Works offline and can be installed on devices
- **Step-by-Step Interface**: Guided workflow for audit processes
- **Photo Capture**: Camera integration for document photography
- **Auto-Save**: Automatic progress saving every 5 seconds
- **Permission Management**: Handles device permissions for camera, microphone, and location
- **Multi-Step Forms**: Complex conditional logic for different audit scenarios

## Audit Modules

### 1. Office Interview Paper Audit
- Paper collection form verification
- Authorization form checking
- QCP checklist validation
- Photo documentation
- 10 individual interviews with progress tracking

### 2. Management Team Interviews (Planned)
- Manager role identification
- Audio recordings with quality control
- Rating system for manager understanding
- Multiple interview types

### 3. Field Interview Audit (Planned)
- In-person interviewee verification
- Signature validation
- Family booklet comparison
- Photo documentation requirements

### 4. Live Interview Observation (Planned)
- Real-time interview monitoring
- Quality control process verification
- Document collection verification

### 5. Unfinished Interview Check (Planned)
- Phone-based interview verification
- Progress tracking for incomplete interviews

## Technology Stack

- **HTML5**: Semantic markup with accessibility features
- **CSS3**: Modern styling with Flexbox and Grid
- **Vanilla JavaScript**: No framework dependencies
- **Progressive Web App**: Service Worker for offline functionality
- **Responsive Design**: Mobile-first approach with desktop compatibility

## Getting Started

### Prerequisites

- Modern web browser (Chrome, Firefox, Safari, Edge)
- **No server required** - runs directly from files

### Installation

1. **Download or clone** the project files to your local machine

2. **Open the app**:
   
   **Option A: Direct File Opening (Simplest)**
   - Double-click on `index.html` to open it in your default browser
   - Or right-click `index.html` → "Open with" → Choose your browser

   **Option B: Drag and Drop**
   - Drag the `index.html` file into any open browser window

### Mobile Testing

**For testing on mobile devices:**

1. **Email the files** to yourself and download on mobile
2. **Use cloud storage** (Google Drive, Dropbox, etc.):
   - Upload the files to your cloud storage
   - Access from mobile browser and open `index.html`
3. **Use a file manager app** on mobile to open the HTML file

### Installing as PWA

**Note:** PWA features (offline functionality, installation) require HTTPS, so they won't work when opening files directly. The app will still function fully as a web page.

## Usage

### Quick Start
1. **Double-click `index.html`** to open the app
2. **Grant permissions** when prompted (Allow for photos, audio, location)
3. **Navigate through the interface** using the task list
4. **Test the Office Interview Paper Audit** - it's fully functional

### Navigation
- The app starts at the **Permissions screen** (no login required)
- Follow the permission flow to reach the main **Work Order** screen
- Click **"Office Interview Paper Audit"** to test the full interview process
- Use back buttons and navigation to move between screens

### Office Interview Paper Audit Testing
1. Select an interview from the list (Interview 1 is pre-completed)
2. Go through the 4-step process for each interview:
   - **Step 1**: Paper Collection Form verification
   - **Step 2**: Authorization Form checking  
   - **Step 3**: QCP Checklist validation
   - **Step 4**: Additional Information (optional)
3. Answer Yes/No questions and see conditional content
4. Click photo upload areas to simulate taking pictures
5. Navigate between steps using Previous/Next buttons
6. Complete interviews to see progress tracking

## File Structure

```
FAT 3/
├── index.html          # Main HTML file with all screens
├── styles.css          # CSS styles for mobile-optimized design
├── script.js           # JavaScript for app functionality
├── sw.js              # Service Worker for PWA features (to be added)
├── manifest.json      # Web App Manifest (to be added)
└── README.md          # This file
```

## Browser Compatibility

- **Chrome 60+** (recommended)
- **Firefox 55+**
- **Safari 11+**
- **Edge 79+**

## Development Notes

- The app uses modern JavaScript features (ES6+)
- CSS uses Flexbox and Grid for responsive layouts
- No external dependencies or frameworks
- Designed for touch interfaces
- Implements proper focus management for accessibility

## Future Enhancements

- Complete implementation of all audit modules
- Real backend integration
- Enhanced offline capabilities
- Push notifications for reminders
- Advanced photo editing tools
- Data export functionality
- Multi-language support

## Troubleshooting

### App Not Loading
- Make sure you're opening `index.html` in a modern browser
- Try a different browser (Chrome, Firefox, Safari, Edge)
- Check that all files are in the same folder

### Camera/Photo Features Not Working
- **This is normal when opening files directly**
- Camera access requires HTTPS (secure connection)
- The photo upload simulation will still work for demo purposes
- Click photo areas to see "Image captured" confirmation

### Mobile Testing Issues
- Try opening the files through a cloud storage service
- Some mobile browsers may block local file access
- Use Chrome or Safari on mobile for best compatibility

### Permission Prompts Not Appearing
- **This is expected when running from files**
- The permission screens are for demo/testing purposes
- Click through the permission flow to reach the main app

### JavaScript Errors
- Open browser developer tools (F12) to check for errors
- Make sure all files are in the same directory
- Ensure no browser extensions are blocking the script

## Contributing

This is a demonstration project based on specific audit requirements. For production use, additional security, validation, and backend integration would be required.

## License

This project is created for demonstration purposes. Please ensure compliance with relevant data protection and privacy laws when handling audit data.
