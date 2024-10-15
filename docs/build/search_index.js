var documenterSearchIndex = {"docs":
[{"location":"polys/#Tropical-Polynomials","page":"Tropical Polynomials","title":"Tropical Polynomials","text":"","category":"section"},{"location":"polys/#Construction","page":"Tropical Polynomials","title":"Construction","text":"","category":"section"},{"location":"polys/","page":"Tropical Polynomials","title":"Tropical Polynomials","text":"There are various ways to create a tropical polynomial. ","category":"page"},{"location":"polys/#Empty-sum","page":"Tropical Polynomials","title":"Empty sum","text":"","category":"section"},{"location":"polys/","page":"Tropical Polynomials","title":"Tropical Polynomials","text":"TropicalPolynomial() creates a polynomial with no terms:","category":"page"},{"location":"polys/","page":"Tropical Polynomials","title":"Tropical Polynomials","text":"julia> p = TropicalPolynomial()\n∞","category":"page"},{"location":"polys/","page":"Tropical Polynomials","title":"Tropical Polynomials","text":"Since p is an empty sum, it represents a constant corresponding to the additive identity element, ∞.","category":"page"},{"location":"polys/#Exponent/Coefficient-Pairs","page":"Tropical Polynomials","title":"Exponent/Coefficient Pairs","text":"","category":"section"},{"location":"polys/","page":"Tropical Polynomials","title":"Tropical Polynomials","text":"There are two ways to define a TropicalPolynomial by specifying exponents and coefficients. First, we can provide a list of exponent/coefficient pairs, like this:","category":"page"},{"location":"polys/","page":"Tropical Polynomials","title":"Tropical Polynomials","text":"julia> p = TropicalPolynomial([0=>3, 4=>1.5])\n3.0⊗x⁰ ⊕ 1.5⊗x⁴","category":"page"},{"location":"polys/","page":"Tropical Polynomials","title":"Tropical Polynomials","text":"The pair 4 => 1.5 means the coefficient of x^4 is Tropical(1.5). ","category":"page"},{"location":"polys/","page":"Tropical Polynomials","title":"Tropical Polynomials","text":"Note that the exponents may be negative integers:","category":"page"},{"location":"polys/","page":"Tropical Polynomials","title":"Tropical Polynomials","text":"julia> p = TropicalPolynomial([-1 => 4, 1 => 0])\n4⊗x⁻¹ ⊕ 0⊗x¹","category":"page"},{"location":"polys/","page":"Tropical Polynomials","title":"Tropical Polynomials","text":"Alternatively, we may create a dictionary mapping integers to tropical numbers, and pass that to TropicalPolynomial. ","category":"page"},{"location":"polys/","page":"Tropical Polynomials","title":"Tropical Polynomials","text":"julia> clist = Dict{Int, Tropical}()\nDict{Int64, Tropical}()\n\njulia> clist[-1] = 4\n4\n\njulia> clist[0] = 1\n1\n\njulia> clist[2] = -5\n-5\n\njulia> p = TropicalPolynomial(clist)\n4⊗x⁻¹ ⊕ 1⊗x⁰ ⊕ -5⊗x²","category":"page"},{"location":"polys/#The-tropical_x-function","page":"Tropical Polynomials","title":"The tropical_x function","text":"","category":"section"},{"location":"polys/","page":"Tropical Polynomials","title":"Tropical Polynomials","text":"A comfortable way to create polynomials is to use an expression representing the variable x and then combine it using coefficients and powers. To that end, we have the function tropical_x that returns the polynomial 0 otimes x.","category":"page"},{"location":"polys/","page":"Tropical Polynomials","title":"Tropical Polynomials","text":"julia> x = tropical_x()\n0⊗x¹\n\njulia> p = 2 + x^2 + (-4)*x^3\n2⊗x⁰ ⊕ 0⊗x² ⊕ -4⊗x³","category":"page"},{"location":"polys/","page":"Tropical Polynomials","title":"Tropical Polynomials","text":"If k is an integer, tropical_x(k) returns 0 otimes x^k. This is a convenient way to create negative exponents.","category":"page"},{"location":"polys/","page":"Tropical Polynomials","title":"Tropical Polynomials","text":"julia> x = tropical_x()\n0⊗x¹\n\njulia> xinv = tropical_x(-1)\n0⊗x⁻¹\n\njulia> 2x + (-3)xinv\n-3⊗x⁻¹ ⊕ 2⊗x¹","category":"page"},{"location":"polys/#Coefficients","page":"Tropical Polynomials","title":"Coefficients","text":"","category":"section"},{"location":"polys/","page":"Tropical Polynomials","title":"Tropical Polynomials","text":"The coefs function returns a dictionary whose keys are the exponents and those corresponding values are the coefficients.","category":"page"},{"location":"polys/","page":"Tropical Polynomials","title":"Tropical Polynomials","text":"julia> x = tropical_x()\n0⊗x¹\n\njulia> p = 2 + 3x + (-5)x^2\n2⊗x⁰ ⊕ 3⊗x¹ ⊕ -5⊗x²\n\njulia> coefs(p)\nDict{Int64, Tropical} with 3 entries:\n  0 => Tropical(2)\n  2 => Tropical(-5)\n  1 => Tropical(3)","category":"page"},{"location":"polys/#Arithmetic","page":"Tropical Polynomials","title":"Arithmetic","text":"","category":"section"},{"location":"polys/#Addition-and-multiplication","page":"Tropical Polynomials","title":"Addition and multiplication","text":"","category":"section"},{"location":"polys/","page":"Tropical Polynomials","title":"Tropical Polynomials","text":"Polynomial addition and multiplication can be performed using the usual + and * operations, though  ⊕ and ⊗ may be used instead. If a polynomial is added to (or multiplied by) a real number, that number is automatically converted to Tropical.","category":"page"},{"location":"polys/","page":"Tropical Polynomials","title":"Tropical Polynomials","text":"julia> x = tropical_x()\n0⊗x¹\n\njulia> p = 2 + x^2 + (-4)*x^3\n2⊗x⁰ ⊕ 0⊗x² ⊕ -4⊗x³\n\njulia> q = x+1\n1⊗x⁰ ⊕ 0⊗x¹\n\njulia> p+q\n1⊗x⁰ ⊕ 0⊗x¹ ⊕ 0⊗x² ⊕ -4⊗x³\n\njulia> p*q\n3⊗x⁰ ⊕ 2⊗x¹ ⊕ 1⊗x² ⊕ -3⊗x³ ⊕ -4⊗x⁴\n\njulia> p+0\n0⊗x⁰ ⊕ 0⊗x² ⊕ -4⊗x³\n\njulia> (-2)*p\n0⊗x⁰ ⊕ -2⊗x² ⊕ -6⊗x³","category":"page"},{"location":"polys/#Exponentiation","page":"Tropical Polynomials","title":"Exponentiation","text":"","category":"section"},{"location":"polys/","page":"Tropical Polynomials","title":"Tropical Polynomials","text":"Given a tropical polynomial p, there are two ways to think about p^n where n is a positive integer. First, it is repeated multiplication underbracep cdot p cdots p_n. The other is to exploit a feature of tropical arithmetic that (a oplus b)^n = a^n oplus b^n. The latter is simpler and faster to compute, and that is how we have implemented exponentiation.","category":"page"},{"location":"polys/","page":"Tropical Polynomials","title":"Tropical Polynomials","text":"WARNING: Future versions of SimpleTropical might do things differently.","category":"page"},{"location":"polys/","page":"Tropical Polynomials","title":"Tropical Polynomials","text":"julia> p = 2x + 5x^2\n2⊗x¹ ⊕ 5⊗x²\n\njulia> p*p*p\n6⊗x³ ⊕ 9⊗x⁴ ⊕ 12⊗x⁵ ⊕ 15⊗x⁶\n\njulia> p^3\n6⊗x³ ⊕ 15⊗x⁶","category":"page"},{"location":"polys/","page":"Tropical Polynomials","title":"Tropical Polynomials","text":"Note that p^3 and p*p*p are different polynomials, but they are identical as functions. ","category":"page"},{"location":"polys/#Evaluation","page":"Tropical Polynomials","title":"Evaluation","text":"","category":"section"},{"location":"polys/","page":"Tropical Polynomials","title":"Tropical Polynomials","text":"To evaluate a polynomial p for a number a, simply use p(a). If a is not already a  Tropical number, it is converted to one.","category":"page"},{"location":"polys/","page":"Tropical Polynomials","title":"Tropical Polynomials","text":"julia> p = -2x + 5x^2\n-2⊗x¹ ⊕ 5⊗x²\n\njulia> p(0)      # min of -2 and 5\nTropical(-2)\n\njulia> p(10)     # min of 8 and 25\nTropical(8)\n\njulia> p(-10)    # min of -12 and -15\nTropical(-15)","category":"page"},{"location":"polys/#Conversion-to-a-Function","page":"Tropical Polynomials","title":"Conversion to a Function","text":"","category":"section"},{"location":"polys/","page":"Tropical Polynomials","title":"Tropical Polynomials","text":"The output of a TropicalPolynomial is always a Tropical number. If we wish to use a tropical polynomial as a function from the reals to the reals, then make_function(p) converts p into a Function that can be used, for example, in plotting.","category":"page"},{"location":"polys/","page":"Tropical Polynomials","title":"Tropical Polynomials","text":"julia> p = -2x + 5x^2\n-2⊗x¹ ⊕ 5⊗x²\n\njulia> f = make_function(p);\n\njulia> f(-10)\n-15","category":"page"},{"location":"polys/#Equality","page":"Tropical Polynomials","title":"Equality","text":"","category":"section"},{"location":"polys/","page":"Tropical Polynomials","title":"Tropical Polynomials","text":"Use == to test if two tropical polynomials are equal. This means that they have exactly the same terms (powers of x and corresponding coefficients). Two polynomials might be equal as functions but will not be deemed equal by ==.","category":"page"},{"location":"polys/","page":"Tropical Polynomials","title":"Tropical Polynomials","text":"julia> p = 1 + 3x + x^2\n1⊗x⁰ ⊕ 3⊗x¹ ⊕ 0⊗x²\n\njulia> q = 1 + x^2\n1⊗x⁰ ⊕ 0⊗x²\n\njulia> all(p(a)==q(a) for a in -10:0.1:10)  # p and q give identical results\ntrue\n\njulia> p==q     # but they are different polynomials\nfalse","category":"page"},{"location":"polys/#Roots","page":"Tropical Polynomials","title":"Roots","text":"","category":"section"},{"location":"polys/#Background:-Roots-of-a-tropical-polynomial","page":"Tropical Polynomials","title":"Background: Roots of a tropical polynomial","text":"","category":"section"},{"location":"polys/","page":"Tropical Polynomials","title":"Tropical Polynomials","text":"Consider the polynomial p(x) = 1 oplus (0otimes x) oplus (-2 otimes x^2). ","category":"page"},{"location":"polys/","page":"Tropical Polynomials","title":"Tropical Polynomials","text":"Using real arithmetic, this is p(x) = min1 0+x -2+2x. ","category":"page"},{"location":"polys/","page":"Tropical Polynomials","title":"Tropical Polynomials","text":"The number x is a root of this polynomial if the value of p(x) is attained two or more times in the list of terms. To do this we solve all of the equations:  1=0+x, 1=-2+2x, and 0+x =-2+2x.","category":"page"},{"location":"polys/","page":"Tropical Polynomials","title":"Tropical Polynomials","text":"That gives 1, frac32, and 2 as possible roots.  Substituting we find:","category":"page"},{"location":"polys/","page":"Tropical Polynomials","title":"Tropical Polynomials","text":"For x=1, the values are  101. This is not a root (repeated value is not the minimum).","category":"page"},{"location":"polys/","page":"Tropical Polynomials","title":"Tropical Polynomials","text":"For x=frac32, the values are 11frac32. This is a root (repeated value is the minimum).","category":"page"},{"location":"polys/","page":"Tropical Polynomials","title":"Tropical Polynomials","text":"For x=2, the values are 122. This is not a root (repeated value is not the minimum).","category":"page"},{"location":"polys/","page":"Tropical Polynomials","title":"Tropical Polynomials","text":"Therefore, x=frac32 is the only root of the polynomial p(x) = 1 oplus (0otimes x) oplus (-2 otimes x^2).","category":"page"},{"location":"polys/#The-roots-function","page":"Tropical Polynomials","title":"The roots function","text":"","category":"section"},{"location":"polys/","page":"Tropical Polynomials","title":"Tropical Polynomials","text":"To find the roots of a tropical polynomial, use the roots function. ","category":"page"},{"location":"polys/","page":"Tropical Polynomials","title":"Tropical Polynomials","text":"julia> x = tropical_x();\n\njulia> p = 0 + x + 5x^3\n0⊗x⁰ ⊕ 0⊗x¹ ⊕ 5⊗x³\n\njulia> roots(p)\n2-element Vector{Tropical}:\n Tropical(-5//2)\n     Tropical(0)","category":"page"},{"location":"polys/#Roundoff-issues","page":"Tropical Polynomials","title":"Roundoff issues","text":"","category":"section"},{"location":"polys/","page":"Tropical Polynomials","title":"Tropical Polynomials","text":"When the polynomials coefficients are exact numbers (i.e., Integer or Rational) then roots returns  exact results. However, if the coefficients are floating point numbers, round off issues may occur.","category":"page"},{"location":"polys/","page":"Tropical Polynomials","title":"Tropical Polynomials","text":"Example: Here we find the roots of a polynomial all of whose coefficients are Integer type:","category":"page"},{"location":"polys/","page":"Tropical Polynomials","title":"Tropical Polynomials","text":"julia> p = -3 + x + (-3)x^2 + x^3\n-3⊗x⁰ ⊕ 0⊗x¹ ⊕ -3⊗x² ⊕ 0⊗x³\n\njulia> roots(p)\n2-element Vector{Tropical{Int64}}:\n Tropical(-3)\n  Tropical(0)","category":"page"},{"location":"polys/","page":"Tropical Polynomials","title":"Tropical Polynomials","text":"And now we find the roots of the same polynomial but chaning a coefficient to a floating point number:","category":"page"},{"location":"polys/","page":"Tropical Polynomials","title":"Tropical Polynomials","text":"julia> p = -3.0 + x + (-3)x^2 + x^3\n-3.0⊗x⁰ ⊕ 0⊗x¹ ⊕ -3⊗x² ⊕ 0⊗x³\n\njulia> roots(p)\n4-element Vector{Tropical}:\n Tropical(-3.0)\n   Tropical(-3)\n Tropical(-0.0)\n    Tropical(0)","category":"page"},{"location":"polys/","page":"Tropical Polynomials","title":"Tropical Polynomials","text":"Round off may cause roots to miss a root entirely. ","category":"page"},{"location":"polys/#To-Do-List","page":"Tropical Polynomials","title":"To Do List","text":"","category":"section"},{"location":"polys/","page":"Tropical Polynomials","title":"Tropical Polynomials","text":"Implement a way to tell if two polynomials are equal as functions perhaps by finding a way to reduce polynomials to a canonical form by eliminating unnecessary terms. Not clear exactly how to do this. ","category":"page"},{"location":"#Tropical-Arithmetic","page":"Tropical Arithmetic","title":"Tropical Arithmetic","text":"","category":"section"},{"location":"","page":"Tropical Arithmetic","title":"Tropical Arithmetic","text":"SimpleTropical provides an implementation of tropical (min-plus) arithmetic in Julia.","category":"page"},{"location":"#Numbers","page":"Tropical Arithmetic","title":"Numbers","text":"","category":"section"},{"location":"","page":"Tropical Arithmetic","title":"Tropical Arithmetic","text":"The tropical numbers consist of the real numbers and infinity. The SimpleTropical module defines the Tropical type (which is a subtype of Number). ","category":"page"},{"location":"","page":"Tropical Arithmetic","title":"Tropical Arithmetic","text":"julia> using SimpleTropical\n\njulia> x = Tropical(3.5)\nTropical(3.5)\n\njulia> y = Tropical{Int}(4)\nTropical(4)","category":"page"},{"location":"","page":"Tropical Arithmetic","title":"Tropical Arithmetic","text":"Tropical infinity is available via TropicalInf:","category":"page"},{"location":"","page":"Tropical Arithmetic","title":"Tropical Arithmetic","text":"julia> TropicalInf\nTropical(∞)","category":"page"},{"location":"#Conversion-to-real-numbers","page":"Tropical Arithmetic","title":"Conversion to real numbers","text":"","category":"section"},{"location":"","page":"Tropical Arithmetic","title":"Tropical Arithmetic","text":"To convert a Tropical number to a real number, use real:","category":"page"},{"location":"","page":"Tropical Arithmetic","title":"Tropical Arithmetic","text":"julia> a = Tropical(5)\nTropical(5)\n\njulia> a+2\nTropical(2)\n\njulia> real(a)+2\n7","category":"page"},{"location":"#Arithmetic","page":"Tropical Arithmetic","title":"Arithmetic","text":"","category":"section"},{"location":"","page":"Tropical Arithmetic","title":"Tropical Arithmetic","text":"The + operation is defined as the min of the two values and * as the sum:","category":"page"},{"location":"","page":"Tropical Arithmetic","title":"Tropical Arithmetic","text":"julia> x+y\nTropical(3.5)\n\njulia> x*y\nTropical(7.5)","category":"page"},{"location":"","page":"Tropical Arithmetic","title":"Tropical Arithmetic","text":"The identity element for + is TropicalInf and the identity element for * is Tropical(0):","category":"page"},{"location":"","page":"Tropical Arithmetic","title":"Tropical Arithmetic","text":"julia> x + TropicalInf\nTropical(3.5)\n\njulia> x * Tropical(0)\nTropical(3.5)","category":"page"},{"location":"","page":"Tropical Arithmetic","title":"Tropical Arithmetic","text":"No elements in tropical arithmetic have additive inverses, but they do have multiplicative inverses (except for infinity):","category":"page"},{"location":"","page":"Tropical Arithmetic","title":"Tropical Arithmetic","text":"julia> inv(x)\nTropical(-3.5)\n\njulia> inv(TropicalInf)\nERROR: DomainError with Tropical(∞):\nTropicalInf is not invertible","category":"page"},{"location":"","page":"Tropical Arithmetic","title":"Tropical Arithmetic","text":"Exponentiation by integers works:","category":"page"},{"location":"","page":"Tropical Arithmetic","title":"Tropical Arithmetic","text":"julia> x^10\nTropical(35.0)\n\njulia> x^-2\nTropical(-7.0)","category":"page"},{"location":"","page":"Tropical Arithmetic","title":"Tropical Arithmetic","text":"Tropical division is permitted, except one cannot divide by infinity:","category":"page"},{"location":"","page":"Tropical Arithmetic","title":"Tropical Arithmetic","text":"julia> Tropical(3) / Tropical(2)\nTropical(1)\n\njulia> Tropical(3) / Tropical(Inf)\nERROR: DomainError with Tropical(∞):\nTropicalInf is not invertible","category":"page"},{"location":"","page":"Tropical Arithmetic","title":"Tropical Arithmetic","text":"Tropical subtraction is undefined and therefore forbidden.","category":"page"},{"location":"#and","page":"Tropical Arithmetic","title":"⊕ and ⊗","text":"","category":"section"},{"location":"","page":"Tropical Arithmetic","title":"Tropical Arithmetic","text":"The symbols ⊕ and ⊗ may be used instead of + and * for Tropical numbers. In addition, these may be used on Real numbers with the result being the appropriate Tropical number.","category":"page"},{"location":"","page":"Tropical Arithmetic","title":"Tropical Arithmetic","text":"julia> 5 ⊕ 2\nTropical(2)\n\njulia> 5 ⊗ 2\nTropical(7)","category":"page"},{"location":"","page":"Tropical Arithmetic","title":"Tropical Arithmetic","text":"Note: In the REPL, the symbol ⊕ is created by typing \\oplus and then pressing TAB. Likewise, ⊗ is created as \\otimes followed by TAB.","category":"page"},{"location":"#Identity-elements:-zero-and-one","page":"Tropical Arithmetic","title":"Identity elements: zero and one","text":"","category":"section"},{"location":"","page":"Tropical Arithmetic","title":"Tropical Arithmetic","text":"The Julia function zero normally returns the number zero because that is the identity element for addition; likewise, one returns the number one because  that is the identity element for multiplication.","category":"page"},{"location":"","page":"Tropical Arithmetic","title":"Tropical Arithmetic","text":"In tropical arithmetic, these identity elements are Tropical(∞) and Tropical(0),  respectively. Therefore we define the zero and one functions to return these values.","category":"page"},{"location":"","page":"Tropical Arithmetic","title":"Tropical Arithmetic","text":"julia> a = Tropical(3)\nTropical(3)\n\njulia> zero(a)\nTropical(∞)\n\njulia> zero(Tropical)\nTropical(∞)\n\njulia> one(a)\nTropical(0)\n\njulia> one(Tropical)\nTropical(0)","category":"page"},{"location":"","page":"Tropical Arithmetic","title":"Tropical Arithmetic","text":"Likewise, the functions zeros and ones return an array of the appropriate values:","category":"page"},{"location":"","page":"Tropical Arithmetic","title":"Tropical Arithmetic","text":"julia> zeros(Tropical,3)\n3-element Vector{Tropical}:\n Tropical(∞)\n Tropical(∞)\n Tropical(∞)\n\njulia> ones(Tropical,3)\n3-element Vector{Tropical}:\n Tropical(0)\n Tropical(0)\n Tropical(0)","category":"page"},{"location":"#Predicates","page":"Tropical Arithmetic","title":"Predicates","text":"","category":"section"},{"location":"","page":"Tropical Arithmetic","title":"Tropical Arithmetic","text":"Use isinf(X) to test if a tropical number is infinity.","category":"page"},{"location":"","page":"Tropical Arithmetic","title":"Tropical Arithmetic","text":"julia> isinf(x)\nfalse\n\njulia> isinf(TropicalInf)\ntrue","category":"page"},{"location":"","page":"Tropical Arithmetic","title":"Tropical Arithmetic","text":"The usual comparison operators == and !== work as expected:","category":"page"},{"location":"","page":"Tropical Arithmetic","title":"Tropical Arithmetic","text":"julia> Tropical(3.0) == Tropical(3)\ntrue\n\njulia> Tropical(3.1) != Tropical(3//1)\ntrue","category":"page"},{"location":"","page":"Tropical Arithmetic","title":"Tropical Arithmetic","text":"Likewise, standard ordering comparisons work as expected:","category":"page"},{"location":"","page":"Tropical Arithmetic","title":"Tropical Arithmetic","text":"julia> Tropical(π) < Tropical(3)\nfalse\n\njulia> Tropical(π) > Tropical(3)\ntrue\n\njulia> Tropical(5) < TropicalInf\ntrue","category":"page"},{"location":"#Display-Style","page":"Tropical Arithmetic","title":"Display Style","text":"","category":"section"},{"location":"","page":"Tropical Arithmetic","title":"Tropical Arithmetic","text":"By default, Tropical numbers are displayed in the form Tropical(xxx) such as  Tropical(-3) or Tropical(∞). This behavior can be changed using the function  long_tropical_show. ","category":"page"},{"location":"","page":"Tropical Arithmetic","title":"Tropical Arithmetic","text":"long_tropical_show(true) gives the default behavior.\nlong_tropical_show(false) makes Tropical numbers appear as ordinary real numbers.","category":"page"},{"location":"","page":"Tropical Arithmetic","title":"Tropical Arithmetic","text":"julia> long_tropical_show(false)\nfalse\n\njulia> 5 ⊕ 2\n2\n\njulia> 5 ⊗ 2\n7\n\njulia> typeof(ans)\nTropical{Int64}","category":"page"},{"location":"","page":"Tropical Arithmetic","title":"Tropical Arithmetic","text":"Calling long_tropical_show() without any arguments returns the current state for showing Tropical numbers: true for the default behavior and false  for the short display.","category":"page"},{"location":"bonus/#Bonus:-Nice-subscripts-and-superscripts","page":"Bonus","title":"Bonus: Nice subscripts and superscripts","text":"","category":"section"},{"location":"bonus/","page":"Bonus","title":"Bonus","text":"The SimpleTropical module prints polynomials in an appealing style. ","category":"page"},{"location":"bonus/","page":"Bonus","title":"Bonus","text":"For example, the polynomial  -2 oplus (3otimes x) oplus (4 otimes x^2) is rendered as -2⊗x⁰ ⊕ 3⊗x¹ ⊕ 4⊗x². The function int2sup is used to convert an Integer into a String of superscipts. ","category":"page"},{"location":"bonus/","page":"Bonus","title":"Bonus","text":"The function int2sup is not exported by can be accessed using SimpleTropical.int2sup. For example:","category":"page"},{"location":"bonus/","page":"Bonus","title":"Bonus","text":"julia> \"x\" * SimpleTropical.int2sup(-1) * \"y\" * SimpleTropical.int2sup(3)\n\"x⁻¹y³\"","category":"page"},{"location":"bonus/","page":"Bonus","title":"Bonus","text":"We also provide the companion int2sub for subscripts:","category":"page"},{"location":"bonus/","page":"Bonus","title":"Bonus","text":"julia> \"a\" * SimpleTropical.int2sub(3)\n\"a₃\"","category":"page"},{"location":"bonus/","page":"Bonus","title":"Bonus","text":"Unfortunately, there is no good way to decorate a letter with aligned super and subscript. For example, the best way to render z_5^2 would be like this:","category":"page"},{"location":"bonus/","page":"Bonus","title":"Bonus","text":"julia> \"(z\" * SimpleTropical.int2sub(5) * \")\" * SimpleTropical.int2sup(2)\n\"(z₅)²\"","category":"page"},{"location":"bonus/","page":"Bonus","title":"Bonus","text":"The functions int2sub and int2sup are defined in src/scripter.jl. That file can be copied and used as desired. ","category":"page"}]
}
