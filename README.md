# Road To Freelance

A companion repository to my third #100DaysOfCode challenge

## Objectives

- [ ] Use GitHub Project on this repo to plan out an online diary.
- [ ] Create a diary for the challenge which other challenge goers can use in the future.
- [ ] Collect a list of resources for freelance web development as I go.
- [ ] Create an ongoing future project wishlist.

## Desirables

- [ ] Maintain github streak throughout the 100 days.
- [ ] Create 5-10 blog posts from diary entries.
- [ ] Screen record one process and host the video somewhere.
- [ ] Set up my personal slack to recieve project updates.

To find out more about me visit [my website](https://affirmedvisionary.com) and you are welcome to watch and hold me accountable.

## To Run

1. Clone repository
2. `cd` into repository folder
3. run `npm install` inside the root folder
4. `cd client/` into the client folder
5. run `npm install`
6. return to the root directory `cd ..`
7. open in your code editor of choice
8. in the roor folder add a `.env` file and create values for the keys below
9. to start both the server and react client side application run `npm run dev`

## .env keys needed

MONGO_URI (mongo db atlas connection string)
JWT_SECRET (make this up)

NODEMAILER_HOST (mail.domainname.com)
NODEMAILER_PORT (465 is the secure one)
NODEMAILER_AUTH_USER (email address connected to above domain name)
NODEMAILER_AUTH_PASS (password for the user)
NODEMAILER_RECIEVER (where you want the emails to end up)

