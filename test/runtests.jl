using Test
using SimpleTropical

x = Tropical(3.5)
y = Tropical(4)
inf = TropicalInf

@testset "Comparisons" begin
    @test x == x
    @test x != y
end

@testset "Infinity" begin
    @test x != inf
    @test inf != y
    @test inf == inf
    @test inf != Tropical(0)
    @test Tropical(0) != inf

    @test !isequal(x, inf)
    @test !isequal(inf, y)
    @test isequal(inf, inf)
    @test !isequal(inf, Tropical(0))
    @test !isequal(Tropical(0), inf)
end

@testset "Sum" begin
    @test x + y == Tropical(3.5)
    @test x + inf == x
    @test inf + y == y
end

@testset "Product" begin
    z = Tropical(0)
    @test x * y == Tropical(7.5)
    @test x * z == x
    @test y * z == y
    @test inf * x == inf
    @test y * inf == inf
end

@testset "Inv and power" begin
    @test inv(x) == Tropical(-3.5)
    @test y^-1 == inv(y)
    @test x^10 == Tropical(35.0)
    @test y^0 == Tropical(0)
    @test inf^5 == inf
    @test_throws AssertionError inf^-3
    @test_throws AssertionError inv(inf)
end

@testset "Conversions" begin
    @test convert(Tropical, 5) === Tropical(5)
    @test convert(Tropical{Float64}, 5) === Tropical(5.0)
    @test convert(Tropical, x) === x
    @test convert(Tropical{Int}, y) === y
    @test convert(Tropical{Float32}, x) === Tropical(convert(Float32, x.val))
    @test convert(Tropical{Float64}, inf) === Tropical{Float64}(0.0, true)
end

@testset "Identity elements" begin
    a = Tropical(5)
    @test a + zero(a) == a
    @test a * one(a) == a

    x = ones(Tropical{Int}, 5)
    y = zeros(Tropical, 5)
    @test x + y == x
    @test x .* y == y
end

@testset "⊕ and ⊗ notation" begin
    @test 3 ⊕ 5 == 3
    @test 3 ⊗ 5 == 8

    @test Inf ⊕ 5 == 5
    @test Inf ⊗ 5 == Tropical(Inf)
    @test Inf ⊗ 5 == Inf
end

@testset "Conversion to real" begin
    a = Tropical(5)
    @test real(a) + 1 == 6

    b = TropicalInf
    @test 1 / real(b) == 0.0
end

nothing
