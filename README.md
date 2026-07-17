<div align="center">
  <h1>SpinSpinner</h1>
  <img src="https://github.com/jsfischer343/spinspinner-webapp/public/assets/images/spinspinner_logo.png" alt="SpinSpinner.icon"/>
</div>

## About
SpinSpinner is a simple app that generates random figure skating spins that follow the ISU (international skating union) rules.
It is intended to assist skaters in coming up with leveled spins for their programs by only generating ones that adhere to the required guidelines for acquiring spin levels.

## Web URL
TBD

## Guide

### Terminology
* Direction: Refers to the rotational direction of the spin, either clockwise or counterclockwise.
* Footness: Refers to foot that is spun on, either dominant (counterclockwise on right foot, clockwise on left foot) or non-dominant (clockwise on right foot, counterclockwise on left foot).
* Position: Camel, sit, upright, or layback that act as a base components of spins. There is also a "non-basic" or intermediate position that can appear in combo spins.
* Segment: A series of positions all on the same foot. Change foot spins will have two segments, all other spins will only have one.
* (Difficult) Variation: A change of core or body position inside of a spin position that changes the quality of the spin in a significant way.
* Feature: A special modification to the nature of a spin that makes it more difficult. In some contexts a difficult variation is also considered a feature.
### Spin Layout
Spins are broken down into segments: entrance, first segment, second segment (change foot only), and exit.
* Entrance: This card will specify if the spin has a fly or a difficult entrance otherwise it is omitted.
* Segment(s): Contains the actual spinning portions of the spin. Every segment will have a direction specified by a rotation symbol in the top left and the "footness" at the top of the card. Then each position will appear in descending rows separated by a "+". Qualities of each position will be mentioned after the position. First, variations separated by "->", then features contained in parenthesis.
* Exit: This card will only appear if there is a difficult exit otherwise it is omitted. It is up to the skater to decide how to make the exit difficult.
### Options
* Spin Type: Limits spin generation only to specified spin (any, camel, sit, upright, layback, combo)
* Spin Level: Only generates spins of that level
* Preferred Spin Direction: Designates the default spinning direction for the skater
* Rule Set: Changes the fundemental logic for how levels are achieved. Changing this setting from the default is only applicable to Adult skaters.
* Less Weirdness: Enables additional logic to filter out potentially awkward or impossible spins (on by default)

## Foundational Repository
https://github.com/jsfischer343/skating-spin-spinner-cli

## Credits
App Icon: Anna Fischer

## Disclaimer
The content of this repository and this application is completely independent of ISU and US Figure Skating. Although a good effort is made to ensure that spins spun using this program will follow guidelines there is no guarantee. Make sure to check each spin against the most up to date rules provided by ISU.

## AI Disclaimer
The majority of the code in this repository is written line by line using existing documentation. Minimal AI is used to code atomic functionalities and to validate syntax. Only exception being given that [OpenCode](https://opencode.ai/) was used to transpile from C++ to Javascript.
