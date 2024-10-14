
function isequal(X::Tropical, Y::Tropical)
    if !isinf(X) && !isinf(Y)
        return isequal(X.val, Y.val)
    else
        return isinf(X) && isinf(Y)
    end
end

isless(X::Tropical, Y::Tropical) = isless(real(X), real(Y))
isless(X::Tropical, Y::Real) = isless(real(X), Y)
isless(X::Real, Y::Tropical) = isless(X, real(Y))

function ==(X::Tropical, Y::Tropical)
    if !isinf(X) && !isinf(Y)
        return X.val == Y.val
    else
        return isinf(X) && isinf(Y)
    end
end