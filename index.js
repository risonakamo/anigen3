window.onload=main;

function main()
{
    ReactDOM.render(React.createElement(AniGenTop),document.querySelector(".menubar"));
    randomiseColourTheme();
}

//make a media list request to anilist using a constructed query.
//query in anilist show query.gql.
//user: anilist user name to query
//callback(object data): callback is given the full anilist api response object
function anilistUserQuery(user,callback)
{
    var r=new XMLHttpRequest();
    r.open("POST","https://graphql.anilist.co");

    r.onreadystatechange=()=>{
        if (r.readyState==4)
        {
            callback(JSON.parse(r.response));
        }
    };

    r.setRequestHeader("content-type","application/json");
    r.send(JSON.stringify({query:`{MediaListCollection(userName:"${user}",type:ANIME,sort:[ADDED_TIME_DESC]){lists{name,entries{media{title{romaji,native,english},startDate{year,month,day},season,coverImage{large},siteUrl,genres,format}}}}}`}));
}

//process FULL anilist data object.
//filters by given SEASON and YEAR, and sorts into TYPES of the shows.
//returns a TypeSortedShowsOutput from data defs gql
function processAnlistDataShowType(data,season="WINTER",year=2019)
{
    if (!data)
    {
        return {};
    }

    data=data.data.MediaListCollection.lists;

    var res={};
    var shows;
    var show;
    var type;
    var seenTitles=new Set(); //dont take duplicates

    //over all lists
    for (var x=0,l=data.length;x<l;x++)
    {
        shows=data[x].entries;

        //over all shows in a single list
        for (var y=0,ly=shows.length;y<ly;y++)
        {
            show=shows[y].media;

            if (show.season==season && show.startDate.year==year && !seenTitles.has(show.title.romaji))
            {
                seenTitles.add(show.title.romaji);
                type=show.format;

                //merge some types into the "special" category
                //do this weird thing because we still want the data's type
                //field to stay the same
                if (type=="OVA" || type=="ONA" || type=="MOVIE")
                {
                    type="SPECIAL";
                }

                //change TV_SHORT to SHORT, permanently in data also
                else if (type=="TV_SHORT")
                {
                    type="SHORT";
                    show.format="SHORT";
                }

                if (res[type])
                {
                    res[type].push(show);
                }

                else
                {
                    res[type]=[show];
                }
            }
        }
    }

    console.log(res);

    //over all filtered shows
    for (var x in res)
    {
        //sort by date, ascending
        res[x].sort((a,b)=>{
            //shows missing date data go to the end
            if (a.startDate.month==null || !a.startDate.day || b.startDate.month==null || !b.startDate.day)
            {
                return 1;
            }

            //date takes month index
            a=new Date(a.startDate.year,a.startDate.month-1,a.startDate.day);
            b=new Date(b.startDate.year,b.startDate.month-1,b.startDate.day);

            if (a<b)
            {
                return -1;
            }

            else if (a>b)
            {
                return 1;
            }

            return 0;
        });
    }

    return res;
}

//randomise the colour theme of the page.
function randomiseColourTheme()
{
    //(no longer applicable)
    //careful!!!! requires index.css have the "html" rule be the 4th rule in the file.
    //and the html rule must look like below, because this function sets the rule to
    //what is displayed below
    // document.styleSheets[0].rules[3].style.cssText=`height: 100%; --main-colour: #${new tinycolor(`hsv(${randint(0,359)},${randint(40,100)},${randint(70,90)})`).toHex()};`;

    document.body.style=`--main-colour:#${new tinycolor(`hsv(${randint(0,359)},${randint(40,100)},${randint(70,90)})`).toHex()}`;
}

//random integre
function randint(min,max)
{
    return Math.floor(Math.random()*(max-min+1))+min;
}

//convert a data string into visual
function seasonConvert(seasonstring)
{
    switch (seasonstring)
    {
        case "SUMMER":
        return "夏";

        case "SPRING":
        return "春";

        case "FALL":
        return "秋";

        case "WINTER":
        return "冬";
    }

    return "？";
}

//debug test produce a screenshot
function testScreenshot()
{
    var showmiddle=document.querySelector(".show-hold-middle");
    showmiddle.classList.add("no-border");
    html2canvas(showmiddle,{allowTaint:true}).then((canvas)=>{
        document.querySelector(".menubar").appendChild(canvas);
        showmiddle.classList.remove("no-border");
    });
}

function actualScreenshot()
{
    var showmiddle=document.querySelector(".show-hold-middle");
    showmiddle.classList.add("no-border");

    var imgOut=document.querySelector(".img-out");
    imgOut.innerHTML="";

    html2canvas(showmiddle,{allowTaint:true}).then((canvas)=>{
        document.querySelector(".img-out").appendChild(canvas);
        showmiddle.classList.remove("no-border");
    });
}

//mouse wheel event handler for use with number boxes. increment the number
//box by a certain number
function wheelIncrement(e,inc=1)
{
    e.preventDefault();

    if (!e.currentTarget.value)
    {
        e.currentTarget.value=0;
    }

    if (e.deltaY<0)
    {
      e.currentTarget.value=parseInt(e.currentTarget.value)+inc;
    }

    else
    {
      e.currentTarget.value=parseInt(e.currentTarget.value)-inc;
    }
}