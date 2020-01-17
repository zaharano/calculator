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

        // 
        if (this.chainFlag && this.opSign && !this.opVal) {
            this.opVal = this.currVal;
            this.currVal = '';
            this.chainFlag = false;
        } else if (this.opSign && !this.opVal && !this.opSign && !this.chainFlag) {
            this.opVal = this.currVal;
            this.currVal = '';
        } else if (!this.opSign && this.currVal) {
            this.currVal = '';
        }

        this.currVal = this.currVal + newDigit;
        display.update();
    },
    setOp(newOp) {
        if (!this.opSign) {
            this.opSign = newOp;
        }
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
        active.classList.add('active');
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
        let buttNumbs = document.querySelectorAll('.num')
        for (let button of buttNumbs) {
            button.addEventListener('click', function() {
                calc.addDigit(this.id)
            })
        }

        let buttOps = document.querySelectorAll('.op')
        for (let button of buttOps) {
            button.addEventListener('click', function() {
                calc.setOp(this.id)
            })
        }

        let buttEqual = document.querySelector('#equals')
        buttEqual.addEventListener('click', () => calc.equals())

        let buttClear = document.querySelector('#clear')
        buttClear.addEventListener('click', () => calc.clear())

        // c
        // neg
        // decimal

    },
    decouple() {
    // stops listeners, changes C listener to call reset()
    },
    reset() {
        // decouples C then calls init()
    }

}

controls.init()
// const Button = function(value, stuff...) {
//     this.value = value,
 //       this.button
//      

// }
// for (button in buttons) {
//    addEventListener that fires conrols[button.id]
//     controls[button.id] = function(){
 //   calc[button.id]
//}
// }