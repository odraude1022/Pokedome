import React from 'react'
import { ScaleLoader } from 'react-spinners';

const Loader = props => {
  return(
    <div className="loader">
            <div>
              <ScaleLoader
                className="pacman-load"
                color={'#F8E71C'}
                loading={props.loading}
                height={50}
              />
            </div>
    </div>

  )
}

export default Loader
