# CloudMud

CloudMud is aims to be a feature rich mud client based on web technologies. Currently most of the best mud clients are single platform, while most cross platform options tend to be less feature-full and web and mobile based mud clients have even fewer features.

## What CloudMud currently does

Almost nothing. It currently just sends and receives unparsed text. I'm just starting out, and learning the idiosyncrasies of JavaScript application programming along the way.

## What CloudMud might eventually do

* Support the well known mud protocols (telnet, MXP, MCCP, GCP, etc).
* Support plugins for the easy integration of additional protocols or mud specific tweaks, since some protocols, like MXP, are not implemented in exactly same way on every mud.
* Support for triggers and timers.
* Support user plugins, such as mud specific widgets or sidebars.
* Possible cloud based setting syncing and/or in browser client.
* Use the flexibility of html to allow inline debug messages. This could be done by using collapsible elements and/or view filtering to show various logs in a single window(if desired), instead of needing to match timestamps between multiple output windows. There could also be multiple views with different settings, such as leaving a regular view open while also looking at a verbose view. This will help with discovering bugs or mud specific protocol quarks, and also allow for a more friendly view for users who are just curious.
