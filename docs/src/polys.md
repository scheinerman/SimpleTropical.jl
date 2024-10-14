# Tropical Polynomials


Documentation forthcoming in version 0.3.$x$ where $x > 0$. 

Here is a teaser in which we create the polynomial $p(x) = 0\otimes x^{-1} \oplus 2\otimes x \oplus (-3)\otimes x^2$. Note that $p(1)=-1$ because it is the minimum of $\{0-1, 2+1, -3+2\}$

```
julia> p = 2*tropical_x() + (-3)*tropical_x(2) + tropical_x(-1)
0⊗x⁻¹ ⊕ 2⊗x¹ ⊕ -3⊗x²

julia> p(1)
Tropical(-1)
```