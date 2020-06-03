# Notes file for Day 19 NYT Multiple Categories

Get articles from three to five categories, then render the API data into markup and inject it into the #app element.

Instead of rendering all of the articles, use the first five from each category. Add a heading before each section so that you know what category the articles are from.

## Thoughts

Need to make 5 calls to the API, one for each category.

Can use `Promise.all()` ([docs](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise/all)) to make the calls in order and ensure they all complete.
