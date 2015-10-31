1. The Chrome Extension will be a button on the toolbar. When you
click the button it should open a window with the following details:
If WalkMe Doesn’t exist the result will be
www.walkme.com​­ Doesn’t contain the walkme code
If WalkMe Exists the result will be
www.walkme.com​­ WalkMe enabled
Details: User Id, Env,Is Https, Host, async

For this snippet the results will be
<script type="text/javascript" async=""
src="https://cdn.walkme.com/users/7a75f78cb4644e4188ad82d063b1f54b/walkme_7a75f7
8cb4644e4188ad82d063b1f54b_https.js"></script>

www.walkme.com​­ WalkMe enabled
Details:
User Id: ­ 7a75f78cb4644e4188ad82d063b1f54b
Env: ­ Production/Test
Is Https: ­ True
Host: ­ cdn.walkme.com
async: ­ True

2. After WalkMe loads to the page it fetches a few more files. One of them is settings.txt
https://s3.amazonaws.com/s3.maketutorial.com/users/7a75f78cb4644e4188ad82d063b1f54b/settings.txt
In the second part you need to read this file and get the following information
1. LibFile (Lib Version)
2. # DataFiles
3. # languages

The information will be added to the results.