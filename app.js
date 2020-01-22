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
        // if max digits is reached 
        // or if value is zero and zero is entered
        // do nothing
        if (this.currVal.length >= this.maxDigits
            || newDigit === '0' && this.currVal === '') {
            return;
        }

        // handle case - currVal exists as output, but
        // no new command is set to chain, so new digit input
        // should just clear output start logging freshinput
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
        // if no value exists, start with decimal
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
    update() {
        let mainDisplay = document.querySelector('#main')
        let subDisplay = document.querySelector('#sub')
        mainDisplay.textContent = calc.currVal ? calc.currVal : '0';
        subDisplay.textContent = calc.opVal;
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