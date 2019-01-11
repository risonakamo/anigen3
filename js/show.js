class ShowHoldHold extends React.Component {
  constructor(props) {
    super(props);
    this.removeShow = this.removeShow.bind(this);
    this.state = {
      allshows: {},
      language: "native"
    };
    this.defaultTypeSortOrder = ["TV", "SHORT", "MUSIC", "MOVIE", "SPECIAL", "OVA", "ONA"];
    this.parentContainer = document.querySelector(".show-holder-holders");
  }

  loadShowData(data, language) {
    this.setState({
      allshows: data,
      language: language
    });
    this.parentContainer.scrollTo(0, 0);
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

    this.loadShowData(this.state.allshows, this.state.language);
  }

  render() {
    var res = [];

    for (var x = 0, l = this.defaultTypeSortOrder.length; x < l; x++) {
      if (this.state.allshows[this.defaultTypeSortOrder[x]]) {
        res.push(React.createElement(ShowHold, {
          shows: this.state.allshows[this.defaultTypeSortOrder[x]],
          name: x,
          key: x,
          language: this.state.language,
          removeShow: this.removeShow
        }));
      }
    }

    return React.createElement(React.Fragment, null, res);
  }

}

class ShowHold extends React.Component {
  render() {
    return React.createElement("div", {
      className: "show-holder"
    }, React.createElement("div", {
      className: "bracket"
    }), React.createElement("div", {
      className: "actual-shows"
    }, this.props.shows.map((x, i) => {
      return React.createElement(Show, {
        data: x,
        key: i,
        language: this.props.language,
        removeShow: this.props.removeShow
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
    }, date), React.createElement("div", {
      className: "control-link",
      onClick: () => {
        this.props.removeShow(this.props.data.format, this.props.data.title.romaji);
      }
    }, "remove"));
  }

}