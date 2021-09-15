import React, { PureComponent } from 'react'
import Header from './Header'
import Footer from './Footer'

export default class Layout extends PureComponent {
  render () {
    return (
      <div className='layout'>
        <Header/>
        <div className="main">
          { this.props.children }
        </div>
        <Footer />
      </div>
    )
  }
}
