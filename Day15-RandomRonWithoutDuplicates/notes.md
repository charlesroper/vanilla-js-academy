# Notes file for Day 15: Random Random Without Dupes

I thought at first I could use a `Set` for this, because I had some vague idea that their inherent ability to prevent duplicates would be helpful. But you can't `shift()` items from the beginning of `Set`s, and they don't really have an order or an index anyway. So I abandoned that.

Then I tried `Map` because... I like playing with new stuff and, again, I thought maybe they were what I needed. It quickly became apparent that wasn't the right answer either. They're useful for situations where you need some of the properties of an array (consistent order, for example), with some of the properties of an object (key/value pairs). So I abandoned that too.

So back to good old arrays.

In my `checkForDuplicateQuote()` callback function I set a constant to limit the duplicate check to 50. I'm setting a constant to avoid "magic numbers" in my code.

I get the first element of the returned JSON.

I then check to see if the global `quotes` array already has 50 items and, if it does, I remote the first item from the array.

I then check to see if the quote I just fetched is already in the array - i.e. a duplicate - using `includes()`. If it _is_ a duplicate, I log the duplicate to the console, set the quote to "Ron is thinking..." and then I call the main getRonQuote() function again to get another quote from the server. 🌌RECURRRRRSION🤯. This process will repeat until is finds a quote that is not already in the array.

When a quote is returned that is _not_ already in the quotes array, I `push` it on to the end of the array.

Finally I return the current quote, happy that it is not a duplicate, to pass it along the fetch chain into the updateQuote callback, which displays it.

As you get more and more quotes stacked up in the array, it is strangely satisfying to see the duplicates stream past while Ron thinks and thinks for a unique one.
