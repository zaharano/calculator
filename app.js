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
        if (this.opSign) {
            this.currVal = calc[this.opSign]();
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
    checkDigit() {

    },
    clearAndReset() {

    },
    addDigit(newDigit) {
        // if max digits is reached, stop accepting digits
        if (this.currVal.length >= this.maxDigits) {
            return;
        }

        // convoluted beyond necessity
        // is chainFlag even necessary 
        // (ways to check other data to determine chaining active)

        //this one is about if the user is advancing a chained result to the op stage
        // first statement had chainFlag check
        if (this.opSign && !this.opVal) {
            this.opVal = this.currVal;
            this.currVal = '';
            this.chainFlag = false;
            // this one can't even happen right how haha, both t and f opSign
        // } else if (this.opSign && !this.opVal && !this.opSign && !this.chainFlag) {
        //     this.opVal = this.currVal;
        //     this.currVal = '';
            // this next thing is an problem, why did I do?

            // this one is about: there's a result displayed in currVal, but the user doesn't want to chain it, just start a new thing
            // last statement had chainFlag check
        } else if (!this.opSign && this.currVal) {
            this.currVal = '';
        }

        this.currVal = this.currVal + newDigit;
        display.update();
    },
    setOp(newOp) {
        // if there is no value, do nothing
        // if (!this.currVal) {
        //     return;
        // }

        // // if there is no opSign, set it
        // if (!this.opSign) {
        //     this.opSign = newOp;
        // }

        // if an op is pressed when there's no op value but a curr val
        // 
        // the opSign if updated

        if (!this.opVal && this.currVal) {
            this.opVal = this.currVal;
            this.currVal = '';
            this.opSign = newOp;
            display.update();
        } else if (this.currVal && this.opVal) {
            this.equals();
            this.opSign = newOp;
        }
        display.op();
    }

}

const display = {
    // init() {
    //     let mainDisplay = document.querySelector('#main')
    //     let subDisplay = document.querySelector('#sub')
    // },
    update() {
        let mainDisplay = document.querySelector('#main')
        let subDisplay = document.querySelector('#sub')
        mainDisplay.textContent = calc.currVal;
        subDisplay.textContent = calc.opVal;
    },
    op() {
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
                calc.setOp(this.id)
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

controls.init()