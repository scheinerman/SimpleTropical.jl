# Bonus: Nice subscripts and superscripts

The `SimpleTropical` module prints polynomials in an appealing style. 

For example, the polynomial 
$-2 \oplus (3\otimes x) \oplus (4 \otimes x^2)$ is rendered as `-2⊗x⁰ ⊕ 3⊗x¹ ⊕ 4⊗x²`. The function `int2sup` is used to convert an `Integer` into a `String` of superscipts. 

The function `int2sup` is not exported by can be accessed using `SimpleTropical.int2sup`. For example:
```
julia> "x" * SimpleTropical.int2sup(-1) * "y" * SimpleTropical.int2sup(3)
"x⁻¹y³"
```

We also provide the companion `int2sub` for subscripts:
```
julia> "a" * SimpleTropical.int2sub(3)
"a₃"
```

Unfortunately, there is no good way to decorate a letter with aligned super and subscript. For example, the best way to render $z_5^2$ would be like this:
```
julia> "(z" * SimpleTropical.int2sub(5) * ")" * SimpleTropical.int2sup(2)
"(z₅)²"
```

The functions `int2sub` and `int2sup` are defined in `src/scripter.jl`. That file can be copied and used as desired. 