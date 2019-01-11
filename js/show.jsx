/*holds and handles show holders.
  ShowHoldHold()*/
class ShowHoldHold extends React.Component
{
  constructor(props)
  {
    super(props);

    this.state={
      allshows:{},
      language:"native"
    };

    //rendering order for show types
    this.defaultTypeSortOrder=["TV","TV_SHORT","MUSIC","MOVIE","SPECIAL","OVA","ONA"];
  }

  //public, recieve a show data object and load it
  //show object should be full TypeSortedShowsOutput object from processing function
  loadShowData(data,language)
  {
    this.setState({allshows:data,language:language});
  }

  render()
  {
    var res=[];

    for (var x=0,l=this.defaultTypeSortOrder.length;x<l;x++)
    {
      if (this.state.allshows[this.defaultTypeSortOrder[x]])
      {
        res.push(<ShowHold shows={this.state.allshows[this.defaultTypeSortOrder[x]]}
          name={x} key={x} language={this.state.language}/>
        );
      }
    }

    return <>
      {res}
    </>;
  }
}

/*show holder element. holds shows.
  ShowHold(Show-array shows, string name, string language)
  shows: array of shows
  name: name/type of shows of this group
  language: language string to use*/
class ShowHold extends React.Component
{
  render()
  {
    return (
      <div className="show-holder">
        <div className="bracket"></div>

        <div className="actual-shows">
          {this.props.shows.map((x,i)=>{
            return <Show data={x} key={i} language={this.props.language}/>;
          })}
        </div>
      </div>
    );
  }
}

/*a Show element.
  Show(Show data, string-enum language)
  data: full Show data object, see in data defs.gql
  language: string for choosing language.
            usually something like: "native","romaji","english".
            does defaulting if missing.*/
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

    //quick edit to show type string
    var type=this.props.data.format;
    if (type=="TV_SHORT")
    {
      type="SHORT";
    }

    return (
      <div className="show">
        <img src={this.props.data.coverImage.large}/>

        <p className="title"><a href={this.props.data.siteUrl} target="_blank">{language}</a></p>

        <div className="tags">
          <span className="type">{type}</span>
          {this.props.data.genres.map((x,i)=>{
            return <span key={i}>{x}</span>;
          })}
        </div>

        <p className="date">{date}</p>

        <div className="control-link">remove</div>
      </div>
    );
  }
}