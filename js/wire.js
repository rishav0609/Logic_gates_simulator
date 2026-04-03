class Wire {
    constructor(id, fromGate, fromPin, toGate, toPin) {
        this.id = id;
        this.fromGate = fromGate;
        this.fromPin = fromPin;
        this.toGate = toGate;
        this.toPin = toPin;
        this.signal = 0;
        this.pathElement = null;
    }
    
    render() {
        const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
        path.setAttribute('class', 'wire low');
        path.dataset.wireId = this.id;
        path.setAttribute('d', this.getPath());
        this.pathElement = path;
        this.updateSignal(this.signal);
        return path;
    }
    
    getPath() {
        const start = this.fromGate.getPinPosition(this.fromPin, false);
        const end = this.toGate.getPinPosition(this.toPin, true);
        
        const dx = end.x - start.x;
        const controlOffset = Math.min(Math.abs(dx) * 0.5, 80);
        
        const cp1x = start.x + controlOffset;
        const cp1y = start.y;
        const cp2x = end.x - controlOffset;
        const cp2y = end.y;
        
        return `M ${start.x} ${start.y} C ${cp1x} ${cp1y}, ${cp2x} ${cp2y}, ${end.x} ${end.y}`;
    }
    
    updatePath() {
        if (this.pathElement) {
            this.pathElement.setAttribute('d', this.getPath());
        }
    }
    
    updateSignal(value) {
        this.signal = value;
        if (!this.pathElement) return;
        
        this.pathElement.classList.remove('high', 'low', 'animated');
        
        if (value === 1) {
            this.pathElement.classList.add('high', 'animated');
        } else {
            this.pathElement.classList.add('low');
        }
    }
}
