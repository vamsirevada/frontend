import React, { Fragment } from "react";
import manage from "../../../images/manage.png";

const Page6 = () => {
  return (
    <Fragment>
      <div id="page-6" className="page6-columns page">
        <div className="container">
          <div className="column">
            <div className="column-1">
              <img className="collobrate" src={manage} alt="collobrate" />
              <br />
            </div>
            <div className="column-2">
              <h1 className="ft-heading ft-heading-light">
                Easily manage your projects
              </h1>
              <p className="ft-para ft-para-light">
                Manage your projects and reduce the cost, energy and effort for
                processes like searching talent, auditioning and hiring talents
                across India, effectively increasing your productivity &
                efficiency.
              </p>
              <br />
              <h3 className="ft-heading ft-heading-light">Coming Soon...</h3>
            </div>
          </div>
        </div>

        {/* <div className='box-4'>
          <ul>
            <li className='item'>
              <a href='#!'></a>
            </li>
            <li className='item'>
              <a href='#!'></a>
            </li>
            <li className='item'>
              <a href='#!'></a>
            </li>
            <li className='item'>
              <a href='#!'></a>
            </li>
            <li className='item'>
              <a href='#!'></a>
            </li>
            <li className='item'>
              <a href='#!'></a>
            </li>
            <li className='item'>
              <a href='#!'></a>
            </li>
          </ul>
        </div> */}
      </div>
    </Fragment>
  );
};

export default Page6;
