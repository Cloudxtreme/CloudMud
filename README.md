# CloudMud

CloudMud aims to be a feature rich mud client leveraging web technologies to achieve complete cross platform support. Currently most of the "best" mud clients are single platform, while most cross platform clients tend to be less feature-full and current web and mobile based mud clients have even fewer features.

## What CloudMud might eventually do

* Support the well known mud protocols (telnet, MXP, MCCP, GCP, etc).
* A protocol plugin system for the easy integration of new or less common protocols or mud specific tweaks, since some protocols, like MXP, are not implemented in exactly same way on every mud.
* Support for triggers and timers.
* Support user plugins, such as mud specific widgets or sidebars.
* Possible cloud based setting saving.
* Use html to create an inline debug system. This could be done by using collapsible elements, tooltips, and/or view filtering to show various logs in a single window, instead of needing to match timestamps between multiple output windows. There could also be multiple views with different settings, such as leaving a regular view open while also looking at a verbose view. This will help with discovering bugs in CloudMud or mud specific protocol quarks, and also allow for a more user friendly view for those who are just curious about what is going on as far as the raw messages from the server and how they change as they make their way onto the screen. The idea here would be that each step of the message parsing processes, as well as background actions taken by the mud, such as telnet negotiation, are always logged in memory and would be visible or not as desired by the user. For example, if a user wanted to see the log of raw packets they might check a box in the view's filter and all the raw packet data, which has been kept in the background, would show up, right next to their corresponding output (if any), rather than opening a separate packet logging window that doesn't start logging until after it was opened.

## What CloudMud currently does

So far CloudMud acts as a VERY simple telnet client and has a working echo plugin. Option negotiation is working (used by Echo); however, suboption negotiation is not tested (not used by Echo).

## The current roadmap

Now that telnet is working along with a (basic) protocol stack I plan on looking into adding support for colors of some kind, since they are the most basic feature of a client . Also at the top of the list is fixing the way client is instantiated, changing it from hard coded JavaScript to a UI/dialogue. These two changes, as well as some UI improvements (i.e. disconnect and reconnect buttons), and the eventual addition of a command history, would make CloudMud a competitor in the web client scene.

Once CloudMud is on an even field with other web based clients it could expand in a variety of directions depending on ease of implementation and demand. The key difference between CloudMud and other web clients at this stage would be it's ability to grow easily due to it's more modular design, where as other web based clients tend to be more monolithic and hard to expand.
