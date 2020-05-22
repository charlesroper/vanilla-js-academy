# Notes file for Day 11: Announcing the Count

This one was quite a trip. At first I did what probably everyone else did and simply added `aria-live="polite"`. This did not work *at all* in Firefox using Windows Narrator. In Edge it only worked correctly if I also added `role="status"`. It was a mess so I did some research.

I found an article from Léonie that makes a strong case for using both `aria-live="polite"` and `role="status"`: [Screen reader support for ARIA live regions](https://developer.paciellogroup.com/blog/2014/03/screen-reader-support-aria-live-regions/).

Then I realised that tags within the live-region were preventing the content from being read out fully. So I tried removing the inner tags. Bingo! NVDA and Windows Narrator started reading the full content. So I set about refactoring my code to build the whole count sentence, including tags.

A couple of notes on my code:

- Refactored from last time to make it simpler.
- Added a pluraliser for word or words (1 word, 2 words, etc). Makes the reading
  sound much better.
- Still using the `pageshow` event to handle refreshes on Firefox. This is where
  Firefox helpfully retains the content of a textarea on refresh. The count
  update triggers when the page reloads. This is much more user friendly than
  clearing the textarea on refresh.
- Refactored the regex into a const.
- Used `<b>` tags to bring attention to the numbers while not adding semantic
  strong emphasis.

# References

Kieran:

> In my opinion, this is the most important part of today's project: Test this
> with an actual screen reader to hear how the announcements are actually made.
> Do they make sense? Do they provide enough context? What can you do
> differently if needed to make sure visually impaired users understand what's
> happening?

 [Source](https://vanillajs.slack.com/archives/G011C233HQF/p1590037540480800)

## Screenreader shortcuts

[Windows Narrator](https://support.microsoft.com/en-gb/help/22806/windows-10-narrator-keyboard-commands-touch-gestures)

[NVDA](https://www.nvaccess.org/files/nvda/documentation/userGuide.html?#toc18)

[VoiceOver](https://help.apple.com/voiceover/info/guide/10.12/)

[VoiceOver iOS](https://support.apple.com/en-ie/guide/iphone/iph3e2e415f/ios)
