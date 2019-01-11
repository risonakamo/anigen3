window.onload=main;

function main()
{
    ReactDOM.render(React.createElement(AniGenTop),document.querySelector(".menubar"));
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

    //over all lists
    for (var x=0,l=data.length;x<l;x++)
    {
        shows=data[x].entries;

        //over all shows in a single list
        for (var y=0,ly=shows.length;y<ly;y++)
        {
            show=shows[y].media;

            if (show.season==season && show.startDate.year==year)
            {
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
                return -1;
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