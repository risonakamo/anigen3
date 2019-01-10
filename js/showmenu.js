class ShowMenu extends React.Component {
  render() {
    return React.createElement(React.Fragment, null, React.createElement("div", {
      className: "menu-block"
    }, React.createElement("div", {
      className: "left-text"
    }, "Anilist ID"), React.createElement("input", {
      type: "text",
      className: "white-textbox"
    })), React.createElement("div", {
      className: "menu-block"
    }, React.createElement(WhiteMultiSelect, {
      title: "\u5B63\u7BC0",
      actualChoices: ["春", "夏", "秋", "冬"],
      choices: ["SPRING", "SUMMER", "FALL", "WINTER"]
    })), React.createElement("div", {
      className: "menu-block"
    }, React.createElement("div", {
      className: "left-text"
    }, "\u5E74"), React.createElement("input", {
      type: "number",
      className: "white-textbox"
    })), React.createElement("div", {
      className: "menu-block"
    }, React.createElement(WhiteMultiSelect, {
      title: "\u8A00\u8A9E",
      actualChoices: ["日本語", "英語", "実際英語"],
      choices: ["native", "romaji", "english"],
      customClasses: "pill multi-line-wide",
      leftTextClass: "top"
    })), React.createElement("div", {
      className: "menu-block"
    }, React.createElement("div", {
      className: "left-text"
    }), React.createElement("div", {
      className: "white-button green"
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