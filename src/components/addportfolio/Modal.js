import React, { useState, forwardRef, useImperativeHandle } from "react";
import logo from "../../images/dummyimage.jpg";
import backward from "../../images/Group 6054.svg";
import forward from "../../images/Group 6056.svg";
import close from "../../images/close.svg";
import Moment from "react-moment";

const Modal = forwardRef(
  ({ profile: { avatar, user }, image, videos }, ref) => {
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [current, setCurrent] = useState(0);
    const files = image.concat(videos);
    const length = files.length;

    const handleShow = () => {
      setModalIsOpen(true);
    };

    const handleClose = () => {
      setModalIsOpen(false);
    };

    useImperativeHandle(ref, () => {
      return {
        openModal: () => handleShow(),
        close: () => handleClose(),
      };
    });

    const nextSlide = () => {
      setCurrent(current === length - 1 ? 0 : current + 1);
    };

    const prevSlide = () => {
      setCurrent(current === 0 ? length - 1 : current - 1);
    };

    if (!Array.isArray(files) || files.length <= 0) {
      return null;
    }

    return (
      <>
        {modalIsOpen &&
          files.map((file, index) => (
            <div
              key={index}
              className={`post-pop-up ${
                index === current ? "slide active" : "slide"
              }`}
            >
              <div className="post-pop-up-container">
                <div>
                  <div className="flex">
                    <div className="flex-left">
                      <div className="flex-1">
                        <div
                          className="display-pic"
                          style={{
                            background: `url(${
                              avatar ? avatar : logo
                            }) no-repeat center center/cover`,
                          }}
                        ></div>
                        <div>
                          <h2 className="modal-title w-100">
                            {file.description}
                          </h2>
                          <br />
                          <p>
                            by <span className="blue">{user.fullName}</span>
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className="flex-right">
                      <img src={close} onClick={handleClose} alt="" />
                    </div>
                  </div>
                  <hr className="hori" />
                </div>

                <div className="main-post-container">
                  <div className="main-post-top">
                    <img onClick={prevSlide} src={backward} alt="" />
                    <div className="post-pic">
                      {file.type === "photo" ? (
                        <img className="post-pic" src={file.url} alt="" />
                      ) : (
                        <video
                          controls
                          className="post-pic"
                          src={file.url}
                          alt=""
                        />
                      )}
                    </div>
                    <img onClick={nextSlide} src={forward} alt="" />
                  </div>
                </div>

                <div className="main-post-container-2">
                  <div className="post-des-flex-s">
                    <div className="post-des-flex-left ">
                      <div className="flex flex-s">
                        <div className="des-right">
                          <a href="#!">
                            <p>
                              Posted on{": "}
                              <Moment format="DD MMM YY">
                                {file.createdAt.toDate()}
                              </Moment>{" "}
                              {", "}
                              <Moment format="hh:mm A">
                                {file.createdAt.toDate()}
                              </Moment>
                            </p>
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
      </>
    );
  }
);
export default Modal;
