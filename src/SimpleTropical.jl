# defines the SimpleTropical module with the Tropical type

module SimpleTropical

import Base.isinf, Base.show, Base.+, Base.*, Base.inv, Base.==
import Base.isequal, Base.^, Base.convert

export Tropical, TropicalInf

struct Tropical{T<:Real} <: Number
  val::T
  inf_flag::Bool


  function Tropical{T}(xx::Real, ii::Bool=false) where T
    TT = typeof(xx)
    if isinf(xx) || ii
      return new(zero(TT),true)
    end
    return new(xx,false)
  end
end

Tropical{T<:Real}(x::T) = Tropical{T}(x)
function Tropical{T<:Real}(x::T, i::Bool)
  if i
    return Tropical{T}(zero(T),true)
  end
  return Tropical(x)
end

"""
`TropicalInf` is a constant that represents infinity in the tropical
semiring.
"""
const TropicalInf = Tropical{Bool}(0,true)

isinf(X::Tropical) = X.inf_flag


# It's pretty clear I don't understand promotion rules. So I've made
# workarounds elsewhere in the code.
#
# promote_rule{S<:Real, T<:Real}(::Type{Tropical{S}},::Type{Tropical{T}}) =
# Tropical{promote_type(S,T)}


function show(io::IO, t::Tropical)
  if isinf(t)
    print(io,"Tropical($(Char(8734)))")  # infinity character
  else
    print(io,"Tropical{$(typeof(t.val))}($(t.val))")
  end
end

function (+)(X::Tropical, Y::Tropical)
  x,y = promote(X.val,Y.val)

  if isinf(X)
    if isinf(Y)   # when X,Y both are infinite
      z = zero(typeof(x))
      return Tropical(z,true)  # create common infinite
    else
      return Tropical(y)
    end
  end

  if isinf(Y)
    return Tropical(x)
  end

  return Tropical(min(x,y))
end



function (*)(X::Tropical, Y::Tropical)
  x,y = promote(X.val, Y.val)
  if isinf(X) || isinf(Y)
    return Tropical(zero(typeof(x)),true)
  end

  return Tropical(x+y)
end


(+)(X::Tropical, Y::Real) = X+Tropical(Y)
(+)(X::Real, Y::Tropical) = Tropical(X)+Y

(*)(X::Bool, Y::Tropical) = Tropical(X)*Y
(*)(X::Tropical, Y::Real) = X*Tropical(Y)
(*)(X::Real, Y::Tropical) = Tropical(X)*Y

convert(::Type{Tropical}, x::Real) = Tropical{typeof(x)}(x)


function inv(X::Tropical)
  @assert !isinf(X) "TropicalInf is not invertible"
  return Tropical(-X.val)
end

function (^)(X::Tropical, p::Integer)
  if isinf(X)
    @assert p>0 "Cannot raise tropical infinity to a nonpositive power."
    return X
  end

  return Tropical(X.val * p)
end


function isequal(X::Tropical, Y::Tropical)
  if isinf(X)
    return isinf(Y)
  end
  return X.val == Y.val
end

==(X::Tropical,Y::Tropical) = isequal(X,Y)


end # end of module
