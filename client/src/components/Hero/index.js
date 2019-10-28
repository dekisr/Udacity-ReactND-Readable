import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import PropTypes from 'prop-types'
import StyledHero from './styles'
import Char from '../../assets/Hero.svg'

class Hero extends Component {
  handleChange = (e) => {
    this.props.history.push(`/${e.target.value}`)
  }
  render() {
    const { category, handleSort, sortBy } = this.props
    return (
      <StyledHero category={category}>
        <img src={Char} alt="Hero" />
        <StyledHero.Options
          category={category}
          sortBy={sortBy}
          aria-label="Options"
        >
          <div aria-label="Category Selection">
            <select onChange={this.handleChange} value={category}>
              <option value="">All</option>
              <option value="blue">Blue</option>
              <option value="red">Red</option>
              <option value="yellow">Yellow</option>
            </select>
            <span>sort by:</span>
            <button onClick={() => handleSort('timestamp')}>Date</button>
            <button onClick={() => handleSort('voteScore')}>Vote Score</button>
          </div>
        </StyledHero.Options>
      </StyledHero>
    )
  }
}

Hero.propTypes = {
  category: PropTypes.string,
  handleSort: PropTypes.func
}

export default withRouter(Hero)
