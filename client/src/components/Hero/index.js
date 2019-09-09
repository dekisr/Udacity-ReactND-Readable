import React, {Component} from 'react'
import StyledHero from './styles'
import Char from '../../assets/Hero.svg'

class Hero extends Component {
  render() {
    return (
    <StyledHero>
      <img src={Char} alt="Hero" />
      <StyledHero.Options aria-label="Options">
        <select>
          <option value="all">All</option>
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

export default Hero
