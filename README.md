# Ravensound Radio Landing Page

A clean, modern, responsive landing page for Ravensound Radio with a grid-based layout inspired by VOGAS Radio design.

## Project Structure

- `index.html` - Main HTML document
- `style.css` - CSS styling for the landing page
- `script.js` - JavaScript functionality
- `logo-black-horizontal.png` - Ravensound Radio logo

## Features

- Responsive design that works on mobile, tablet, and desktop
- Clean, modern grid layout with split-screen hero section
- Navigation menu with Podcast, Music, News, Blog, and Channels links
- Search functionality (placeholder)
- Live Now button for stream activation
- Three feature icons with descriptions
- Footer with tune-in information
- Mobile-friendly navigation

## Customization Guide

### Replacing Content

1. **Logo**: Replace `logo-black-horizontal.png` with your final logo if needed.
2. **Text**: Update all placeholder text in the HTML file.
3. **Stream Player**: Replace the player placeholder div with your actual streaming code.
4. **DJ Image**: Add your DJ image to the `.dj-image-container` div.

### Styling

- **Colors**: Edit the CSS variables at the top of `style.css` to change the color scheme.
- **Fonts**: The site uses Helvetica Bold for headings and Helvetica Light for body text. If you need to use different fonts, update the `@font-face` declarations.
- **Spacing**: Adjust padding and margin values in `style.css` as needed.

### Adding Your Stream

To add your actual radio stream:
1. Replace the placeholder in the `.player-placeholder` div with your streaming code.
2. Update the `audioPlayerSetup()` function in `script.js` with your actual audio implementation.

## Browser Compatibility

This template is designed to work in all modern browsers including:
- Chrome
- Firefox
- Safari
- Edge

## Next Steps

1. Connect your actual audio stream
2. Add your final content and images
3. Set up analytics
4. Link to your social media accounts
5. Deploy to your web hosting

## License

This template is provided for your personal use.
