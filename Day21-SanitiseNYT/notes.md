# Notes file for Day 19 NYT Multiple Categories

Get articles from three to five categories, then render the API data into markup and inject it into the #app element.

Instead of rendering all of the articles, use the first five from each category. Add a heading before each section so that you know what category the articles are from.

## Thoughts

Need to make 5 calls to the API, one for each category.

Can use `Promise.all()` ([docs](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise/all)) to make the calls in order and ensure they all complete.

## Solution

This was quite a struggle. My solution is hopelessly overengineers, but the end result isn't what this is about - *it's the journey* 🧀⚠

I found using `Promise.all()` hard to use (at first). [Articles from Chris](https://gomakethings.com/waiting-for-multiple-all-api-responses-to-complete-with-the-vanilla-js-promise.all-method/), a [video from Steve Griffith](https://www.youtube.com/watch?v=HTA7pEDGZEU&t=215s) really helped. 

I mostly struggled with processing the data once it came back. I could log the results, but on passing them to a function to render the HTML or build the model, the results weren't there. I'm not quite sure what I was doing wrong.

I later found I wasn't logging errors properly. Once I was logging properly using `console.error()` I found it much easier to recognise what was going on.

[Another video I found really helped](https://www.youtube.com/watch?v=SyL1thdXmlE&t=325s), this time from dcode. This video helped me get my responses and ensure they were all complete before I started manipulating them. This involved having a second `Promise.all()` after the first to handle conversion of the responses to json. This ensured *all* the responses returned as one array which I could then manipulate.

I would have preferred to have the results streaming in as the results came back, but I couldn't get them to appear in consistent order without the second `Promise.all()`.

I'm particularly font of the `loaderrr()` function. 😁

If I had time, I'd completely refactor this. It seems like too much code. The main `getSections()` function is too big. It needs breaking down. Error handling needs to be improved.

