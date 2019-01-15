# Anigen 3*
access anilist.co account lists to view and generate seasonal charts as images for sharing.

example output:

<img src="https://i.imgur.com/iN4qhuE.png" width=150>

*(click image for full size (1500x2213))*

## usage
#### loading a season
Choose things in the menu.

![](https://i.imgur.com/swa3y4T.png)

hit green button.

what it does & some quirks:
- use the anilist ID **that appears in the URL of your anilist page** (ie: https://<span></span>anilist<span></span>.co/user/<your name ID\>), which **may or may not** be your username, and is **most likely not a number**.
- anigen will attempt to create a chart which includes all shows for the specified **year** and **season** that **appear on the specified user's anilist.co list**.
- anigen will take shows **from all categories** (or lists, as anilist calls them) from the given user's lists.
- different language formats affect only the displayed titles on the chart.
- shows are grouped by their *format*, although certain ones are grouped together. there can be other groupings but I didn't feel like it.
- because of the way seasons work, winter season sometimes includes both the beginning of the year and the end of the year (december and january), which technically are seperate seasons (as "winter 2019" also includes december 2018 but "winter 2018" shouldn't include december 2018). luckily, winter season shows rarely start in december.

*example of a show entry:*

![](https://i.imgur.com/pGp4KJa.png)

### Saving images
You can save the displayed charts as an image. Image saving functions are on their own menu accessible via a button from the main menu.

#### removing
Before saving the chart you can remove any shows you don't want shown in the final image. Removed shows are not remembered and will re-appear when reloading or choosing the same season again with the green button on the main menu. This button **is not visible when on the image output menu**, so switch back to the main menu first to use this function.

![](https://i.imgur.com/R4Wimch.png)

#### width adjust
- If you don't like how the dimensions of the chart look, you can set the width manually here.
- Use the mouse wheel, if you have one, to make quick adjustments.

![](https://i.imgur.com/gIiXerl.png)

#### saving the image
- **left click** on the square to render an image of what is currently displayed at any time.
- **Right click on the square and click save image as to save the image.**

![](https://i.imgur.com/hqmYzES.png)

## notes
- is the colour blinding? reload the page for a random colour.
- The chart display area is draggable
    - but watch out for the show titles. they are links
- anigen remembers your last query and restores it each visit.

*\*not affliated with anilist.co or other anilist.co related services*