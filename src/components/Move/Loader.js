import React from 'react'
import { ScaleLoader } from 'react-spinners';

const Loader = props => {
  return(
    <div className="loader">
      <div>
        <ScaleLoader
          className="pacman-load"
          color={'#F8E71C'}
          size={"40"}
          loading={props.loading}
        />
      </div>
    </div>
  )
}

export default Loader
