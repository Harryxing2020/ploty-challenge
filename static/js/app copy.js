function inti(){
    // Select the inputElement
    var selectDrop = d3.select("#selDataset");
    d3.json("data/samples.json").then((dataset){
      selectDrop.selectAll('option').data(dataset.names).enter().append('option').text(dataText => dataText)

    } )


}



d3.json("data/samples.json").then((dataset) => {


  
  var selectDrop = d3.select("#selDataset");
  selectDrop.selectAll('option').data(dataset.names).enter().append('option').text(dataText => dataText)
  // console.log(dataset.samples[0].sample_values)
  console.log("-----------1---------------------------------------------------")


  var names = dataset.names;
  var sample = dataset.samples;
  var metadata = dataset.metadata;

  console.log(names)
  console.log("------------2--------------------------------------------------")
  console.log(sample)
  // console.log("-------------3-------------------------------------------------")
  // console.log(metadata)
  console.log("-------------4-------------------------------------------------")

  // Used the input to .filter the data by ID
  var sampleResult = sample.filter(s => s.id === '940')[0];

  console.log(sampleResult)
  console.log("-------------5-------------------------------------------------")

  var sampleObject = [];
  for (var i = 0; i < sampleResult.sample_values.length; i++) {
    sampleObject.push(
      {
        sample_values: sampleResult.sample_values[i],
        otuIds: `OTU ${sampleResult.otu_ids[i]}`,
        otuLabels: sampleResult.otu_labels[i]
      });
  }
  // Sorted the (new array)
  var sortedSample = sampleObject.sort((a, b) => b.sample_values - a.sample_values);
  // Created new arrays to hold the sorted data
  var sampleValues = []
  var otuIds = []
  var otuLabels = []
  // Unpack objects from "sortedSample" into empty arrays
  for (var j = 0; j < sortedSample.length; j++) {
    sampleValues.push(sortedSample[j].sample_values);
    otuIds.push(sortedSample[j].otuIds);
    otuLabels.push(sortedSample[j].otuLabels);
  }

  // BAR CHART //

  // traceBar chart
  var traceBar = [{
    x: sampleValues.slice(0, 10).reverse(),
    y: otuIds.slice(0, 10).reverse(),
    labels: otuIds.slice(0, 10).reverse(),
    text: otuLabels.slice(0, 10).reverse(),
    type: "bar",
    orientation: "h"
  }];
  // Bar layout
  var barLayout = {
    height: 600,
    width: 500,
  };
  //Plotly to plot bar chart layout 
  Plotly.newPlot("bar", traceBar, barLayout);


  


});
