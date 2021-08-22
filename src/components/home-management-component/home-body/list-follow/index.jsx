import React from "react";
import ListFollowItem from "./list-follow-item";
import "./styles.scss";
function ListFollow(props) {
  return (
    <div className="lf__wrapper">
      <ListFollowItem loading={props.loading} list={props.list} />
    </div>
  );
}
export default ListFollow;
