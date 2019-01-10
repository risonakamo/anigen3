/*menu element.
  ShowMenu(function renderShows)
  renderShows: function from parent AniGenTop*/
class ShowMenu extends React.Component
{
  constructor(props)
  {
    super(props);
    this.renderShowCall=this.renderShowCall.bind(this);
  }

  //call rendershow with data from this menu
  renderShowCall()
  {
    this.props.renderShows("risona","WINTER",2019);
  }

  render()
  {
    return <>
      <div className="menu-block">
        <div className="left-text">Anilist ID</div>
        <input type="text" className="white-textbox"/>
      </div>

      <div className="menu-block">
        <WhiteMultiSelect title="季節" actualChoices={["春","夏","秋","冬"]}
          choices={["SPRING","SUMMER","FALL","WINTER"]}
        />
      </div>

      <div className="menu-block">
        <div className="left-text">年</div>
        <input type="number" className="white-textbox"/>
      </div>

      <div className="menu-block">
        <WhiteMultiSelect title="言語" actualChoices={["日本語","英語","実際英語"]}
          choices={["native","romaji","english"]} customClasses="pill multi-line-wide"
          leftTextClass="top"
        />
      </div>

      <div className="menu-block">
        <div className="left-text"></div>
        <div className="white-button green" onClick={this.renderShowCall}>完了</div>
      </div>
    </>;
  }
}

/*a customisable "white multiselect" element
  WhiteMultiselect(string-array actualChoices, string-array choices, string title, string customClasses)
  actualChoices: string array of choices that will be displayed
  choices: string array in equal size to actualChoices, corresponding to what choice
           will be returned as selected. so the choice marked as selected can be
           different from the displayed choice.
  title: title to appear on the left side of the element
  customClasses: custom class strings to add
  leftTextClass: custom class for leftText*/
class WhiteMultiSelect extends React.Component
{
  constructor(props)
  {
    super(props);

    this.state={
      selected:0 //which choice is selected
    };
  }

  render()
  {
    return <>
      <div className={`left-text ${this.props.leftTextClass}`}>{this.props.title}</div>
      <div className={`white-multiselect ${this.props.customClasses}`}>
        {this.props.actualChoices.map((x,i)=>{
          var selectedClass="";

          if (this.state.selected==i)
          {
            selectedClass="selected";
          }

          return <span key={i} className={selectedClass}
            onClick={()=>{this.setState({selected:i})}}>{x}
          </span>;
        })}
      </div>
    </>;
  }
}