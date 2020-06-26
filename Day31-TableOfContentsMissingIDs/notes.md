# Notes file for Day 31

I used the following regex to replace all spaces single-quotes and double
quotes:

```js
var regex = /[\s'"]+/gm;
```

I wanted to preserve the original characters. The HTML5 spec says that only
spaces are invalid in ids. See the following post:

 <https://mathiasbynens.be/notes/html5-id-class>
