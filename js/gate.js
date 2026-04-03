class Gate {
    constructor(id, type, x, y, numInputs = null) {
        this.id = id;
        this.type = type;
        this.x = x;
        this.y = y;
        this.inputs = [];
        this.output = 0;
        this.element = null;
        this.inputPins = [];
        this.outputPin = null;
        this.value = 0;
        
        const defaultInputCounts = {
            'INPUT': 0, 'OUTPUT': 1, 'NOT': 1,
            'AND': 2, 'OR': 2, 'NAND': 2, 'NOR': 2, 'XOR': 2, 'XNOR': 2
        };
        
        const inputCount = numInputs !== null ? numInputs : (defaultInputCounts[type] || 0);
        for (let i = 0; i < inputCount; i++) {
            this.inputs.push(0);
        }
    }
    
    render() {
        const div = document.createElement('div');
        div.className = 'gate pop-animation';
        div.dataset.gateId = this.id;
        div.style.left = this.x + 'px';
        div.style.top = this.y + 'px';
        
        const gateHeight = Math.max(60, this.inputs.length * 20 + 20);
        div.style.minHeight = gateHeight + 'px';
        
        const svg = this.getSVG();
        div.innerHTML = svg;
        
        const label = document.createElement('div');
        label.className = 'gate-label';
        label.textContent = this.type;
        div.appendChild(label);
        
        if (this.type === 'INPUT') {
            div.classList.add('INPUT');
            div.addEventListener('click', () => {
                this.value = this.value === 0 ? 1 : 0;
                this.updateDisplay();
                if (window.propagateSignals) window.propagateSignals();
            });
        }
        
        if (this.type === 'OUTPUT') {
            div.classList.add('OUTPUT');
        }
        
        for (let i = 0; i < this.inputs.length; i++) {
            const pin = document.createElement('div');
            pin.className = 'pin input-pin';
            pin.dataset.pinIndex = i;
            pin.style.top = this.getInputPinY(i);
            div.appendChild(pin);
            this.inputPins.push(pin);
        }
        
        if (this.type !== 'OUTPUT') {
            const pin = document.createElement('div');
            pin.className = 'pin output-pin';
            pin.style.top = '50%';
            pin.style.transform = 'translateY(-50%)';
            div.appendChild(pin);
            this.outputPin = pin;
        }
        
        this.element = div;
        this.updateDisplay();
        return div;
    }
    
    getInputPinY(index) {
        if (this.inputs.length === 1) return '50%';
        const gateHeight = Math.max(60, this.inputs.length * 20);
        const spacing = gateHeight / (this.inputs.length + 1);
        return spacing * (index + 1) + 'px';
    }
    
    getSVG() {
        const svgs = {
            'INPUT': '<svg class="gate-svg" viewBox="0 0 50 50"><circle cx="25" cy="25" r="18" fill="none" stroke="var(--accent)" stroke-width="2.5"/><text class="gate-value" x="25" y="32" text-anchor="middle" fill="var(--low)" font-size="20" font-weight="bold">0</text></svg>',
            'OUTPUT': '<svg class="gate-svg" viewBox="0 0 50 50"><circle cx="25" cy="25" r="18" fill="none" stroke="var(--accent)" stroke-width="2.5"/><text class="gate-value" x="25" y="35" text-anchor="middle" fill="var(--low)" font-size="24" font-weight="bold">0</text></svg>',
            'AND': '<svg class="gate-svg" viewBox="0 0 50 50"><path d="M 10 15 L 25 15 Q 40 15 40 25 Q 40 35 25 35 L 10 35 Z" fill="none" stroke="var(--accent)" stroke-width="2.5"/></svg>',
            'OR': '<svg class="gate-svg" viewBox="0 0 50 50"><path d="M 10 15 Q 17 15 25 25 Q 17 35 10 35 Q 13 25 10 15 M 25 25 Q 35 15 42 25 Q 35 35 25 25" fill="none" stroke="var(--accent)" stroke-width="2.5"/></svg>',
            'NOT': '<svg class="gate-svg" viewBox="0 0 50 50"><path d="M 15 18 L 15 32 L 35 25 Z" fill="none" stroke="var(--accent)" stroke-width="2.5"/><circle cx="38" cy="25" r="3" fill="none" stroke="var(--accent)" stroke-width="2.5"/></svg>',
            'NAND': '<svg class="gate-svg" viewBox="0 0 50 50"><path d="M 10 15 L 23 15 Q 36 15 36 25 Q 36 35 23 35 L 10 35 Z" fill="none" stroke="var(--accent)" stroke-width="2.5"/><circle cx="39" cy="25" r="3" fill="none" stroke="var(--accent)" stroke-width="2.5"/></svg>',
            'NOR': '<svg class="gate-svg" viewBox="0 0 50 50"><path d="M 10 15 Q 16 15 23 25 Q 16 35 10 35 Q 13 25 10 15 M 23 25 Q 32 15 36 25 Q 32 35 23 25" fill="none" stroke="var(--accent)" stroke-width="2.5"/><circle cx="39" cy="25" r="3" fill="none" stroke="var(--accent)" stroke-width="2.5"/></svg>',
            'XOR': '<svg class="gate-svg" viewBox="0 0 50 50"><path d="M 8 15 Q 11 25 8 35 M 13 15 Q 20 15 28 25 Q 20 35 13 35 Q 16 25 13 15 M 28 25 Q 37 15 43 25 Q 37 35 28 25" fill="none" stroke="var(--accent)" stroke-width="2.5"/></svg>',
            'XNOR': '<svg class="gate-svg" viewBox="0 0 50 50"><path d="M 6 15 Q 9 25 6 35 M 11 15 Q 18 15 25 25 Q 18 35 11 35 Q 14 25 11 15 M 25 25 Q 33 15 36 25 Q 33 35 25 25" fill="none" stroke="var(--accent)" stroke-width="2.5"/><circle cx="39" cy="25" r="3" fill="none" stroke="var(--accent)" stroke-width="2.5"/></svg>'
        };
        return svgs[this.type] || '';
    }
    
    getPinPosition(pinIndex, isInput) {
        if (!this.element) return { x: this.x, y: this.y };
        
        const rect = this.element.getBoundingClientRect();
        const container = document.getElementById('canvas-container').getBoundingClientRect();
        
        if (isInput) {
            const pin = this.inputPins[pinIndex];
            if (!pin) return { x: this.x, y: this.y + 30 };
            const pinRect = pin.getBoundingClientRect();
            return {
                x: pinRect.left + pinRect.width / 2 - container.left,
                y: pinRect.top + pinRect.height / 2 - container.top
            };
        } else {
            if (!this.outputPin) return { x: this.x + 80, y: this.y + 30 };
            const pinRect = this.outputPin.getBoundingClientRect();
            return {
                x: pinRect.left + pinRect.width / 2 - container.left,
                y: pinRect.top + pinRect.height / 2 - container.top
            };
        }
    }
    
    evaluate() {
        switch (this.type) {
            case 'INPUT':
                this.output = this.value;
                break;
                
            case 'OUTPUT':
                this.output = this.inputs[0] || 0;
                break;
                
            case 'AND':
                if (this.inputs.length === 0) {
                    this.output = 0;
                } else {
                    this.output = this.inputs.every(v => v === 1) ? 1 : 0;
                }
                break;
                
            case 'OR':
                this.output = this.inputs.some(v => v === 1) ? 1 : 0;
                break;
                
            case 'NOT':
                this.output = (this.inputs[0] === 1) ? 0 : 1;
                break;
                
            case 'NAND':
                if (this.inputs.length === 0) {
                    this.output = 1;
                } else {
                    this.output = this.inputs.every(v => v === 1) ? 0 : 1;
                }
                break;
                
            case 'NOR':
                this.output = this.inputs.some(v => v === 1) ? 0 : 1;
                break;
                
            case 'XOR':
                const onesCount = this.inputs.filter(v => v === 1).length;
                this.output = (onesCount % 2 === 1) ? 1 : 0;
                break;
                
            case 'XNOR':
                const xnorOnesCount = this.inputs.filter(v => v === 1).length;
                this.output = (xnorOnesCount % 2 === 0) ? 1 : 0;
                break;
                
            default:
                this.output = 0;
        }
        
        console.log(`Gate ${this.id} (${this.type}): inputs=[${this.inputs}] -> output=${this.output}`);
        this.updateDisplay();
        return this.output;
    }
    
    updateDisplay() {
        if (!this.element) return;
        
        if (this.type === 'INPUT' || this.type === 'OUTPUT') {
            const textEl = this.element.querySelector('.gate-value');
            if (textEl) {
                const val = this.type === 'INPUT' ? this.value : this.output;
                textEl.textContent = val;
                textEl.setAttribute('fill', val === 1 ? 'var(--high)' : 'var(--low)');
                if (val === 1) {
                    textEl.classList.add('high');
                } else {
                    textEl.classList.remove('high');
                }
            }
        }
        
        if (this.outputPin) {
            if (this.output === 1) {
                this.outputPin.classList.add('active');
            } else {
                this.outputPin.classList.remove('active');
            }
        }
        
        this.inputPins.forEach((pin, i) => {
            if (this.inputs[i] === 1) {
                pin.classList.add('active');
            } else {
                pin.classList.remove('active');
            }
        });
    }
}
