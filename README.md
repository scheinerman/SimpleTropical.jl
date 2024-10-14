# SimpleTropical


This is an implementation of tropical (min-plus) arithmetic in Julia.

> **Changes in version 0.3**: There are a variety of minor changes. For example, some errors previously thrown as assertion errors are now thrown as domain errors. (These are technically breaking changes.) <p>More significantly is the introduction of the `TropicalPolynomial` type. 


Documentation is now hosted [here](https://docs.juliahub.com/General/SimpleTropical/).

## Numbers

The tropical numbers consist of the real numbers and infinity. The
`SimpleTropical` module defines the `Tropical` type (which is a
subtype of `Number`). 
```
julia> using SimpleTropical

julia> x = Tropical(3.5)
Tropical(3.5)

julia> y = Tropical{Int}(4)
Tropical(4)
```

Tropical infinity is available via `TropicalInf`:
```
julia> TropicalInf
Tropical(∞)
```

### Conversion to real numbers  
To convert a `Tropical` number to a real number, use `real`:
```
julia> a = Tropical(5)
Tropical(5)

julia> a+2
Tropical(2)

julia> real(a)+2
7
```

## Arithmetic

The `+` operation is defined as the min of the two values and `*`
as the sum:
```
julia> x+y
Tropical(3.5)

julia> x*y
Tropical(7.5)
```

The identity element for `+` is `TropicalInf` and the identity
element for `*` is `Tropical(0)`:
``` julia
julia> x + TropicalInf
Tropical(3.5)

julia> x * Tropical(0)
Tropical(3.5)
```

No elements in tropical arithmetic have additive inverses, but they
do have multiplicative inverses (except for infinity):
```
julia> inv(x)
Tropical(-3.5)

julia> inv(TropicalInf)
ERROR: AssertionError: TropicalInf is not invertible
```

Exponentiation by integers works:
```
julia> x^10
Tropical(35.0)

julia> x^-2
Tropical(-7.0)
```

Tropical division is permitted, except one cannot divide by infinity:
```
julia> Tropical(3) / Tropical(2)
Tropical(1)

julia> Tropical(3) / Tropical(Inf)
ERROR: AssertionError: TropicalInf is not invertible
```

Tropical subtraction is undefined and therefore forbidden.

### ⊕ and ⊗ 

The symbols `⊕` and `⊗` may be used instead of `+` and `*` for `Tropical` numbers. In addition, these may be used on `Real` numbers with the result
being the appropriate `Tropical` number.
```
julia> 5 ⊕ 2
Tropical(2)

julia> 5 ⊗ 2
Tropical(7)
```

**Note**: In the REPL, the symbol `⊕` is created by typing `\oplus` and then pressing TAB. Likewise, `⊗` is created as `\otimes` followed by TAB.



### Identity elements: `zero` and `one`

The Julia function `zero` normally returns the number zero because that is the
identity element for addition; likewise, `one` returns the number one because 
that is the identity element for multiplication.

In tropical arithmetic, these identity elements are `Tropical(∞)` and `Tropical(0)`, 
respectively. Therefore we define the `zero` and `one` functions to return these values.
```
julia> a = Tropical(3)
Tropical(3)

julia> zero(a)
Tropical(∞)

julia> zero(Tropical)
Tropical(∞)

julia> one(a)
Tropical(0)

julia> one(Tropical)
Tropical(0)
```

Likewise, the functions `zeros` and `ones` return an array of the appropriate values:
```
julia> zeros(Tropical,3)
3-element Vector{Tropical}:
 Tropical(∞)
 Tropical(∞)
 Tropical(∞)

julia> ones(Tropical,3)
3-element Vector{Tropical}:
 Tropical(0)
 Tropical(0)
 Tropical(0)
```


## Predicates

Use `isinf(X)` to test if a tropical number is infinity.
```
julia> isinf(x)
false

julia> isinf(TropicalInf)
true
```

The usual comparison operators `==` and `!==` work as expected:
```
julia> Tropical(3.0) == Tropical(3)
true

julia> Tropical(3.1) != Tropical(3//1)
true
```

Likewise, standard ordering comparisons work as expected:
```
julia> Tropical(π) < Tropical(3)
false

julia> Tropical(π) > Tropical(3)
true

julia> Tropical(5) < TropicalInf
true
```


## Display Style

By default, `Tropical` numbers are displayed in the form `Tropical(xxx)` such as 
`Tropical(-3)` or `Tropical(∞)`. This behavior can be changed using the function 
`long_tropical_show`. 
+ `long_tropical_show(true)` gives the default behavior.
+ `long_tropical_show(false)` makes `Tropical` numbers appear as ordinary real numbers.

```
julia> long_tropical_show(false)
false

julia> 5 ⊕ 2
2

julia> 5 ⊗ 2
7

julia> typeof(ans)
Tropical{Int64}
```
Calling `long_tropical_show()` without any arguments returns the current state
for showing `Tropical` numbers: `true` for the default behavior and `false` 
for the short display.

## Polynomials

Documentation forthcoming in version 0.3.$x$ where $x > 0$. 

Here is a teaser in which we create the polynomial $p(x) = 0\otimes x^{-1} \oplus 2\otimes x \oplus (-3)\otimes x^2$. Note that $p(1)=-1$ because it is the minimum of $\{0-1, 2+1, -3+2\}$

```
julia> p = 2*tropical_x() + (-3)*tropical_x(2) + tropical_x(-1)
0⊗x⁻¹ ⊕ 2⊗x¹ ⊕ -3⊗x²

julia> p(1)
Tropical(-1)
```