class AniGenTop extends React.Component {
  constructor(props) {
    super(props);
    this.renderShows = this.renderShows.bind(this);
    this.showHoldHold = React.createRef();
  }

  renderShows(username, season, year, language) {
    anilistUserQuery(username, data => {
      this.showHoldHold.current.loadShowData(processAnlistDataShowType(data, season, year), language);
    });
  }

  render() {
    return React.createElement(React.Fragment, null, React.createElement(ShowMenu, {
      renderShows: this.renderShows
    }), ReactDOM.createPortal(React.createElement(ShowHoldHold, {
      ref: this.showHoldHold
    }), document.querySelector(".show-holder-holders")));
  }

}