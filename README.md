# Resolution

Are you fighting with a friend? Clashing with a coworker? Battling with your bro?

Welcome to Resolution! This innovative app will change the way you resolve interpersonal conflict. Resolution offers multiple features for all of your conflict resolution needs. This app is a medium for you to express your emotions, communicate with others in a low pressure environment, and make decisions about how to move forward. Utilizing all that resolution has to offer will improve your relationships with others and your quality of life overall.
Legacy update: The app now allows you to create conflict in fun interactive ways.

Within Resolution, there are three primary approaches to handling interpersonal conflict.

Legacy update: three approaches to creating conflict.

Version 3.0 03.2026 Update by akbyrner && HopeyClarkey

**Scream Into The Void** – Do you need to vent? Often, this might be the first constructive way to deal with your conflict. Put words to your emotions, say your piece and get everything off your chest. The intro to our site is a live feed of user’s screams. These screams are anonymous. This feature of resolution helps users process their emotions, without any worry of judgment or consequence. User’s can find commiseration with other anonymous screams, or post screams of their own.

**Meme Style Communications** – Do you have something you need to say, but just can’t find the right way to say it? We offer a convenient and expressive meme generator to help communicate your feelings to others in a light-hearted way. It might be tough to say what needs to be said; why not break the ice with a meme.

**Decision Maker** – Are you ready to move forward with your conflict, but need an unbiased way to decide how? Our decision maker feature offers a fair, neutral answer. Through a game of rock, paper, scissors, you and your opponent will be able to come to a concrete decision.

Finally, earn points and trophies as you become a master conflict resolver! Our top 10 Resolution users will be featured on the Wall of Fame.

**Legacy update**:

**Whack** - Take your anger out on whoever you are mad at! Search for your Enemy to get a personalized Piñata of them and give them as many Whacks as you want, they will get a notification every time you do!

**Notification System** - Used to alert users on welcome, when feeling controversial, and when whacking user's piñata.

**Hatemail** - Did your mother ever tell you "if you don't have anything nice to say, don't say anything at all", well Hatemail is'nt for your mother.
Hatemail allows you to tell your friends, enemies, and everyone in between, exactly how you feel. Just open the dropdown menu for a convenient list of every user, input your message, and send it their way! Any time a user navigates to the Hatemail tab, they will be greeted with a list of any Hatemail they've received.

**Controversy** - Did you have something to say? Speak on it! You are able to give your opinion or reply to a given controversial headline.

**MoodNotes** - If no one else will listen, MoodNotes will. Let's meditate and chill out together.

**Overview** - Let's take a look at some of the conflicts you've gotten yourself into. Give it a try by sending a Meme, Whack, or Hate Mail.

**Rewards Store** - Earn some points, buy some stickers!

Want to add:

- Add functionality with bought stickers (from STIPOP API)

# Developers

**DOT ENV FILE**  
Create a dot env file and with the following variables:

```
NODE_ENV=development
HOST=http://127.0.0.1:4000
GOOGLE_CLIENT_ID=(your own client ID)
GOOGLE_CLIENT_SECRET=(your own client secret)
MEDIASTACK_API_KEY=(your key from mediaStack)
STIPOP_API_KEY=(your stipop api key)
STIPOP_USER_ID=(your user ID)
```

Tip-- Some may need to add quotes to their variable definitions; ex: `NODE_ENV="development"`
For deployment, HOST will be the instance address and not 127.0.0.1

**STARTUP**

- Must use Node version 18.16.1
- Create the dot env file
- Install dependencies: `npm i`
- Start a mySQL server: `mysql.server start (mac)` `sudo service mysql start (WSL)`
- Connect to mySQL shell: `mysql -u root (mac, WSL)`
- Build the webpack: `npm run build:dev`
- Start the server: `npm start`
- Seed the database: `npm run seed`

**KNOWN BUGS**

- An axios patch error logs to the console on point/trophy updates -- does not affect points and trophies rendered on pages or saved to DB.
- The Wall of Fame first loads gold trophies for every user and shows these briefly before updating to the correct trophies. This is exacerbated when deploying and testing the app with many users at once.
- If a user enters a room in rock, paper, scissors, and then navigates to another page before finishing a game, the user is still in that room until the user refreshes the page or logs out.
- In Meme Messenger, if a user types either top or bottom text and the API/page doesn't update before clicking send, the other images will not display.
- If a user deletes his/her profile, the user is redirected back to the login page. To login again, the server must be restarted.
- When searching for an enemy on the Piñata, if you search for a second enemy the image goes back and forth between the two images that were set in state.
- When whacking others, the promise notification resolves to notifying current users.
- Reloading the page within the Hatemail page sometimes logs the user out, requiring them to sign in with google again before getting any requests from the database
- Infrequently (maybe 1/20 times) the hatemail component will fail to render, errors denote this behavior in the console, from the user's perspective the page will just fail to load. reloading the page will not work, and will log the user out every time. The solution is to log out and back in.
- Comments within the controversy page are static data, unconnected to any DB

# Tech Stack

- React
- React-router
- MySQL
- Sequelize
- Express
- Axios
- AWS EC2
- Bootstrap
- Socket.io
- eslint
- Webpack
- DayJS
- API: https://apimeme.com/
- API: https://mediastack.com/signup
- React-Toastify
- React-Canvas
- React-Bootstrap

# Contributors

Thanks to all the following people for contributing to this project:
[@EdwardCooper](https://github.com/cooptothe)
[@BernieJanuary](https://github.com/janvierjr)
[@BenjaminKlein](https://github.com/Benjaminklein99)
[@SamsonThai](https://github.com/skanda108)
[@JackieWisdom](https://github.com/wisdomjackie)
[@NasthiaVillavicencio](https://github.com/nasthia861)
[@DarrylMcdonald](https://github.com/ddmcdona06)
[@DejuanEllswworth](https://github.com/yeauxdejuan)
[@LoganYoung](https://github.com/lyoun318)
[@PeytonOwen](https://github.com/peytono)
[@CamronCaldwell](https://github.com/ccaldwell11)
[@KylanPatton](https://github.com/kycodee)

# Contact Info

If you have questions about the app and/or would like to get in touch. Feel free to contact any of the above contributors.
