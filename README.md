Part of The Odin Project curriculum

todos:
* Add +/- key : * -1 I think?
* Add keypress event listeners : simple enough
* Add backspace : slice length - 1
* More bug testing 
* maybe implement testing package?

Bugs
* err handling - display error output - decouple controls except c and make c reinit controls.
* divide by zero handling broken by digitFix implement
* display of decimals is off - the maxDigits - 5 thing for exponentiation is mucking it up
    * how do I handle all that that, since it could be 0.123456789 or 12340.56789 or 12345678.99
* need to handle actual out of bound situations (outside js int handling)

Nice to adds
* copy to clipboard button on currVal when hovered
* repeated = presses chain the last performed op (extra opVal cache, use existing chainFlag) 3 + 5 = 8 pressing = again results 13, 18 etc