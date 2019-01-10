/*top controller for react elements of anigen system.
  AniGenTop()*/
class AniGenTop extends React.Component
{
  renderShows(username,season,year)
  {
    anilistUserQuery(username,(data)=>{
      data=processAnlistDataShowType(data,"WINTER",2019);
    });
  }

  render()
  {
    return <>
      <ShowMenu/>

      {ReactDOM.createPortal(<ShowHoldHold/>,document.querySelector(".show-holder-holders"))}
    </>;
  }
}