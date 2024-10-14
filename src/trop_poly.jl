include("scripter.jl")

struct TropicalPolynomial
    coef::Dict{Int,Tropical}

    function TropicalPolynomial()
        return new(Dict{Int,Tropical}())
    end
end

"""
    TropicalPolynomial(c::Dict{Int,Tropical})

Construct a new `TropicalPolynomial` for a dictionary of coefficients `c`
mapping integers to tropical numbers. The coefficient of `x^k` is `c[k]`.
"""
function TropicalPolynomial(c::Dict{S,T}) where {S<:Integer,T<:Number}
    p = TropicalPolynomial()
    for k in keys(c)
        p.coef[k] = Tropical(c[k])
    end
    return p
end

function TropicalPolynomial(clist::Vector{Pair{S,T}}) where {S<:Integer,T<:Number}
    return TropicalPolynomial(Dict(clist))
end

function _term_string(c::Tropical, k::Int)::String
    front = isinf(c) ? "∞" : string(real(c))

    return front * "⊗" * "x" * int2sup(k)
end

function string(p::TropicalPolynomial)::String
    if length(p.coef) == 0
        return "∞"
    end
    powlist = sort(collect(keys(p.coef)))

    result = ""

    npow = length(powlist)
    for i in 1:npow
        k = powlist[i]
        c = p.coef[k]
        result *= _term_string(c, k)
        if i < npow
            result *= " ⊕ "
        end
    end
    return result
end
show(io::IO, p::TropicalPolynomial) = print(io, string(p))

(==)(p::TropicalPolynomial, q::TropicalPolynomial) = p.coef == q.coef

"""
    (p::TropicalPolynomial)(x::Number)

Evaluate the tropical polynomial `p` at `x`, i.e.,
compute `p(x)`. 
"""
function (p::TropicalPolynomial)(x::Number)::Tropical
    result = TropicalInf
    x = Tropical(x)

    for k in keys(p.coef)
        result += p.coef[k] * (x^k)
    end

    return result
end

#### ADDITION

function (+)(p::TropicalPolynomial, q::TropicalPolynomial)::TropicalPolynomial
    cdict = Dict{Int,Tropical}()   # coef's of the sum

    all_pows = collect(keys(p.coef)) ∪ collect(keys(q.coef))
    all_pows = unique(sort(all_pows))  # all exponents from both summands

    for k in all_pows
        cdict[k] = TropicalInf
        if haskey(p.coef, k)
            cdict[k] += p.coef[k]
        end
        if haskey(q.coef, k)
            cdict[k] += q.coef[k]
        end
    end

    return TropicalPolynomial(cdict)
end

## Add a constant
function (+)(p::TropicalPolynomial, a::T)::TropicalPolynomial where {T<:Number}
    a = Tropical(a)
    q = deepcopy(p)
    if haskey(p.coef, 0)
        q.coef[0] += a
    else
        q.coef[0] = a
    end
    return q
end
(+)(a::T, p::TropicalPolynomial) where {T<:Number} = p + a

(⊕)(p::TropicalPolynomial, a::T) where {T<:Union{Number,TropicalPolynomial}} = p + a
(⊕)(a::Number, p::TropicalPolynomial) = p + a

## Multiply by a constant
function (*)(a::T, p::TropicalPolynomial)::TropicalPolynomial where {T<:Number}
    a = Tropical(a)
    q = deepcopy(p)
    for k in keys(p.coef)
        q.coef[k] *= a
    end
    return q
end
(*)(p::TropicalPolynomial, a::T) where {T<:Number} = a * p

"""
    _shift(p::TropicalPolynomial, dk::Integer)

Create a new tropical polynomial by increasing all exponents by `dk` (which may be negative).
Equivalent to `p * x^dk`
"""
function _shift(p::TropicalPolynomial, dk::Integer)::TropicalPolynomial
    q = TropicalPolynomial()
    for k in keys(p.coef)
        q.coef[k + dk] = p.coef[k]
    end
    return q
end

function (*)(p::TropicalPolynomial, q::TropicalPolynomial)::TropicalPolynomial
    result = TropicalPolynomial()

    for k in keys(p.coef)
        a = p.coef[k]
        result += a * _shift(q, k)
    end
    return result
end
(⊗)(p::TropicalPolynomial, a::T) where {T<:Union{Number,TropicalPolynomial}} = a * p
(⊗)(a::Number, p::TropicalPolynomial) = a * p

function (^)(p::TropicalPolynomial, n::Integer)
    if n < 0
        throw(DomainError(n, "Exponent may not be negative"))
    end

    q = TropicalPolynomial()
    for k in keys(p.coef)
        q.coef[n * k] = p.coef[k]^n
    end
    return q
end

"""
    make_function(p::TropicalPolynomial)

Create a function `f` from reals to reals that evaluates `p` (but uses real numbers 
as inputs and outputs).
"""
function make_function(p::TropicalPolynomial)::Function
    function f(x::Real)
        y = p(Tropical(x))
        return real(y)
    end
    return f
end

"""
    tropical_x(k::Int = 1)

Create the tropical monomial `0⊗x^k`.
"""
tropical_x(k::Int=1) = TropicalPolynomial([k => 0])

"""
    coefs(p::TropicalPolynomial)

Return a dictionary of the coefficients of `p`.
"""
coefs(p::TropicalPolynomial) = deepcopy(p.coef)
