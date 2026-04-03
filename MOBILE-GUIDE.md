# Logic Gate Simulator - Mobile Guide

## Mobile Features

### Responsive Design
- **Tablet (768px - 1024px)**: Narrower sidebars, optimized spacing
- **Mobile (<768px)**: Stacked layout with horizontal gate palette

### Touch Support
- ✓ Touch to toggle INPUT gates
- ✓ Touch and drag to move gates
- ✓ Touch pins to create wires
- ✓ Touch wires to delete them
- ✓ Pinch to zoom (browser native)
- ✓ Larger touch targets on mobile (14px pins vs 10px)

### Mobile Layout

#### Portrait Mode (Recommended)
```
┌─────────────────────┐
│     Toolbar         │
├─────────────────────┤
│  Gate Palette →→→   │ (Horizontal scroll)
├─────────────────────┤
│                     │
│   Canvas Area       │
│   (Main workspace)  │
│                     │
├─────────────────────┤
│   Truth Table       │ (Collapsible)
├─────────────────────┤
│   Status Bar        │
└─────────────────────┘
```

#### Landscape Mode
```
┌──────────────────────────────────┐
│         Toolbar                  │
├──────────────────────────────────┤
│ Palette → │  Canvas  │  Truth   │
│    →→→    │          │  Table   │
└──────────────────────────────────┘
```

## Mobile Usage Instructions

### 1. Adding Gates
1. Scroll horizontally through the gate palette at the top
2. Tap and hold a gate chip
3. Drag it onto the canvas
4. Release to place (snaps to grid)

### 2. Toggling Inputs
- Simply tap an INPUT gate to toggle between 0 and 1
- The value changes immediately
- Circuit updates in real-time

### 3. Moving Gates
1. Touch and hold a gate (not on a pin)
2. Drag to new position
3. Release to place
4. Wires update automatically

### 4. Creating Wires
1. Tap the output pin (right side) of a gate
2. A dashed preview line appears
3. Tap the input pin (left side) of another gate
4. Wire is created and signal flows

### 5. Deleting Wires
1. Tap on a wire
2. Confirm deletion in the dialog
3. Wire is removed

### 6. Deleting Gates
- Not available on mobile (no keyboard)
- Use "Clear" button to reset entire circuit

### 7. Truth Table
- Scroll vertically to see all rows
- Tap "Generate Full Table" to see all combinations
- Active row highlights automatically
- Tap "Clear Table" to reset

### 8. Saving/Loading
- Tap "Save" to store circuit in browser
- Tap "Load" to restore saved circuit
- Tap "Export" to download JSON file
- Works across sessions

## Mobile Tips

### Performance
- Keep circuits under 15 gates for smooth performance
- Close other browser tabs for better performance
- Use landscape mode for more workspace

### Best Practices
1. **Start Simple**: Begin with 2-3 gates
2. **Use Zoom**: Pinch to zoom for precise wire connections
3. **Landscape Mode**: Better for complex circuits
4. **Save Often**: Use Save button frequently
5. **Test Incrementally**: Test each gate as you add it

### Gestures
- **Single Tap**: Toggle INPUT, select gate, tap pin
- **Tap & Hold**: Start dragging gate
- **Tap Wire**: Delete wire
- **Pinch**: Zoom in/out (browser native)
- **Two-Finger Drag**: Pan canvas (browser native)

### Common Issues

#### Pins Too Small?
- Pins are 14px on mobile (larger than desktop)
- Zoom in for easier targeting
- Use landscape mode for more space

#### Can't Drag Gates?
- Make sure you're not tapping a pin
- Tap and hold the gate body
- INPUT gates are not draggable (tap to toggle only)

#### Wires Not Connecting?
- Tap output pin first (right side)
- Then tap input pin (left side)
- Make sure you see the dashed preview line

#### Circuit Not Updating?
- Check browser console for errors (if available)
- Try refreshing the page
- Check if all wires are connected properly

## Mobile Browser Compatibility

### Tested Browsers
- ✓ Chrome Mobile (Android)
- ✓ Safari (iOS)
- ✓ Firefox Mobile
- ✓ Samsung Internet
- ✓ Edge Mobile

### Requirements
- Modern browser (2020+)
- JavaScript enabled
- Touch screen device
- Minimum 360px width

## Tablet Optimization

### iPad / Android Tablets
- Best experience in landscape mode
- Full desktop-like interface
- Larger touch targets
- More workspace
- Can handle complex circuits (20+ gates)

### Recommended Tablets
- iPad (9.7" or larger)
- Android tablets (10" or larger)
- Surface tablets

## Offline Support
- Works completely offline after first load
- No internet connection required
- All data stored locally
- Export circuits as JSON for backup

## Accessibility on Mobile

### Touch Targets
- All buttons: 44px minimum (Apple guidelines)
- Pins: 14px on mobile
- Gates: 70px minimum

### Visual Feedback
- Clear hover/active states
- Color-coded signals (blue=1, red=0)
- Animated wires for HIGH signals
- Status bar shows live values

### Text Sizing
- Responsive font sizes
- Readable at default zoom
- No horizontal scrolling needed

## Advanced Mobile Features

### Landscape Orientation Lock
- Recommended for complex circuits
- More horizontal space
- Better for wire routing

### Full Screen Mode
- Use browser's full screen option
- More workspace
- Immersive experience

### Share Circuits
1. Tap "Export" button
2. Save JSON file
3. Share via email/messaging
4. Recipient can import and edit

## Troubleshooting

### App Not Loading?
1. Check internet connection (first load only)
2. Clear browser cache
3. Try different browser
4. Check JavaScript is enabled

### Touch Not Working?
1. Refresh the page
2. Check for browser updates
3. Try in private/incognito mode
4. Restart browser

### Performance Issues?
1. Close other tabs
2. Reduce number of gates
3. Clear browser cache
4. Restart device

### Can't Save Circuits?
1. Check browser storage permissions
2. Clear old data
3. Try Export instead
4. Check available storage space

## Future Mobile Enhancements
- [ ] Gesture-based gate deletion
- [ ] Multi-touch gate selection
- [ ] Undo/redo support
- [ ] Circuit templates
- [ ] Tutorial mode
- [ ] Dark/light theme toggle

## Feedback
For mobile-specific issues or suggestions, please note:
- Device model
- Browser version
- Screen size
- Specific issue description
