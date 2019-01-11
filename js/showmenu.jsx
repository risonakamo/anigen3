/*menu element.
  ShowMenu(function renderShows)
  renderShows: function from parent AniGenTop*/
class ShowMenu extends React.Component
{
  constructor(props)
  {
    super(props);
    this.renderShowCall=this.renderShowCall.bind(this);

    //menu field refs
    this.menuFields={
      username:React.createRef(),
      season:React.createRef(),
      year:React.createRef(),
      lang:React.createRef()
    };
  }

  //call rendershow with data from this menu
  //and also save to localStorage
  renderShowCall()
  {
    if (!this.menuFields.username.current.value || this.menuFields.year.current.value<1990
        || this.menuFields.year.current.value>3000)
    {
      console.log("invalid field");
      return;
    }

    var menuOptions={
      username:this.menuFields.username.current.value,
      season:this.menuFields.season.current.getValue(),
      year:this.menuFields.year.current.value,
      lang:this.menuFields.lang.current.getValue()
    };

    //season and lang use index 1 for the string value
    this.props.renderShows(menuOptions.username,menuOptions.season[1],
      menuOptions.year,menuOptions.lang[1]
    );

    //setting season and lang to the index number and not the string
    menuOptions.season=menuOptions.season[0];
    menuOptions.lang=menuOptions.lang[0];

    window.localStorage.setItem("anigen3",JSON.stringify(menuOptions));
  }

  render()
  {
    return <>
      <div className="menu-block">
        <div className="left-text">Anilist ID</div>
        <input type="text" className="white-textbox" ref={this.menuFields.username}/>
      </div>

      <div className="menu-block">
        <WhiteMultiSelect title="季節" actualChoices={["春","夏","秋","冬"]}
          choices={["SPRING","SUMMER","FALL","WINTER"]} ref={this.menuFields.season}
        />
      </div>

      <div className="menu-block">
        <div className="left-text">年</div>
        <input type="number" className="white-textbox" ref={this.menuFields.year}/>
      </div>

      <div className="menu-block">
        <WhiteMultiSelect title="言語" actualChoices={["日本語","英語","実際英語"]}
          choices={["native","romaji","english"]} customClasses="pill multi-line-wide"
          leftTextClass="top" ref={this.menuFields.lang}
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

  //public, return the array [int valueIndex,string value]
  //valueIndex: index of the selected value
  //value: the string value that is chosen
  getValue()
  {
    return [this.state.selected,this.props.choices[this.state.selected]];
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