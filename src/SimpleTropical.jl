module SimpleTropical

import Base: isinf, show, (+), (*), inv, (==), isequal, (^)
import Base: convert, zero, one, string


export Tropical, TropicalInf, ⊕, ⊗, long_tropical_show


_long_show = true

"""
`Tropical(x::T) where T<:Real` defines a new `Tropical`
number. 
"""
struct Tropical{T<:Real} <: Number
    val::T
    inf_flag::Bool

    function Tropical{T}(xx::Real, ii::Bool = false) where {T}
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
`TropicalInf` is a constant that represents infinity in the tropical
semiring.
"""
const TropicalInf = Tropical{Bool}(0, true)

isinf(X::Tropical) = X.inf_flag

Base.promote_rule(::Type{Tropical{T}}, ::Type{S}) where {T<:Real,S<:Real} =
    Tropical{promote_type(T, S)}
Base.promote_rule(::Type{Tropical{T}}, ::Type{Tropical{S}}) where {T<:Real,S<:Real} =
    Tropical{promote_type(T, S)}

convert(::Type{Tropical}, x::T) where {T<:Real} = Tropical{T}(x)
convert(::Type{Tropical{T}}, x::S) where {T<:Real,S<:Tropical} =
    Tropical(convert(T, x.val), x.inf_flag)

function long_tropical_show(t::Bool)::Bool
    global _long_show = t 
end 

"""
`long_tropical_show(t::Bool)` determines the display style for 
`Tropical` numbers. 
+ When `t` is `true`: display numbers like this: `Tropical(5)` or `Tropical(∞)`.
+ When `t` is `false`: display numbers like this: `5` or `∞`.

`long_tropical_show()` returns the current state (`true` or `false`).
"""
long_tropical_show()::Bool = _long_show


function string(x::Tropical{T})::String where T
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
    print(io, string(t))
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

function (+)(x::Tropical{T}, y::Tropical{T}) where {T}
    if isinf(x)
        if isinf(y)   # when X,Y both are infinite
            return Tropical(zero(T), true)  # create common infinite
        else
            return Tropical(y)
        end
    end

    if isinf(y)
        return Tropical(x)
    end

    return Tropical(min(x.val, y.val))
end
(+)(x::Tropical{T}, y::Tropical{S}) where {T,S} = +(promote(x, y)...)
(+)(x::Tropical{T}, y::Real) where {T} = +(promote(x, y)...)
(+)(x::Real, y::Tropical{T}) where {T} = +(promote(x, y)...)



function (*)(x::Tropical{T}, y::Tropical{T}) where {T}
    if isinf(x) || isinf(y)
        return Tropical(zero(T), true)
    end

    return Tropical(x.val + y.val)
end
(*)(x::Tropical{T}, y::Tropical{S}) where {T,S} = *(promote(x, y)...)
(*)(x::Tropical{T}, y::Real) where {T} = *(promote(x, y)...)
(*)(x::Real, y::Tropical{T}) where {T} = *(promote(x, y)...)

(⊕)(x::S, y::T) where {S<:Union{Tropical,Real},T<:Union{Tropical,Real}} =
    Tropical(x) + Tropical(y)
(⊗)(x::S, y::T) where {S<:Union{Tropical,Real},T<:Union{Tropical,Real}} =
    Tropical(x) * Tropical(y)


function inv(X::Tropical)
    @assert !isinf(X) "TropicalInf is not invertible"
    return Tropical(-X.val)
end

function (^)(X::Tropical, p::Integer)
    if isinf(X)
        @assert p > 0 "Cannot raise tropical infinity to a nonpositive power."
        return X
    end

    return Tropical(X.val * p)
end


function isequal(X::Tropical, Y::Tropical)
    if !isinf(X) && !isinf(Y)
        return isequal(X.val, Y.val)
    else
        return isinf(X) && isinf(Y)
    end
end

function ==(X::Tropical, Y::Tropical)
    if !isinf(X) && !isinf(Y)
        return X.val == Y.val
    else
        return isinf(X) && isinf(Y)
    end
end

end # end of module
