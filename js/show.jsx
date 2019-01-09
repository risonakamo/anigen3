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
    var language=this.props.data.title[this.props.language];

    return (
      <div className="show">
        <img src={this.props.data.coverImage.large}/>

        <p className="title">{language}</p>

        <div className="tags">
          <span className="type">{this.props.data.format}</span>
          {this.props.data.genres.map((x,i)=>{
            return <span key={i}>{x}</span>;
          })}
        </div>

        <p className="date">{`${this.props.data.startDate.month}月${this.props.data.startDate.day}日`}</p>

        <a href="">remove</a>
      </div>
    );
  }
}