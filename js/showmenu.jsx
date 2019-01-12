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

  componentDidMount()
  {
    this.loadLocalStorage();
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

    window.localStorage.setItem("anigen3",JSON.stringify(menuOptions));
  }

  //see if localstorage has anigen3 saved data. put it into the menu fields
  //and immediately rendershow
  loadLocalStorage()
  {
    var data=localStorage.anigen3;

    if (!data)
    {
      return;
    }

    data=JSON.parse(data);

    this.menuFields.username.current.value=data.username;
    this.menuFields.season.current.setValue(data.season[0]);
    this.menuFields.year.current.value=data.year;
    this.menuFields.lang.current.setValue(data.lang[0]);

    //user rendershows directly to avoid race with setValue
    this.props.renderShows(data.username,data.season[1],data.year,data.lang[1]);
  }

  render()
  {
    return <>
      <div className="menu-block"><img className="logo" src="img/ag-logo.png"/></div>

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
        <input type="number" className="white-textbox" ref={this.menuFields.year}
          onWheel={(e)=>{
            if (e.deltaY<0)
            {
              e.currentTarget.value=parseInt(e.currentTarget.value)+1;
            }

            else
            {
              e.currentTarget.value=parseInt(e.currentTarget.value)-1;
            }
          }}
        />
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

  //public, set the selected option to the given INDEX. no error checking.
  setValue(value)
  {
    this.setState({selected:value});
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