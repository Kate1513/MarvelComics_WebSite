import React from 'react'
import { NavbarBottom, NavbarTop } from '../components/Navbar'
import { PropTypes } from 'prop-types'

function Home({ children }) {
  return (
    <>
      <NavbarTop></NavbarTop>
      <NavbarBottom></NavbarBottom>
      {children}
    </>
  )
}

Home.propTypes = {
  children: PropTypes.node.isRequired,
}

export { Home }
