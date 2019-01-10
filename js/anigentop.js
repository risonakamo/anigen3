class AniGenTop extends React.Component {
  renderShows(username, season, year) {
    anilistUserQuery(username, data => {
      data = processAnlistDataShowType(data, "WINTER", 2019);
    });
  }

  render() {
    return React.createElement(React.Fragment, null, React.createElement(ShowMenu, null), ReactDOM.createPortal(React.createElement(ShowHoldHold, null), document.querySelector(".show-holder-holders")));
  }

}