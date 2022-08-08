import React from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import "./PostsItem.css";

export default function PostsItem({ name, email, gender, status, id }) {
  return (
    <Link
      to={`${id}/edit`}
      name={name}
      email={email}
      gender={gender}
      status={status}
      id={id}
    >
      <div className="post">
        <p className="post__text post__name">{name}</p>
        <p className="post__text post__email">{email}</p>
        <p className="post__text post__gender">{gender}</p>
        <p className="post__text post__status">{status}</p>
      </div>
    </Link>
  );
}

PostsItem.propTypes = {
  name: PropTypes.string.isRequired,
  email: PropTypes.string.isRequired,
  gender: PropTypes.string.isRequired,
  status: PropTypes.string.isRequired,
  id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
};
