Part of The Odin Project curriculum

### Todos:
* [x] Add +/- key : * -1 I think?
* [x] Add backspace : slice length - 1
* [x] Add keypress event listeners : simple enough
* [x] err handling - display error output - decouple controls except c and make c reinit controls.
* [x] need to handle actual out of bound situations (outside js int handling)
* [x] fix up the digit fix for display (adapt to e, -, .)

### Bugs
* [ ] Calc vals *are* being rounded when I don't think they should be
* [ ] unhandled annoying floating point in JS issues. ex. 3.3 * 3 = 9.899999.. 

### Nice to adds
* [ ] copy to clipboard button on currVal when hovered
* [ ] repeated = presses chain the last performed op so 3 + 5 = 8 pressing = again results 13, 18 etc
    * maybe extra opVal cache, use existing chainFlag
    * maybe requires refactor so that that equals puts the result in opVal, doesn't clear opSign. I think this is how most calculators actually work. Results are displayed in the sub display to indicate they can be further operated on. 