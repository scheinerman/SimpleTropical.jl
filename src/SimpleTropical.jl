# defines the SimpleTropical module with the Tropical type

module SimpleTropical

import Base.isinf, Base.show, Base.promote_rule

export Tropical, TropicalInf

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

Tropical{T<:Real}(x::T) = Tropical{T}(x)
const TropicalInf = Tropical{Bool}(0,true)

isinf(x::Tropical) = x.inf_flag

promote_rule{S<:Real, T<:Real}(::Type{Tropical{S}},::Type{Tropical{T}}) = Tropical{promote_type(S,T)}


function show(io::IO, t::Tropical)
  if isinf(t)
    print(io,"Tropical($(Char(8734)))")
  else
    print(io,"Tropical{$(typeof(t.x))}($(t.x))")
  end
end


end # end of module
