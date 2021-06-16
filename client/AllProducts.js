import React from 'react'

class AllProducts extends React.Component {
   constructor(){
    super()
}
render() {
    return (
        <div>
        <h1>All Products</h1>
        <p>Currently available at Good Morels:</p>
        <p>mushroom name</p>
        <p>mushroom image</p>
        <p>mushroom price</p>
        <span>click for more details add to cart </span>
        </div>
    )
}
}

export default AllProducts