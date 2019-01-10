/*top controller for react elements of anigen system.
  AniGenTop(TypeSortedShowsOutput allshows)
  allshows: full processed data object from main data processing, to be given to ShowHoldHold*/
class AniGenTop extends React.Component
{
  render()
  {
    return <>
      <ShowMenu/>

      {ReactDOM.createPortal(<ShowHoldHold allshows={this.props.allshows}/>,document.querySelector(".show-holder-holders"))}
    </>;
  }
}