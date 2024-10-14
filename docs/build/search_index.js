var documenterSearchIndex = {"docs":
[{"location":"polys/#Tropical-Polynomials","page":"Polynomials","title":"Tropical Polynomials","text":"","category":"section"},{"location":"polys/#Construction","page":"Polynomials","title":"Construction","text":"","category":"section"},{"location":"polys/","page":"Polynomials","title":"Polynomials","text":"There are various ways to create a tropical polynomial. ","category":"page"},{"location":"polys/#Empty-Sum","page":"Polynomials","title":"Empty Sum","text":"","category":"section"},{"location":"polys/","page":"Polynomials","title":"Polynomials","text":"TropicalPolynomial() creates a polynomial with no terms:","category":"page"},{"location":"polys/","page":"Polynomials","title":"Polynomials","text":"julia> p = TropicalPolynomial()\n∞","category":"page"},{"location":"polys/","page":"Polynomials","title":"Polynomials","text":"Since p is an empty sum, it represents a constant corresponding to the additive identity element, ∞.","category":"page"},{"location":"polys/#Exponent/Coefficient-Pairs","page":"Polynomials","title":"Exponent/Coefficient Pairs","text":"","category":"section"},{"location":"polys/","page":"Polynomials","title":"Polynomials","text":"There are two ways to define a TropicalPolynomial by specifying exponents and coefficients. First, we can provide a list of exponent/coefficient pairs, like this:","category":"page"},{"location":"polys/","page":"Polynomials","title":"Polynomials","text":"julia> p = TropicalPolynomial([0=>3, 4=>1.5])\n3.0⊗x⁰ ⊕ 1.5⊗x⁴","category":"page"},{"location":"polys/","page":"Polynomials","title":"Polynomials","text":"The pair 4 => 1.5 means the coefficient of x^4 is Tropical(1.5). ","category":"page"},{"location":"polys/","page":"Polynomials","title":"Polynomials","text":"Note that the exponents may be negative integers:","category":"page"},{"location":"polys/","page":"Polynomials","title":"Polynomials","text":"julia> p = TropicalPolynomial([-1 => 4, 1 => 0])\n4⊗x⁻¹ ⊕ 0⊗x¹","category":"page"},{"location":"polys/","page":"Polynomials","title":"Polynomials","text":"Alternatively, we may create a dictionary mapping integers to tropical numbers, and pass that to TropicalPolynomial. ","category":"page"},{"location":"polys/","page":"Polynomials","title":"Polynomials","text":"julia> clist = Dict{Int, Tropical}()\nDict{Int64, Tropical}()\n\njulia> clist[-1] = 4\n4\n\njulia> clist[0] = 1\n1\n\njulia> clist[2] = -5\n-5\n\njulia> p = TropicalPolynomial(clist)\n4⊗x⁻¹ ⊕ 1⊗x⁰ ⊕ -5⊗x²","category":"page"},{"location":"polys/#The-tropical_x-function","page":"Polynomials","title":"The tropical_x function","text":"","category":"section"},{"location":"polys/","page":"Polynomials","title":"Polynomials","text":"A comfortable way to create polynomials is to use an expression representing the variable x and then combine it using coefficients and powers. To that end, we have the function tropical_x that returns the polynomial 0 otimes x.","category":"page"},{"location":"polys/","page":"Polynomials","title":"Polynomials","text":"julia> x = tropical_x()\n0⊗x¹\n\njulia> p = 2 + x^2 + (-4)*x^3\n2⊗x⁰ ⊕ 0⊗x² ⊕ -4⊗x³","category":"page"},{"location":"polys/","page":"Polynomials","title":"Polynomials","text":"If k is an integer, tropical_x(k) returns 0 otimes x^k. This is a convenient way to create negative exponents.","category":"page"},{"location":"polys/","page":"Polynomials","title":"Polynomials","text":"julia> x = tropical_x()\n0⊗x¹\n\njulia> xinv = tropical_x(-1)\n0⊗x⁻¹\n\njulia> 2x + (-3)xinv\n-3⊗x⁻¹ ⊕ 2⊗x¹","category":"page"},{"location":"polys/#Coefficients","page":"Polynomials","title":"Coefficients","text":"","category":"section"},{"location":"polys/","page":"Polynomials","title":"Polynomials","text":"The coefs function returns a dictionary whose keys are the exponents and those corresponding values are the coefficients.","category":"page"},{"location":"polys/","page":"Polynomials","title":"Polynomials","text":"julia> x = tropical_x()\n0⊗x¹\n\njulia> p = 2 + 3x + (-5)x^2\n2⊗x⁰ ⊕ 3⊗x¹ ⊕ -5⊗x²\n\njulia> coefs(p)\nDict{Int64, Tropical} with 3 entries:\n  0 => Tropical(2)\n  2 => Tropical(-5)\n  1 => Tropical(3)","category":"page"},{"location":"polys/#Arithmetic","page":"Polynomials","title":"Arithmetic","text":"","category":"section"},{"location":"polys/#Addition-and-Multiplication","page":"Polynomials","title":"Addition and Multiplication","text":"","category":"section"},{"location":"polys/","page":"Polynomials","title":"Polynomials","text":"Polynomial addition and multiplication can be performed using the usual + and * operations, though  ⊕ and ⊗ may be used instead. If a polynomial is added to (or multiplied by) a real number, that number is automatically converted to Tropical.","category":"page"},{"location":"polys/","page":"Polynomials","title":"Polynomials","text":"julia> x = tropical_x()\n0⊗x¹\n\njulia> p = 2 + x^2 + (-4)*x^3\n2⊗x⁰ ⊕ 0⊗x² ⊕ -4⊗x³\n\njulia> q = x+1\n1⊗x⁰ ⊕ 0⊗x¹\n\njulia> p+q\n1⊗x⁰ ⊕ 0⊗x¹ ⊕ 0⊗x² ⊕ -4⊗x³\n\njulia> p*q\n3⊗x⁰ ⊕ 2⊗x¹ ⊕ 1⊗x² ⊕ -3⊗x³ ⊕ -4⊗x⁴\n\njulia> p+0\n0⊗x⁰ ⊕ 0⊗x² ⊕ -4⊗x³\n\njulia> (-2)*p\n0⊗x⁰ ⊕ -2⊗x² ⊕ -6⊗x³","category":"page"},{"location":"polys/#Exponentiation","page":"Polynomials","title":"Exponentiation","text":"","category":"section"},{"location":"polys/","page":"Polynomials","title":"Polynomials","text":"Given a tropical polynomial p, there are two ways to think about p^n where n is a positive integer. First, it is repeated multiplication underbracep cdot p cdots p_n. The other is to exploit a feature of tropical arithmetic that (a oplus b)^n = a^n oplus b^n. The latter is simpler and faster to compute, and that is how we have implemented exponentiation.","category":"page"},{"location":"polys/","page":"Polynomials","title":"Polynomials","text":"WARNING: Future versions of SimpleTropical might do things differently.","category":"page"},{"location":"polys/","page":"Polynomials","title":"Polynomials","text":"julia> p = 2x + 5x^2\n2⊗x¹ ⊕ 5⊗x²\n\njulia> p*p*p\n6⊗x³ ⊕ 9⊗x⁴ ⊕ 12⊗x⁵ ⊕ 15⊗x⁶\n\njulia> p^3\n6⊗x³ ⊕ 15⊗x⁶","category":"page"},{"location":"polys/","page":"Polynomials","title":"Polynomials","text":"Note that p^3 and p*p*p are different polynomials, but they are identical as functions. ","category":"page"},{"location":"polys/#Evaluation","page":"Polynomials","title":"Evaluation","text":"","category":"section"},{"location":"polys/","page":"Polynomials","title":"Polynomials","text":"To evaluate a polynomial p for a number a, simply use p(a). If a is not already a  Tropical number, it is converted to one.","category":"page"},{"location":"polys/","page":"Polynomials","title":"Polynomials","text":"julia> p = -2x + 5x^2\n-2⊗x¹ ⊕ 5⊗x²\n\njulia> p(0)      # min of -2 and 5\nTropical(-2)\n\njulia> p(10)     # min of 8 and 25\nTropical(8)\n\njulia> p(-10)    # min of -12 and -15\nTropical(-15)","category":"page"},{"location":"polys/#Conversion-to-a-Function","page":"Polynomials","title":"Conversion to a Function","text":"","category":"section"},{"location":"polys/","page":"Polynomials","title":"Polynomials","text":"The output of a TropicalPolynomial is always a Tropical number. If we wish to use a tropical polynomial as a function from the reals to the reals, then make_function(p) converts p into a Function that can be used, for example, in plotting.","category":"page"},{"location":"polys/","page":"Polynomials","title":"Polynomials","text":"julia> p = -2x + 5x^2\n-2⊗x¹ ⊕ 5⊗x²\n\njulia> f = make_function(p);\n\njulia> f(-10)\n-15","category":"page"},{"location":"polys/#Equality","page":"Polynomials","title":"Equality","text":"","category":"section"},{"location":"polys/","page":"Polynomials","title":"Polynomials","text":"Use == to test if two tropical polynomials are equal. This means that they have exactly the same terms (powers of x and corresponding coefficients). Two polynomials might be equal as functions but will not be deemed equal by ==.","category":"page"},{"location":"polys/","page":"Polynomials","title":"Polynomials","text":"julia> p = 1 + 3x + x^2\n1⊗x⁰ ⊕ 3⊗x¹ ⊕ 0⊗x²\n\njulia> q = 1 + x^2\n1⊗x⁰ ⊕ 0⊗x²\n\njulia> all(p(a)==q(a) for a in -10:0.1:10)  # p and q give identical results\ntrue\n\njulia> p==q     # but they are different polynomials\nfalse","category":"page"},{"location":"polys/#To-Do-List","page":"Polynomials","title":"To Do List","text":"","category":"section"},{"location":"polys/","page":"Polynomials","title":"Polynomials","text":"Implement a roots function. This seems feasible.\nImplement a way to tell if two polynomials are equal as functions. Or find a way to reduce polynomials to a canonical form by eliminating unnecessary terms. Not clear exactly how to do this. ","category":"page"},{"location":"#SimpleTropical","page":"SimpleTropical","title":"SimpleTropical","text":"","category":"section"},{"location":"","page":"SimpleTropical","title":"SimpleTropical","text":"This is an implementation of tropical (min-plus) arithmetic in Julia.","category":"page"},{"location":"#Numbers","page":"SimpleTropical","title":"Numbers","text":"","category":"section"},{"location":"","page":"SimpleTropical","title":"SimpleTropical","text":"The tropical numbers consist of the real numbers and infinity. The SimpleTropical module defines the Tropical type (which is a subtype of Number). ","category":"page"},{"location":"","page":"SimpleTropical","title":"SimpleTropical","text":"julia> using SimpleTropical\n\njulia> x = Tropical(3.5)\nTropical(3.5)\n\njulia> y = Tropical{Int}(4)\nTropical(4)","category":"page"},{"location":"","page":"SimpleTropical","title":"SimpleTropical","text":"Tropical infinity is available via TropicalInf:","category":"page"},{"location":"","page":"SimpleTropical","title":"SimpleTropical","text":"julia> TropicalInf\nTropical(∞)","category":"page"},{"location":"#Conversion-to-real-numbers","page":"SimpleTropical","title":"Conversion to real numbers","text":"","category":"section"},{"location":"","page":"SimpleTropical","title":"SimpleTropical","text":"To convert a Tropical number to a real number, use real:","category":"page"},{"location":"","page":"SimpleTropical","title":"SimpleTropical","text":"julia> a = Tropical(5)\nTropical(5)\n\njulia> a+2\nTropical(2)\n\njulia> real(a)+2\n7","category":"page"},{"location":"#Arithmetic","page":"SimpleTropical","title":"Arithmetic","text":"","category":"section"},{"location":"","page":"SimpleTropical","title":"SimpleTropical","text":"The + operation is defined as the min of the two values and * as the sum:","category":"page"},{"location":"","page":"SimpleTropical","title":"SimpleTropical","text":"julia> x+y\nTropical(3.5)\n\njulia> x*y\nTropical(7.5)","category":"page"},{"location":"","page":"SimpleTropical","title":"SimpleTropical","text":"The identity element for + is TropicalInf and the identity element for * is Tropical(0):","category":"page"},{"location":"","page":"SimpleTropical","title":"SimpleTropical","text":"julia> x + TropicalInf\nTropical(3.5)\n\njulia> x * Tropical(0)\nTropical(3.5)","category":"page"},{"location":"","page":"SimpleTropical","title":"SimpleTropical","text":"No elements in tropical arithmetic have additive inverses, but they do have multiplicative inverses (except for infinity):","category":"page"},{"location":"","page":"SimpleTropical","title":"SimpleTropical","text":"julia> inv(x)\nTropical(-3.5)\n\njulia> inv(TropicalInf)\nERROR: DomainError with Tropical(∞):\nTropicalInf is not invertible","category":"page"},{"location":"","page":"SimpleTropical","title":"SimpleTropical","text":"Exponentiation by integers works:","category":"page"},{"location":"","page":"SimpleTropical","title":"SimpleTropical","text":"julia> x^10\nTropical(35.0)\n\njulia> x^-2\nTropical(-7.0)","category":"page"},{"location":"","page":"SimpleTropical","title":"SimpleTropical","text":"Tropical division is permitted, except one cannot divide by infinity:","category":"page"},{"location":"","page":"SimpleTropical","title":"SimpleTropical","text":"julia> Tropical(3) / Tropical(2)\nTropical(1)\n\njulia> Tropical(3) / Tropical(Inf)\nERROR: DomainError with Tropical(∞):\nTropicalInf is not invertible","category":"page"},{"location":"","page":"SimpleTropical","title":"SimpleTropical","text":"Tropical subtraction is undefined and therefore forbidden.","category":"page"},{"location":"#and","page":"SimpleTropical","title":"⊕ and ⊗","text":"","category":"section"},{"location":"","page":"SimpleTropical","title":"SimpleTropical","text":"The symbols ⊕ and ⊗ may be used instead of + and * for Tropical numbers. In addition, these may be used on Real numbers with the result being the appropriate Tropical number.","category":"page"},{"location":"","page":"SimpleTropical","title":"SimpleTropical","text":"julia> 5 ⊕ 2\nTropical(2)\n\njulia> 5 ⊗ 2\nTropical(7)","category":"page"},{"location":"","page":"SimpleTropical","title":"SimpleTropical","text":"Note: In the REPL, the symbol ⊕ is created by typing \\oplus and then pressing TAB. Likewise, ⊗ is created as \\otimes followed by TAB.","category":"page"},{"location":"#Identity-elements:-zero-and-one","page":"SimpleTropical","title":"Identity elements: zero and one","text":"","category":"section"},{"location":"","page":"SimpleTropical","title":"SimpleTropical","text":"The Julia function zero normally returns the number zero because that is the identity element for addition; likewise, one returns the number one because  that is the identity element for multiplication.","category":"page"},{"location":"","page":"SimpleTropical","title":"SimpleTropical","text":"In tropical arithmetic, these identity elements are Tropical(∞) and Tropical(0),  respectively. Therefore we define the zero and one functions to return these values.","category":"page"},{"location":"","page":"SimpleTropical","title":"SimpleTropical","text":"julia> a = Tropical(3)\nTropical(3)\n\njulia> zero(a)\nTropical(∞)\n\njulia> zero(Tropical)\nTropical(∞)\n\njulia> one(a)\nTropical(0)\n\njulia> one(Tropical)\nTropical(0)","category":"page"},{"location":"","page":"SimpleTropical","title":"SimpleTropical","text":"Likewise, the functions zeros and ones return an array of the appropriate values:","category":"page"},{"location":"","page":"SimpleTropical","title":"SimpleTropical","text":"julia> zeros(Tropical,3)\n3-element Vector{Tropical}:\n Tropical(∞)\n Tropical(∞)\n Tropical(∞)\n\njulia> ones(Tropical,3)\n3-element Vector{Tropical}:\n Tropical(0)\n Tropical(0)\n Tropical(0)","category":"page"},{"location":"#Predicates","page":"SimpleTropical","title":"Predicates","text":"","category":"section"},{"location":"","page":"SimpleTropical","title":"SimpleTropical","text":"Use isinf(X) to test if a tropical number is infinity.","category":"page"},{"location":"","page":"SimpleTropical","title":"SimpleTropical","text":"julia> isinf(x)\nfalse\n\njulia> isinf(TropicalInf)\ntrue","category":"page"},{"location":"","page":"SimpleTropical","title":"SimpleTropical","text":"The usual comparison operators == and !== work as expected:","category":"page"},{"location":"","page":"SimpleTropical","title":"SimpleTropical","text":"julia> Tropical(3.0) == Tropical(3)\ntrue\n\njulia> Tropical(3.1) != Tropical(3//1)\ntrue","category":"page"},{"location":"","page":"SimpleTropical","title":"SimpleTropical","text":"Likewise, standard ordering comparisons work as expected:","category":"page"},{"location":"","page":"SimpleTropical","title":"SimpleTropical","text":"julia> Tropical(π) < Tropical(3)\nfalse\n\njulia> Tropical(π) > Tropical(3)\ntrue\n\njulia> Tropical(5) < TropicalInf\ntrue","category":"page"},{"location":"#Display-Style","page":"SimpleTropical","title":"Display Style","text":"","category":"section"},{"location":"","page":"SimpleTropical","title":"SimpleTropical","text":"By default, Tropical numbers are displayed in the form Tropical(xxx) such as  Tropical(-3) or Tropical(∞). This behavior can be changed using the function  long_tropical_show. ","category":"page"},{"location":"","page":"SimpleTropical","title":"SimpleTropical","text":"long_tropical_show(true) gives the default behavior.\nlong_tropical_show(false) makes Tropical numbers appear as ordinary real numbers.","category":"page"},{"location":"","page":"SimpleTropical","title":"SimpleTropical","text":"julia> long_tropical_show(false)\nfalse\n\njulia> 5 ⊕ 2\n2\n\njulia> 5 ⊗ 2\n7\n\njulia> typeof(ans)\nTropical{Int64}","category":"page"},{"location":"","page":"SimpleTropical","title":"SimpleTropical","text":"Calling long_tropical_show() without any arguments returns the current state for showing Tropical numbers: true for the default behavior and false  for the short display.","category":"page"}]
}
