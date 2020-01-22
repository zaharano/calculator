const calc = {
    currVal: '',
    opVal: '',
    opSign: '',
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
            this.currVal = this[opSign]();
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
    addDigit(newDigit) {
        // if max digits is reached 
        // or if value is zero and zero is entered
        // do nothing
        if (newDigit === '0' && this.currVal === '') {
            return;
        }

        // handle case - currVal exists as output, but
        // no new command is set to chain, so new digit input
        // should just clear output start logging fresh input
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
        // if both values already exist, equals then...
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
        // if no current value exists
        // OR current value exists but chaining
        // start with 0.
        if (!currVal || this.chainFlag) {
            this.chainFlag = false;
            this.currVal = '0.';
        }
        // disallow second .
        else if (currVal.includes('.'))
            return
        // base case of just adding a . to value string
        else 
            this.currVal = currVal + '.';
        display.update();
    },

}

const display = {
    // display limits
    // calc handles and maintains values offscreen outside these stricts
    maxDigits: 10,
    maxVal: -9.9999e+99,
    minVal: 9.9999e+99,

    update() {
        let mainVal = this.digitFix(calc.currVal)
        let subVal = this.digitFix(calc.opVal)

        let mainDisplay = document.querySelector('#main')
        let subDisplay = document.querySelector('#sub')
        mainDisplay.textContent = mainVal ? mainVal : '0';
        subDisplay.textContent = subVal;
    },
    // rounds values with large numbers of digits for display
    // does not actually round the values in calc!
    digitFix(num) {
        // if num is not over max, return it
        if (num.length < this.maxDigits)
            return num;
        // in cases of exponentiated results, 
        // must reduce precision in order to fit display
        else if (num >= (10 ** this.maxDigits) ||
                 num < 1 / (10 ** this.maxDigits)) {
            return Number(num).toPrecision(this.maxDigits-5) + '';
        }
        // round other results to maxDigit precision
        return Number(num).toPrecision(this.maxDigits) + '';
    },
    op() {
        display.opClear();
        let active = document.querySelector(`li .fa-${calc.opSign}`);
        if (active) {
            active.classList.add('active');            
        }
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

        let pointButt = document.querySelector('#point')
        pointButt.addEventListener('click', () => calc.addPoint())

        // window.addEventListener('keypress', function(e) {
        //     controls.keyHandler(e.keyCode);
        // })
    },
    // keyHandler(code) {
    //     switch (e) {
    //         case  :
    //     }
    // },
    decouple() {
    // stops listeners, changes C listener to call reset()
    },
    reset() {
        // decouples C then calls init()
    },

}

display.update()
controls.init()