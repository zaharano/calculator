Part of The Odin Project curriculum

todos:
* Add +/- key : * -1 I think?
* Add keypress event listeners : simple enough
* Add backspace : slice length - 1
* More bug testing 
* maybe implement testing package?

Bugs
* err handling - decouple controls except c and make c reinit controls - at the moment just for div by zero but also should handle too large or too neg numbers.
* display of long results - employ digitFix on results within equals func

Nice to adds
* copy to clipboard button on currVal when hovered
* repeated = presses chain the last performed op (extra opVal cache, use existing chainFlag) 3 + 5 = 8 pressing = again results 13, 18 etc