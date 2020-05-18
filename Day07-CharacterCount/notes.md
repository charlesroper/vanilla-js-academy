# Notes file for Day 7

There was some tricky stuff in this one. Some stuff from Slack reproduced here.

**D7 Questions:** I have refactored mine ([code here](https://github.com/charlesroper/vanilla-js-academy/blob/master/Day07-CharacterCount/script.js)) already because I noticed it didn't trigger a count on reload of the page. If I hit refresh, the count went back to zero. This made for quite a fundamental change because I could no longer rely on the `event.target` to do things, because page load event target is not the textarea! So I had to rip out all of the `event.target` stuff. But that seems like a good thing because events can come from a bunch of places, and now my code works regardless of where the event that triggered it (I could add a Refresh button for instance, which could use JS if it's available, or refresh the whole page and do a server-side count if not). So, er, yeah, there's that. But my questions are:

**a)** `DOMContentLoaded` is that the right event to use? Or should I use `load`? Or `onreadystate`? I'm not sure.

**b)** If feel a bit weird about having those variable at the top just sort of floating around in global scope. What do you suggest as a better way to handle that?

_To this, Kieran replied:_

This is an issue unique to Firefox. The other browsers don't persist form values on reload. I haven't bothered this time but when I first tackled this project, I just reset the `textarea`'s value at the bottom of my script. That way, whenever the page loads, it simply gets reset to no value to be consistent with the other browsers (edited)

_This lead to some further investigation_...

Ah, interesting. I did not know that! I've just been reading about it and doing a bit of testing. If I click back then forwards again, the `textarea` also persists. You can turn off this persistence in Firefox using the `autocomplete="off"` attribute on the `textarea`. But I like it - helps protect against accidental clearing of a form. Better UX perhaps to have an explicit **Clear Form** button? How many time have you ever been filling some janky form with loads of JS that gets stuck and won't continue so you have to refresh? Boy, am I glad if the fields don't get emptied. But may be confusing if you expect the form to clear?It seems it's an inconsistent thing across browsers generally. Just been testing Chromium Edge and that does indeed clear the `textarea` on refresh (boo :thumbsdown:);​ **however** if I click back then forwards, the `textarea`persists BUT the counter doesn't update. Hmm, navigating between pages using the back and forward buttons are a different event, perhaps?...Yes, it's the [pageshow](https://developer.mozilla.org/en-US/docs/Web/API/Window/pageshow_event) event. I've changed to using this instead of `DOMContentLoaded` and it's working well.
