/*holds and handles show holders.
  ShowHoldHold(TypeSortedShowsOutput allshows)
  allshows: give it full processed data object from main data processing function*/
class ShowHoldHold extends React.Component
{
  constructor(props)
  {
    super(props);

    //rendering order for show types
    this.defaultTypeSortOrder=["TV","TV_SHORT","MUSIC","MOVIE","SPECIAL","OVA","ONA"];
  }

  render()
  {
    var res=[];

    for (var x=0,l=this.defaultTypeSortOrder.length;x<l;x++)
    {
      if (this.props.allshows[this.defaultTypeSortOrder[x]])
      {
        res.push(<ShowHold shows={this.props.allshows[this.defaultTypeSortOrder[x]]} name={x} key={x}/>);
      }
    }

    return <>
      {res}
    </>;
  }
}

/*show holder element. holds shows.
  ShowHold(Show-array shows, string name)
  shows: array of shows
  name: name/type of shows of this group*/
class ShowHold extends React.Component
{
  render()
  {
    return (
      <div className="show-holder">
        <div className="bracket"></div>

        <div className="actual-shows">
          {this.props.shows.map((x,i)=>{
            return <Show data={x} key={i} language="native"/>;
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

        <a href="" className="control-link">remove</a>
      </div>
    );
  }
}