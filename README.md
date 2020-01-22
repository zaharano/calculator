Part of The Odin Project curriculum

### Todos:
* [ ] Add +/- key : * -1 I think?
* [ ] Add keypress event listeners : simple enough
* [ ] Add backspace : slice length - 1
* [ ] err handling - display error output - decouple controls except c and make c reinit controls.
* [ ] need to handle actual out of bound situations (outside js int handling)
* [ ] divide by zero handling broken by digitFix implement

### Bugs


### Nice to adds
* [ ] copy to clipboard button on currVal when hovered
* [ ] repeated = presses chain the last performed op so 3 + 5 = 8 pressing = again results 13, 18 etc
    * maybe extra opVal cache, use existing chainFlag
    * maybe requires refactor so that that equals puts the result in opVal, doesn't clear opSign. I think this is how most calculators actually work. Results are displayed in the sub display to indicate they can be further operated on. 