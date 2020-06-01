function init() {
  let selector = d3.select("#selDataset");

  d3.json("samples.json").then((data) => {
    console.log(data);
    let sampleNames = data.names;
    sampleNames.forEach((sample) => {
      selector
        .append("option")
        .text(sample)
        .property("value", sample);
    });
   optionChanged(sampleNames[0]);
    
})}

// set the 4 functions building the metadata info, the bar chart, the gauge, and the bubble chart  

function buildMetadata(sample) {
  d3.json("samples.json").then (function(data) {
     let metadata = data.metadata;
     let resultArray = metadata.filter(sampleObj => sampleObj.id == sample);
     let result = resultArray[0];
     let PANEL = d3.select("#sample-metadata");

     PANEL.html("");
     PANEL.append("h6").text("ID:" + result.id);
     PANEL.append("h6").text("ETHNICITY:" + result.ethnicity);
     PANEL.append("h6").text("GENDER:" + result.gender);
     PANEL.append("h6").text("AGE:" + result.age);
     PANEL.append("h6").text("LOCATION:" + result.location);
     PANEL.append("h6").text("BBTYPE:" + result.bbtype);
     PANEL.append("h6").text("WFREQ:" + result.wfreq);
  });
}

function buildCharts(sample) {
  d3.json("samples.json").then (function(data) {
     let samples = data.samples;
     let resultArray = samples.filter(sampleObj => sampleObj.id == sample);
     let result = resultArray[0];
     //console.log(result);

     let sampleValues = result.sample_values.slice(0,10).reverse();
     let sampleIds = result.otu_ids.slice(0,10);
     let sampleOtuIds = sampleIds.map(id => "OTU"+id).reverse();

     let sampleOtuLabels = result.otu_labels.slice(0,10).reverse();

     //console.log(sampleValues);
     //console.log(sampleOtuIds);
     //console.log(sampleOtuLabels);

     let traceBar = {
       x: sampleValues,
       y: sampleOtuIds,
       type: 'bar',
       orientation: 'h',
       text: sampleOtuLabels,         
     };

     let dataBar = [traceBar];

     let layoutBar = {
      title: "Top 10 Bacterial Species",
      xaxis: {title: "Sample Values"}
     };

     Plotly.newPlot("bar", dataBar, layoutBar);
  });
}

function buildGauge(sample) {
d3.json("samples.json").then (function(data) {
  let metadata = data.metadata;
  let resultArray = metadata.filter(sampleObj => sampleObj.id == sample);
  let result = resultArray[0];
  //console.log(result);

  let wfreq = result.wfreq;
  //console.log(wfreq);

  // build the "target", which is a "pie" plot (bottom half being all white) with "hole"
  // half-pie divided in 9 same values
  let traceHalfPie = {
      type: 'pie',
      showlegend: false,
      hole: 0.4,
      rotation: 90,
      values: [ 81/9, 81/9, 81/9, 81/9, 81/9, 81/9, 81/9, 81/9, 81/9, 81],
      text: ['0-1','1-2','2-3','3-4','4-5','5-6','6-7','7-8','8-9'],
      direction: 'clockwise',
      textinfo: 'text',
      textposition: 'inside',
      marker: {
        colors: ["#EEE8AA","EEE8AA","F0E68C","BDB76B","#BDB76B","6B8E23","6B8E23","228B22","228B22",'white'],
      }
    };

    //build the small circle at the bottom of the double-needle
    let traceCircle = {
      type: 'scatter',
      x:[0],
      y:[0],
      marker: {
        size: 20,
        color:'black'
      },
      showlegend: false
    };

    let dataGauge = [traceHalfPie, traceCircle];

    // calculate the x/y position tip of the double-needle included in the layout
    let angle = wfreq*20;
    let radians = angle*Math.PI/180;
    let x = -0.45*Math.cos(radians);
    let y = 0.45* Math.sin(radians);

    let layoutGauge = {
        shapes: [
          {
          type: 'line',
          x0: -0.02,
          y0: 0,
          x1: x,
          y1: y,
          line: {
            color: 'black',
            width: 3
          }
        },
          {
            type: 'line',
            x0: 0.02,
            y0: 0,
            x1: x,
            y1: y,
            line: {
              color: 'black',
              width: 3
            }
          }
        ],
        title: 'Belly Button Washing Frequency <br><sub>Scrubs per Week</sub>',
        xaxis: {visible: false, range: [-1, 1]},
        yaxis: {visible: false, range: [-1, 1]},
        hovermode: false
    };

    Plotly.newPlot('gauge', dataGauge, layoutGauge);
});  
}

function buildBubbles(sample) {
  d3.json("samples.json").then (function(data) {
      let samples = data.samples;
      let resultArray = samples.filter(sampleObj => sampleObj.id == 945);
      let result = resultArray[0];
      
      let sampleValues = result.sample_values;
      let sampleOtuIds = result.otu_ids;
      let sampleOtuLabels = result.otu_labels;
      let sampleSizes = sampleValues.map(number => number/2);

      let traceBubbles = {
        x: sampleOtuIds,
        y: sampleValues,
        mode: "markers",
        marker: {
         color: sampleOtuIds,
         size: sampleSizes
        },
        text: sampleOtuLabels         
      };

      let dataBubbles = [traceBubbles];

      let layoutBubbles = {
        title: "Belly Buttons's Bacterial Species",
        xaxis: {title: "OTU ID"},
        yaxis: {title: "Sample Values"},
        height: 600,
        width: 1200,
      };
      Plotly.newPlot("bubble", dataBubbles, layoutBubbles);       
});
}


// even handler, launching the 4 functions
function optionChanged(newSample) {
  buildMetadata(newSample);
  buildCharts(newSample);
  buildGauge(newSample);
  buildBubbles(newSample);
}  

init();  






