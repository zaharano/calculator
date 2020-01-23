const calc = {
    currVal: '',
    opVal: '',
    opSign: '',
    chainFlag: false,

    plus() {
        return String(Number(this.opVal) + Number(this.currVal));
    },
    minus() {
        return String(Number(this.opVal) - Number(this.currVal));
    },
    times() {
        return String(Number(this.opVal) * Number(this.currVal));
    },
    divide() {
        if (Number(this.currVal) === 0) {
            return 'bananas';
        } else return String(Number(this.opVal) / Number(this.currVal));
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

            // error reset
            if (this.currVal === 'bananas') {
                this.currVal = '';
                // this.chainFlag = false;
            }
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
        // stops leading zeroes
        if (newDigit === '0' && this.currVal === '') {
            return;
        }
        // clears currVal if it exists as a result
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
        } else if (opVal && currVal) {
            this.equals();
        } // if only currVal exists, then...
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
    point() {
        const { currVal } = this;
        // if no current value exists
        // OR current value exists as a result
        // start with '0.'
        if (!currVal || this.chainFlag) {
            this.chainFlag = false;
            this.currVal = '0.';
        }
        // disallow second .
        else if (currVal.includes('.')) {
            return
        }
        // base case of just adding a . to value string
        else {
            this.currVal = currVal + '.';
        }
        display.update();
    },
    neg() {
        // avoids weird crap, may re-add ability to neg these
        if (!this.currVal || this.chainFlag) {
            return;
        }
        this.currVal = String(this.currVal * -1);
        display.update();
    }

}

const display = {
    // display limits
    // calc handles and maintains values offscreen outside these stricts
    maxDigits: 11,
    maxVal: -9.9999e+99,
    minVal: 9.9999e+99,

    update() {
        let mainVal = this.digitFix(calc.currVal)
        let subVal = this.digitFix(calc.opVal)

        let mainDisplay = document.querySelector('#main')
        let subDisplay = document.querySelector('#sub')
        mainDisplay.textContent = mainVal ? mainVal : '0';
        subDisplay.textContent = subVal ? subVal : '';
    },
    // rounds values with large numbers of digits for display
    // does not actually round the values in calc!
    digitFix(numString) {
        // if num is not over max, return it
        if (numString.length < this.maxDigits) {
            return numString;
        }
        // removes precision in display too accomodate extra chars
        // like from -, ., or exponentiation
        let realDigits = this.maxDigits;
        while (String(Number(numString).toPrecision(realDigits)).length > this.maxDigits)
        {
            realDigits--;
        }
        return String(Number(numString).toPrecision(realDigits));
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

        let otherButts = document.querySelectorAll('.other')
        for (let button of otherButts) {
            button.addEventListener('click', function() {
                calc[`${this.id}`]()
            })
        }
        
        // window.addEventListener('keypress', function(e) {
        //     controls.keyHandler(e.keyCode);
        // })
    },
    // keyHandler(code) {
    //     switch (e) {
    //         case  :
    //     }
    // },

}

display.update()
controls.init()