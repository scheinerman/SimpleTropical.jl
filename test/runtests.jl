using Test
using SimpleTropical

x = Tropical(3)
y = Tropical(4)
@test x+y == Tropical(3)
@test x*y == Tropical(7)

z = TropicalInf
@test x+z == x
@test y+z == y

z = Tropical(0)
@test x*z == x
@test y*z == y

@test inv(x) == Tropical(-3)
@test x^-1 == inv(x)
@test x^10 == Tropical(30)
@test x^0 == Tropical(0)
