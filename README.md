# Dispersio v0.1

A small browser tool for plotting shot dispersion. Click on the grid to log where a shot landed, adjust it if needed, and export the pattern as an image. Unit is yards.

This is my attempt to build Dispersio without vibecoding. Agents are strictly used for review and debugging, and the code itself is written by me.

## Features

- **Live coordinates:** shows the X/Y position of the cursor while it is over the grid.
- **Add shots:** click anywhere on the grid to place a shot. A popup form opens, and the shot appears faded until you confirm it.
- **Fine-tune values:** type exact X/Y values in the form, or leave them blank to keep the clicked position.
- **Edit shots:** click an existing shot to highlight it and change its coordinates. The list updates to match.
- **Cancel:** closing the form discards a shot you haven't confirmed yet.
- **Shot list:** every confirmed shot is listed beside the plot and wraps into new columns as the list grows.
- **Save image:** exports the plot as `pattern.png` using [html2canvas](https://html2canvas.hertzen.com/).

The grid runs from **-60 to 60** on both axes, with the origin at the center.

## Getting started

Open `index.html` in a browser. Nothing to install and no build step.

## Project structure

```
index.html   page layout: plot, shot list, popup form, save button
style.css    layout and styling
main.js      coordinate conversion, adding/editing shots, image export
```

## Tech

- Plain HTML, CSS, and JavaScript
- SVG for the plot
- html2canvas (loaded from a CDN) for image export

## Credits

Built by Alex Lyu.

Code review and debugging help from [Claude](https://claude.com/claude-code) (Anthropic)
