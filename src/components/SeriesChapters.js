import React from 'react'
import Link from 'gatsby-link'

export default ({ series, chapters, currPath }) => (
  <aside id="series" className="menu">
    <ul className="menu-list">
      <li>
        <Link to={`${series.path}`}>
          <a className={currPath === series.path ? 'is-active' : ''}>
            {series.title}
          </a>
        </Link>
        <ol className="chapters">
          {series.chapters.map((chap, key) => (
            <Link
              key={key}
              style={{ textDecoration: 'none' }}
              to={`${chapters[chap].path}`}
            >
              <li>
                <a
                  className={
                    currPath === chapters[chap].path ? 'is-active' : ''
                  }
                >
                  {chapters[chap].title}
                </a>
              </li>
            </Link>
          ))}
        </ol>
      </li>
    </ul>
  </aside>
)
