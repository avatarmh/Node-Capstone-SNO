See demo [here](https://susnano.herokuapp.com
________________________________________________________________________

## Thinkful Node Capstone

# Analysis and Redesign of an Existing Website for Responsive, Content-driven, Mobile-first Full-stack with Back-end Added, A11y and Privacy Compliance

Miriam Heller, Thinkful Flex Student

resubmitted November 24, 2018


### 1. PURPOSE OF THIS FULLSTACK CAPSTONE PROJECT
	
This project serves to fulfill the requirements for the Thinkful Full-stack Node Capstone project. The Sustainable NanoTechology Organization (SNO) app provided here satisfies the key goals of the capstone. This app represents a full stack app that uses Express. The app’s server highlights the use of endpoints for delivering static assets and RESTful (REpresentational State Transfer) API endpoints. The project entailed designing and building a client that makes use of the API.

At the same time, this project extends and redesigns an existing website for a professional society to enable persistence of membership information. This MVP also demonstrates how a new service can be offered to members through a News database. The current Sustainable Nanotechnology Organization (SNO) website (susnano.org) not only lacks server-side functionality, but it is not wholly compliant with current software engineering practice in terms of mobile first design, responsiveness and accessibility (A11y) compliant. The SNO CAPSTONE app  was designed and built for A11y compliance. Finally, there is no policy posted on the website for privacy assurances for information collected. A Policy Statement is now included that will hopefully inform the SNO leadership of the need to design a privacy policy, post it on their website and keep current as privacy policy is in a high state of flux.

Use of the SNO logo exclusively for this project was granted by the SNO Executive Director and Founder, Barbara Karn. The existing website membership form guided the creation of the form for this project, but no code from SNO. No code from SNO was used as several high level packages were use, including JotForm, a drag and drop web form builder that is not accessible. 

### 2. OVERVIEW OF THE FULL-STACK SNO APP COMPONENTS WITH NOTED POTENTIAL FUTURE DEVELOPMENT

The application is a Minimum Viable Product (MVP) consisting of ten (10) pages, five (5) of which are served out as static files and five (5) of which demonstrate my knowledge of the use of http endpoints that provide the missing functionality of a backend for SNO, user registration, login authentication and news and directory services for members. the following provides more informaiton for each page.
<ol>
<li>
<u>Home/Landing</u> page (index.html-currently statically served) that improves upon the real SNO landing page by offering useful dynamic information about SNO events, especially the annual SNO conference - the premier event, news events, and interesting video's intends to capture the interest of the accidental visitor. With real estate so valuable and the imperative to provide value added to members, the landing page of SNO's website was costly place to put information about the organization exclusively, which offered little to attract potential new members and would at best waste members' time.   

Potential future development: Set up event models and video models within the data base similar to the news database and have a webmaster monitor member activity as well as curate RSS nanotechnology feeds and SNO activity to populate these collections and showcase recent event, news and videos to inform SNO members and affiliates. 
</li>
<li>
<u>About</u> page that provides description information about SNO (about.html-static), their purpose. 

Potential future development: There is additional material on Governance that should logically be presented here, including current officers and SNO Bylaws.
</li>
<li>
Conference page, which would eventually track SNO and other events of interest to SNO members and affiliates(conference.html-static). This web page would likely be one among many,

Potential future development: Change page from conference.html and conference.css to events.html, *.css and if necessary events.js. Here is where event information pertaining to SNO, nanotechnology research, nanotechnology policy, etc. would made accessible. Most importantly, there should be some mechanism to add submenus for registering for a conference. There would be a checkbox for conference registrants who are current members that would enable population of the registration form with their current information to obviate the need for the registrant to duplicate and possibly introduce conflicting data. This would require modifying the user model.js (which should be called member.js). A new table would be created with conference attendees that would permit non-member conference registrants, track payment, what session, workshop, keynote section of the conference they'd be participating in, etc. The conference registration page would need to be linked to a payment mechanism as well
</li>
<li>
<u>Join SNO</u> page, the primary page for both registering new members and capturing new member information that is ultimately rendered persistent via a POST request to a mongoDB served from mLab (joinSNO.html w/ joinSNO.js). Since SNO is an international organization, a pull down menu is provided for all countries. Two pulldown menus have an "Other" option, which permits input into an "Other" field right below it. 

Potential future development:  Provide validation of phone number, including international formats, code for which I've found on the WWW; provide feedback to user for approval before submitting to the db; I would like to put in place a test for Robotic Registration.
</li>
<li>
<u>Login</u> page, enables members to login with a hashed passworld via a (POST) request. Once logged in, members have access to protected endpoints that provide nanotechnology-related news as well as a directory of other members (login.html). 

Potential future development:  Add capability to reset the password. Add a check box to keep user logged on and develop code to retain a token on the local machine for a fixed amount of time. I would like to put in place a test for Robotic sign in.
</li>
<li>
<u>Member-News page</u>, (member-news.html w member-news.js), was envisioned as a database populated with news or academic articls relevant to nanotechnology curated by the SNO Webmaster, but implemented on SNO APP as a protected endpoint accessible only to members. Members can see (GET) all news items in the database amd can invoke a create (POST) to add new news articles (clicking on the "+" to the right of the NANOTECH NEWS) which then become visible to all logged in members as well. Logged in members can directly delete (DELETE) from the page or invoke an edit (PUT) request for any news item they added and thereby own. The icons for deleting or editing are context sensitive and only visible if the user is the same as the owner of those news items.

Potential future development:  This page was constructed to demonstrate CRUD endpoints. The functionality should be managed by a webmaster, not by individuals where transcription errors are likely to be introduced. If members can insert interessting new research that isn't yet published. Alternatively, this could be a blog. Whatever it should be transformed into, there should be search capability (pattern match, keywords). In any case, the news should be sharable to twitter, facebook, instagram, etc. The original source should be properly cited and a hyperink to it should be given.
</li>
<li>
<u>Edit-Member-News</u> page, the page with the input forms for adding (POST) or editting (PUT) a new article (edit-member-news.html). The news model would also have to be changed as will related changes in the .js code and news router.

Potential future development:  Anything necessary to implement the changes given above for the Member-News page.
</li>
<li>
<u>Member-Directory</u> page, provides publicly available information about current members (GET) (member-directory.html). 

Potential future development:  When members register they should identify information that may not be shared. Other information they are willing to share should be able to be displayed (after a GET). There should be search capabilities on this page.
</li>
<li>
<u>Privacy</u> page, (privacy.html), <> is meant to provide an example of the type of data to which privacy policy might apply. This is not meant to be exhaustive, but rather to acquaint SNO management with the need to define and make explicit statements of SNO privacy policy) and acquaint them with the European Union's General Data Protection Regulations of 2016, which went into effect on May 25, 2018 and impacts any US company or organization planning on doing business with any EU country.

Potential future development:  SNO would have to research privacy and security issues in similar professional societies. SNO leadership must define, adopt, institute and decide to post their privacy and security policies on their site. This is an organizational decision especially since it has legal ramifications.
</li>
<li>
<u>Contacts</u> page, (contacts.html), place holder in this MVP for much more intricate contacts later, e.g., my soon to exist beautiful portfolio site. This section should not have information on SNO's tax status. 
</li>
</ol>


### 3. COMPLIANCE AND NON-COMPLIANCE WITH THE PROJECT REQUIREMENTS

The following describes how the SNO APP satisfies the Thinkful requirements: 
<ol>
<li>
SNO app works and all functionality has been tested and all 27 tests were passed using TravisCI.
</li>

<li>
Built with mobile-first design, where @media queries modify behavior with @media only screen and (min-width: 576px), i.e., large phone. 
</li>

<li>
Manually tested responsiveness from 320px to 1600px width screens with success except for issues with the footer. If the mobile view is fit to the window, everything is fine. I have not been able to find a general solution min-height: calc(100% - 80px), where 80 is determined to be the height of the header doesn't work either. I just used a height of the header that I got through inspection. 
</li>

<li>
Used semantic, valid hypertext markup language, but left a small number of comments in the code so that I as a novice would have references to jar my memory to make the code reusable. Variable names and attribute names in html tags describe what is stored in them and function names are semantic as well.
</li>

<li>
DRY principle guided design and coding. There is a <u>shared.css</u> file that reduced replication of styling code.
</li>

<li>
Employed axe numerous times to assure accessibility.  Axe does not seem to agree with what I learned in Thinkful, that I must use 'role' to assist sight disabled people using screen readers, e.g,, < header role='banner' >, etc. It says: "role banner is not allowed for given element." I also ran the code through validator.w3.org. The a11y issues were only diagnosed as warnings.
</li>

<li>
Attention was paid to typographical detail and complementary color scheme. However, I used the logo with the hopes that SNO night be interested in hiring me to update their website to HTML5/CSS3 and SWE web development standards. Axe dinged me for all colors except black, with WCAG Ratio errors. I used https://color.adobe.com to find a color scheme to work with the green SNO logo and it selected a blue slightly lighter than mine. I played with the blue, but axe did not pass any. It's possible that my light blue featured tags are the culprits, but that color scheme is used widely. I left this as an MVP flaw which should be modified with customer (Thinkful project reviewer) input. Some of the "failures" pertain to code from  an embedded video on the Landing page, which is not alterable.
</li>

<li>
Content is clear and readible with the possible exception of the nav menu in the header in mobile mode. The 10px selection is consistent with all the apps I have on my iPhone.
</li>	

<li>
Contact functionality is in the footer. It was tested and it works.
</li>

<li>
Cross-browser functionality appears to work using Chrome, Safari and Firefox. 
</li>
</ol>


### 4. INFORMATION GET USERS STARTED IN EXERCISE SUSNANO APP

The database currently holds two users, whose public information is visible to a logged on user:
<ul>
<li>
email: m.roco@nsf.gov, password: 1234567890
</li>
<li>
email: dr.barb@ix.netcom.com, password: 1234567890
</li>
<li>
A user can navigate from one page to another. State of the art webpages seem to no longer use CANCEL, so the nav-bar and back button were deemed sufficient by the developer and her mentor.
</li>
<li>
A user can register as new member by clicking on join sno in the navigation menu.
</li>
<li>
A member can log in clicking on login in the navigation menu.
</li>
<li>
A member can log off clicking on logoff in the navigation menu.
</li>

<li>
A member can add a news article, modify it and delete, but can only view news items s/he did not create.
</li>

</ul>