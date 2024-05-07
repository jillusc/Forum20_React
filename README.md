# forum20

<img src="README%20images/README-mainimage-responsive.jpg"><br>

forum20 is an image sharing social app designed to encourage enthusiasts of 20th century art to come together and share their interest in the subject. The app is targeted towards users who wish to contribute to and engage in discourse with other like-minded individuals: users can browse and read other users' posts, and, having completed a simple registration process, can share their own images, create posts and interact with those of other members by liking and commenting. The app also allows for members to follow each other and displays content from followed users in a dedicated feed.<br>

The live link can be found here: [forum20]( https://forum20-frontend-88d68fe3218f.herokuapp.com/)

## User Experience (UX)

### User Stories

#### Epic: General User Experience

* Navigation: navbar<br>
As a user I can view a navbar from every page so that I can navigate easily between pages.<br>
AC1: The navbar is consistently displayed at the top of each page.<br>
AC2: The navbar includes clear and intuitive, operational navigation links for easy access to the different sections of the application.<br>

* Navigation: page transitioning<br>
As a user I can navigate through pages quickly so that I can view content seamlessly without page refresh.<br>
AC1: The app loads new content and changes pages without needing to refresh the entire page, providing a seamless experience.<br>

* Accessing content: members<br>
As a user I can see members' basic profile information so that I can gain some insight into the platform's community.<br>
AC1: A sidebar component displays the usernames and avatars of registered users of forum20.<br>

* Accessing content: infinite scrolling<br>
As a user I can keep scrolling through the posts on the site so that I don't have to click on a "next page" button.<br>
AC1: Upon downward scrolling, additional posts are loaded automatically without the need to navigate to a different page.<br>

* Accessing content: posts<br>
As a user I can view the most recent posts so that I am up to date with the newest content.<br>
AC1: Upon loading the application, posts are displayed newest first.<br>

* Accessing content: search<br>
As a user I can search for posts with keywords, so that I can find the content and user profiles I am most interested in.<br>
AC1: The user can enter keywords into an operational search bar component.<br>
AC2: Relevant posts are filtered and displayed newest first.<br>
AC3: Relevant user profiles are filtered and displayed.<br>

* Reading content: single post<br>
As a user I can read the details of a single post so that I can learn more about it.<br>
AC1: Clicking on a post opens a detailed view of it, including the image, title, description and comments.<br>

* Reading content: comments<br>
As a user I can read comments left beneath posts so that I can read and follow a conversation about content that interests me.<br>
AC1: Posts include a section that displays comments left by members of the community.<br>

* Registration: options<br>
As a user I can see login and signup options so that I can log in or register an account.<br>
AC1: Login and signup options as clickable links are displayed on the navbar for easy access.<br>

* Registration: account creation<br>
As a user I can create an account so that I can access all the features for registered users.<br>
AC1: An operational, clickable sign up link is visible.<br>
AC2: Upon clicking, an operational registration form is displayed. <br>
AC3: The form displays error messages for invalid user input. <br>
AC4: Upon successful registration, the login page loads. <br>


#### Epic: Registered User Features <br>

* Authentication: status<br>
As a registered user I am made aware if I am logged-in or not so that I can log in if I need to. <br>
AC1: The current login state is displayed. <br>

* Authentication: login<br>
As a registered user I can log in to the app so that I can access all of the app's functionality. <br>
AC1: An operational, clickable log in link is visible. <br>
AC2: Upon clicking, an operational login form is displayed. <br>
AC3: The form displays error messages for invalid user input. <br>
AC4: Upon successful login, the home page is loaded and the login state is updated.<br>

* Authentication: remaining logged-in<br>
As a registered user I can maintain my logged-in status until I choose to log out so that my user experience is not compromised. <br>
AC1: Through use of JSON Web Tokens, users remain logged-in until opting to log out, ensuring their session is kept secure and convenient. <br>

* Authentication: logout<br>
As a registered user I can view a profile page that displays the film reviews and comments I have submitted so that I can keep track of my contributions.<br>
As a registered user I can log out of the app so that I can keep my privacy and my account secure. <br>
AC1: An operational, clickable log out link is visible. <br>
AC2: Upon clicking, the main page is loaded and the login state is updated.<br>

* Authentication: editing credentials<br>
As a registered user I can update my username and password so that I can change my display name and keep my profile secure. <br>
AC1: Given a logged-in user, a dropdown component is accessible with edit profile, change username and change password options. <br>
AC2: Clicking on each option renders the relevant form. <br>
AC3: The form displays error messages for invalid user input. <br>
AC4: Changes are reflected immediately after form submission.<br>

* Reading content: filtered<br>
As a registered user I can view content filtered by the users I follow so that I can keep up to date with their posts. <br>
AC1: Given a logged-in user, a dedicated feed page displays posts exclusively from users they follow. <br>
AC2: The feed automatically updates in real-time as new content is submitted by followed users. <br>
AC3: The feed automatically and immediately excludes content by users upon unfollowing them.<br>

* Contributing content: posts <br>
As a registered user I can submit a post so that I can share images with users of forum20. <br>
AC1: Given a logged-in user, they can upload an image through a form. <br>
AC2: Given a logged-in user, they can create a post with an image, title and description.<br>

* Contributing content: comments <br>
As a registered user I can add comments to a post so that I can share my thoughts with the forum20 community. <br>
AC1: Given a logged-in user, they can access an operational comment input field and submit button under each post. <br>
AC2: Comments are displayed immediately after submission.<br>

* Contributing content: likes <br>
As a registered user I can like a post so that I can show my support for the posts that interest me. <br>
AC1: Given a logged-in user, they can see an operational like button with each post that toggles like/unlike. <br>
AC2: The like count is updated in real-time when clicked.<br>

* Viewing my contributions: posts<br>
As a registered user I can view the posts I have submitted so that I can keep track of my contributions. <br>
AC1: Given a logged-in user, their profile page displays a list of their submitted posts. <br>
AC2: These have operational edit and delete functionality.<br>

* Viewing my contributions: comments<br>
As a registered user I can view the comments I have submitted so that I can keep track of my contributions. <br>
AC1: Given a logged-in user, their profile page displays a list of their submitted comments. <br>
AC2: These have operational edit and delete functionality.<br>

* Viewing my contributions: liked<br>
As a registered user I can view the posts I liked so that I can refer to the posts I enjoy the most. <br>
AC1: Given a logged-in user, they can access a dedicated page that displays posts they have liked, most recent first. <br>
AC2: These posts have functionality to unlike them.<br>

* Managing my contributions: posts<br>
As a registered user I can edit and delete my posts so that I can control my contributions, e.g. correct, update, remove altogether. <br>
AC1: Given a logged-in user, they can access an edit option on each post that opens an edit form. <br>
AC2: The edit form is pre-populated with the post’s existing content. <br>
AC3: Given a logged-in user, an operational delete option is visible. <br>
AC4: Both functions are reflected immediately.<br>

* Managing my contributions: comments<br>
As a registered user I can edit and delete my comments so that I can control my contributions, e.g. correct, update, remove altogether. <br>
AC1: Given a logged-in user, they can access an edit button next to each of their comments that opens an edit form. <br>
AC2: The edit form is pre-populated with the existing comment. <br>
AC3: Given a logged-in user, an operational delete button is visible. <br>
AC4: Both functions are reflected immediately.<br>

* Managing my contributions: likes<br>
As a registered user I can unlike a post so that I can revoke my support for it if my opinion or interest changes. <br>
AC1: Given a logged-in user, they can see an operational like button with each post which toggles like/unlike. <br>
AC2: The like count is updated in real-time when clicked.<br>

* Social: editing my profile<br>
As a registered user I can edit my profile so that I can change my profile picture and bio. <br>
AC1: Given a logged-in user, a button is provided for changing their profile image. <br>
AC2: Given a logged-in user, a text area field is provided for editing their bio. <br>
AC3: Clicking on each option renders the relevant form. <br>
AC4: The form displays error messages for invalid user input. <br>
AC5: Changes are reflected immediately after form submission. <br>
AC6: Upon successful submission, the user is redirected to the previous page.<br>

* Social: members: identifying<br>
As a registered user I can see members' basic profile information so that I can easily identify and navigate to a user's profile page. <br>
AC1: Given a logged-in user, a sidebar component displays users' avatars which serve as clickable links to their profiles. <br>
AC2: Given a logged-in user, a sidebar component displays users' usernames which serve as clickable links to their profiles.<br>

* Social: profiles: users'<br>
As a registered user I can view other users' profiles so that I can learn more about fellow members of the forum20 community. <br>
AC1: Given a logged-in user, clicking on a user's avatar opens a component for their profile. <br>
AC2: Given a logged-in user, clicking on a user's name opens a component for their profile.<br>

* Social: profiles: popular<br>
As a registered user I can see a list of the most followed profiles so that I can see which profiles are popular. <br>
AC1: Given a logged-in user, a sidebar component lists the most followed profiles, ranked by popularity.<br>

* Social: members: following<br>
As a registered user I can follow and unfollow other members, so that I can tailor the content of my feed. <br>
AC1: Given a logged-in user, they can view operational follow buttons next to other users' avatars and usernames in the sidebar component. <br>
AC2: Given a logged-in user, they can view operational unfollow buttons next to other users' avatars and usernames in the sidebar component. <br>
AC3: Both functions are reflected immediately.<br>


#### EPIC: Site Administration

* Admin: managing contributions<br>
As an admin user I can access and utilise full CRUD functionality through a dedicated dashboard so that I can i) control the site's content to ensure it aligns with the vision of the site owner, and ii) maintain quality and relevance. <br>
AC1: Admin users can create posts and comments. <br>
AC2: Admin users can view all posts and comments. <br>
AC3: Admin users can edit posts and comments. <br>
AC4: Admin users can delete posts and comments.<br>


## Agile Methodology

The Projects functionality in Github was used to manage the process of creating the site using an Agile approach, with a kanban board for tracking the progress and completion of user stories. Github Issues were created for each user story with defined acceptance criteria to make the execution as straightforward as possible.


## Design

The design of forum20 was based on supporting the theme of modern art and combines various aspects to invite engagement and interaction from visitors:

#### Colour

The colour scheme is entirely minimal with a completely white background and the logo in monochrome. The intention behind this is that the site is predominantly imaged-based and seeks to emulate a real modern art gallery, where the artworks are presented on a clean, white background: *"The aesthetic was introduced in the early twentieth century in response to the increasing abstraction of modern art. With an emphasis on colour and light (many) artists … preferred to exhibit their works against white walls in order to minimise distraction."* &nbsp; &nbsp; <u><small>[source]( https://www.tate.org.uk/art/art-terms/w/white-cube)</small></u><br>
Accent colours are a deep wine red and a soft peach, chosen to offset each other in a nice way whilst maintaining the sense of sophistication that is key to the theme of the site. For the text, rather than purest black, a dark charcoal shade was chosen to avoid the starkest contrast on the eye. The site's scrollbars also utilise the main colour scheme:<br><br>
<img src="README%20images/forum-20-colours.jpg" height="320px">

#### Typography

The site uses just one font, Quicksand, imported from Google Fonts. It is a modern typeface with rounded edges and a minimalist look. Because it is the single font used across the app, a cohesive visual identity is created which complements the artworks without overshadowing them or cluttering the site. The monochrome logo was created using three different fonts: Cascadia Code (for the f) Broadway (for the 0) and Engravers MT (for the 2), reflecting the essence of modern art being defined by a number of styles and movements. The decision not to represent each letter of the word "forum" was made in an effort to minimise the effect of this so as not to appear overdone and to retain a level of sophistication:<br><br>
<img src="README%20images/logo.png" height="110px">

#### Imagery

Whilst the only imagery aside from a minimal logo comes in the form of user posts and avatars, this is positively sufficient, visually: rectangular images of artworks and contrastingly small, circular avatar 'buttons' create an appealing uniformity. Through usage of the CSS property 'object-fit: contain' and the 'img-fluid' class, post images are standardised with a consistent aspect ratio, and the black background creates the letterbox effect, resulting in a stylish display:<br><br>
<img src="README%20images/letterbox1.jpg" width="375px">
<img src="README%20images/letterbox4.jpg" width="375px">

#### Favicon

From the logo, a favicon was created using basic image editing software. The number 20, compiled with the two different fonts, provides a (modernist) reminder of the platform's subject - 20th century art - and serves to keep it in visitors' vision and minds:<br><br>
<img src="README%20images/favicon.png">

## Data Models

This project follows Object-Oriented Programming principles and employs Django's Class-Based Generic Views. It includes six custom models:

- Post: details user posts with attributes such as owner (linked to the User model), post privacy status, timestamps of creation and updates, a post title and content text, an image, plus further optional fields for the artist's name and the year of the artwork.
- Profile: represents user profiles and is directly associated with a unique User instance. It includes attributes for the username, bio and a profile image that serves as an avatar.
- Like: features many-to-one relationships with both the User model (via like owner) and the Post model (identifying which post was liked).
- Comment: enables registered users to submit comments, establishing one-to-many relationships with both the User model (via comment owner) and the Post model (linking a comment with a post).
- Bookmark: allows users to save posts for later viewing, featuring many-to-one relationships with both the User model (via bookmark owner) and Post model (associating a bookmark with a post).
- Follower: trackes relationships between users with a many-to-one relationship to the User model twice: once for the user who is following and once for the followed user.


The database schema are illustrated by the ERD diagram below:<br><br>
<img src="README%20images/ERD.jpg">

## Features

This is an application where visitors can explore 20th century artworks and enrich their knowledge of this vast, diverse and culturally significant era. Members can view contributions from others and create their own posts, sharing their favourite images and showcasing their favourite artists. An option to control post visibility is offered. A search bar enables the fetching of customised content. Additionally, users can engage with the forum20 community by submitting comments on posts and starting or joining a conversation. Further features that enhance social interaction are the ability to easily 'like' a post, and to connect with other members by clicking a 'follow' button. Members' profile pages contain pertinent information including an optional bio.

 - User Registration and Authentication: users can sign up, log in and out and manage their profiles securely.
 - CRUD Functionality: registered users have the freedom to create, read, update and delete all of their individual contributions to the platform.
 - User Profiles: each registered user has a Profile page displaying their name, avatar, bio section and their submitted posts.
 - Admin Panel: through the Django admin panel, admin personnel have control to manage user accounts and site content.
 - JSON Web Tokens: JWT's are utilised to maintain user sessions securely, allowing users to remain logged in until they choose to log out.
 
 - React architecture: UX is enhanced by use of the following features of React:
    - Components: React's modular approach enables faster development and ensures consistency across the interface
    - Rendering: the Virtual DOM ensures quick updates, leading to smoother interactions
    - State Management: React's built-in state management tools keep UIs up-to-date with minimal code
    - Routing: React Router enables seamless navigation without page reloads, offering users a structured and intuitive browsing experience
    - Infinite Scroll: implemented for effortless browsing, loading content dynamically without the need to navigate to a different page.

### Features to implement

 - Extended Features: the site could be augmented to offer functionality more akin to a conventional social media app whereby users can privately message each other, receive notifications, add tags to content and so on.
 - File Uploads: implementing the ability to upload various file types such as documents, video, audio, to share not only images but articles, exhibition news and reviews, book recommendations, podcasts and the like would significantly enhance the scope of forum20.
 - User Profiles: there is the potential to develop members' profile pages, extending beyond a simple bio with perhaps a section detailing favourite artists, for example, and stats as to how active they are, e.g. number of posts.


### Header

 - <strong>Logo</strong>: positioned in the top left of the navigation bar, the logo is per convention linked to the home page for ease of navigation for the user.<br><br>
 - <strong>Navigation bar</strong>: the navbar is present at the top of every page and displays two sets of links which are conditionally rendered dependent on a logged-in or non-authenticated user. These navlinks are in uppercase text and paired with an icon from Font Awesome. On hover, links & icons turn from the default charcoal colour to wine red. The link & icon of the currently active page display slightly larger and in title case, distinguishing active pages effectively. Given a logged-in user, their profile picture is rendered as an avatar at the right hand side of the navbar and intuitively links to their profile page. On smaller screens, the navigation items reduce into a hamburger menu:<br><br>
<img src="README%20images/logo-nav-items.jpg" width="900px"><br><br>
<img src="README%20images/navbar-logged-in.jpg" width="900px"><br><br>
<img src="README%20images/nav-hamburger.jpg" width="120px">


### Home page

The homepage displays member posts in Bootstrap cards, ordered by most recent. For non-authenticated users, a welcome heading informs the visitor what the site is named and what it does in just a few words. It has a clear textual link inviting the user to "Join the community!" and this opens the signup page onclick. Viewers of the homepage take an immediate dive into the heart of the app as they are greeted with a good amout of colour and options, organised into neatly defined sections: they get an instant taste of what is on offer through a (seemingly endless) supply of posts as they scroll; a component renders to the side of the main content on larger screens (on smaller ones, above) containing a snapshot of information on exisiting members under the heading "Most followed profiles", temptingly demonstrating the social media character of the site:<br><br>
<img src="README%20images/page-home.jpg">

### Sign Up and Log In pages

These pages both present forms for their respective purposes. Simplicity is key here: with a contrast to the hive of activity found on the site's main pages, users can efficiently input minimal information and then promptly return to accessing the content that interests them. Upon successful signup, the login page is loaded; upon successful login, the homepage. In both cases, the page redirections steer the user towards establishing their next options:<br><br>
<img src="README%20images/page-log_in2.jpg" width="270px">
<img src="README%20images/page-sign_up.jpg" width="270px">

### Feed page

Tailored content is displayed to the registered user through this page. The Feed presents a curated view of posts from other members whom the user follows, giving easy access to new, relevant content at a click:<br><br>
<img src="README%20images/page-feed.jpg">

### Activity page

The Activity page aggregates all the comments that the authenticated user has submitted and the posts they have bookmarked. A simple organisation of the content utilising tabs offers a convenient way for the user to review these interactions, with the options to revisit the relevant post page as well as edit and delete the comments. For cohesion and consistency of design, the tab headers match the appearance of the navbar links:<br><br>
<img src="README%20images/page-activity1.jpg"><br><br>
<img src="README%20images/page-activity2.jpg">

### Add Post page

Clicking on the Add Post navlink opens a page with a form. This features a larger box via which to upload an image and a narrower one where the user enters the post's details. A title is mandatory; there are further input fields for additional text content, the name of the artist and year of the artwork. A checkbox affords the user the control to set the post as visible only to their followers. Upon successful creation, a custom feedback message displays before the Post page is rendered to display the submitted post:<br><br>
<img src="README%20images/page-addpost1.jpg"><br><br>
<img src="README%20images/page-addpost2.jpg">

### Profile page

This page offers users a personalised space to manage their account and their sitewide identity: they can easily update their profile image, username and bio; change their password, and view, edit and delete their submitted posts:<br><br>
<img src="README%20images/page-profile1.jpg"><br><br>
<img src="README%20images/page-profile2.jpg"><br><br>
<img src="README%20images/page-profile3.jpg"><br><br>
<img src="README%20images/page-profile4.jpg"><br><br>
<img src="README%20images/page-editprofile.jpg"><br><br>
<img src="README%20images/page-changeusername.jpg"><br><br>
<img src="README%20images/page-changepassword.jpg">


### Miscellaneous

<strong>Buttons</strong>: across the app, buttons were carefully styled to conform with the design, using the same font (Quicksand), colours and hover effects, with the text transforming to bold along with the colour change:<br><br>
<img src="README%20images/buttons.jpg" width="300px"><br><br>
<strong>Feedback</strong>: a CustomFeedback component was created and styled, and used to display success messages at relevant points:<br><br>
<img src="README%20images/success_message.jpg"><br><br>
<strong>Dialog</strong>: the window.confirm() method was implemented to prompt users to confirm their action before proceeding with deletion of posts and comments: <br><br>
<img src="README%20images/window_dialog.jpg"><br><br>
<strong>Caret</strong>: a custom component with a caret icon was created and styled within the app's theme, providing dropdown menu functionality for editing and deleting items where appropriate (post, comment, profile):<br><br>
<img src="README%20images/caret_dropdown.jpg" width="200px"><br><br>
<strong>Tooltips</strong>: used when hovering over the mini follow/unfollow buttons in the popular profiles component for clarity:<br><br>
<img src="README%20images/tooltip.jpg" width="260px"><br><br>
<strong>Pointers</strong>: in the CSS stylesheets, the 'cursor: pointer' attribute was set as an indication to the user of an interactive element.

## Testing Documentation

The forum20 application was subjected to manual testing in Google Chrome, Mozilla Firefox, Microsoft Edge and Safari browsers.<br>
Documentation can be found [here](README%20images/forum20%20testing.pdf).

The project's User Stories were evaluated to confirm whether they were met.<br>
Documentation for this is [here](README%20images/user%20stories%20met.pdf).

## Security

Authentication tokens are used to provide secure access to API endpoints.<br>
JSON Web Tokens are securely stored in HTTP cookies.<br>
Django's built-in user authentication system is utilised to handle user registration, login and profile management.<br>
User passwords are securely stored and validated using Django's password validation system.<br>
Cross-Origin Resource Sharing (CORS) is configured to help prevent unauthorised access to sensitive data by restricting access to allowed origins only.<br>
The project employs CSRF protection to prevent Cross-Site Request Forgery attacks.<br>
Database connections are managed securely using environment variables and the dj_database_url package to parse the database URL.<br>
File uploads are handled, stored and accessed securely thanks to the use of Cloudinary.<br>The Cloudinary API details and the secret key are stored in the env.py file alongside the database URL.<br>
Models and views utilise ownership and content validation and permission classes, respectively.<br>
The submission of forms relies on validated data and error messages are in place for missing or incorrect data.<br>
Axios is configured, using HTTPS for encrypted data transmission and enabling secure HTTP cookies. <br>
A simple, custom 401 Error page was created to inform of such error and includes a link to direct the user back to the site.<br><br>
<img src="README%20images/page-401.jpg"><br><br>
<img src="README%20images/page-4012.jpg"><br><br>

## Deployment

#### Frontend: 
Assuming a GitHub account, a ready repository and an Heroku account, the following steps outline the frontend deployment process:

i) Visit the Heroku dashboard and create a new app with a unique name.<br>
ii) In the Deployment method section, select GitHub to connect it to the relevant repository. Click the Deploy Branch button to manually deploy the main branch, and monitor the build output in the Activity tab.<br>
iii) In the Resources tab, select an Eco dyno for lightweight container deployment.<br>
iv) Click the Open app button to verify it runs correctly.<br>

#### Backend:
Assuming a created database (e.g. ElephantSQL), a ready repository and an Heroku account, the following steps outline the preparation of the backend for deployment and the deployment process:

i) Visit the Heroku dashboard and create a new app with a unique name.<br>
ii) From the Settings tab, add a Config Var for DATABASE_URL, and copy/paste your database's URL for the value (without any quotation marks).<br>
iii) In your IDE, install both dj_database_url and psycopg2 to enable connection to your database.<br>
iv) In settings.py, import dj_database_url. Update the DATABASES section to use a local SQLite database if in development mode, otherwise to connect to your database provided the DATABASE_URL environment variable exists (see next step).<br>
v) In env.py, add a new environment variable with the key set to DATABASE_URL and the value to your database's URL (quotation marks are necessary here as this needs to be a string). Temporarily comment-out the DEV environment variable so that your IDE can connect to your external database.<br>
vi) Back in settings.py, add a print statement (within the else block) to confirm you have connected to the external database.<br>
vii) In the terminal, dry-run your makemigrations to confirm you are connected to the external database. When confirmed, migrate your models to the database.<br>
viii) Create a superuser.<br>
ix) Visit ElephantSQL to confirm the migration has taken effect: select BROWSER on the left side navigation; click Table queries; select auth_user; click Execute. The newly-created superuser's details should display, confirming success.<br>
x) In your IDE, install gunicorn and update the requirements.txt.<br>
xi) Create a Procfile with the following lines, then save the file:<br>
release: python manage.py makemigrations && python manage.py migrate<br>
web: gunicorn drf_api.wsgi<br>
xii) In settings.py, update the value of the ALLOWED_HOSTS variable to include your Heroku app’s URL. Add corsheaders to INSTALLED_APPS. Add corsheaders middleware to the top of the MIDDLEWARE section. Under the MIDDLEWARE list, set the ALLOWED_ORIGINS for the network requests made to the server (it will use the CLIENT_ORIGIN variable, which is the frontend app's url). Next, enable sending cookies in CORS and set the JWT_AUTH_SAMESITE attribute to 'None'. Ensure the SECRET_KEY is stored in env.py rather than settings.py. Finally, set DEBUG to True in development, False in production (in env.py, comment back in the DEV variable as in step v).<br>
xiii) When requirements.txt is up-to-date, commit and push these changes to GitHub.<br>
xiv) Back in Heroku, open the Settings tab and add the SECRET_KEY and CLOUDINARY_URL as Config Vars.<br>
xv) In the Deployment method section, select GitHub to connect it to the relevant repository. Opt to Enable Automatic Deploys. Click the Deploy Branch button to manually deploy the main branch, and monitor the build output in the Activity tab.<br>
xvi) Click the Open app button to verify it runs correctly. <br>


## Languages used

- Python
- Javascript / JSX
- HTML
- CSS

## Programs, Frameworks & Libraries used

- [GitHub](https://github.com) - used for version control and the Projects tool for agile approach.
- [Gitpod](https://gitpod.io) - used as an IDE for the project.
- [Heroku](https://dashboard.heroku.com/login) - used for deploying the site.
- [Chrome Developer Tools](https://developer.chrome.com/docs/devtools) - used for general troubleshooting.
- [ChatGPT](https://chat.openai.com) - used for general troubleshooting.<br><br>

- [ElephantSQL](https://www.elephantsql.com) - used to create the PostgreSQL database for this app.
- [psycopg2](https://www.psycopg.org/) - used for interacting with the database in Python.
- [Django](https://www.djangoproject.com) - used as a Python framework.
- [Django REST Framework](https://www.django-rest-framework.org/) - used as a toolkit for building the backend API.
- [Gunicorn](https://gunicorn.org) - used as a production-ready web server for Heroku.
- [Pillow](https://python-pillow.org/) - used for image processing and manipulation.
- [Cloudinary](https://cloudinary.com) - used to host images securely.
- [CI Python Linter](https://pep8ci.herokuapp.com/) - used to fix the Python code to Pep8 standards.<br><br>

- [REACT](https://reactjs.org/) - used as a JavaScript library for UI.
- [react.router-dom](https://reactrouter.com) - used for routing functionality in the frontend.
- [Axios](https://axios-http.com/) - used for making HTTP requests from the frontend to the backend services.
- [Bootstrap 4.6](https://getbootstrap.com/docs/4.6/getting-started/introduction)- used as a CSS Framework.
- [Font Awesome](https://fontawesome.com) - used for icons.
- [ESLint](https://eslint.org/) - used for JavaScript code validation.
- [W3C](https://www.w3.org) - used for CSS code validation.<br><br>


## Improvements/Bug fixes

The app would benefit from the following modifications and enhancements:

   - Ensuring application of the active class (NavLink style) upon all page reloads
   - Improving the visibilty of Follow/Unfollow buttons in the 'Most followed profiles' box so users can see at a glance which profiles they currently follow
   - An option for the user to delete their account
   - A feature for retrieving a forgotten password

## Credits

Adam Lapinski: the creation of the forum20 app borrows heavily from the code and logic learnt whilst undertaking the Code Institute's Moments walkthrough project.


## Acknowledgments

With big thanks to my mentor Antonio Rodriguez for his valued support.
