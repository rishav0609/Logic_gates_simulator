# Logic Gate Simulator - Test Checklist

## Automated Tests
✓ Open `test-suite.html` in browser - All gate logic tests should pass

## Manual Testing Checklist

### 1. Basic Gate Operations
- [ ] Open `index.html` in browser
- [ ] Verify starter circuit loads (2 INPUTs → AND → OUTPUT)
- [ ] Click INPUT gates to toggle between 0 and 1
- [ ] Verify OUTPUT updates correctly:
  - INPUT A=0, B=0 → OUTPUT=0
  - INPUT A=1, B=0 → OUTPUT=0
  - INPUT A=0, B=1 → OUTPUT=0
  - INPUT A=1, B=1 → OUTPUT=1

### 2. Drag and Drop
- [ ] Drag INPUT gate from palette to canvas
- [ ] Drag AND gate from palette to canvas
- [ ] Drag OR gate from palette to canvas
- [ ] Drag NOT gate from palette to canvas
- [ ] Drag NAND gate from palette to canvas
- [ ] Drag NOR gate from palette to canvas
- [ ] Drag XOR gate from palette to canvas
- [ ] Drag XNOR gate from palette to canvas
- [ ] Drag OUTPUT gate from palette to canvas
- [ ] Verify gates snap to 20px grid

### 3. Wire Connections
- [ ] Click output pin of INPUT gate
- [ ] Verify dashed preview line follows cursor
- [ ] Click input pin of AND gate
- [ ] Verify wire is created
- [ ] Verify wire color changes based on signal (red=0, blue=1)
- [ ] Verify wire animates when signal is HIGH
- [ ] Connect multiple wires to same input pin
- [ ] Verify multiple inputs work (OR behavior)

### 4. Gate Movement
- [ ] Click and drag a gate
- [ ] Verify gate moves with cursor
- [ ] Verify wires update in real-time
- [ ] Verify gate snaps to grid on release

### 5. Gate Selection & Deletion
- [ ] Click on a gate (not INPUT)
- [ ] Verify gate border highlights
- [ ] Press Delete key
- [ ] Verify gate and connected wires are removed

### 6. All Gate Types Testing

#### AND Gate
- [ ] Create: INPUT A → AND ← INPUT B → OUTPUT
- [ ] Test: 0,0→0 | 0,1→0 | 1,0→0 | 1,1→1

#### OR Gate
- [ ] Create: INPUT A → OR ← INPUT B → OUTPUT
- [ ] Test: 0,0→0 | 0,1→1 | 1,0→1 | 1,1→1

#### NOT Gate
- [ ] Create: INPUT → NOT → OUTPUT
- [ ] Test: 0→1 | 1→0

#### NAND Gate
- [ ] Create: INPUT A → NAND ← INPUT B → OUTPUT
- [ ] Test: 0,0→1 | 0,1→1 | 1,0→1 | 1,1→0

#### NOR Gate
- [ ] Create: INPUT A → NOR ← INPUT B → OUTPUT
- [ ] Test: 0,0→1 | 0,1→0 | 1,0→0 | 1,1→0

#### XOR Gate
- [ ] Create: INPUT A → XOR ← INPUT B → OUTPUT
- [ ] Test: 0,0→0 | 0,1→1 | 1,0→1 | 1,1→0

#### XNOR Gate
- [ ] Create: INPUT A → XNOR ← INPUT B → OUTPUT
- [ ] Test: 0,0→1 | 0,1→0 | 1,0→0 | 1,1→1

### 7. Truth Table
- [ ] Click "Generate Full Table" button
- [ ] Verify table shows all input combinations
- [ ] Verify output values are correct
- [ ] Toggle INPUT gates
- [ ] Verify active row highlights in table
- [ ] Click "Clear Table" button
- [ ] Verify table empties

### 8. Save/Load/Export
- [ ] Build a custom circuit
- [ ] Click "Save" button
- [ ] Verify success message
- [ ] Click "Clear" button
- [ ] Confirm clear
- [ ] Click "Load" button
- [ ] Verify circuit restores correctly
- [ ] Click "Export" button
- [ ] Verify JSON file downloads

### 9. Status Bar
- [ ] Create circuit with OUTPUT gates
- [ ] Verify status bar shows output values
- [ ] Toggle inputs
- [ ] Verify status bar updates in real-time
- [ ] Verify colors: blue=1, red=0

### 10. Wire Deletion
- [ ] Click on a wire
- [ ] Confirm deletion dialog
- [ ] Verify wire is removed
- [ ] Verify circuit updates correctly

### 11. Multiple Wires to Same Pin
- [ ] Connect INPUT A to AND pin 0
- [ ] Connect INPUT B to AND pin 0 (same pin)
- [ ] Toggle A to 1, B to 0
- [ ] Verify pin receives 1 (OR behavior)
- [ ] Toggle A to 0, B to 1
- [ ] Verify pin receives 1
- [ ] Toggle both to 0
- [ ] Verify pin receives 0

### 12. Complex Circuits
- [ ] Build half-adder: A XOR B = Sum, A AND B = Carry
- [ ] Test all combinations
- [ ] Build full-adder with multiple gates
- [ ] Verify correct operation

### 13. Browser Console
- [ ] Open browser console (F12)
- [ ] Toggle INPUT gates
- [ ] Verify propagation logs appear
- [ ] Verify no errors in console

### 14. Visual Design
- [ ] Verify professional blue color scheme
- [ ] Verify clean typography
- [ ] Verify smooth animations
- [ ] Verify hover effects on buttons
- [ ] Verify hover effects on gates
- [ ] Verify hover effects on pins
- [ ] Verify dot grid background

### 15. Edge Cases
- [ ] Create gate with no connections
- [ ] Verify no errors
- [ ] Create wire loop (cycle)
- [ ] Verify cycle warning appears
- [ ] Delete gate with many wires
- [ ] Verify all wires removed

## Performance Tests
- [ ] Create 20+ gates
- [ ] Verify smooth operation
- [ ] Toggle inputs rapidly
- [ ] Verify no lag

## Browser Compatibility
- [ ] Test in Chrome
- [ ] Test in Firefox
- [ ] Test in Edge
- [ ] Test in Safari (if available)

## Expected Results
✓ All gate logic correct
✓ Smooth drag and drop
✓ Real-time wire updates
✓ Accurate truth tables
✓ Save/load works
✓ Professional appearance
✓ No console errors
✓ Responsive UI

## Known Limitations
- INPUT gates are clickable to toggle (not draggable)
- Maximum one wire per output pin (can connect to multiple inputs)
- Grid snap is 20px
- No undo/redo functionality
