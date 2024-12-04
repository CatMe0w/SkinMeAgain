# The Story of SkinMeAgain

中文版请见[这里](https://github.com/CatMe0w/SkinMeAgain/blob/master/README_zh.md)。

### **How I Brought Back the Lost Minecraft Skins**

It all started with a nostalgic urge.

One day, I decided to dive back into an old version of Minecraft—one of those early editions that just feels different, like a simpler, emptier time.

I have a Minecraft 1.4.7 server that has been running for years—its modpack dates back to 2012, with the good old **SkinMe mod**.

I had almost forgotten about it, but it's so efficient and reliable that I kept it up, even though most players have moved on.

Sometimes I come back just to reminisce.

&nbsp;

As I joined my server, there it was—my character, a stereotypical, and expressionless Steve.

I knew it wouldn't work.

SkinMe had been shut down for a long time, and Mojang's skin API for older versions had also been discontinued years ago.

But when I casually glanced at the game log, I noticed that SkinMe mod was still trying to connect to some non-existent domain names.

That's not right.

As far as I can remember, people said nothing about the fallback order, but I couldn’t shake the feeling that there was something more to it.

&nbsp;

So I started digging.

I decompiled the SkinMe mod, and there it was—a (maybe) **hidden sequence of fallback servers**, hardcoded in the code.

These servers were supposed to keep the skins alive, even if SkinMe and Mojang servers went offline.

But when I checked those domain names, two them had expired.

The original system had failed, not because it was poorly designed, but because it had simply been forgotten.

I was looking at a piece of lost digital archaeology.

&nbsp;

And that’s when I realized: **I could save them**.

&nbsp;

I registered both domains, and with a mixture of luck and excitement, I set out to bring them back online.

I wrote the code you're looking at right now, grabbed the modern fallback order from [CustomSkinLoader](https://modrinth.com/mod/customskinloader) (Mojang -> LittleSkin -> Blessing Skin -> ElyBy -> TLauncher), and pointed everything back to where it should be.

Everything is in place, and we are about to move on to the past.

&nbsp;

From 2024-12-03 or 2024-12-04 (depending on where you are), all over the world, anyone playing Minecraft 1.3.x through 1.7.x (before the transition to UUID) with the SkinMe mod will suddenly find their skins reappearing.

Those old blocky avatars, which had been lost to time, would light up once again, shining on servers that had long grown used to seeing Steves. It wasn't just a technical project; it was about **bringing back a piece of history**—about making sure that the memories tied to those pixels weren't left in the dark.

&nbsp;

For me, this is what **preserving the old web** is all about.

It's not just the data, it's the time spent playing the game together, the people behind those avatars.

**SkinMeAgain** isn't just a revival; it's a tribute to the adventures of the past, and a promise that even in a world that moves forward so fast, we don’t forget where we came from.

So go on, fire up your beloved old Minecraft versions, and see your skin light up again.

![screenshot of Minecraft 1.4.7](nostalgia.jpg)

## Run

Requires Deno.

```sh
deno run --allow-net skinmeagain.js
```

## License

MIT License
