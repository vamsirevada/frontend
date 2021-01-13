import React, { useState } from "react";
import ProgressBar from "./ProgressBar";
import "./Gallery.css";
import { setAlert } from "../../actions/alert";
import { connect } from "react-redux";
import preview from "../../images/preview.png";

const AddPhoto = ({ setAlert }) => {
  const fileInput = React.createRef();
  const [file, setFile] = useState(null);
  const [display, setDisplay] = useState(preview);
  const [error, setError] = useState(null);
  const [upload, setUpload] = useState(false);
  const [formData, setFormData] = useState({
    description: "",
  });

  const onOpenFileDialog = () => {
    fileInput.current.click();
  };

  const { description } = formData;
  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = (e) => {
    e.preventDefault();
    if (file === null) {
      setAlert("File is mandatory", "danger", 1000);
    } else if (formData.description === "") {
      setAlert("description is mandatory field", "danger", 1000);
    } else {
      setUpload(true);
    }
  };

  const handleChange = (e) => {
    let selected = e.target.files[0];

    if (selected) {
      setDisplay(URL.createObjectURL(e.target.files[0]));
      setFile(selected);
      setError("");
    } else {
      setFile(null);
      setError("Please select an image file (png or jpg)");
    }
  };

  return (
    <div className="main-right">
      <div className="main-right-container">
        <div>
          <h2>Upload Files (.Jpg, Png,Gifs)</h2>
          <div className="cloud pos"></div>
          <p className="blue-text pos">
            Drag and Drop File or <br />
            br /owse From Below
          </p>
          <input
            accept="image/*"
            onChange={handleChange}
            type="file"
            hidden={true}
            ref={fileInput}
          />
          <span onClick={onOpenFileDialog} className="btn-blue pos">
            Select
          </span>
          {error && <div className="error">{error}</div>}
        </div>
        <div>
          <img src={display} className="box1" alt="" />
          <br />
          <div>
            {upload && (
              <ProgressBar
                className="box4 blue-text"
                file={file}
                setFile={setFile}
                type={"photo"}
                description={formData.description}
                setAlert={setAlert}
                setUpload={setUpload}
              />
            )}
          </div>
        </div>
        <form onSubmit={(e) => onSubmit(e)}>
          <div>
            <h2 className="des">Add a description</h2>
            <br />
            <textarea
              type="text"
              className="search-btn"
              name="description"
              value={description}
              placeholder="add description"
              onChange={(e) => onChange(e)}
            >
              Lorem ipsum dolor, sit amet consectetur adipisicing elit.
              Suscipit, fugiat.
            </textarea>
          </div>
          <div className="prof-flex-btn">
            <button type="submit" className="btn-yellow" href="#!">
              Upload
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({});
export default connect(mapStateToProps, { setAlert })(AddPhoto);
