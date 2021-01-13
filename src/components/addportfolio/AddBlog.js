import React, { useState } from "react";
import { projectFirestore, timestamp } from "../../firebase/config";
import { v4 as uuidv4 } from "uuid";
import { setAlert } from "../../actions/alert";
import { connect } from "react-redux";
import axios from "axios";

const parseJwt = (token) => {
  var base64Url = token.split(".")[1];
  var base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
  var jsonPayload = decodeURIComponent(
    atob(base64)
      .split("")
      .map(function (c) {
        return "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2);
      })
      .join("")
  );

  return JSON.parse(jsonPayload);
};

const AddBlog = ({ setAlert }) => {
  const [formData, setFormData] = useState({
    description: "",
  });

  const [file, setFile] = useState("");

  const { description } = formData;
  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async (e) => {
    e.preventDefault();
    const collectionRef = projectFirestore.collection("images");
    if (file === "") {
      setAlert("Blog Link is required field", "danger");
    } else if (description === "") {
      setAlert("Description is required field", "danger");
    } else {
      const createdAt = await timestamp();
      const token = await localStorage.getItem("token");
      const user = await parseJwt(token);
      const userId = user?.user?.id;
      const Id = uuidv4();
      const body = {
        text: description,
        url: file,
        type: "blog",
        user: userId,
      };
      await axios
        .post("/api/posts", body)
        .then(async (res) => {
          await collectionRef.add({
            type: "blog",
            url: file,
            description: description,
            createdAt,
            userId,
            Id,
          });

          await setAlert("Portfolio updated Successfully", "success");
        })

        .catch((err) => {
          alert(JSON.stringify(err));
        });
    }
  };

  return (
    <div className="main-right">
      <div className="main-right-container blog">
        <div>
          <h2>Add Link to Blog</h2>
          <input
            type="url"
            name="Blog-links"
            className="search-btn"
            value={file}
            onChange={(e) => setFile(e.target.value)}
            placeholder="Add Link"
          />
          <br />
          {/* <a
            className="btn-yellow "
            onClick={() => {
              onAddblog();
            }}
            href="#"
          >
            Upload
          </a> */}
        </div>
        {/* {file && (
              <ProgressBar
                className="box4 blue-text"
                file={file}
                setFile={setFile}
                type={"link"}
              />
            )} */}

        <form onSubmit={(e) => onSubmit(e)}>
          <div>
            <h2 className="des">
              Add a description
              {/* <span className='float-numb'>50/100</span> */}
            </h2>
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
            <button type="submit" className="btn-yellow " href="#!">
              Upload
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
const mapStateToProps = (state) => ({});
export default connect(mapStateToProps, { setAlert })(AddBlog);
