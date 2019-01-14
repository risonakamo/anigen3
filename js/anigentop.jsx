/*top controller for react elements of anigen system.
  AniGenTop()*/
class AniGenTop extends React.Component
{
  constructor(props)
  {
    super(props);
    this.renderShows=this.renderShows.bind(this);
    this.setHoldWidth=this.setHoldWidth.bind(this);

    this.showHoldHold=React.createRef();
    this.showMenu=React.createRef();
  }

  //public passdown, perform api query and show render
  renderShows(username,season,year,language)
  {
    anilistUserQuery(username,(data)=>{
      this.showHoldHold.current.loadShowData(processAnlistDataShowType(data,season,year),
        language,year,seasonConvert(season));
    });
  }

  //public passdown, call showHold's set holdwidth
  setHoldWidth(newwidth)
  {
    //only change if not pepega value
    if (newwidth>=1000)
    {
      this.showHoldHold.current.setHoldWidth(newwidth);
    }
  }

  render()
  {
    return <>
      <ShowMenu renderShows={this.renderShows} showHoldHold={this.showHoldHold} ref={this.showMenu}/>

      {ReactDOM.createPortal(<ShowHoldHold ref={this.showHoldHold} showMenu={this.showMenu}/>,
        document.querySelector(".show-holder-holders"))}
    </>;
  }
}