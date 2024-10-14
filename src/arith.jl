
function Base.promote_rule(::Type{Tropical{T}}, ::Type{S}) where {T<:Real,S<:Real}
    return Tropical{promote_type(T, S)}
end
function Base.promote_rule(::Type{Tropical{T}}, ::Type{Tropical{S}}) where {T<:Real,S<:Real}
    return Tropical{promote_type(T, S)}
end

convert(::Type{Tropical}, x::T) where {T<:Real} = Tropical{T}(x)
function convert(::Type{Tropical{T}}, x::S) where {T<:Real,S<:Tropical}
    return Tropical(convert(T, x.val), x.inf_flag)
end

function long_tropical_show(t::Bool)::Bool
    return global _long_show = t
end

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

"""
    x ⊕ y

Tropical addition of `x` and `y`. Return a new `Tropical` number that is the
min of `x` and `y`.
"""
(⊕)(x::S, y::T) where {S<:Union{Tropical,Real},T<:Union{Tropical,Real}} =
    Tropical(x) + Tropical(y)

"""
    x ⊗ y

Tropical multiplication of `x` and `y`. Return a new `Tropical` number that 
is the sum of `x` and `y`.
"""
(⊗)(x::S, y::T) where {S<:Union{Tropical,Real},T<:Union{Tropical,Real}} =
    Tropical(x) * Tropical(y)

function inv(X::Tropical)::Tropical
    if isinf(X)
        throw(DomainError(X, "TropicalInf is not invertible"))
    end

    return Tropical(-X.val)
end

(/)(x::Tropical, y::Tropical) = x * inv(y)

function (^)(X::Tropical, p::Integer)::Tropical
    if isinf(X)
        if p <= 0
            throw(DomainError(p, "Cannot raise TropicalInf to a nonpositive power"))
        end
        return X
    end

    return Tropical(X.val * p)
end
