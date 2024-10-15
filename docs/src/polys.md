# Tropical Polynomials


## Construction

There are various ways to create a tropical polynomial. 

#### Empty sum
`TropicalPolynomial()` creates a polynomial with no terms:
```
julia> p = TropicalPolynomial()
∞
```
Since `p` is an empty sum, it represents a constant corresponding to the additive identity element, ∞.


#### Exponent/Coefficient Pairs
There are two ways to define a `TropicalPolynomial` by specifying exponents and coefficients. First, we can provide a list of exponent/coefficient pairs, like this:
```
julia> p = TropicalPolynomial([0=>3, 4=>1.5])
3.0⊗x⁰ ⊕ 1.5⊗x⁴
```
The pair `4 => 1.5` means the coefficient of `x^4` is `Tropical(1.5)`. 

Note that the exponents may be negative integers:
```
julia> p = TropicalPolynomial([-1 => 4, 1 => 0])
4⊗x⁻¹ ⊕ 0⊗x¹
```

Alternatively, we may create a dictionary mapping integers to tropical numbers, and pass that to `TropicalPolynomial`. 
```
julia> clist = Dict{Int, Tropical}()
Dict{Int64, Tropical}()

julia> clist[-1] = 4
4

julia> clist[0] = 1
1

julia> clist[2] = -5
-5

julia> p = TropicalPolynomial(clist)
4⊗x⁻¹ ⊕ 1⊗x⁰ ⊕ -5⊗x²
```

#### The `tropical_x` function

A comfortable way to create polynomials is to use an expression representing the variable $x$ and then combine it using coefficients and powers. To that end, we have the function `tropical_x` that returns the polynomial $0 \otimes x$.
```
julia> x = tropical_x()
0⊗x¹

julia> p = 2 + x^2 + (-4)*x^3
2⊗x⁰ ⊕ 0⊗x² ⊕ -4⊗x³
```
If `k` is an integer, `tropical_x(k)` returns $0 \otimes x^k$. This is a convenient way to create negative exponents.
```
julia> x = tropical_x()
0⊗x¹

julia> xinv = tropical_x(-1)
0⊗x⁻¹

julia> 2x + (-3)xinv
-3⊗x⁻¹ ⊕ 2⊗x¹
```

## Coefficients

The `coefs` function returns a dictionary whose keys are the exponents and those corresponding values are the coefficients.
```
julia> x = tropical_x()
0⊗x¹

julia> p = 2 + 3x + (-5)x^2
2⊗x⁰ ⊕ 3⊗x¹ ⊕ -5⊗x²

julia> coefs(p)
Dict{Int64, Tropical} with 3 entries:
  0 => Tropical(2)
  2 => Tropical(-5)
  1 => Tropical(3)
```


## Arithmetic


#### Addition and multiplication

Polynomial addition and multiplication can be performed using the usual `+` and `*` operations, though 
`⊕` and `⊗` may be used instead. If a polynomial is added to (or multiplied by) a real number, that number is automatically converted to `Tropical`.

```
julia> x = tropical_x()
0⊗x¹

julia> p = 2 + x^2 + (-4)*x^3
2⊗x⁰ ⊕ 0⊗x² ⊕ -4⊗x³

julia> q = x+1
1⊗x⁰ ⊕ 0⊗x¹

julia> p+q
1⊗x⁰ ⊕ 0⊗x¹ ⊕ 0⊗x² ⊕ -4⊗x³

julia> p*q
3⊗x⁰ ⊕ 2⊗x¹ ⊕ 1⊗x² ⊕ -3⊗x³ ⊕ -4⊗x⁴

julia> p+0
0⊗x⁰ ⊕ 0⊗x² ⊕ -4⊗x³

julia> (-2)*p
0⊗x⁰ ⊕ -2⊗x² ⊕ -6⊗x³
```


#### Exponentiation

Given a tropical polynomial $p$, there are two ways to think about $p^n$ where $n$ is a positive integer. First, it is repeated multiplication $\underbrace{p \cdot p \cdots p}_n$. The other is to exploit a feature of tropical arithmetic that $(a \oplus b)^n = a^n \oplus b^n$. The latter is simpler and faster to compute, and that is how we have implemented exponentiation.

> **WARNING**: Future versions of `SimpleTropical` might do things differently.

```
julia> p = 2x + 5x^2
2⊗x¹ ⊕ 5⊗x²

julia> p*p*p
6⊗x³ ⊕ 9⊗x⁴ ⊕ 12⊗x⁵ ⊕ 15⊗x⁶

julia> p^3
6⊗x³ ⊕ 15⊗x⁶
```
Note that `p^3` and `p*p*p` are different polynomials, but they are identical as functions. 

## Evaluation

To evaluate a polynomial `p` for a number `a`, simply use `p(a)`. If `a` is not already a 
`Tropical` number, it is converted to one.
```
julia> p = -2x + 5x^2
-2⊗x¹ ⊕ 5⊗x²

julia> p(0)      # min of -2 and 5
Tropical(-2)

julia> p(10)     # min of 8 and 25
Tropical(8)

julia> p(-10)    # min of -12 and -15
Tropical(-15)
```

#### Conversion to a `Function`

The output of a `TropicalPolynomial` is always a `Tropical` number. If we wish to use a tropical polynomial as a function from the reals to the reals, then `make_function(p)` converts `p` into a `Function` that can be used, for example, in plotting.
```
julia> p = -2x + 5x^2
-2⊗x¹ ⊕ 5⊗x²

julia> f = make_function(p);

julia> f(-10)
-15
```


## Equality

Use `==` to test if two tropical polynomials are equal. This means that they have exactly the same terms (powers of $x$ and corresponding coefficients). Two polynomials might be equal as functions but will not be deemed equal by `==`.
```
julia> p = 1 + 3x + x^2
1⊗x⁰ ⊕ 3⊗x¹ ⊕ 0⊗x²

julia> q = 1 + x^2
1⊗x⁰ ⊕ 0⊗x²

julia> all(p(a)==q(a) for a in -10:0.1:10)  # p and q give identical results
true

julia> p==q     # but they are different polynomials
false
```


## Roots

#### Background: Roots of a tropical polynomial

Consider the polynomial $p(x) = 1 \oplus (0\otimes x) \oplus (-2 \otimes x^2)$. 

Using real arithmetic, this is $p(x) = \min\{1, 0+x, -2+2x\}$. 

The number $x$ is a root of this polynomial if the value of $p(x)$ is attained two or more times in the list of terms.
To do this we solve all of the equations: 
$1=0+x$,
$1=-2+2x$, and
$0+x =-2+2x$.

That gives $1$, $\frac32$, and $2$ as possible roots. 
Substituting we find:

For $x=1$, the values are  $\{1,0,1\}$. This is not a root (repeated value is not the minimum).

For $x=\frac32$, the values are $\{1,1,\frac32\}$. This is a root (repeated value is the minimum).
 
For $x=2$, the values are $\{1,2,2\}$. This is not a root (repeated value is not the minimum).

Therefore, $x=\frac32$ is the only root of the polynomial $p(x) = 1 \oplus (0\otimes x) \oplus (-2 \otimes x^2)$.


#### The `roots` function
To find the roots of a tropical polynomial, use the `roots` function. 
```
julia> x = tropical_x();

julia> p = 0 + x + 5x^3
0⊗x⁰ ⊕ 0⊗x¹ ⊕ 5⊗x³

julia> roots(p)
2-element Vector{Tropical}:
 Tropical(-5//2)
     Tropical(0)
```

#### Roundoff issues
When the polynomials coefficients are exact numbers (i.e., `Integer` or `Rational`) then `roots` returns 
exact results. However, if the coefficients are floating point numbers, round off issues may occur.

**Example**: Here we find the roots of a polynomial all of whose coefficients are `Integer` type:
```
julia> p = -3 + x + (-3)x^2 + x^3
-3⊗x⁰ ⊕ 0⊗x¹ ⊕ -3⊗x² ⊕ 0⊗x³

julia> roots(p)
2-element Vector{Tropical{Int64}}:
 Tropical(-3)
  Tropical(0)
```

And now we find the roots of the same polynomial but chaning a coefficient to a floating point number:
```
julia> p = -3.0 + x + (-3)x^2 + x^3
-3.0⊗x⁰ ⊕ 0⊗x¹ ⊕ -3⊗x² ⊕ 0⊗x³

julia> roots(p)
4-element Vector{Tropical}:
 Tropical(-3.0)
   Tropical(-3)
 Tropical(-0.0)
    Tropical(0)
```
Round off may cause `roots` to miss a root entirely. 

## To Do List

* Implement a way to tell if two polynomials are equal as functions perhaps by finding a way to reduce polynomials to a canonical form by eliminating unnecessary terms. Not clear exactly how to do this. 