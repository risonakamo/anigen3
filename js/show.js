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
        language: "native"
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

    return React.createElement("div", {
      className: "show"
    }, React.createElement("img", {
      src: this.props.data.coverImage.large
    }), React.createElement("a", {
      href: this.props.data.siteUrl,
      className: "title",
      target: "_blank"
    }, language), React.createElement("div", {
      className: "tags"
    }, React.createElement("span", {
      className: "type"
    }, this.props.data.format), this.props.data.genres.map((x, i) => {
      return React.createElement("span", {
        key: i
      }, x);
    })), React.createElement("p", {
      className: "date"
    }, `${this.props.data.startDate.month}月${this.props.data.startDate.day}日`), React.createElement("a", {
      href: "",
      class: "control-link"
    }, "remove"));
  }

}