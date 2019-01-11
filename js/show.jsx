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
      language:"native"
    };

    //rendering order for show types
    this.defaultTypeSortOrder=["TV","SHORT","MUSIC","MOVIE","SPECIAL","OVA","ONA"];
  }

  //public, recieve a show data object and load it
  //show object should be full TypeSortedShowsOutput object from processing function
  loadShowData(data,language)
  {
    this.setState({allshows:data,language:language});
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
    this.setState({allshows:this.state.allshows});
  }

  render()
  {
    var res=[];

    for (var x=0,l=this.defaultTypeSortOrder.length;x<l;x++)
    {
      if (this.state.allshows[this.defaultTypeSortOrder[x]])
      {
        res.push(<ShowHold shows={this.state.allshows[this.defaultTypeSortOrder[x]]}
          name={x} key={x} language={this.state.language} removeShow={this.removeShow}/>
        );
      }
    }

    return <>
      {res}
    </>;
  }
}

/*show holder element. holds shows.
  ShowHold(Show-array shows, string name, string language, parent-function removeShow)
  shows: array of shows
  name: name/type of shows of this group
  language: language string to use
  removeShow: function from ShowHoldHold*/
class ShowHold extends React.Component
{
  render()
  {
    return (
      <div className="show-holder">
        <div className="bracket"></div>

        <div className="actual-shows">
          {this.props.shows.map((x,i)=>{
            return <Show data={x} key={i} language={this.props.language} removeShow={this.props.removeShow}/>;
          })}
        </div>
      </div>
    );
  }
}

/*a Show element.
  Show(Show data, string-enum language, parent-function removeShow)
  data: full Show data object, see in data defs.gql
  language: string for choosing language.
            usually something like: "native","romaji","english".
            does defaulting if missing.
  removeShow: function from ShowHold*/
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

        <div className="control-link" onClick={()=>{
          this.props.removeShow(this.props.data.format,this.props.data.title.romaji);
        }}>
          remove
        </div>
      </div>
    );
  }
}