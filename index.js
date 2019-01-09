window.onload=main;

function main()
{
    anilistUserQuery("risona",(data)=>{
        data=processAnlistDataShowType(data,"FALL",2018);

        ReactDOM.render(React.createElement(ShowHold,{shows:data.TV,name:"TV"}),document.querySelector(".show-holder-holders"));
    });
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
    r.send(JSON.stringify({query:`{MediaListCollection(userName:"${user}",type:ANIME,sort:[ADDED_TIME_DESC]){lists{name,entries{media{title{romaji,native},startDate{year,month,day},season,coverImage{large},siteUrl,genres,format}}}}}`}));
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
                if (res[show.format])
                {
                    res[show.format].push(show);
                }

                else
                {
                    res[show.format]=[show];
                }
            }
        }
    }

    return res;
}