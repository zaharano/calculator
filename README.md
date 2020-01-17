Part of The Odin Project curriculum

todos:
* Add +/- key : * -1 I think?
* Add floating point : probably a huge pain in the ass
    * parseFloat()
    * still limiting .length I think? 
    * Number(Number(input).toPrecision(this.maxDigits))
    * . button needs hooking up
    * . button needs to disallow second .
* Add keypress event listeners : simple enough
* Add backspace : slice length - 1
* More bug testing 
* maybe implement testing package?

Looks
* different key colors for ops

Bugs
* digits of currVal as output isn't checked, incl float results from divide
* pressing an op before any digits highlights the op, no other ops can be highlighted, then when you do press digit and then op the new op is also highlighted but the first one isn't (solve by disallowing highlighting without currVal?)
* still haven't built the err handling - decouple controls except c and make c reinit controls

Nice to adds
* copy to clipboard button on currVal when hovered
