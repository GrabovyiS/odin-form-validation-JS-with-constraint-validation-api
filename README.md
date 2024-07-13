this just should be organized as classes with a method to return DOM elements and other methods to return validity, validate with styling and report validation

It's weird how I still utilize the Constraint Validation API for validityState and :valid/:invalid with built-in attributes but do not use built-in messages with reportValidity(). Maybe if you need custom error messages just build your own validators from scratch?

Nah, its ok to do it like this too for simple validation functionality like required or tooShort that the Constraint Validation API provides

This is terrible validate and isvalid should not be the same function with the same functionality and I'm repeating my isValid conditions inside reportValidity functions
this code baaad

and the thing is jumping
but at least I've managed to make it work with two messages popping up without it looking jumpy
