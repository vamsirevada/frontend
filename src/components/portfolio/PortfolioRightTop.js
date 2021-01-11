import React from "react";
import { Link } from "react-router-dom";

const PortfolioRightTop = ({
  type,
  profile: {
    user: { _id },
    buddies,
    experience,
  },
}) => (
  <div className="main-grid-top">
    <div className="profile-info-box p-black">
      <Link to={`/friends/${_id}`}>
        <p className="border-1">
          <span className="f-1">{buddies && buddies.length}</span>
          {/* <span className='f-1'>2</span> */}
          <br /> Connections
        </p>
      </Link>
      <Link to={`/projects/${_id}`}>
        <p>
          <span className="f-1">{experience && experience.length}</span>
          <br /> Projects{" "}
        </p>
      </Link>
    </div>
    <div className="mutual-frds">
      {/* <div>
        <p className='bg-2'>Mutual Friends</p>
      </div>
      <div>
        <a href='#!'>
          <img className='s-2 a-1' src='./images/Anuj Dixit.svg' alt='c31' />
        </a>
        <a href='#!'>
          <img className='s-2 a-2' src='./images/Dolce Swan.svg' alt='c31' />
        </a>
        <a href='#!'>
          <img className='s-2 a-3' src='./images/rio-josh.svg' alt='c31' />
        </a>
        <a href='#!'>
          <img className='s-2 a-4' src='./images/rekha-thapar.svg' alt='c31' />
        </a>
        <a href='#!' className='bg-1 a-5'>
          +10
        </a>
      </div> */}

      {type!=="edit" && (
        <div className="prof-heading-flex">
          <div>
            {/* <a href='#!'>
            <img className='s-1' src={c31} alt='c31' />
          </a> */}
          </div>
          <Link to={"/addfiles"}>
            <h4>
              <span className="bg-1">Add to Portfolio</span>
            </h4>
          </Link>
        </div>
      )}

      {/* <div className='prof-heading-flex2'>
        <div className='tile'>
          <a href='#!'>
            <img src={g6022} alt='tile' />
          </a>
        </div>
        <div>
          <a href='#!'>
            <img src={g6023} alt='' />
          </a>
        </div>
      </div> */}
    </div>
  </div>
);

export default PortfolioRightTop;
