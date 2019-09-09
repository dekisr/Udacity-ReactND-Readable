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
    const { category, handleSort } = this.props
    return (
      <StyledHero>
        <img src={Char} alt="Hero" />
        <StyledHero.Options category={category} aria-label="Options">
          <select onChange={this.handleChange} value={this.props.category}>
            <option value="">All</option>
            <option value="blue">Blue</option>
            <option value="red">Red</option>
            <option value="yellow">Yellow</option>
          </select>
          <div aria-label="Sort posts by">
            Sort by:
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
