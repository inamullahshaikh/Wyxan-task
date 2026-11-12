import { readFileSync } from 'node:fs';

// The small web as it exists before anyone publishes. Invented people, invented places.
// Addresses linked but never defined here lead Nowhere on purpose:
// lighthouse.zz, tidetables.zz, owl.zz, papermill.zz.

export const PEOPLE = [
  { _id: 'odile', name: 'Odile Brannock' },
  { _id: 'teo', name: 'Teo Lindqvist' },
  { _id: 'sol', name: 'Sol Marchetti' },
  { _id: 'wren', name: 'Wren Calloway' },
  { _id: 'pim', name: 'Pim Adeyemi' },
];

type SeedSite = { address: string; title: string; authorId: string; html: string };

const page = (css: string, body: string) =>
  `<style>body{max-width:38em;margin:3em auto;padding:0 1.25em;line-height:1.65}${css}</style>\n${body}`;

export const SITES: SeedSite[] = [
  {
    address: 'fieldguide.zz',
    title: 'A field guide to the small web',
    authorId: 'wren',
    html: page(
      'body{font-family:Georgia,serif;color:#222;background:#fbf8f1}h1{font-weight:normal;font-size:2.2em}dt{margin-top:1.4em;font-weight:bold}dd{margin-left:0}a{color:#7a3e00}',
      `<h1>A field guide to the small web</h1>
<p>The small web is a few hundred pages written by people who wanted to write them. Nobody is selling anything here.
There are no feeds, no follower counts, and nothing refreshes itself while you read. A page sits at its address until
its author changes it, and the only way from one page to another is a link someone chose to make.</p>
<p>I started keeping this guide because I kept losing my way. You follow a link from a page about tide pools to a
page about a night bus, and from there to a sourdough diary, and an hour later you cannot remember how you got
anywhere. So: a list, with a line or two about each place, in the order I found them. If you keep a page and want it
here, tell me on the bus.</p>

<h2>The places</h2>
<dl>
  <dt><a href="tidepool.zz">tidepool.zz</a></dt>
  <dd>Odile's notes from the rock pools at low tide. The best writing about anemones I have read anywhere, and the
  reason I now own a pair of boots I only wear twice a month, when the tide is right.</dd>

  <dt><a href="saltmarsh.zz">saltmarsh.zz</a></dt>
  <dd>Also Odile. The marsh behind the sea wall, at dusk, when the tide fills the creeks from the bottom up. Read it
  slowly.</dd>

  <dt><a href="birdcount.zz">birdcount.zz</a></dt>
  <dd>Odile again, counting birds every Sunday of the winter. Mostly tables. The tables are better than they sound.</dd>

  <dt><a href="letterpress.zz">letterpress.zz</a></dt>
  <dd>Teo sets type by hand in a shed. He printed the cards I give out on the bus, and he will tell you about
  quoins whether you ask or not.</dd>

  <dt><a href="clockwork.zz">clockwork.zz</a></dt>
  <dd>Teo's other page, about bringing a longcase clock back to life one tooth at a time.</dd>

  <dt><a href="nightbus.zz">nightbus.zz</a></dt>
  <dd>Mine. What I hear on the night bus between one and five in the morning.</dd>

  <dt><a href="ferment.zz">ferment.zz</a></dt>
  <dd>Pim's starter diary. Pim bakes for a living and gets on my bus at four.</dd>

  <dt><a href="allotment.zz">allotment.zz</a></dt>
  <dd>Sol's plot, through a whole year. Rhubarb, beans, a robin, and a great deal of compost.</dd>

  <dt><a href="moss.zz">moss.zz</a></dt>
  <dd>Sol looks at north-facing walls with a hand lens. It is more exciting than it sounds, which is the motto of
  this whole web.</dd>

  <dt><a href="lighthouse.zz">lighthouse.zz</a></dt>
  <dd>Someone on the bus swore there is a keeper's log at this address, kept on a rock somewhere out past the marsh.
  I have never managed to reach it. Maybe you will.</dd>
</dl>

<h2>How to read it</h2>
<p>Pick anything. Follow one link from it, then one link from there, and keep going until you reach a page that links
somewhere that is not there. That happens. Pages move, people stop writing, and an address someone was sure of turns
out to have been a story. When you hit one, go back. Back always works.</p>
<p>The search box finds words on any page, not just in the titles, so if you remember a phrase but not where you read
it, search for the phrase. And the history remembers everywhere you have been, in order, which is the only reason I
can write this guide at all.</p>`,
    ),
  },
  {
    address: 'tidepool.zz',
    title: 'Notes from the tide pools',
    authorId: 'odile',
    html: page(
      'body{font-family:system-ui,sans-serif;color:#10302e;background:#eef6f4}h1{color:#0d5c55}a{color:#0d5c55}blockquote{border-left:4px solid #9cc9c2;margin:1.5em 0;padding:.2em 1em;color:#335}',
      `<h1>Notes from the tide pools</h1>
<p>Twice a month the moon and the sun pull together and the sea goes further out than usual. These are the spring
tides, and they have nothing to do with spring. For two or three hours the bottom of the shore is open: the ledges
that are under water every other day of the month, the pools that only refill when the tide turns back.</p>
<p>I check <a href="tidetables.zz">tidetables.zz</a> for the times before I go, and I aim to be on the rocks an hour
before low water. You want to follow the tide out, not race it back.</p>

<h2>What lives in a pool</h2>
<p>The first thing you see is anemones. Beadlet anemones, dark red, closed up like wine gums on the rock when the
water has gone, and open in the pools like small flowers with too many petals. Touch one, gently, with a wet finger,
and it grips. That grip is a thousand tiny stinging cells, far too weak to hurt you, and strong enough to hold a
shrimp.</p>
<p>Then the snakelocks, green with purple tips, which never close at all. Then, if you sit still for long enough, the
blennies: small fish with faces like disappointed uncles, that live in cracks and come out to look at you. Sitting
still is most of tide pooling. The pool shows you what is in it once it has decided you are part of the rock.</p>
<blockquote>Lift a stone, look, and put it back the way it was. The underside of every stone is somebody's ceiling.</blockquote>
<p>Under the stones: porcelain crabs, flat as coins, which drop their legs if you grab them. Brittlestars. Sea slugs
the colour of lemon peel. A shore crab that will raise its claws at you as if it has any chance at all, which you
should respect.</p>

<h2>Limpets</h2>
<p>Every limpet has a home scar, a spot on the rock ground exactly to the shape of its shell. When the tide comes in
it goes grazing, sometimes a metre away, and before the tide goes out it comes back to the same scar and clamps down.
Nobody is completely sure how it finds the way home. I like that we can not explain a limpet.</p>

<h2>Leaving</h2>
<p>Watch the water, not the clock. The tide turns quietly: a pool that was still begins to breathe at its seaward
edge, and the weed lifts. That is the time to walk back up the shore, while the gaps between the rocks are still
gaps.</p>
<p>When the tide is in I go up to the marsh behind the sea wall and write about that instead, at
<a href="saltmarsh.zz">saltmarsh.zz</a>. And on the mornings when the low tide is very early I get down to the coast
on the first bus after the night bus; Wren writes about that one at <a href="nightbus.zz">nightbus.zz</a>.</p>`,
    ),
  },
  {
    address: 'saltmarsh.zz',
    title: 'The salt marsh at dusk',
    authorId: 'odile',
    html: page(
      'body{font-family:Georgia,serif;color:#2b2a22;background:#f3f1e6}h1{font-style:italic;color:#5a5a2a}a{color:#6b4f1d}',
      `<h1>The salt marsh at dusk</h1>
<p>Behind the sea wall the land gives up being land by degrees. First rough grass, then sea purslane, grey-green and
soft, then the bare mud of the creeks, which shines. The marsh is flat in the way only a place shaped by water is
flat: everything has been levelled by thousands of tides, each one leaving a film of silt a little finer than paper.</p>
<p>I come here when the tide is too high for the pools down on the shore, which I write about at
<a href="tidepool.zz">tidepool.zz</a>. The best hour is the one before dark, on a rising tide.</p>

<h2>The tide comes in from below</h2>
<p>On the open shore the sea arrives as a line of waves. On the marsh it comes up from underneath. The creeks fill
first, from their mouths backwards, so that water appears in places you cannot see it reach. A dry channel at your
feet goes dark, then silver, then it is moving, and it is moving the wrong way, inland. If you stand on the wall at
the top of a spring tide you can watch the whole marsh go under in a quarter of an hour, and only the tops of the
purslane show, like a field of small grey shrubs standing in a lake.</p>

<h2>What grows</h2>
<p>Samphire grows on the lowest mud, fat green fingers that taste of salt and the sea. In late summer the sea
lavender comes out and the whole marsh turns a colour I have never managed to describe, somewhere between purple and
the evening. Along the wall itself, on the old bricks, there are mosses that put up with spray and wind and
nobody noticing them. Sol knows their names and keeps a page about mosses on north walls at
<a href="moss.zz">moss.zz</a>.</p>

<h2>Who calls</h2>
<p>At dusk the birds talk. Redshank first, always, the alarm call of the marsh: three loud notes that mean someone is
here, and the someone is usually me. Curlews further out, with the long rising call that sounds like a question.
Little egrets, white as paper, going to roost in a line along the far creek. In winter there are geese, hundreds,
coming in low over the wall in the last of the light and talking the whole way down.</p>
<p>I count them on Sundays and keep the numbers at <a href="birdcount.zz">birdcount.zz</a>. The counting is an
excuse. Mostly I stand on the wall and listen until it is too dark to see the creeks, and the tide turns, and I walk
home along the top with the water ticking in the mud on both sides.</p>`,
    ),
  },
  {
    address: 'birdcount.zz',
    title: 'Winter bird count',
    authorId: 'odile',
    html: page(
      'body{font-family:system-ui,sans-serif;color:#222;background:#fff}h1{letter-spacing:-.02em}table{border-collapse:collapse;width:100%;margin:1em 0}th,td{border-bottom:1px solid #ddd;padding:.35em .5em;text-align:left}td.n{text-align:right;font-variant-numeric:tabular-nums}a{color:#1d4f91}',
      `<h1>Winter bird count</h1>
<p>Every Sunday from November to March I walk the same route along the sea wall at the same hour and count what I
see. Same route, same hour, same pair of binoculars that were my grandmother's. The point of a count is not the
number on one day. It is that you can lay this winter over the last one and see what changed.</p>
<p>The route starts at the sluice, follows the wall around the <a href="saltmarsh.zz">salt marsh</a>, and ends at the
gate by the allotments, where Sol is usually digging. Sol's robin is not on the route, so it is not in the counts,
but it is the most reliable bird I know. It has its own paragraph at <a href="allotment.zz">allotment.zz</a>.</p>

<h2>November</h2>
<table>
  <tr><th>Species</th><th>2 Nov</th><th>9 Nov</th><th>16 Nov</th><th>23 Nov</th></tr>
  <tr><td>Redshank</td><td class="n">41</td><td class="n">38</td><td class="n">52</td><td class="n">47</td></tr>
  <tr><td>Curlew</td><td class="n">12</td><td class="n">15</td><td class="n">9</td><td class="n">14</td></tr>
  <tr><td>Little egret</td><td class="n">6</td><td class="n">8</td><td class="n">8</td><td class="n">11</td></tr>
  <tr><td>Brent goose</td><td class="n">120</td><td class="n">340</td><td class="n">610</td><td class="n">580</td></tr>
  <tr><td>Shelduck</td><td class="n">22</td><td class="n">25</td><td class="n">31</td><td class="n">30</td></tr>
  <tr><td>Grey plover</td><td class="n">3</td><td class="n">0</td><td class="n">5</td><td class="n">4</td></tr>
</table>
<p>The geese arrived in the second week, as they do. One morning the marsh is quiet and the next it is a crowd. The
egrets keep going up year on year; ten years ago a single egret was worth a phone call.</p>

<h2>December</h2>
<table>
  <tr><th>Species</th><th>7 Dec</th><th>14 Dec</th><th>21 Dec</th><th>28 Dec</th></tr>
  <tr><td>Redshank</td><td class="n">55</td><td class="n">60</td><td class="n">49</td><td class="n">58</td></tr>
  <tr><td>Curlew</td><td class="n">17</td><td class="n">16</td><td class="n">21</td><td class="n">18</td></tr>
  <tr><td>Little egret</td><td class="n">9</td><td class="n">12</td><td class="n">10</td><td class="n">13</td></tr>
  <tr><td>Brent goose</td><td class="n">640</td><td class="n">700</td><td class="n">655</td><td class="n">720</td></tr>
  <tr><td>Short-eared owl</td><td class="n">0</td><td class="n">1</td><td class="n">0</td><td class="n">1</td></tr>
</table>

<h2>The owl</h2>
<p>On the fourteenth, a short-eared owl came over the wall at three in the afternoon, low and slow, quartering the
rough grass like a big brown moth. I forgot to count anything else for ten minutes. It came back on the twenty-eighth,
or another one did.</p>
<p>A reader keeps writing to tell me that everything about the barn owls at the old farm is on
<a href="owl.zz">owl.zz</a>. I have tried that address a dozen times. If you get there, tell me what it says.</p>

<h2>Notes on method</h2>
<p>Count each bird once. When a flock lifts, count it in tens and be honest about the remainder. Write the number
down before you look at the next thing, because the next thing is always an egret, and you will forget. And count the
days with nothing on them: an empty column is still data.</p>`,
    ),
  },
  {
    address: 'letterpress.zz',
    title: 'Setting type by hand',
    authorId: 'teo',
    html: page(
      'body{font-family:"Iowan Old Style",Palatino,Georgia,serif;color:#1a1a1a;background:#fffdf7}h1{font-variant:small-caps;letter-spacing:.06em}h2{font-variant:small-caps;letter-spacing:.04em}a{color:#a2271b}',
      `<h1>Setting type by hand</h1>
<p>In the shed at the bottom of the garden there is a cast-iron press, two cabinets of type, and a smell of ink and
paraffin that gets into everything. Every line I print here was set one letter at a time, by hand, upside down and
backwards. That is not a complaint. It is the whole pleasure of it.</p>

<h2>The case</h2>
<p>Type lives in shallow wooden drawers called cases, divided into little boxes, one box per letter. The boxes are
not in alphabetical order. They are sized and placed by how often the letter is used, so the e box is large and near
your hand, and the z is a small box in a far corner. After a while your hand knows where everything is and you stop
looking, which is how compositors were able to set thousands of letters an hour.</p>
<p>Capitals were kept in the upper case and small letters in the lower case, on a sloping frame. That is where the
words come from. When you type a capital letter today you are reaching for a drawer that sat a little higher.</p>

<h2>The stick</h2>
<p>You set the line in a composing stick, a small steel tray you hold in your left hand. You pick each letter out of
the case, nick upward so you know it is the right way round, and drop it in. A lower-case p and q are mirror images
of each other in metal, and so are b and d, which is why the old printers said to mind your p's and q's. I have
printed the word quiet as puiet more than once.</p>
<p>When the line is nearly full you justify it, which means packing thin spaces between the words until the line is
tight. Too loose and letters fall out when you lift it. Too tight and you cannot lift it at all.</p>

<h2>Locking up</h2>
<p>The lines go into an iron frame called a chase, with wooden furniture around them, and the whole thing is wedged
tight with quoins. A quoin is a small expanding wedge you turn with a key. Lock up too hard and the type springs out
of the middle like a cork; too soft and it creeps while you print. I have done both.</p>

<h2>Paper</h2>
<p>For years I bought paper from a small mill that kept a page at <a href="papermill.zz">papermill.zz</a>, with
photographs of the vats and the felts. I went to order more in the autumn and the address had gone. I still have half
a ream left, and I am being careful with it.</p>

<h2>What I print</h2>
<p>Mostly cards. Wren gives out cards on the night bus with the address of <a href="fieldguide.zz">the field
guide</a> on them, and I printed the last two hundred. Sometimes a poem. Once, a wedding invitation, which took a
fortnight and nearly ended a friendship.</p>
<p>When the press is locked up and drying I go back to the other bench, where a longcase clock has been in pieces since
the spring. That one has its own page at <a href="clockwork.zz">clockwork.zz</a>.</p>`,
    ),
  },
  {
    address: 'clockwork.zz',
    title: 'Repairing a longcase clock',
    authorId: 'teo',
    html: page(
      'body{font-family:Georgia,serif;color:#1e1b16;background:#f6f0e4}h1{border-bottom:3px double #8a6d3b;padding-bottom:.2em}a{color:#7a4a00}code{background:#ebe2cf;padding:0 .3em}',
      `<h1>Repairing a longcase clock</h1>
<p>The clock came from a house clearance with a cracked hood, a dial that had been painted over at least twice, and a
movement that had not ticked since, I would guess, the nineteen-sixties. It stands about seven feet tall. My friends
call it a grandfather clock, and clock people call it a longcase, and the clock itself does not care.</p>
<p>This page is the log of getting it going again. I work on it in the shed between print runs; the printing is at
<a href="letterpress.zz">letterpress.zz</a>.</p>

<h2>Taking it apart</h2>
<p>A clock movement is two brass plates held apart by pillars, with the wheels pivoting in holes between them. Before
anything comes apart you photograph everything from every side, and then you photograph it again, because you will
need the one picture you did not take. Then you let the power down. The weights hang on gut lines, and a falling
weight will put a hole through the bottom of the case and possibly through your foot.</p>
<p>Pins out, front plate off, and there it is: the going train on one side, the striking train on the other, every
wheel furred with old oil that has turned to something like dark honey.</p>

<h2>Cleaning</h2>
<p>Every part goes in a bath of cleaning solution, then rinse, then dry, then peg out every pivot hole with a
sharpened stick of peg wood until the wood comes out clean. This takes an evening per wheel. Several of the pivot holes
were worn oval, which means the wheels had been leaning as they turned, and those needed bushing: drilling out the
worn hole and fitting a new brass bush, exactly central. I got three of them right on the first try and one on the
fourth.</p>

<h2>The escapement</h2>
<p>The escapement is the part that makes the tick. The pendulum rocks an anchor, the anchor lets the escape wheel move
forward one tooth at a time, and on every tooth the wheel gives the pendulum a tiny push to keep it swinging. Without
the escapement the weight would just fall and the hands would spin. With it, the falling is metered out over eight
days, one second at a time.</p>
<p>Getting the clock in beat means making the tick and the tock evenly spaced. You listen. A clock out of beat limps:
<code>tick-tock ... tick-tock</code>. You bend the crutch a hair at a time until it walks.</p>

<h2>Where it stands now</h2>
<p>It has run for nineteen days. It gains about forty seconds a week, which I will correct by screwing the pendulum
bob down a fraction of a turn. It strikes the hours, but it strikes twelve at one o'clock, which is a problem for next
month.</p>
<p>Wren says the clock at the bus depot has been seven minutes fast for as long as anyone can remember, and that the
drivers set their watches by it anyway. That clock has its own small fame at <a href="nightbus.zz">nightbus.zz</a>.
I have offered to look at it. They have not taken me up on it.</p>`,
    ),
  },
  {
    address: 'nightbus.zz',
    title: 'The night bus',
    authorId: 'wren',
    html: page(
      'body{font-family:ui-monospace,Menlo,Consolas,monospace;font-size:15px;color:#e8e6df;background:#15171c}h1{color:#ffd166}h2{color:#ffd166;font-size:1em;text-transform:uppercase;letter-spacing:.1em}a{color:#7cc6ff}em{color:#fff}',
      `<h1>The night bus</h1>
<p>Route 7N runs from the depot by the market to the coast road and back, once an hour, from just after midnight to
just before six. I ride it most nights. I am not going anywhere. I sit at the front of the top deck with a notebook
and write down what I hear, and this page is the notebook, typed up.</p>

<h2>01:10, the depot</h2>
<p>The clock over the depot gates is seven minutes fast and has been for as long as anyone remembers. The drivers
set their watches by it anyway, so the whole route runs seven minutes early, on time. Teo has offered to fix it; he
is restoring a longcase clock at <a href="clockwork.zz">clockwork.zz</a> and thinks a depot clock would be a holiday.
Nobody has said yes. I think they are afraid of what happens to the timetable if the clock is right.</p>

<h2>01:40, the hospital stop</h2>
<p>Two nurses coming off a late shift, still in their trainers. One of them is explaining the plot of a film to the
other in extraordinary detail. <em>No, but the brother was the one in the lighthouse the whole time.</em> They get off
before the ending, and I will never know.</p>

<h2>02:15, the high street</h2>
<p>This is the party stop, on Fridays. Glitter on the stairs. Someone singing a song from start to finish with no
mistakes and no audience. A man asleep with a pizza on his knees, held perfectly level, as if he has practised.</p>

<h2>03:30, the coast road</h2>
<p>Almost empty. The bus runs along the top of the sea wall here and if the tide is in you can see the water right
beside you, black, with the road lights in it. If the tide is out there is just a darkness that smells of weed.
Odile gets on here sometimes on the early mornings when the low tide is at dawn, with boots and a bucket, going down to
<a href="tidepool.zz">the pools</a>.</p>

<h2>04:05, the bakery stop</h2>
<p>Pim gets on at the bakery stop at four, going the wrong way, back towards the market, where the ovens are. Pim
smells of flour and has opinions about rye, and writes them down at <a href="ferment.zz">ferment.zz</a>. We talk about
starters. I have learned more about wild yeast on this bus than I ever wanted to know, and I now want to know more.</p>

<h2>05:20, the market</h2>
<p>Back at the depot end. The market is setting up: crates, pallets, men shouting numbers. When the bus doors open a
tide of people pours off at once, porters and cleaners and stall-holders, and in a minute the bus is empty and the
day has started without me.</p>
<p>I go home and sleep. Then I type it up. Then it is midnight and the depot clock says seven minutes past.</p>`,
    ),
  },
  {
    address: 'ferment.zz',
    title: 'Starter diary',
    authorId: 'pim',
    html: page(
      'body{font-family:system-ui,sans-serif;color:#3a2a1a;background:#fff8ee}h1{color:#8c4a12}h2{color:#8c4a12;font-size:1.1em}a{color:#8c4a12}.log{font-family:ui-monospace,monospace;font-size:.9em;background:#f6ead8;padding:.8em 1em;border-radius:6px}',
      `<h1>Starter diary</h1>
<p>I bake bread for a living, at an oven by the market that starts work at half past four in the morning. I get there
on the night bus; Wren, who writes it all down at <a href="nightbus.zz">nightbus.zz</a>, says I am the only passenger
who boards smelling of the place I am going to rather than the place I have been.</p>
<p>This is the diary of my starter. A starter is flour and water left to go wild: the yeasts and bacteria that live on
the grain wake up, eat the flour, and make gas and acid. Feed it and it lives forever. Ours is called Margaret. She is
nine years old.</p>

<h2>How I feed her</h2>
<div class="log">
50 g starter<br>
100 g water, about 26 °C<br>
100 g flour, half white, half wholemeal rye<br>
stir, cover loosely, leave 8–12 hours
</div>
<p>Twice a day, every day, including Christmas. When she is ready she has doubled, has a domed top, and smells of
yoghurt and green apples. When she is hungry she has fallen back, has a grey liquid on top called hooch, and smells of
nail varnish. Hooch is not a disaster. Stir it in, feed her, apologise.</p>

<h2>Temperature is everything</h2>
<p>A starter is a clock that runs on warmth. At 20 degrees she peaks in about twelve hours; at 26, in five. In winter
the bakery is cold before the ovens come up, and the bread rises so slowly that I can mix the dough at four and shape
it at nine. In summer I have to use cold water from the fridge or the dough runs away from me.</p>

<h2>Rye</h2>
<p>I feed with rye because rye is what wild yeast likes best. It ferments quickly and smells of the countryside. A
loaf made only of rye is dense and dark and keeps for a week, and it is best sliced thin with butter and something
salty. Sol, who grows vegetables at <a href="allotment.zz">allotment.zz</a>, swaps me rhubarb for loaves all summer,
and I am winning that trade.</p>

<h2>Things that went wrong this month</h2>
<p>The fourth: forgot the salt in sixty loaves. Bread without salt is pale, flat, and tastes of disappointment.
The ninth: the proving cupboard thermostat stuck on high and every loaf over-proved and collapsed in the oven like a
deflating tent. The seventeenth: perfect bread. No reason. That is how bread works.</p>

<h2>A short list of beliefs</h2>
<p>Weigh everything, including the water. Wet dough makes better bread than dry dough, and is harder to handle,
which is the trade. The crust should be darker than you think. Nobody needs a bread knife with a serrated edge
until the day they need one desperately. Margaret will outlive me.</p>`,
    ),
  },
  {
    address: 'allotment.zz',
    title: 'Plot 14',
    authorId: 'sol',
    html: page(
      'body{font-family:Georgia,serif;color:#23301e;background:#f4f7ef}h1{color:#3d6b2a}h2{color:#3d6b2a;font-size:1.15em}a{color:#3d6b2a}',
      `<h1>Plot 14</h1>
<p>Plot 14 is ten rods of clay at the end of the row by the sea wall gate, with a shed that leans and a water butt
that does not hold water. I took it on four years ago from a man called Derek who grew prize leeks and nothing else.
I am still digging his leek trenches out.</p>

<h2>January</h2>
<p>Nothing grows. You turn the compost, you order seeds, you stand in the shed doorway with a flask and look at the
rain. The robin comes anyway. It knows that a person with a fork means worms, and it sits on the handle the moment I
put it down. Odile counts birds along the wall every Sunday at <a href="birdcount.zz">birdcount.zz</a> and says my
robin is not on her route, so it does not count. I count it.</p>

<h2>March</h2>
<p>Broad beans in, in double rows, and first earlies chitting on the kitchen windowsill in egg boxes. The rhubarb
crowns put up their first fists of red leaf, which is the real start of the year.</p>

<h2>May</h2>
<p>Everything at once. Beans up, peas up, courgettes planted out too early and then covered with old plastic bottles
when the cold came back. Slugs. I go out at night with a torch, and the north wall of the shed, which never sees the
sun, is green with moss. I started looking at the moss with a hand lens while waiting for slugs, and now I have a
second page about it at <a href="moss.zz">moss.zz</a>.</p>

<h2>July</h2>
<p>Too many courgettes. There are always too many courgettes; it is the one law of allotments. I leave them on the
bench by the gate with a sign. Pim takes the rhubarb and leaves bread in the shed, wrapped in a tea towel: a
dark rye loaf, still warm from the oven. The bread recipe is at <a href="ferment.zz">ferment.zz</a>, and I have never
once managed to make it come out like Pim's.</p>

<h2>September</h2>
<p>Beans dried on the plants for next year's seed, squash curing on the shed roof, the first frost a few weeks off.
The light goes golden and long across the plots and everyone stays out later than they mean to.</p>

<h2>November</h2>
<p>Dig, mulch, put the plot to bed under a layer of manure from the riding stables, which is free if you shovel it
yourself. The wind comes over the sea wall straight from the marsh. The robin is back on the fork handle, as if the
year had been arranged around it.</p>`,
    ),
  },
  {
    address: 'moss.zz',
    title: 'Moss on north walls',
    authorId: 'sol',
    html: page(
      'body{font-family:system-ui,sans-serif;color:#1f2a1c;background:#eef3ea}h1{color:#2f5d27;font-weight:600}h2{color:#2f5d27;font-size:1.1em}a{color:#2f5d27}aside{font-size:.9em;color:#4a5a45;border-top:1px solid #c7d3c0;margin-top:2em;padding-top:.5em}',
      `<h1>Moss on north walls</h1>
<p>Find a wall that faces north. Any wall: a garden wall, a churchyard wall, the back of a shed. Get close. Closer
than that. With a ten-times hand lens held right up to your eye, the green fuzz on the bricks turns into a forest.</p>
<p>I started looking at moss on the shady side of my shed at <a href="allotment.zz">the allotment</a>, waiting for
slugs one night in May. I have not stopped.</p>

<h2>Why north</h2>
<p>Mosses have no roots and no way to hold water inside themselves for long. They drink through their leaves, from
rain and dew and fog, and they dry out in the sun. A north wall stays damp longer. It is the same reason the green
always seems to be on one side of the tree. Mosses are not rare. They are just patient about where they live.</p>

<h2>What you will find</h2>
<p><strong>Wall screw-moss.</strong> Small grey-green cushions on mortar, each leaf ending in a long white hair, so
the cushion looks frosted. When it is dry the leaves twist up tight like a closed fist. Drip some water on it and
watch it open in under a minute. This is the best free show I know.</p>
<p><strong>Silky wall feather-moss.</strong> Glossy, creeping, in mats along the top of the wall, shining when the
light catches it.</p>
<p><strong>Grey-cushioned grimmia.</strong> Tight round cushions on the bare brick itself, with the spore capsules
tucked down among the leaves, as if it is embarrassed by them.</p>
<p><strong>Liverworts.</strong> Not mosses at all, strictly: flat green ribbons pressed to the damp brick at the
bottom of the wall, where the drips land. Some of them carry tiny cups full of green specks, which the rain splashes
out to start new plants.</p>

<h2>On the sea wall</h2>
<p>The old brick wall around the marsh has its own mosses, the ones that can stand salt spray. Odile walks along the
top of that wall at dusk and writes about the marsh behind it at <a href="saltmarsh.zz">saltmarsh.zz</a>. I asked
her to look down at the bricks next time instead of up at the geese. She said she would. I do not think she did.</p>

<h2>How to look</h2>
<p>Hold the lens against your eye, not against the moss, and move your head in until it focuses. Look after rain.
Take nothing; there is no need, the wall will be there next week. Write down where you saw it, so you can go back in
another season and see the capsules ripen.</p>

<aside>Found this page from somewhere else? There is a list of everything on this small web at
<a href="fieldguide.zz">the field guide</a>.</aside>`,
    ),
  },
  {
    // The containment test: every escape attempt we know of, published like any other page.
    // Same file as sanitize.spec.ts uses; nest-cli.json copies it next to the compiled seed.
    address: 'escape.zz',
    title: 'Try to escape',
    authorId: 'pim',
    html: readFileSync(new URL('../fixtures/escape.html', import.meta.url), 'utf8'),
  },
];
