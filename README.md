# PostBook

A platform where users can send and accept friend requests, upload posts and chat with friends.<br />
-Sign up using email-id and password. <br />
-Login using the emai-id and password. <br />
-Users can update their avatars, passwords, name, email-id. <br />
-Users can upload image posts and delete the post uploaded by them. <br />
-Users can comment on posts and delete their own comments. <br />
-Users can also react on posts (like,love,wow,angry,laugh) and like the comments. <br />
-Users can send and unsend friend requests. <br />
-Users can accept or decline friend requests. <br />
-Users can unfriend anyone. <br />
-Users once become friends, can see each other's online status and chat with each other. <br />

---
## Requirements

For development, you will only need Node.js and a node global package, Yarn, installed in your environement.

### Node
- #### Node installation on Windows

  Just go on [official Node.js website](https://nodejs.org/) and download the installer.
Also, be sure to have `git` available in your PATH, `npm` might need it (You can find git [here](https://git-scm.com/)).

- #### Node installation on Ubuntu

  You can install nodejs and npm easily with apt install, just run the following commands.

      $ sudo apt install nodejs
      $ sudo apt install npm

- #### Other Operating Systems
  You can find more information about the installation on the [official Node.js website](https://nodejs.org/) and the [official NPM website](https://npmjs.org/).

If the installation was successful, you should be able to run the following command.

    $ node --version
    v14.21.3

    $ npm --version
    6.14.18

If you need to update `npm`, you can make it using `npm`! Cool right? After running the following command, just open again the command line and be happy.

    $ npm install npm -g

###
### Yarn installation
  After installing node, this project will need yarn too, so just run the following command.

      $ npm install -g yarn

---

## Install Project

    $ git clone https://github.com/imdivyachoudhary/PostBook.git
    $ cd PostBook
    $ yarn install

## Running the project

    $ yarn start

## Simple build for production

    $ yarn build

