# Notes file for Day 13: Random Random

Tired after a looong weekend, but forcing myself to write this.

Gone full ES6 style with this because I felt like it. Wanted to see how it felt to use `const` again in a slightly more complex project. It's fine. It still makes me cringe a bit because JavaScript `const` is not a true constant.

## Some points of interest

I am taking a progressive enhancement approach to this. If the quote can't load (e.g., if JS or the API fails) a default message is displayed with a link to a page containing quotes. This should hopefully mitigate for browsers that are incompatible with ES6 (untested).

If the JavaScript loads, the error message is hidden and the blockquote is displayed. Great!

If the API endpoint fails, the error is displayed again and the blockquote hidden.

Have not tested with a screenreader yet.
