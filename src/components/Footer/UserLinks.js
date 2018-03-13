import React, { Component } from 'react'
import './UserLinks.sass'

class UserLinks extends Component {
  getLinkElements() {
    const { userLinks } = this.props.config
    const { labeled } = this.props
    return userLinks.map(link => (
      <a key={link.label} target="_blank" href={link.url}>
        {labeled ? link.label : ''}
      </a>
    ))
  }
  render() {
    const { userLinks } = this.props.config
    if (!userLinks) {
      return null
    }
    return <div className="user-links">{this.getLinkElements()}</div>
  }
}

export default UserLinks
