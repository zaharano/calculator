const calc = {
    currVal: '',
    opVal: '',
    opSign: '',
    maxDigits: 10,
    chainFlag: false,

    plus() {

        return Number(this.opVal) + Number(this.currVal);
    },
    minus() {
        return Number(this.opVal) - Number(this.currVal);
    },
    times() {
        return Number(this.opVal) * Number(this.currVal);
    },
    divide() {
        if (Number(this.currVal) === 0) {
            controls.decouple();
            return 'err - div by 0';
        } else return Number(this.opVal) / Number(this.currVal);
    },
    equals() {
        const { opSign } = this;
        if (opSign) {
            let rawResult = this[opSign]();
            this.currVal = this.digitFix(rawResult);
            this.opSign = '';
            this.opVal = '';
            display.update();
            display.opClear();
            this.chainFlag = true;
        }
    },
    clear() {
        this.currVal = '';
        this.opVal = '';
        this.opSign = '';
        this.chainFlag = false;
        display.update();
        display.opClear();
    },
    digitFix(num) {
        return Number(num.toPrecision(this.maxDigits-1))
    },
    addDigit(newDigit) {
        // if max digits is reached, stop accepting digits
        if (this.currVal.length >= this.maxDigits
            || newDigit === '0' && this.currVal === '') {
            return;
        }

        if (this.chainFlag) {
            this.currVal = '';
            this.chainFlag = false;
        }

        this.currVal = this.currVal + newDigit;
        display.update();
    },
    fireOp(newOp) {
        const { opVal, currVal } = this;

        // if neither exists, quit
        if (!opVal && !currVal) {
            return;
        // if only opVal exists, reset op and quit
        } else if (opVal && !currVal) {
            this.setOp(newOp);
            return;
        // if both values already exist, equals 
        } else if (currVal && opVal) {
            this.equals();
        }

        // advance to op stage
        this.setOp(newOp);
        this.opVal = this.currVal;
        this.currVal = '';
        display.update();
    },
    setOp(newOp) {
        this.opSign = newOp;
        display.op();
    },
    addPoint() {
        const { currVal } = this;
        if (!currVal)
            this.currVal = '0.';
        else if (currVal.includes('.'))
            return
        else 
            this.currVal = currVal + '.';
    },

}

const display = {
    // init() {
    //     let mainDisplay = document.querySelector('#main')
    //     let subDisplay = document.querySelector('#sub')
    // },
    update() {
        let mainDisplay = document.querySelector('#main')
        let subDisplay = document.querySelector('#sub')
        mainDisplay.textContent = calc.currVal ? calc.currVal : '0';
        subDisplay.textContent = calc.opVal;
    },
    op() {
        this.opClear();
        //console.log(`li .fa-${calc.opSign}`)
        let active = document.querySelector(`li .fa-${calc.opSign}`);
        //console.log(active)
        if (active) {
            active.classList.add('active');            
        }
        //console.log(active)    
    },
    opClear() {
        let deactivate = document.querySelector(`.active`);
        if (deactivate) {
            deactivate.classList.remove('active');
        }
    }

}

const controls = {
    init() {
        let numButts = document.querySelectorAll('.num')
        for (let button of numButts) {
            button.addEventListener('click', function() {
                calc.addDigit(this.id)
            })
        }

        let opButts = document.querySelectorAll('.op')
        for (let button of opButts) {
            button.addEventListener('click', function() {
                calc.fireOp(this.id)
            })
        }

        let equalButt = document.querySelector('#equals')
        equalButt.addEventListener('click', () => calc.equals())

        let clearButt = document.querySelector('#clear')
        clearButt.addEventListener('click', () => calc.clear())

        
        // neg
        // decimal

    },
    decouple() {
    // stops listeners, changes C listener to call reset()
    },
    reset() {
        // decouples C then calls init()
    },

}

display.update()
controls.init()