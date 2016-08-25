# defines the SimpleTropical module with the Tropical type

module SimpleTropical

export Tropical

immutable Tropical{T<:Real} <: Number
  x::T
  inf_flag::Bool
  function Tropical(xx::Real, ii::Bool=false)
    TT = typeof(xx)
    if isinf(xx) || ii
      return new(zero(TT),true)
    end
    return new(xx,false)
  end
end

promote_rule{S<:Real, T<:Real}(::Type{Tropical{S}},::Type{Tropical{T}}) =
  Tropical{promote_type{S,T}}


end # end of module
