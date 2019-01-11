class ShowHoldHold extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      allshows: {},
      language: "native"
    };
    this.defaultTypeSortOrder = ["TV", "TV_SHORT", "MUSIC", "MOVIE", "SPECIAL", "OVA", "ONA"];
  }

  loadShowData(data, language) {
    this.setState({
      allshows: data,
      language: language
    });
  }

  render() {
    var res = [];

    for (var x = 0, l = this.defaultTypeSortOrder.length; x < l; x++) {
      if (this.state.allshows[this.defaultTypeSortOrder[x]]) {
        res.push(React.createElement(ShowHold, {
          shows: this.state.allshows[this.defaultTypeSortOrder[x]],
          name: x,
          key: x,
          language: this.state.language
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
        language: this.props.language
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

    var type = this.props.data.format;

    if (type == "TV_SHORT") {
      type = "SHORT";
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
    }, type), this.props.data.genres.map((x, i) => {
      return React.createElement("span", {
        key: i
      }, x);
    })), React.createElement("p", {
      className: "date"
    }, date), React.createElement("div", {
      className: "control-link"
    }, "remove"));
  }

}