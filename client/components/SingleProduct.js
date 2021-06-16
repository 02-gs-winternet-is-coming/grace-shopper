import React, {Component} from 'react'
import {connect} from 'react-redux'
import {fetchSingleProduct} from '../store/singleProduct'


// SCAFFOLDING
class SingleProduct extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount () {
    fetchSingleProduct(props.id)
  }

  render () {
    return (
      <div />
    )
  }

}

mapState(state) {}

export default connect(mapState)(SingleProduct)
