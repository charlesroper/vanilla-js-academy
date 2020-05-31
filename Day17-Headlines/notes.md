# Notes file for Day 17 NYT Headlines

Several days late with this because I went down the rabbit hole of trying to secure my API key. It was a big rabbit hole.

But this is all good because it was genuinely challenging trying to figure it all out from scratch. I found the assignment itself relatively easy, and so the API work was a good stretch and I learned **loads**. In the following notes, I've left out some of the things I tried and blind alleys travelled down so as to keep the wordcount down.

## Project Summary

The project is progressively enhanced. The HTML and CSS alone give the user a basic experience even if the JavaScript does not load. If the JavaScript loads, you get a loading indicator why the headlines are pulled in.

I'd like to add caching to make this a super-snappy experience and avoid needless requests to the API. Another time!

## The NYT API Proxy

**Source**: <https://glitch.com/edit/#!/nyt-topstories-proxy>

In approaching this, I had to get acquainted with several new things I had not tackled before. Part of the difficulty in this was having no idea how to even _start_ solving this problem, let alone what tech to use, or how to use it.

I knew pretty early on I would need some sort of proxy on a server that I would make the NYT API call to. I would make the call to the proxy, this would add my private API key and make the actual call to NYT for me, then would return back the JSON.

Easy to say, but where to start?

I started by looking at "serverless" stuff. Netlify Functions, Cloudflare Workers and the like. This is becoming the go-to way for doing this sort of thing, but I found the documentation quite heavy going and assumed a lot of knowledge already. And I couldn't find any tutorials or examples that even came close to what I was trying to do. Back to the drawing board.

Next I started searching for how-tos for simple proxying in the Node.js world. This lead to a few interesting possibilities, so I fired up a project in my new favourite playground: [Glitch](https://glitch.com/).

### Glitching

I knew I needed some sort of backend processing to do what I needed, but didn't know how I'd do this, so I went with what seems to be the de facto standard server framework for Node.js: [Express](https://expressjs.com/). This choice was mainly because so many examples of Node.js seem to feature Express, including many of the examples you find on Glitch.

On closer examination seemed Express is much like other frameworks I've used in other languages, such as [Sinatra](http://sinatrarb.com/) on Ruby, [Nancy](http://nancyfx.org/) on .NET, and [Flask](https://www.fullstackpython.com/flask.html) on Python. This really helped my understanding - the way it does things is a pattern I recognise - it is what they call a "[microframework](https://www.wikiwand.com/en/Microframework)". This gave me a boost in confidence.

**Aside**: _One of the things that PHP did for the web development world is cement in people's minds a particular model for writing server-side code. This model involved inserting PHP code directly into HTML and renaming the HTML files as `.php` files that would magically run when requested in a web browser. While this model was easy to pick up, it meant that many developers have a hard time understanding the need for things like Express. Why all this complexity? PHP is so much simpler! What is with all these weird "frameworks" and stuff?_

_But the fact remains, it is PHP that is quite unusual in the way it does things. It started as a templating engine with its own syntax that grew into a full-blown programming language. Injecting code directly into pages on a server is intuitive, but that ease-of-use led quite quickly to some pretty terrible code, and a reputation among programmers as being a "bad" language._

_This has been rectified in the intervening years, and PHP is pretty good now, and there are plenty of frameworks and more structured, sensible ways to build PHP apps, including a few micro-frameworks such as [Lumen](https://lumen.laravel.com/), [Slim](https://www.slimframework.com/), and [Silex](https://silex.symfony.com/). Take a look at some of the code examples on these sites and you'll immediately recognise the similarities between them and Express._

Glitch has a little starter project for Node.js + Express sites called [Hello Express](https://glitch.com/~hello-express), so I used that.

This required stripping out almost everything provided in the template apart from a single GET method. My GET method would allow me to make a request of my Glitch server. I tried this with a simple "hello world" response, and it worked.

Now to figure out how to get the request trigger a request to the NYT API and return the result.

### Node-ing

I had not used Node.js on a server before. Although I recognised the patterns Express works with, I had no idea how to actually make it trigger a request to NYT and return a response. So I hit the search engines doing the most difficult of research work: _finding answers when you don't even know what the question is._

I somehow stumbled on an article that talked about using an npm package called [http-proxy-middleware](https://github.com/chimurai/http-proxy-middleware). This kinda seemed like what I needed and I managed to get it to proxy a request to `/api` on my Glitch app to the NYT API domain. However, I could not find a way to make it accept my API key. After much head-scratching, I realised this wasn't what I needed. It didn't do what I wanted. What I learned using this is that so much Node.js stuff does a poor job of describing what problem it solves. It assumes you already know why it exists.

Anyway, I went back to the drawing board to try and figure another way of solving this. I decided to see if I could learn anything from a couple of new posts on [using Cloudflare Workers](https://gomakethings.com/securing-serverless-functions-with-cloudflare-workers/) by Chris. In those articles I saw the word "fetch". Cloudflare Workers use a `fetch` event. This is really nothing to do with the browser's `fetch` API, but I had a lightbulb moment reading that: perhaps I could use some sort of _fetch_ in Node.js?

In my Glitch app, I tried using a `fetch` just like we've been doing in the Vanilla JS Academy exercises. This didn't work. It's a browser API and, _of course_, it's not available in Node.js. **However** a quick search revealed there is an npm package called [node-fetch](https://www.npmjs.com/package/node-fetch) which does almost exactly the same thing. Bingo!

This discovery quickly cascaded into some late-night hacking and in short-order I had a neat little API working on Glitch would pass a request to `topstories/home` on to the NYT Top Stores API and return the _home_ section as JSON. The hours, if not days, of thinking around this problem, searching, trying things and pulling my hair out led to what was maybe an hour of solid late-night coding and I was done. Programming is so often like this.

Next morning, I read a little more about Express and found I could use a placeholder - called a [Route Parameter](https://expressjs.com/en/guide/routing.html) - in my GET request to pass a path fragment into my code as a variable. This meant I could specify the NYT section in the GET request and have it dynamically return the right response without having to hard code. So, for example, I can request https://nyt-topstories-proxy.glitch.me/topstories/technology for the technology category, or https://nyt-topstories-proxy.glitch.me/topstories/arts for the arts. Simple as that.

### CORS-blimey

Having thought I was done, I set about refactoring what I'd already done for my Day 17 project. I quickly found, however, that my request to my shiny new NYT proxy was being blocked by CORS. Gah. Another thing to figure out. Off I went searching again.

I quickly found the Express [CORS middleware](https://expressjs.com/en/resources/middleware/cors.html) module. This seemed to do exactly what I needed, but found the guidance hard to follow. In hindsight, the guidance wasn't too bad, but I had a problem where Glitch was playing up and I think the `cors` module didn't get included in my project properly. It seems Glitch can be _glitchy_ (ahem) at times. This led me to try all sorts of things that I didn't need to try, and ended up breaking things even more. I ended up stripping all the CORS stuff out and redoing just the basics. This worked first time, much to my surprise.

## Summary

So after all that, my project code now works.

I am making requests to my Glitch-hosted, Node.js + Express powered NYT proxy and it works like a charm. My API key is safely hidden in a `.env` file and can only be seen if you have access to my Glitch code.

All 25 glorious lines of code can be found on Glitch here: https://glitch.com/edit/#!/nyt-topstories-proxy If you look in the `.env` file, it will be empty. This is because `.env` files get special treatment on Glitch - it contains secrets, so the content can only be seen by project owners and collaborators. If you take a peek at someone else's project, or remix it, you don't get their secrets, too.
