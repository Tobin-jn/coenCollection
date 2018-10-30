import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { NavLink } from "react-router-dom";
import {
  logIn,
  setErrorMessage,
  resetFavorites,
  displayFavorites
} from "../../actions";
import "./NavBar.css";

export const NavBar = props => {
  let favoritesBtnText;

  props.showFavorites
    ? (favoritesBtnText = "Show all")
    : (favoritesBtnText = "My Favorites");

  if (!props.loggedIn) {
    return (
      <div>
        <nav onClick={() => props.handleErrorMessage("")} className="navBar">
          <NavLink className="sign-in-button buttons" to="/login">
            Sign In
          </NavLink>
          <NavLink className="sign-up-button buttons" to="/signup">
            Sign Up
          </NavLink>
        </nav>
        <section>
          <p className="error-msg">{props.errorMessage}</p>
        </section>
      </div>
    );
  } else {
    return (
      <div className="navBar">
        <h1 className="user-name">Hello {props.currentUser.name}</h1>
        <button
          className="sign-out-button buttons"
          onClick={() => {
            props.handleLogin(false);
            props.handleResetFavorites();
          }}
        >
          Sign Out
        </button>
        <NavLink
          className="favorites-button buttons"
          to="/favorites"
          onClick={() => props.handleDisplayFavorites(!props.showFavorites)}
        >
          {favoritesBtnText}
        </NavLink>
      </div>
    );
  }
};

export const mapStateToProps = state => ({
  loggedIn: state.loggedIn,
  currentUser: state.currentUser,
  errorMessage: state.errorMessage,
  showFavorites: state.showFavorites
});

export const mapDispatchToProps = dispatch => ({
  handleLogin: bool => dispatch(logIn(bool)),
  handleErrorMessage: message => dispatch(setErrorMessage(message)),
  handleResetFavorites: () => dispatch(resetFavorites()),
  handleDisplayFavorites: bool => dispatch(displayFavorites(bool))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(NavBar);
