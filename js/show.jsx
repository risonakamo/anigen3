/*holds and handles show holders.
  ShowHoldHold()*/
class ShowHoldHold extends React.Component
{
  constructor(props)
  {
    super(props);
    this.removeShow=this.removeShow.bind(this);

    this.state={
      allshows:{},
      language:"native",
      year:"",
      season:"",

      removeDisabled:0
    };

    //rendering order for show types
    this.defaultTypeSortOrder=["TV","SHORT","MUSIC","MOVIE","SPECIAL","OVA","ONA"];
    this.parentContainer=document.querySelector(".show-holder-holders"); //the parent element that holds stuff
  }

  //public, recieve a show data object and load it
  //show object should be full TypeSortedShowsOutput object from processing function
  //language is probably required, year/season are for displaying in the top label.
  //give dont scroll=1 to not scroll up to top
  loadShowData(data,language,year,season,dontscroll)
  {
    this.setState({allshows:data,language,year,season});

    if (!dontscroll)
    {
      this.parentContainer.scrollTo(0,0);
    }
  }

  //public passdown, remove a show given the type and title
  removeShow(type,title)
  {
    //handle types that have been merged with SPECIAL type. merges should be
    //identical to merges in processanilistdatashowtype() in index.js
    if (type=="OVA" || type=="ONA" || type=="MOVIE")
    {
      type="SPECIAL";
    }

    var shows=this.state.allshows[type];

    //find the show to be deleted in the correct allshow type array, and remove it
    shows.splice(shows.findIndex((x)=>{return x.title.romaji==title}),1);

    //if that type array is now empty, remove that type completely
    if (!shows.length)
    {
      delete this.state.allshows[type];
    }

    //rerender
    this.loadShowData(this.state.allshows,this.state.language,this.state.year,this.state.season,1);
  }

  //public, toggle removeable mode of show elements
  toggleRemovable()
  {
    this.setState({removeDisabled:this.state.removeDisabled?1:0});
  }

  render()
  {
    var res=[];

    for (var x=0,l=this.defaultTypeSortOrder.length;x<l;x++)
    {
      if (this.state.allshows[this.defaultTypeSortOrder[x]])
      {
        res.push(<ShowHold shows={this.state.allshows[this.defaultTypeSortOrder[x]]}
          name={this.defaultTypeSortOrder[x]} key={x} language={this.state.language}
          removeShow={this.removeShow} dontShowRemove={this.state.removeDisabled}/>
        );
      }
    }

    return <>
      <div className="show-hold-middle">
        <h1 className="chart-title"><span>{this.state.season}</span>{this.state.year}アニメ</h1>
        {res}
      </div>
    </>;
  }
}

/*show holder element. holds shows.
  ShowHold(Show-array shows, string name, string language, parent-function removeShow, bool dontShowRemove=null)
  shows: array of shows
  name: name/type of shows of this group
  language: language string to use
  removeShow: function from ShowHoldHold
  dontShowRemove: if remove button should not be there in children show elements*/
class ShowHold extends React.Component
{
  render()
  {
    return (
      <div className="show-holder">
        <div className="holder-type">{this.props.name}</div>
        <div className="bracket"></div>

        <div className="actual-shows">
          {this.props.shows.map((x,i)=>{
            return <Show data={x} key={i} language={this.props.language}
              removeShow={this.props.removeShow} dontShowRemove={this.props.dontShowRemove}/>;
          })}
        </div>
      </div>
    );
  }
}

/*a Show element.
  Show(Show data, string-enum language, parent-function removeShow,bool dontShowRemove=null)
  data: full Show data object, see in data defs.gql
  language: string for choosing language.
            usually something like: "native","romaji","english".
            does defaulting if missing.
  removeShow: function from ShowHold
  dontShowRemove: if remove button should not be there*/
class Show extends React.Component
{
  render()
  {
    //set the title with certain language. if missing, default to romaji
    var language=this.props.data.title[this.props.language];

    if (!language)
    {
      language=this.props.data.title.romaji;
    }

    //set the date. if month is missing, whole date is omitted.
    //if only month exists, still shows only the month without the day.
    var date="";
    if (this.props.data.startDate.month)
    {
      date+=`${this.props.data.startDate.month}月`;

      if (this.props.data.startDate.day)
      {
        date+=`${this.props.data.startDate.day}日`;
      }
    }

    return (
      <div className="show">
        <img src={this.props.data.coverImage.large}/>

        <p className="title"><a href={this.props.data.siteUrl} target="_blank">{language}</a></p>

        <div className="tags">
          <span className="type">{this.props.data.format}</span>
          {this.props.data.genres.map((x,i)=>{
            return <span key={i}>{x}</span>;
          })}
        </div>

        <p className="date">{date}</p>

        {(()=>{
          if (!this.props.dontShowRemove)
          {
            return (
              <div className="control-link" onClick={()=>{
                this.props.removeShow(this.props.data.format,this.props.data.title.romaji);
              }}>
                remove
              </div>
            );
          }

          return null;
        })()}
      </div>
    );
  }
}