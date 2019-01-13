class ShowHoldHold extends React.Component {
  constructor(props) {
    super(props);
    this.removeShow = this.removeShow.bind(this);
    this.state = {
      allshows: {},
      language: "native",
      year: "",
      season: "",
      removeDisabled: 0
    };
    this.defaultTypeSortOrder = ["TV", "SHORT", "MUSIC", "MOVIE", "SPECIAL", "OVA", "ONA"];
    this.parentContainer = document.querySelector(".show-holder-holders");
    this.showHoldMiddle = React.createRef();
  }

  loadShowData(data, language, year, season, dontscroll) {
    this.setState({
      allshows: data,
      language,
      year,
      season
    });

    if (!dontscroll) {
      this.parentContainer.scrollTo(0, 0);
    }
  }

  removeShow(type, title) {
    if (type == "OVA" || type == "ONA" || type == "MOVIE") {
      type = "SPECIAL";
    }

    var shows = this.state.allshows[type];
    shows.splice(shows.findIndex(x => {
      return x.title.romaji == title;
    }), 1);

    if (!shows.length) {
      delete this.state.allshows[type];
    }

    this.loadShowData(this.state.allshows, this.state.language, this.state.year, this.state.season, 1);
  }

  toggleRemovable() {
    this.setState({
      removeDisabled: this.state.removeDisabled ? 1 : 0
    });
  }

  setHoldWidth(newwidth) {
    this.showHoldMiddle.current.style.width = `${newwidth}px`;
  }

  render() {
    var res = [];

    for (var x = 0, l = this.defaultTypeSortOrder.length; x < l; x++) {
      if (this.state.allshows[this.defaultTypeSortOrder[x]]) {
        res.push(React.createElement(ShowHold, {
          shows: this.state.allshows[this.defaultTypeSortOrder[x]],
          name: this.defaultTypeSortOrder[x],
          key: x,
          language: this.state.language,
          removeShow: this.removeShow,
          dontShowRemove: this.state.removeDisabled
        }));
      }
    }

    return React.createElement(React.Fragment, null, React.createElement("div", {
      className: "show-hold-middle",
      ref: this.showHoldMiddle
    }, React.createElement("h1", {
      className: "chart-title"
    }, React.createElement("span", null, this.state.season), this.state.year, "\u30A2\u30CB\u30E1"), res));
  }

}

class ShowHold extends React.Component {
  render() {
    return React.createElement("div", {
      className: "show-holder"
    }, React.createElement("div", {
      className: "holder-type"
    }, this.props.name), React.createElement("div", {
      className: "bracket"
    }), React.createElement("div", {
      className: "actual-shows"
    }, this.props.shows.map((x, i) => {
      return React.createElement(Show, {
        data: x,
        key: i,
        language: this.props.language,
        removeShow: this.props.removeShow,
        dontShowRemove: this.props.dontShowRemove
      });
    })));
  }

}

class Show extends React.Component {
  render() {
    var language = this.props.data.title[this.props.language];

    if (!language) {
      language = this.props.data.title.romaji;
    }

    var date = "";

    if (this.props.data.startDate.month) {
      date += `${this.props.data.startDate.month}月`;

      if (this.props.data.startDate.day) {
        date += `${this.props.data.startDate.day}日`;
      }
    }

    var removeButton = null;

    if (!this.props.dontShowRemove) {
      removeButton = React.createElement("div", {
        className: "control-link",
        onClick: () => {
          this.props.removeShow(this.props.data.format, this.props.data.title.romaji);
        }
      }, "remove");
    }

    return React.createElement("div", {
      className: "show"
    }, React.createElement("img", {
      src: this.props.data.coverImage.large
    }), React.createElement("p", {
      className: "title"
    }, React.createElement("a", {
      href: this.props.data.siteUrl,
      target: "_blank"
    }, language)), React.createElement("div", {
      className: "tags"
    }, React.createElement("span", {
      className: "type"
    }, this.props.data.format), this.props.data.genres.map((x, i) => {
      return React.createElement("span", {
        key: i
      }, x);
    })), React.createElement("p", {
      className: "date"
    }, date), removeButton);
  }

}