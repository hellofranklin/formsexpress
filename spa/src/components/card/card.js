import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import SVGUtils from "../../utils/SVGUtils";
import "./card.css";
import WithLoadingSpinner from "../spinner/WithLoadingSpinner";
import { publishFranklinForm, stageFranklinForm } from "../../api";

const Card = (props) => {
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const cardRef = useRef(null);

  const handleClickOutside = (event) => {
    if (cardRef.current && !cardRef.current.contains(event.target)) {
      setIsMenuOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const clickchandler = (formdata) => {
    let urlParams = formdata.svg === "add" ? "" : `?sample=${formdata.svg}`;
    navigate(`/create${urlParams}`);
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handlPreviewFormAction = (formtitle) => {
    stageFranklinForm(
      formtitle,
      localStorage.getItem("email"),
      props.handleApiCall
    ).then((value) => {
      window.open(props.formdata.publishUrl.replace("live", "page"), "_blank");
    });
  };

  const handlPublishFormAction = (formtitle) => {
    publishFranklinForm(
      formtitle,
      localStorage.getItem("email"),
      props.handleApiCall
    ).then((value) => {
      window.open(props.formdata.publishUrl, "_blank");
    });
  };

  const handleEditButton = (formtitle) => {
    navigate(`/create?action=update&title=${formtitle}`);
  };

  const cardHeaderTitle = (formTitle) => {
    if (formTitle.length > 18) {
      return formTitle.substring(0, 18) + "...";
    }
    return formTitle;
  };

  if (props.type === "userform") {
    return (
      <div className="form-card user-card" key={props.id} ref={cardRef}>
        <div
          className="form-card-image"
          onClick={() => handleEditButton(props.formdata.title)}
        >
          <SVGUtils name={props.formdata.svg ? props.formdata.svg : "myform"} />
        </div>
        <div className="form-card-header">{cardHeaderTitle(props.formdata.title)}</div>

        <div className="form-card-footer">
          <div className="form-card-menu">
            <div className="form-card-menu-dots" onClick={() => toggleMenu()}>
              &#8942;
            </div>
            {isMenuOpen && (
              <div className={`form-card-menu-items`}>
                <a
                  className="form-card-menu-item"
                  href="#"
                  onClick={() => handlPreviewFormAction(props.formdata.title)}
                >
                  <SVGUtils name="previewform" />
                  <span>Preview Form</span>
                </a>
                <a
                  className="form-card-menu-item"
                  href={props.formdata.publishUrl.replace("live", "page")}
                  target="_blank"
                >
                  <SVGUtils name="openpage" />
                  <span>Open Preview Page</span>
                </a>
                <a
                  className="form-card-menu-item"
                  href="#"
                  onClick={() => handlPublishFormAction(props.formdata.title)}
                >
                  <SVGUtils name="publishform" />
                  <span>Publish Form</span>
                </a>
                <a
                  className="form-card-menu-item"
                  href={props.formdata.publishUrl}
                  target="_blank"
                >
                  <SVGUtils name="openpage" />
                  <span>Open Live Page</span>
                </a>
                <a
                  className="form-card-menu-item"
                  href={props.formdata.resultSheetUrl}
                  target="_blank"
                >
                  <SVGUtils name="resultsheet" />
                  <span>Result Sheet</span>
                </a>
                <a
                  className="form-card-menu-item"
                  href={props.formdata.folderUrl}
                  target="_blank"
                >
                  <SVGUtils name="folder" />
                  <span>Forms Folder</span>
                </a>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  } else {
    return (
      <div className="form-card sample-card" key={props.id}>
        <div
          className="form-card-image"
          onClick={() => clickchandler(props.formdata)}
        >
          <SVGUtils name={props.formdata.svg ? props.formdata.svg : "myform"} />
        </div>
        <div className="form-card-header">{props.formdata.title}</div>
      </div>
    );
  }
};

export default WithLoadingSpinner(Card);
