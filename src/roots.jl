"""
    _term_list(p::TropicalPolynomial)

Return a list of the monomials in the polynomial `p`.
"""
function _term_list(p::TropicalPolynomial)
    if length(p.coef) == 0
        return TropicalPolynomial[]  # empty list 
    end

    return TropicalPolynomial.([it] for it in p.coef)
end

"""
    _value_list(p::TropicalPolynomial, x::Number)

Return a list of the values of the monomials of `p`, evaluated at `x`.
"""
function _value_list(p::TropicalPolynomial, x::Number)
    return [t(x) for t in _term_list(p)]
end

"""
    _candidate_list(p::TropicalPolynomial)

List of possible roots. These are determined by considering pairs of terms in `p`.
"""
function _candidate_list(p::TropicalPolynomial)
    terms = _term_list(p)
    nt = length(terms)
    result = Tropical[]
    if nt < 2
        return result  # no candidates
    end

    for s in 1:(nt - 1)
        for t in (s + 1):nt
            t1 = first(terms[s].coef)   # a x^j
            t2 = first(terms[t].coef)   # b x^k

            j = t1[1]
            a = real(t1[2])

            k = t2[1]
            b = real(t2[2])

            # solve a+jx = b+kx 
            x = Tropical(_solve_aj_bk(a, j, b, k))

            push!(result, x)
        end
    end

    return unique(sort(result))
end

"""
    _solve_aj_bk(
    a::S, j::Integer, b::T, k::Integer
) where {S<:Union{Integer,Rational},T<:Union{Integer,Rational}}
    a::S,
    j::Integer,
    b::T,
    k::Integer,
) where {S<:Union{Integer,Rational},T<:Union{Integer,Rational}}

Solve the equation `a + j*x == b + k*y` as accurately as possible.
"""
function _solve_aj_bk(
    a::S, j::Integer, b::T, k::Integer
) where {S<:Union{Integer,Rational},T<:Union{Integer,Rational}}
    result = (b - a)//(j - k)
    if denominator(result) == 1
        return numerator(result)
    end
    return result
end

_solve_aj_bk(a, j, b, k) = (b - a) / (j - k)

"""
    _test_min_repeat(p::TropicalPolynomial, x::Number)::Bool

Text of `x` is a root of `p` by seeing if it attains the minimum at least 
twice among the terms of `p`.
"""
function _test_min_repeat(p::TropicalPolynomial, x::Number)::Bool
    vlist = _value_list(p, x)
    min_v = minimum(vlist)

    min_count = count((v) -> v == min_v, vlist)

    return min_count > 1
end

"""
    roots(p::TropicalPolynomial)

Find the roots of the tropical polynomial `p`. Not ready for prime time because of 
roundoff errors.
"""
function roots(p::TropicalPolynomial)
    candidates = _candidate_list(p)
    result = [x for x in candidates if _test_min_repeat(p, x)]
    if length(result) == 0
        return Tropical[]
    end
    return result
end
