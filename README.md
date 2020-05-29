# 12-Plotly-Deployment
Module 12: Plotly and Belly Button Biodiversity

Deployed Page: https://cocolb.github.io/12-Plotly-Deployment/

## Project/Challenge Overview
We've been tasked by Improbable Beef to set up a dashboard webpage that displays, for each participant, info and different graphs about the bacterial species present in the belly button of the participants.

## Resources
- VS Code, HTML5, JavaScript, CSS, D3, Bootstrap 4
- samples.json

## Overview
This project is about Data Visualization in JavaScript with data retrieved from a json file via the D3.json() API call - to test it, we set up our local server to bypass the CORS error message.

<img src="scrnshts/scrsht 3.png" width=300">

At launching, the page only show the automatically-populated dropdown button. Then the event listener - HTML onchange="optionChanged(this.value) linked with the JavaScript funtion optionChanged()- launches the different Javascript functions that build the 4 elements of the page:

- function buildMetadata():

the participant's Demographic info is shown by appending the different pieces of info to the HTML div

<img src="scrnshts/scrsht 4.png" width="100">

- function buildCharts():

using Plotly (style: "bar"), the participant's 10 top bacterial Species (OTU) are shown in a bar graph, with value & label as hover text

<img src="scrnshts/scrsht 6.png" width="200">

- function buildBubbles():

using Plotly (mode: "marker), the participanty's bacteries are all shown in a bubble graph, with size as values and colors as Ids, and value & label as hover text

<img src="scrnshts/scrsht 5.png" width="200">

- function buildGauge():

the participant's weekly Belly Button Washing Frequency is shown in a gauge-style graph.
        
   - using Plotly with mode "gauge+number" and type"indicator" we first got a simplified version of the gauge
 
 <img src="scrnshts/scrsht 2.png" width="150"><img src="scrnshts/scrsht 1.png" width="150">
 
   - to obtain the "analogic speedometer style", we refactored the code and changed the graph into a "pie" style one (with only the upper half shown), added a simple scatter plot (for the bottom circle), and 2 lines in the layout forming the arrow - I decided on leaving the bottom of each at the same position, so when the value is 0 or 9, the arrow is like a single line. In the future this can be updated into the same arrow/triangle dynamically moving.
        
 <img src="scrnshts/scrsht 7.png" width="200">       



