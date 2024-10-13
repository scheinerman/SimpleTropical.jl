var documenterSearchIndex = {"docs":
[{"location":"#SimpleTropical","page":"SimpleTropical","title":"SimpleTropical","text":"","category":"section"},{"location":"","page":"SimpleTropical","title":"SimpleTropical","text":"This is an implementation of tropical (min-plus) arithmetic in Julia.","category":"page"},{"location":"#Numbers","page":"SimpleTropical","title":"Numbers","text":"","category":"section"},{"location":"","page":"SimpleTropical","title":"SimpleTropical","text":"The tropical numbers consist of the real numbers and infinity. The SimpleTropical module defines the Tropical type (which is a subtype of Number). ","category":"page"},{"location":"","page":"SimpleTropical","title":"SimpleTropical","text":"julia> using SimpleTropical\n\njulia> x = Tropical(3.5)\nTropical(3.5)\n\njulia> y = Tropical{Int}(4)\nTropical(4)","category":"page"},{"location":"","page":"SimpleTropical","title":"SimpleTropical","text":"Tropical infinity is available via TropicalInf:","category":"page"},{"location":"","page":"SimpleTropical","title":"SimpleTropical","text":"julia> TropicalInf\nTropical(∞)","category":"page"},{"location":"#Conversion-to-real-numbers","page":"SimpleTropical","title":"Conversion to real numbers","text":"","category":"section"},{"location":"","page":"SimpleTropical","title":"SimpleTropical","text":"To convert a Tropical number to a real number, use real:","category":"page"},{"location":"","page":"SimpleTropical","title":"SimpleTropical","text":"julia> a = Tropical(5)\nTropical(5)\n\njulia> a+2\nTropical(2)\n\njulia> real(a)+2\n7","category":"page"},{"location":"#Arithmetic","page":"SimpleTropical","title":"Arithmetic","text":"","category":"section"},{"location":"","page":"SimpleTropical","title":"SimpleTropical","text":"The + operation is defined as the min of the two values and * as the sum:","category":"page"},{"location":"","page":"SimpleTropical","title":"SimpleTropical","text":"julia> x+y\nTropical(3.5)\n\njulia> x*y\nTropical(7.5)","category":"page"},{"location":"","page":"SimpleTropical","title":"SimpleTropical","text":"The identity element for + is TropicalInf and the identity element for * is Tropical(0):","category":"page"},{"location":"","page":"SimpleTropical","title":"SimpleTropical","text":"julia> x + TropicalInf\nTropical(3.5)\n\njulia> x * Tropical(0)\nTropical(3.5)","category":"page"},{"location":"","page":"SimpleTropical","title":"SimpleTropical","text":"No elements in tropical arithmetic have additive inverses, but they do have multiplicative inverses (except for infinity):","category":"page"},{"location":"","page":"SimpleTropical","title":"SimpleTropical","text":"julia> inv(x)\nTropical(-3.5)\n\njulia> inv(TropicalInf)\nERROR: AssertionError: TropicalInf is not invertible","category":"page"},{"location":"","page":"SimpleTropical","title":"SimpleTropical","text":"Exponentiation by integers works:","category":"page"},{"location":"","page":"SimpleTropical","title":"SimpleTropical","text":"julia> x^10\nTropical(35.0)\n\njulia> x^-2\nTropical(-7.0)","category":"page"},{"location":"","page":"SimpleTropical","title":"SimpleTropical","text":"Tropical division is permitted, except one cannot divide by infinity:","category":"page"},{"location":"","page":"SimpleTropical","title":"SimpleTropical","text":"julia> Tropical(3) / Tropical(2)\nTropical(1)\n\njulia> Tropical(3) / Tropical(Inf)\nERROR: AssertionError: TropicalInf is not invertible","category":"page"},{"location":"","page":"SimpleTropical","title":"SimpleTropical","text":"Tropical subtraction is undefined and therefore forbidden.","category":"page"},{"location":"#and","page":"SimpleTropical","title":"⊕ and ⊗","text":"","category":"section"},{"location":"","page":"SimpleTropical","title":"SimpleTropical","text":"The symbols ⊕ and ⊗ may be used instead of + and * for Tropical numbers. In addition, these may be used on Real numbers with the result being the appropriate Tropical number.","category":"page"},{"location":"","page":"SimpleTropical","title":"SimpleTropical","text":"julia> 5 ⊕ 2\nTropical(2)\n\njulia> 5 ⊗ 2\nTropical(7)","category":"page"},{"location":"","page":"SimpleTropical","title":"SimpleTropical","text":"Note: In the REPL, the symbol ⊕ is created by typing \\oplus and then pressing TAB. Likewise, ⊗ is created as \\otimes followed by TAB.","category":"page"},{"location":"#Identity-elements:-zero-and-one","page":"SimpleTropical","title":"Identity elements: zero and one","text":"","category":"section"},{"location":"","page":"SimpleTropical","title":"SimpleTropical","text":"The Julia function zero normally returns the number zero because that is the identity element for addition; likewise, one returns the number one because  that is the identity element for multiplication.","category":"page"},{"location":"","page":"SimpleTropical","title":"SimpleTropical","text":"In tropical arithmetic, these identity elements are Tropical(∞) and Tropical(0),  respectively. Therefore we define the zero and one functions to return these values.","category":"page"},{"location":"","page":"SimpleTropical","title":"SimpleTropical","text":"julia> a = Tropical(3)\nTropical(3)\n\njulia> zero(a)\nTropical(∞)\n\njulia> zero(Tropical)\nTropical(∞)\n\njulia> one(a)\nTropical(0)\n\njulia> one(Tropical)\nTropical(0)","category":"page"},{"location":"","page":"SimpleTropical","title":"SimpleTropical","text":"Likewise, the functions zeros and ones return an array of the appropriate values:","category":"page"},{"location":"","page":"SimpleTropical","title":"SimpleTropical","text":"julia> zeros(Tropical,3)\n3-element Vector{Tropical}:\n Tropical(∞)\n Tropical(∞)\n Tropical(∞)\n\njulia> ones(Tropical,3)\n3-element Vector{Tropical}:\n Tropical(0)\n Tropical(0)\n Tropical(0)","category":"page"},{"location":"#Predicates","page":"SimpleTropical","title":"Predicates","text":"","category":"section"},{"location":"","page":"SimpleTropical","title":"SimpleTropical","text":"Use isinf(X) to test if a tropical number is infinity.","category":"page"},{"location":"","page":"SimpleTropical","title":"SimpleTropical","text":"julia> isinf(x)\nfalse\n\njulia> isinf(TropicalInf)\ntrue","category":"page"},{"location":"","page":"SimpleTropical","title":"SimpleTropical","text":"The usual comparison operators == and !== work as expected:","category":"page"},{"location":"","page":"SimpleTropical","title":"SimpleTropical","text":"julia> Tropical(3.0) == Tropical(3)\ntrue\n\njulia> Tropical(3.1) != Tropical(3//1)\ntrue","category":"page"},{"location":"","page":"SimpleTropical","title":"SimpleTropical","text":"Likewise, standard ordering comparisons work as expected:","category":"page"},{"location":"","page":"SimpleTropical","title":"SimpleTropical","text":"julia> Tropical(π) < Tropical(3)\nfalse\n\njulia> Tropical(π) > Tropical(3)\ntrue\n\njulia> Tropical(5) < TropicalInf\ntrue","category":"page"},{"location":"#Display-Style","page":"SimpleTropical","title":"Display Style","text":"","category":"section"},{"location":"","page":"SimpleTropical","title":"SimpleTropical","text":"By default, Tropical numbers are displayed in the form Tropical(xxx) such as  Tropical(-3) or Tropical(∞). This behavior can be changed using the function  long_tropical_show. ","category":"page"},{"location":"","page":"SimpleTropical","title":"SimpleTropical","text":"long_tropical_show(true) gives the default behavior.\nlong_tropical_show(false) makes Tropical numbers appear as ordinary real numbers.","category":"page"},{"location":"","page":"SimpleTropical","title":"SimpleTropical","text":"julia> long_tropical_show(false)\nfalse\n\njulia> 5 ⊕ 2\n2\n\njulia> 5 ⊗ 2\n7\n\njulia> typeof(ans)\nTropical{Int64}","category":"page"},{"location":"","page":"SimpleTropical","title":"SimpleTropical","text":"Calling long_tropical_show() without any arguments returns the current state for showing Tropical numbers: true for the default behavior and false  for the short display.","category":"page"}]
}
