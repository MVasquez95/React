1. `position` property
2. Navigation Bars with `fixed`
3. `z-index` property
4. `absolute` & `relative` - Stand Alone and Combined
5. `sticky`
6.  Stacking context (`position` & `z-index`)
7. Don't forget `flexbox` and `grid`

Understanding positioning - The Theory
# Positioning Elements

standard (`static`) positioning follow; document flow
`position` default value; `static`

Other `position` values:
`absolute`
`relative`
`fixed`
`sticky`

# Changing the position

`position` and `top`, `left`, `right`, `bottom` relationship; one tells how to move (rules), the other ones where to move

Position Context; values of `tlrb` which respect to which element
Position Context question; We have 20px on `top`, but 20px to respect its parent, the viewport...? 

Working with the "fixed" Value
# `fixed` Value

`fixed` takes the element aways the Document Flow 
`width` property works on `fixed`
Position Context relative to viewport (`width`% applies) (not sure with `height`%)
`fixed` default values are "like" 0 `top` and 0 `left` with respect to its parent (afaik)
`fixed` heredate the margin (and padding?) of the parent, need `top` and `left` to change
Use Cases: Fixed nav bar, fixed background image

Remember: `box-sizing` solves the 100% width issue
Remember: Changing width in `inline` elements have no impact