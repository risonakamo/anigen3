/*menu element.
  ShowMenu()*/
class ShowMenu extends React.Component
{
  render()
  {
    return <>
      <div className="menu-block">
        <div className="left-text">Anilist ID</div>
        <input type="text" className="white-textbox"/>
      </div>

      <div className="menu-block">
        <div className="left-text">季節</div>
        <div className="white-multiselect">
          <span className="selected">春</span>
          <span>夏</span>
          <span>秋</span>
          <span>冬</span>
        </div>
      </div>

      <div className="menu-block">
        <div className="left-text">年</div>
        <input type="number" className="white-textbox"/>
      </div>

      <div className="menu-block">
        <div className="left-text">言語</div>
        <div className="white-multiselect pill">
          <span className="selected">日本語</span>
          <span>英語</span>
        </div>
      </div>

      <div className="menu-block double-top">
        <div className="left-text"></div>
        <div className="white-button green">完了</div>
      </div>
    </>;
  }
}