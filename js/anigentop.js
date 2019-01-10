class AniGenTop extends React.Component {
  render() {
    return React.createElement(React.Fragment, null, React.createElement(ShowMenu, null), ReactDOM.createPortal(React.createElement(ShowHoldHold, {
      allshows: this.props.allshows
    }), document.querySelector(".show-holder-holders")));
  }

}