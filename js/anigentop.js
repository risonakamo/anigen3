class AniGenTop extends React.Component {
  constructor(props) {
    super(props);
    this.renderShows = this.renderShows.bind(this);
    this.setHoldWidth = this.setHoldWidth.bind(this);
    this.showHoldHold = React.createRef();
    this.showMenu = React.createRef();
  }

  renderShows(username, season, year, language) {
    anilistUserQuery(username, data => {
      this.showHoldHold.current.loadShowData(processAnlistDataShowType(data, season, year), language, year, seasonConvert(season));
    });
  }

  setHoldWidth(newwidth) {
    if (newwidth >= 1000) {
      this.showHoldHold.current.setHoldWidth(newwidth);
    }
  }

  render() {
    return React.createElement(React.Fragment, null, React.createElement(ShowMenu, {
      renderShows: this.renderShows,
      showHoldHold: this.showHoldHold,
      ref: this.showMenu
    }), ReactDOM.createPortal(React.createElement(ShowHoldHold, {
      ref: this.showHoldHold,
      showMenu: this.showMenu
    }), document.querySelector(".show-holder-holders")));
  }

}