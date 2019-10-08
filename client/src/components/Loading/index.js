import React from 'react'
import StyledLoading from './styles'
import HeroLoading from '../../assets/HeroLoading.svg'

const Loading = ({ initialData }) => {
  return (
    <StyledLoading>
      {initialData && (
        <StyledLoading.Char src={HeroLoading} alt="Loading Character" />
      )}
      <StyledLoading.Bar aria-label="Loading Bar..." />
      <h1>{initialData ? 'Loading initial data...' : 'Loading...'}</h1>
    </StyledLoading>
  )
}

export default Loading
