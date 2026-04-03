# Mobile Testing Checklist

## Quick Start Testing

### Option 1: Mobile Simulator (Desktop)
1. Open `mobile-simulator.html` in your browser
2. Test different device sizes
3. Use mouse to simulate touch
4. Check responsive layout

### Option 2: Browser Dev Tools
1. Open `index.html` in Chrome/Firefox
2. Press F12 to open DevTools
3. Click device toolbar icon (Ctrl+Shift+M)
4. Select device (iPhone, iPad, etc.)
5. Test touch interactions

### Option 3: Real Device
1. Host files on local server or deploy
2. Open on actual mobile device
3. Test real touch interactions
4. Check performance

### Option 4: Compatibility Test
1. Open `mobile-test.html` on mobile device
2. Review automated test results
3. Touch the test area to verify events
4. Check compatibility score

## Mobile Testing Checklist

### Layout Tests (All Devices)

#### Portrait Mode (<768px)
- [ ] Gate palette displays horizontally at top
- [ ] Palette scrolls left/right smoothly
- [ ] Canvas takes up main area
- [ ] Truth table appears at bottom
- [ ] Status bar visible at bottom
- [ ] No horizontal page scroll
- [ ] All content fits in viewport

#### Landscape Mode (<768px)
- [ ] Layout adjusts appropriately
- [ ] More horizontal space for canvas
- [ ] Palette still accessible
- [ ] Truth table visible

#### Tablet (768px-1024px)
- [ ] Three-column layout visible
- [ ] Narrower sidebars
- [ ] Full functionality available
- [ ] Comfortable spacing

### Touch Interaction Tests

#### Gate Palette
- [ ] Can scroll palette horizontally
- [ ] Can tap and hold gate chip
- [ ] Can drag gate to canvas
- [ ] Gate snaps to grid on release
- [ ] Visual feedback on touch

#### INPUT Gates
- [ ] Tap INPUT gate toggles value
- [ ] Value changes immediately (0↔1)
- [ ] Visual update is instant
- [ ] No accidental drags

#### Gate Movement
- [ ] Touch and hold gate body
- [ ] Drag gate to new position
- [ ] Wires update in real-time
- [ ] Release snaps to grid
- [ ] No conflicts with pin touches

#### Wire Creation
- [ ] Tap output pin (right side)
- [ ] Dashed preview line appears
- [ ] Preview follows touch
- [ ] Tap input pin (left side)
- [ ] Wire created successfully
- [ ] Signal flows correctly

#### Wire Deletion
- [ ] Tap on wire
- [ ] Confirmation dialog appears
- [ ] Can confirm or cancel
- [ ] Wire removed on confirm

#### Pin Interactions
- [ ] Pins are large enough (14px on mobile)
- [ ] Easy to tap accurately
- [ ] Visual feedback on touch
- [ ] No accidental gate drags

### Button Tests

#### Toolbar Buttons
- [ ] All buttons visible
- [ ] Buttons wrap on small screens
- [ ] Minimum 44px touch target
- [ ] Clear visual feedback
- [ ] Save button works
- [ ] Load button works
- [ ] Export button works
- [ ] Clear button works (with confirm)

#### Truth Table Buttons
- [ ] Generate button works
- [ ] Clear button works
- [ ] Buttons are touch-friendly
- [ ] Proper spacing

### Visual Tests

#### Typography
- [ ] Text is readable at default size
- [ ] No text cutoff
- [ ] Proper line heights
- [ ] Labels are clear

#### Colors & Contrast
- [ ] HIGH signal is blue/visible
- [ ] LOW signal is red/visible
- [ ] Sufficient contrast
- [ ] Status bar readable

#### Animations
- [ ] Wire pulse animation smooth
- [ ] Gate placement animation works
- [ ] Transitions are smooth
- [ ] No janky animations

#### Spacing
- [ ] Adequate touch targets
- [ ] No overlapping elements
- [ ] Comfortable margins
- [ ] Proper padding

### Functionality Tests

#### Circuit Building
- [ ] Can build simple circuit (2 INPUTs → AND → OUTPUT)
- [ ] Can build complex circuit (5+ gates)
- [ ] All gate types work
- [ ] Wires connect properly
- [ ] Signals propagate correctly

#### Truth Table
- [ ] Table generates correctly
- [ ] All combinations shown
- [ ] Active row highlights
- [ ] Scrollable on mobile
- [ ] Values are correct

#### Save/Load
- [ ] Can save circuit
- [ ] Can load circuit
- [ ] Circuit restores correctly
- [ ] Works across sessions

#### Export
- [ ] Export downloads JSON
- [ ] File is valid
- [ ] Can be imported later

### Performance Tests

#### Responsiveness
- [ ] UI responds immediately to touch
- [ ] No lag when dragging
- [ ] Smooth scrolling
- [ ] Quick gate placement

#### Circuit Size
- [ ] 5 gates: smooth
- [ ] 10 gates: smooth
- [ ] 15 gates: acceptable
- [ ] 20+ gates: test limits

#### Memory
- [ ] No memory leaks
- [ ] App doesn't crash
- [ ] Stable over time

### Browser Compatibility

#### iOS Safari
- [ ] Layout correct
- [ ] Touch works
- [ ] Animations smooth
- [ ] No visual bugs

#### Chrome Mobile (Android)
- [ ] Layout correct
- [ ] Touch works
- [ ] Animations smooth
- [ ] No visual bugs

#### Firefox Mobile
- [ ] Layout correct
- [ ] Touch works
- [ ] Animations smooth
- [ ] No visual bugs

#### Samsung Internet
- [ ] Layout correct
- [ ] Touch works
- [ ] Animations smooth
- [ ] No visual bugs

### Edge Cases

#### Orientation Change
- [ ] Layout adjusts on rotate
- [ ] No content loss
- [ ] Circuit remains intact
- [ ] Smooth transition

#### Zoom
- [ ] Pinch zoom works (browser)
- [ ] Layout stays intact
- [ ] Can zoom in for precision
- [ ] Can zoom out for overview

#### Multitasking
- [ ] App survives background
- [ ] State preserved
- [ ] No data loss

#### Low Memory
- [ ] Graceful degradation
- [ ] No crashes
- [ ] Warning if needed

### Accessibility

#### Touch Targets
- [ ] All buttons ≥44px
- [ ] Pins ≥14px on mobile
- [ ] Adequate spacing
- [ ] No accidental taps

#### Visual Feedback
- [ ] Clear active states
- [ ] Visible focus indicators
- [ ] Color not sole indicator
- [ ] Status updates visible

#### Text
- [ ] Readable font sizes
- [ ] Good contrast ratios
- [ ] No tiny text
- [ ] Scalable

## Test Results Template

```
Device: [iPhone 12 / Samsung Galaxy S21 / iPad / etc.]
Browser: [Safari / Chrome / Firefox]
OS Version: [iOS 15 / Android 12]
Screen Size: [375x812 / 360x740 / etc.]
Date: [YYYY-MM-DD]

Layout: ✓ / ✗
Touch: ✓ / ✗
Performance: ✓ / ✗
Functionality: ✓ / ✗

Issues Found:
1. [Description]
2. [Description]

Notes:
[Additional observations]
```

## Common Issues & Solutions

### Issue: Pins too small to tap
**Solution:** Pins are 14px on mobile. Zoom in if needed.

### Issue: Can't drag gates
**Solution:** Make sure you're touching gate body, not pins.

### Issue: Wires not connecting
**Solution:** Tap output pin first, then input pin.

### Issue: Layout broken
**Solution:** Refresh page, check viewport meta tag.

### Issue: Touch not working
**Solution:** Check browser compatibility, try different browser.

### Issue: Performance slow
**Solution:** Reduce number of gates, close other tabs.

## Automated Testing

Run `mobile-test.html` on device to check:
- Touch event support
- CSS feature support
- Viewport configuration
- Performance metrics
- Browser compatibility

Expected: 90%+ compatibility score

## Manual Testing Priority

1. **Critical** (Must work):
   - Touch to toggle INPUT
   - Drag gates
   - Create wires
   - Basic circuit operation

2. **Important** (Should work):
   - Truth table
   - Save/Load
   - All gate types
   - Wire deletion

3. **Nice to have** (Can have issues):
   - Complex circuits (20+ gates)
   - Advanced features
   - Edge cases

## Sign-off

Tested by: _______________
Date: _______________
Device: _______________
Result: PASS / FAIL
Notes: _______________
