import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import StyledHero from './styles'
import Char from '../../assets/Hero.svg'

class Hero extends Component {
  handleChange = (e) => {
    this.props.history.push(`/category/${e.target.value}`)
  }
  render() {
    return (
      <StyledHero>
        <img src={Char} alt="Hero" />
        <StyledHero.Options aria-label="Options">
          <select onChange={this.handleChange} value={this.props.category}>
            <option value="">All</option>
            <option value="blue">Blue</option>
            <option value="red">Red</option>
            <option value="yellow">Yellow</option>
          </select>
          <div aria-label="Sort posts by">Sort by: Date / Vote Score</div>
        </StyledHero.Options>
      </StyledHero>
    )
  }
}

export default withRouter(Hero)
