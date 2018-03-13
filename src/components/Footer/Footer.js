import React, { Component } from 'react'
import Link from 'gatsby-link'
import UserLinks from './UserLinks'
import './Footer.sass'

class Footer extends Component {
  render() {
    const { config } = this.props
    const url = config.siteRss

    return (
      <footer className="footer">
        <UserLinks config={config} labeled />
        <div className="notice-container">
          <h4>{config.copyright || null}</h4>

          <Link to={url}>
            <button>Subscribe</button>
          </Link>
          <h4>
            <a href="https://github.com/Vagr9K/gatsby-advanced-starter">
              Contact Me
            </a>
          </h4>
        </div>
      </footer>
    )
  }
}

export default Footer
