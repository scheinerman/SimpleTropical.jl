# execute this file in the docs directory with this
# julia --color=yes --project make.jl

# using Documenter, SimpleTropical
# makedocs(; sitename="SimpleTropical")

using Documenter, SimpleTropical
makedocs(;
    pages=["Tropical Arithmetic" => "index.md", "Tropical Polynomials" => "polys.md"],
    sitename="SimpleTropical",
)
