import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import StyledHero from './styles'
import Char from '../../assets/Hero.svg'
import { sortPosts } from '../../actions/posts'

class Hero extends Component {
  state = {
    sortBy: 'timestamp'
  }
  handleSort = (sortBy) => {
    const { dispatch } = this.props
    this.setState({ sortBy })
    return dispatch(sortPosts(sortBy))
  }
  handleChange = (e) => {
    this.props.history.push(`/${e.target.value}`)
  }
  componentDidMount() {
    const { dispatch } = this.props
    dispatch(sortPosts('timestamp'))
    this.setState({ sortBy: 'timestamp' })
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
          <div aria-label="Sort posts by">
            Sort by:
            <button onClick={() => this.handleSort('timestamp')}>Date</button>
            <button onClick={() => this.handleSort('voteScore')}>
              Vote Score
            </button>
          </div>
        </StyledHero.Options>
      </StyledHero>
    )
  }
}

const mapStateToProps = ({ posts }) => {
  return {
    posts
  }
}

export default withRouter(connect(mapStateToProps)(Hero))
