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
    console.log(err)
}
}
render() {
    const products = this.props.products || []
    return (
        <div>
        <h1>All Products View</h1>
        <p id="currentAvail">currently available at Good Morels:</p>
        <div id="productParent">
            {products.map((product)=> {
                return (<div key={product.id} className="allProducts">
                    <img className="placeholderImage"src={product.imageUrl}/>
                    <p id="shroomNames">{product.name}</p>
                    <p>{product.description}</p>
                    <p>{product.price}</p>
                    <button>add to cart</button>
                    </div>)
            })}
            </div>
        </div>
    )
}
}

const mapStateToProps = (state) => {
    return { 
        products: state.allproducts
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        getProds: () => dispatch(fetchProducts())
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(AllProducts)