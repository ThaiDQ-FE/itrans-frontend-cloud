import React from "react";
import Images from "../../../../assets/images/images";
import "./styles.scss";
function TeamMemberItem(props) {
  return (
    <>
      {props.linkCv === "" ? (
        <div className="tm__link tm__noLink">
          <div className="tm__img">
            <img
              src={props.image === "" ? Images.NO_USER : props.image}
              alt="team"
            />
          </div>
          <div className="tm__name">
            <p>{props.name}</p>
          </div>
          <div className="tm__position">
            <p>{props.position}</p>
          </div>
        </div>
      ) : (
        <a
          className="tm__link"
          href={props.linkCv}
          target="_blank"
          rel="noreferrer"
        >
          <div className="tm__img">
            <img
              src={props.image === "" ? Images.NO_USER : props.image}
              alt="team"
            />
          </div>
          <div className="tm__name">
            <p>{props.name}</p>
          </div>
          <div className="tm__position">
            <p>{props.position}</p>
          </div>
        </a>
      )}
    </>
  );
}

export default TeamMemberItem;
