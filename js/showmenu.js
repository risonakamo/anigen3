class ShowMenu extends React.Component {
  constructor(props) {
    super(props);
    this.renderShowCall = this.renderShowCall.bind(this);
    this.menuFields = {
      username: React.createRef(),
      season: React.createRef(),
      year: React.createRef(),
      lang: React.createRef()
    };
  }

  componentDidMount() {
    this.loadLocalStorage();
  }

  renderShowCall() {
    if (!this.menuFields.username.current.value || this.menuFields.year.current.value < 1990 || this.menuFields.year.current.value > 3000) {
      console.log("invalid field");
      return;
    }

    var menuOptions = {
      username: this.menuFields.username.current.value,
      season: this.menuFields.season.current.getValue(),
      year: this.menuFields.year.current.value,
      lang: this.menuFields.lang.current.getValue()
    };
    this.props.renderShows(menuOptions.username, menuOptions.season[1], menuOptions.year, menuOptions.lang[1]);
    window.localStorage.setItem("anigen3", JSON.stringify(menuOptions));
  }

  loadLocalStorage() {
    var data = localStorage.anigen3;

    if (!data) {
      return;
    }

    data = JSON.parse(data);
    this.menuFields.username.current.value = data.username;
    this.menuFields.season.current.setValue(data.season[0]);
    this.menuFields.year.current.value = data.year;
    this.menuFields.lang.current.setValue(data.lang[0]);
    this.props.renderShows(data.username, data.season[1], data.year, data.lang[1]);
  }

  render() {
    return React.createElement(React.Fragment, null, React.createElement("div", {
      className: "menu-block"
    }, React.createElement("img", {
      className: "logo",
      src: "img/ag-logo.png"
    })), React.createElement("div", {
      className: "menu-block"
    }, React.createElement("div", {
      className: "left-text"
    }, "Anilist ID"), React.createElement("input", {
      type: "text",
      className: "white-textbox",
      ref: this.menuFields.username
    })), React.createElement("div", {
      className: "menu-block"
    }, React.createElement(WhiteMultiSelect, {
      title: "\u5B63\u7BC0",
      actualChoices: ["春", "夏", "秋", "冬"],
      choices: ["SPRING", "SUMMER", "FALL", "WINTER"],
      ref: this.menuFields.season
    })), React.createElement("div", {
      className: "menu-block"
    }, React.createElement("div", {
      className: "left-text"
    }, "\u5E74"), React.createElement("input", {
      type: "number",
      className: "white-textbox",
      ref: this.menuFields.year,
      onWheel: e => {
        if (e.deltaY < 0) {
          e.currentTarget.value = parseInt(e.currentTarget.value) + 1;
        } else {
          e.currentTarget.value = parseInt(e.currentTarget.value) - 1;
        }
      }
    })), React.createElement("div", {
      className: "menu-block"
    }, React.createElement(WhiteMultiSelect, {
      title: "\u8A00\u8A9E",
      actualChoices: ["日本語", "英語", "実際英語"],
      choices: ["native", "romaji", "english"],
      customClasses: "pill multi-line-wide",
      leftTextClass: "top",
      ref: this.menuFields.lang
    })), React.createElement("div", {
      className: "menu-block"
    }, React.createElement("div", {
      className: "left-text"
    }), React.createElement("div", {
      className: "white-button green",
      onClick: this.renderShowCall
    }, "\u5B8C\u4E86")));
  }

}

class WhiteMultiSelect extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selected: 0
    };
  }

  getValue() {
    return [this.state.selected, this.props.choices[this.state.selected]];
  }

  setValue(value) {
    this.setState({
      selected: value
    });
  }

  render() {
    return React.createElement(React.Fragment, null, React.createElement("div", {
      className: `left-text ${this.props.leftTextClass}`
    }, this.props.title), React.createElement("div", {
      className: `white-multiselect ${this.props.customClasses}`
    }, this.props.actualChoices.map((x, i) => {
      var selectedClass = "";

      if (this.state.selected == i) {
        selectedClass = "selected";
      }

      return React.createElement("span", {
        key: i,
        className: selectedClass,
        onClick: () => {
          this.setState({
            selected: i
          });
        }
      }, x);
    })));
  }

}