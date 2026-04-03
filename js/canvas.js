class CanvasController {
    constructor() {
        this.gates = [];
        this.wires = [];
        this.selectedGate = null;
        this.isDragging = false;
        this.dragOffset = { x: 0, y: 0 };
        this.wireStart = null;
        this.wirePreview = null;
        this.gateIdCounter = 0;
        this.wireIdCounter = 0;
        
        this.canvasContainer = document.getElementById('canvas-container');
        this.gatesLayer = document.getElementById('gates-layer');
        this.svgLayer = document.getElementById('svg-layer');
        
        this.setupEventListeners();
    }
    
    setupEventListeners() {
        this.canvasContainer.addEventListener('dragover', (e) => {
            e.preventDefault();
        });
        
        this.canvasContainer.addEventListener('drop', (e) => {
            e.preventDefault();
            const gateType = e.dataTransfer.getData('gate-type');
            if (gateType) {
                const rect = this.canvasContainer.getBoundingClientRect();
                const x = Math.round((e.clientX - rect.left) / 20) * 20;
                const y = Math.round((e.clientY - rect.top) / 20) * 20;
                this.addGate(gateType, x, y);
            }
        });
        
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Delete' && this.selectedGate) {
                this.deleteGate(this.selectedGate);
            }
        });
        
        const paletteChips = document.querySelectorAll('.palette-chip');
        paletteChips.forEach(chip => {
            chip.addEventListener('dragstart', (e) => {
                e.dataTransfer.setData('gate-type', chip.dataset.gateType);
            });
        });
    }
    
    addGate(type, x, y, numInputs = null) {
        const gate = new Gate(this.gateIdCounter++, type, x, y, numInputs);
        this.gates.push(gate);
        
        const element = gate.render();
        this.gatesLayer.appendChild(element);
        
        element.addEventListener('mousedown', (e) => {
            if (e.target.classList.contains('pin')) {
                this.handlePinClick(gate, e.target);
            } else if (type !== 'INPUT') {
                this.startDragging(gate, e);
            }
        });
        
        element.addEventListener('touchstart', (e) => {
            if (e.target.classList.contains('pin')) {
                e.preventDefault();
                this.handlePinClick(gate, e.target);
            } else if (type !== 'INPUT') {
                e.preventDefault();
                this.startDragging(gate, e);
            }
        }, { passive: false });
        
        if (type !== 'INPUT') {
            element.addEventListener('click', (e) => {
                if (!e.target.classList.contains('pin')) {
                    this.selectGate(gate);
                }
            });
        }
        
        this.propagateSignals();
        return gate;
    }
    
    startDragging(gate, e) {
        if (e.target.classList.contains('pin')) return;
        
        this.isDragging = true;
        this.selectedGate = gate;
        this.selectGate(gate);
        
        const clientX = e.touches ? e.touches[0].clientX : e.clientX;
        const clientY = e.touches ? e.touches[0].clientY : e.clientY;
        
        const rect = gate.element.getBoundingClientRect();
        const containerRect = this.canvasContainer.getBoundingClientRect();
        this.dragOffset = {
            x: clientX - rect.left,
            y: clientY - rect.top
        };
        
        const onMove = (e) => {
            if (!this.isDragging) return;
            e.preventDefault();
            
            const moveX = e.touches ? e.touches[0].clientX : e.clientX;
            const moveY = e.touches ? e.touches[0].clientY : e.clientY;
            
            const x = Math.round((moveX - containerRect.left - this.dragOffset.x) / 20) * 20;
            const y = Math.round((moveY - containerRect.top - this.dragOffset.y) / 20) * 20;
            
            gate.x = x;
            gate.y = y;
            gate.element.style.left = x + 'px';
            gate.element.style.top = y + 'px';
            
            this.updateWires();
        };
        
        const onEnd = () => {
            this.isDragging = false;
            document.removeEventListener('mousemove', onMove);
            document.removeEventListener('mouseup', onEnd);
            document.removeEventListener('touchmove', onMove);
            document.removeEventListener('touchend', onEnd);
        };
        
        document.addEventListener('mousemove', onMove);
        document.addEventListener('mouseup', onEnd);
        document.addEventListener('touchmove', onMove, { passive: false });
        document.addEventListener('touchend', onEnd);
    }
    
    handlePinClick(gate, pinElement) {
        const isInputPin = pinElement.classList.contains('input-pin');
        
        if (!this.wireStart) {
            if (!isInputPin) {
                this.wireStart = {
                    gate: gate,
                    pin: 0,
                    element: pinElement
                };
                this.startWirePreview();
            }
        } else {
            if (isInputPin && gate !== this.wireStart.gate) {
                const pinIndex = parseInt(pinElement.dataset.pinIndex);
                this.addWire(this.wireStart.gate, 0, gate, pinIndex);
                this.wireStart = null;
                this.stopWirePreview();
            } else {
                this.wireStart = null;
                this.stopWirePreview();
            }
        }
    }
    
    startWirePreview() {
        const onMove = (e) => {
            if (!this.wireStart) return;
            e.preventDefault();
            
            const clientX = e.touches ? e.touches[0].clientX : e.clientX;
            const clientY = e.touches ? e.touches[0].clientY : e.clientY;
            
            const rect = this.canvasContainer.getBoundingClientRect();
            const startPos = this.wireStart.gate.getPinPosition(0, false);
            const endX = clientX - rect.left;
            const endY = clientY - rect.top;
            
            if (!this.wirePreview) {
                this.wirePreview = document.createElementNS('http://www.w3.org/2000/svg', 'path');
                this.wirePreview.setAttribute('class', 'wire-preview');
                this.svgLayer.appendChild(this.wirePreview);
            }
            
            const dx = endX - startPos.x;
            const controlOffset = Math.min(Math.abs(dx) * 0.5, 80);
            const path = `M ${startPos.x} ${startPos.y} C ${startPos.x + controlOffset} ${startPos.y}, ${endX - controlOffset} ${endY}, ${endX} ${endY}`;
            this.wirePreview.setAttribute('d', path);
        };
        
        document.addEventListener('mousemove', onMove);
        document.addEventListener('touchmove', onMove, { passive: false });
        this.wirePreviewListener = onMove;
    }
    
    stopWirePreview() {
        if (this.wirePreview) {
            this.wirePreview.remove();
            this.wirePreview = null;
        }
        if (this.wirePreviewListener) {
            document.removeEventListener('mousemove', this.wirePreviewListener);
            document.removeEventListener('touchmove', this.wirePreviewListener);
            this.wirePreviewListener = null;
        }
    }
    
    addWire(fromGate, fromPin, toGate, toPin) {
        const existingWire = this.wires.find(w => 
            w.fromGate === fromGate && w.fromPin === fromPin && 
            w.toGate === toGate && w.toPin === toPin
        );
        if (existingWire) {
            return existingWire;
        }
        
        const wire = new Wire(this.wireIdCounter++, fromGate, fromPin, toGate, toPin);
        this.wires.push(wire);
        
        const pathElement = wire.render();
        this.svgLayer.appendChild(pathElement);
        
        pathElement.addEventListener('click', () => {
            if (confirm('Delete this wire?')) {
                this.deleteWire(wire);
            }
        });
        
        this.propagateSignals();
        return wire;
    }
    
    deleteWire(wire) {
        const index = this.wires.indexOf(wire);
        if (index > -1) {
            this.wires.splice(index, 1);
            if (wire.pathElement) {
                wire.pathElement.remove();
            }
            this.propagateSignals();
        }
    }
    
    deleteGate(gate) {
        const connectedWires = this.wires.filter(w => 
            w.fromGate === gate || w.toGate === gate
        );
        connectedWires.forEach(wire => this.deleteWire(wire));
        
        const index = this.gates.indexOf(gate);
        if (index > -1) {
            this.gates.splice(index, 1);
            if (gate.element) {
                gate.element.remove();
            }
        }
        
        if (this.selectedGate === gate) {
            this.selectedGate = null;
        }
        
        this.propagateSignals();
    }
    
    selectGate(gate) {
        if (this.selectedGate) {
            this.selectedGate.element.classList.remove('selected');
        }
        this.selectedGate = gate;
        gate.element.classList.add('selected');
    }
    
    updateWires() {
        this.wires.forEach(wire => wire.updatePath());
    }
    
    propagateSignals() {
        propagate(this.gates, this.wires);
        this.updateStatusBar();
        logCurrentState(this.gates);
    }
    
    updateStatusBar() {
        const statusOutputs = document.getElementById('status-outputs');
        const outputGates = this.gates.filter(g => g.type === 'OUTPUT');
        
        statusOutputs.innerHTML = outputGates.map(gate => {
            const label = gate.element.querySelector('.gate-label').textContent;
            const value = gate.output;
            const color = value === 1 ? 'var(--high)' : 'var(--low)';
            return `<span style="color: ${color}">${label} = ${value}</span>`;
        }).join('');
    }
    
    clear() {
        this.gates.forEach(gate => {
            if (gate.element) gate.element.remove();
        });
        this.wires.forEach(wire => {
            if (wire.pathElement) wire.pathElement.remove();
        });
        this.gates = [];
        this.wires = [];
        this.selectedGate = null;
        this.gateIdCounter = 0;
        this.wireIdCounter = 0;
        clearTable();
        this.updateStatusBar();
    }
    
    loadFromData(data) {
        this.clear();
        
        const gateMap = new Map();
        
        data.gates.forEach(gData => {
            const gate = this.addGate(gData.type, gData.x, gData.y, gData.numInputs);
            gate.id = gData.id;
            gate.value = gData.value || 0;
            gate.inputs = gData.inputs || gate.inputs;
            gate.output = gData.output || 0;
            gateMap.set(gData.id, gate);
            
            if (gData.id >= this.gateIdCounter) {
                this.gateIdCounter = gData.id + 1;
            }
        });
        
        data.wires.forEach(wData => {
            const fromGate = gateMap.get(wData.fromGateId);
            const toGate = gateMap.get(wData.toGateId);
            if (fromGate && toGate) {
                this.addWire(fromGate, wData.fromPin, toGate, wData.toPin);
            }
        });
        
        this.propagateSignals();
    }
}
