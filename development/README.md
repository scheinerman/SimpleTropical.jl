# `development` Folder

Stuff that I'm working on that might become part of `SimpleTropical`. 

Goal here is to create tropical polynomials. Might start with single variable, but really want more. 


## `scripter.jl`

Provides the functions `int2sub` and `int2sup`. These take integer inputs and return a `String` for a base-10 representation of the number using subscript and superscript numerals, respectively.

For something like $(x_4)^{-1}$, we do this:

```
julia> x4 = "x" * int2sub(4);

julia> println("(" * x4 * ")" * int2sup(-1))
(x₄)⁻¹
```