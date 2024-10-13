using SimpleTropical

function _sub_digit(n::Integer)::Char
    chars = ['₀', '₁', '₂', '₃', '₄', '₅', '₆', '₇', '₈', '₉']
    return chars[n+1]
end

function _sup_digit(n::Integer)::Char
    chars = ['⁰', '¹', '²', '³', '⁴', '⁵', '⁶', '⁷', '⁸', '⁹']
    return chars[n+1]
end

"""
    _make_script(n::Integer, sub::Bool)

Common engine for `int2sub` and `int2sup`.
"""
function _make_script(n::Integer, sub::Bool)
    method = sub ? _sub_digit : _sup_digit
    if n >= 0
        digs = reverse(digits(n))
        return join(method.(digs))
    end

    neg = sub ? '₋' : '⁻'
    return neg * _make_script(abs(n), sub)
end


"""
    int2sub(n::Integer)::String

Given an integer `n`, return `n` as as a base-10
string using *subscript* digits. 

Example
------- 
```
julia> println("x" *  int2sub(17))
x₁₇
```
"""
int2sub(n::Integer)::String = _make_script(n, true)


"""
    int2sup(n::Integer)::String

Given an integer `n`, return `n` as as a base-10
string using *superscript* digits. 

Example
-------
```
julia> println("x" * int2sup(-2))
x⁻²
```
"""
int2sup(n::Integer)::String = _make_script(n, false)

