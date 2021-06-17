import React from 'react'
import { connect }from 'react-redux'
import {fetchProducts} from '../store/allproducts'

class AllProducts extends React.Component {
   constructor(){
    super()
}
componentDidMount() {
try {
this.props.getProds()
} catch(err) {
    console.log('inside component did mount')
    console.log(err)
}
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

const mapDispatchToProps = (dispatch) => {
    return {
        getProds: () => dispatch(fetchProducts())
    }
}
export default connect(null, mapDispatchToProps)(AllProducts)