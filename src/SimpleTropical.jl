module SimpleTropical

import Base:
    (+),
    (*),
    (==),
    (^),
    (/),
    convert,
    inv,
    isequal,
    isinf,
    isless,
    one,
    show,
    string,
    real,
    zero

export Tropical,
    TropicalInf,
    TropicalPolynomial,
    coefs,
    long_tropical_show,
    make_function,
    roots,
    tropical_x,
    ⊕,
    ⊗

public int2sub
public int2sup

_long_show = true

"""
`Tropical(x::T) where T<:Real` defines a new `Tropical`
number. 
"""
struct Tropical{T<:Real} <: Number
    val::T
    inf_flag::Bool

    function Tropical{T}(xx::Real, ii::Bool=false) where {T}
        if isnan(xx)
            throw(DomainError(xx, "Tropica(NaN) is forbidden"))
        end

        if xx == -Inf
            throw(DomainError(xx, "Tropical(-∞) is forbidden"))
        end

        TT = typeof(xx)
        if isinf(xx) || ii
            return new(zero(TT), true)
        end
        return new(xx, false)
    end
end

Tropical(x::T) where {T<:Real} = Tropical{T}(x)
function Tropical(x::T, i::Bool) where {T<:Real}
    if i
        return Tropical{T}(zero(T), true)
    end
    return Tropical(x)
end

"""
    TropicalInf

A constant that represents infinity in the tropical semiring.
"""
const TropicalInf = Tropical{Bool}(0, true)

isinf(X::Tropical)::Bool = X.inf_flag

"""
`long_tropical_show(t::Bool)` determines the display style for 
`Tropical` numbers. 
+ When `t` is `true`: display numbers like this: `Tropical(5)` or `Tropical(∞)`.
+ When `t` is `false`: display numbers like this: `5` or `∞`.

`long_tropical_show()` returns the current state (`true` or `false`).
"""
long_tropical_show()::Bool = _long_show

"""
    real(x::Tropical)

Return `x` as a `Real` number. 
"""
function real(x::Tropical)
    if isinf(x)
        return Inf
    end
    return x.val
end

function string(x::Tropical{T})::String where {T}
    val = string(x.val)
    if isinf(x)
        val = "∞"
    end
    if _long_show
        return "Tropical($val)"
    else
        return val
    end
end

function show(io::IO, t::Tropical)
    return print(io, string(t))
end

# Calling zero(Tropical) returns Tropical(∞) because that's the identity 
# element of addition. Likewise, one(Tropical) returns Tropical(0) because
# that's the identity element of multiplication. 

zero(::Tropical{T}) where {T} = TropicalInf
zero(::Type{Tropical}) = TropicalInf
zero(::Type{Tropical{T}}) where {T} = Tropical(zero(T), true)

one(::Tropical{T}) where {T} = Tropical{T}(0)
one(::Type{Tropical}) = Tropical(0)
one(::Type{Tropical{T}}) where {T} = Tropical{T}(0)

include("arith.jl")
include("compare.jl")
include("trop_poly.jl")
include("roots.jl")

end # end of module
