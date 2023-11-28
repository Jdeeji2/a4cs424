

const spec6 = {
  $schema: "https://vega.github.io/schema/vega/v5.json",
  background: "white",
  padding: 5,
  data: [
    { name: "year_select_store" },
    {
      name: "source_0",
      url: "data/vegacsv.csv",
      format: { type: "csv", parse: { "COMPLAINT DATE": "date" } },
      transform: [
        {
          field: "COMPLAINT DATE",
          type: "timeunit",
          units: ["year"],
          as: ["year_COMPLAINT DATE", "year_COMPLAINT DATE_end"],
        },
      ],
    },
    {
      name: "data_0",
      source: "source_0",
      transform: [
        {
          type: "filter",
          expr: "length(data('year_select_store')) && vlSelectionTest('year_select_store', datum)",
        },
        {
          type: "aggregate",
          groupby: ["COMPLAINT TYPE"],
          ops: ["count"],
          fields: [null],
          as: ["count"],
        },
        {
          type: "stack",
          groupby: [],
          field: "count",
          sort: { field: ["COMPLAINT TYPE"], order: ["ascending"] },
          as: ["count_start", "count_end"],
          offset: "zero",
        },
        {
          type: "filter",
          expr: "isValid(datum['count']) && isFinite(+datum['count'])",
        },
      ],
    },
    {
      name: "data_1",
      source: "source_0",
      transform: [
        {
          type: "aggregate",
          groupby: ["year_COMPLAINT DATE", "year_COMPLAINT DATE_end"],
          ops: ["count"],
          fields: [null],
          as: ["__count"],
        },
        {
          type: "filter",
          expr: "(isDate(datum['year_COMPLAINT DATE']) || (isValid(datum['year_COMPLAINT DATE']) && isFinite(+datum['year_COMPLAINT DATE'])))",
        },
      ],
    },
  ],
  signals: [
    { name: "concat_0_width", value: 500 },
    { name: "concat_0_height", value: 300 },
    { name: "concat_1_width", value: 400 },
    { name: "concat_1_height", value: 200 },
    {
      name: "unit",
      value: {},
      on: [
        { events: "pointermove", update: "isTuple(group()) ? group() : unit" },
      ],
    },
    {
      name: "year_select",
      update: "vlSelectionResolve('year_select_store', 'union', true, true)",
    },
  ],
  layout: { padding: 20, columns: 1, bounds: "full", align: "each" },
  marks: [
    {
      type: "group",
      name: "concat_0_group",
      style: "cell",
      encode: {
        update: {
          width: { signal: "concat_0_width" },
          height: { signal: "concat_0_height" },
        },
      },
      signals: [
        {
          name: "year_select_tuple",
          on: [
            {
              events: [{ source: "scope", type: "click" }],
              update: "datum && item().mark.marktype !== 'group' && indexof(item().mark.role, 'legend') < 0 ? {unit: 'concat_0', fields: year_select_tuple_fields, values: [(item().isVoronoi ? datum.datum : datum)['year_COMPLAINT DATE']]} : null",
              force: true,
            },
            {
              events: [{ source: "view", type: "dblclick" }],
              update: "null",
            },
          ],
        },
        {
          name: "year_select_tuple_fields",
          value: [
            { field: "year_COMPLAINT DATE", channel: "x", type: "E" },
          ],
        },
        {
          name: "year_select_modify",
          on: [
            {
              events: { signal: "year_select_tuple" },
              update: "modify('year_select_store', year_select_tuple, true)",
            },
          ],
        },
      ],
      marks: [
        {
          name: "concat_0_marks",
          type: "rect",
          style: ["bar"],
          interactive: true,
          from: { data: "data_1" },
          encode: {
            update: {
              fill: { value: "#4c78a8" },
              tooltip: {
                signal: '{"Year": timeFormat(datum["year_COMPLAINT DATE"], timeUnitSpecifier(["year"], {"year-month":"%b %Y ","year-month-date":"%b %d, %Y "})),"Total Complaints": format(datum["__count"], "")}',
              },
              ariaRoleDescription: { value: "bar" },
              description: {
                signal: '"COMPLAINT DATE (year): " + (timeFormat(datum["year_COMPLAINT DATE"], timeUnitSpecifier(["year"], {"year-month":"%b %Y ","year-month-date":"%b %d, %Y "})) + "; Count of Records: " + format(datum["__count"], "") + "; Year: " + timeFormat(datum["year_COMPLAINT DATE"], timeUnitSpecifier(["year"], {"year-month":"%b %Y ","year-month-date":"%b %d, %Y "})) + "; Total Complaints: " + format(datum["__count"], ""))',
              },
              x2: {
                scale: "concat_0_x",
                field: "year_COMPLAINT DATE",
                offset: {
                  signal: '0.5 + (abs(scale("concat_0_x", datum["year_COMPLAINT DATE_end"]) - scale("concat_0_x", datum["year_COMPLAINT DATE"])) < 0.25 ? -0.5 * (0.25 - (abs(scale("concat_0_x", datum["year_COMPLAINT DATE_end"]) - scale("concat_0_x", datum["year_COMPLAINT DATE"])))) : 0.5)',
                },
              },
              x: {
                scale: "concat_0_x",
                field: "year_COMPLAINT DATE_end",
                offset: {
                  signal: '0.5 + (abs(scale("concat_0_x", datum["year_COMPLAINT DATE_end"]) - scale("concat_0_x", datum["year_COMPLAINT DATE"])) < 0.25 ? 0.5 * (0.25 - (abs(scale("concat_0_x", datum["year_COMPLAINT DATE_end"]) - scale("concat_0_x", datum["year_COMPLAINT DATE"])))) : -0.5)',
                },
              },
              y: { scale: "concat_0_y", field: "__count" },
              y2: { scale: "concat_0_y", value: 0 },
            },
          },
        },
      ],
      axes: [
        {
          scale: "concat_0_x",
          orient: "bottom",
          gridScale: "concat_0_y",
          grid: true,
          tickCount: { signal: "ceil(concat_0_width/40)" },
          tickMinStep: {
            signal: "datetime(2002, 0, 1, 0, 0, 0, 0) - datetime(2001, 0, 1, 0, 0, 0, 0)",
          },
          domain: false,
          labels: false,
          aria: false,
          maxExtent: 0,
          minExtent: 0,
          ticks: false,
          zindex: 0,
        },
        {
          scale: "concat_0_y",
          orient: "left",
          gridScale: "concat_0_x",
          grid: true,
          tickCount: { signal: "ceil(concat_0_height/40)" },
          domain: false,
          labels: false,
          aria: false,
          maxExtent: 0,
          minExtent: 0,
          ticks: false,
          zindex: 0,
        },
        {
          scale: "concat_0_x",
          orient: "bottom",
          grid: false,
          title: "Year",
          format: {
            signal: 'timeUnitSpecifier(["year"], {"year-month":"%b %Y ","year-month-date":"%b %d, %Y "})',
          },
          labelFlush: true,
          labelOverlap: true,
          tickCount: { signal: "ceil(concat_0_width/40)" },
          tickMinStep: {
            signal: "datetime(2002, 0, 1, 0, 0, 0, 0) - datetime(2001, 0, 1, 0, 0, 0, 0)",
          },
          zindex: 0,
        },
        {
          scale: "concat_0_y",
          orient: "left",
          grid: false,
          title: "Complaints per Year",
          labelOverlap: true,
          tickCount: { signal: "ceil(concat_0_height/40)" },
          zindex: 0,
        },
      ],
    },
    {
      type: "group",
      name: "concat_1_group",
      style: "view",
      encode: {
        update: {
          width: { signal: "concat_1_width" },
          height: { signal: "concat_1_height" },
        },
      },
      marks: [
        {
          name: "concat_1_marks",
          type: "arc",
          style: ["arc"],
          interactive: true,
          from: { data: "data_0" },
          encode: {
            update: {
              innerRadius: { value: 60 },
              fill: { scale: "color", field: "COMPLAINT TYPE" },
              tooltip: {
                signal: '{"Complaint Type": isValid(datum["COMPLAINT TYPE"]) ? datum["COMPLAINT TYPE"] : ""+datum["COMPLAINT TYPE"],"Count": format(datum["count"], "")}',
              },
              description: {
                signal: '"count: " + format(datum["count"], "") + "; COMPLAINT TYPE: " + (isValid(datum["COMPLAINT TYPE"]) ? datum["COMPLAINT TYPE"] : ""+datum["COMPLAINT TYPE"]) + "; Complaint Type: " + (isValid(datum["COMPLAINT TYPE"]) ? datum["COMPLAINT TYPE"] : ""+datum["COMPLAINT TYPE"]) + "; Count: " + format(datum["count"], "")',
              },
              x: { signal: "concat_1_width", mult: 0.5 },
              y: { signal: "concat_1_height", mult: 0.5 },
              outerRadius: { signal: "min(concat_1_width,concat_1_height)/2" },
              startAngle: { scale: "concat_1_theta", field: "count_end" },
              endAngle: { scale: "concat_1_theta", field: "count_start" },
            },
          },
        },
      ],
    },
  ],
  scales: [
    {
      name: "color",
      type: "ordinal",
      domain: { data: "data_0", field: "COMPLAINT TYPE", sort: true },
      range: { scheme: "tableau20" },
    },
    {
      name: "concat_0_x",
      type: "time",
      domain: {
        data: "data_1",
        fields: ["year_COMPLAINT DATE", "year_COMPLAINT DATE_end"],
      },
      range: [0, { signal: "concat_0_width" }],
    },
    {
      name: "concat_0_y",
      type: "linear",
      domain: { data: "data_1", field: "__count" },
      range: [{ signal: "concat_0_height" }, 0],
      nice: true,
      zero: true,
    },
    {
      name: "concat_1_theta",
      type: "linear",
      domain: { data: "data_0", fields: ["count_start", "count_end"] },
      range: [0, 6.283185307179586],
      zero: true,
    },
  ],
  legends: [
    { fill: "color", symbolType: "circle", title: "COMPLAINT TYPE" },
  ],
}
;
vegaEmbed("#vis6", spec6);


//-------------TASK 2 LINKED VIEW VISUAL: MIGUEL------------------------------------------------
const spec7 = {
  $schema: "https://vega.github.io/schema/vega-lite/v5.json",
  description: "Task 2: Linked View Visualization",
  title: "Total Complaints of Top 4 Complaint Types from 2018 - 2022",
  data: {
    values: [
      {"Year": 2018, "Complaint Type": "Noise", "Count": 110},
      {"Year": 2018, "Complaint Type": "Vehicle", "Count": 80},
      {"Year": 2018, "Complaint Type": "Water", "Count": 70},
      {"Year": 2018, "Complaint Type": "Air Pollution", "Count": 45},
      {"Year": 2019, "Complaint Type": "Noise", "Count": 125},
      {"Year": 2019, "Complaint Type": "Vehicle", "Count": 90},
      {"Year": 2019, "Complaint Type": "Water", "Count": 75},
      {"Year": 2019, "Complaint Type": "Air Pollution", "Count": 55},
      {"Year": 2020, "Complaint Type": "Noise", "Count": 120},
      {"Year": 2020, "Complaint Type": "Vehicle", "Count": 85},
      {"Year": 2020, "Complaint Type": "Water", "Count": 75},
      {"Year": 2020, "Complaint Type": "Air Pollution", "Count": 50},
      {"Year": 2021, "Complaint Type": "Noise", "Count": 150},
      {"Year": 2021, "Complaint Type": "Vehicle", "Count": 95},
      {"Year": 2021, "Complaint Type": "Water", "Count": 80},
      {"Year": 2021, "Complaint Type": "Air Pollution", "Count": 65},
      {"Year": 2022, "Complaint Type": "Noise", "Count": 130},
      {"Year": 2022, "Complaint Type": "Vehicle", "Count": 100},
      {"Year": 2022, "Complaint Type": "Water", "Count": 90},
      {"Year": 2022, "Complaint Type": "Air Pollution", "Count": 70}
    ]
  },
  vconcat: [
    {
      width: 400,
      height: 200,
      mark: "bar",
      encoding: {
        x: {
          field: "Year",
          type: "ordinal",
          axis: { title: "Year" }
        },
        y: {
          aggregate: "sum",
          field: "Count",
          type: "quantitative",
          axis: { title: "Total Count" }
        },
        color: { field: "Complaint Type", type: "nominal" },
        tooltip: [
          { field: "Year", type: "ordinal", title: "Year" },
          { field: "Complaint Type", type: "nominal", title: "Complaint Type" },
          { field: "Count", type: "quantitative", title: "Total Count" }
        ]
      },
      selection: {
        yearSelection: {
          type: "single",
          fields: ["Year"],
          bind: "scales",
          init: { Year: 2020 }
        }
      }
    },
    {
      width: 400,
      height: 200,
      mark: "rect",
      encoding: {
        x: {
          field: "Complaint Type",
          type: "nominal",
          axis: { title: "Complaint Type" }
        },
        y: {
          field: "Year",
          type: "ordinal",
          axis: { title: "Year" }
        },
        color: {
          aggregate: "sum",
          field: "Count",
          type: "quantitative",
          scale: { scheme: "viridis" }
        },
        tooltip: [
          { field: "Year", type: "ordinal", title: "Year" },
          { field: "Complaint Type", type: "nominal", title: "Complaint Type" },
          { field: "Count", type: "quantitative", title: "Total Count" }
        ]
      },
      transform: [
        { filter: { selection: "yearSelection" } }
      ]
    }
  ]
};
vegaEmbed("#vis7", spec7);

const spec8 = {
  $schema: "https://vega.github.io/schema/vega/v5.json",
  description: "A heatmap of complaints with a slider for year selection.",
  background: "white",
  padding: 5,
  width: 200,
  height: 200,
  style: "view",
  data: [
    {
      name: "source_0",
      url: "data/vegacsv.csv",
      format: {"type": "csv", "parse": {"COMPLAINT DATE": "date:'%Y-%m-%d'"}},
      transform: [
        {
          type: "formula",
          expr: "year(datum['COMPLAINT DATE'])",
          as: "year"
        },
        {type: "filter", "expr": "datum.year === Year"},
        {
          type: "geojson",
          fields: ["LONGITUDE", "LATITUDE"],
          signal: "geojson_0"
        },
        {
          type: "geopoint",
          projection: "projection",
          fields: ["LONGITUDE", "LATITUDE"],
          as: ["x", "y"]
        },
        {
          type: "aggregate",
          groupby: ["x", "y", "COMPLAINT TYPE", "COMPLAINT DATE"],
          ops: ["count"],
          fields: [null],
          as: ["__count"]
        }
      ]
    }
  ],
  projections: [
    {
      name: "projection",
      size: {"signal": "[width, height]"},
      fit: {"signal": "geojson_0"},
      type: "equalEarth"
    }
  ],
  signals: [
    {
      name: "Year",
      value: 2020,
      bind: {"input": "range", "min": 1993, "max": 2023, "step": 1}
    }
  ],
  marks: [
    {
      name: "marks",
      type: "symbol",
      style: ["circle"],
      from: {"data": "source_0"},
      encode: {
        update: {
          fill: {"scale": "color", "field": "COMPLAINT TYPE"},
          tooltip: {
            signal: "{\"COMPLAINT TYPE\": isValid(datum[\"COMPLAINT TYPE\"]) ? datum[\"COMPLAINT TYPE\"] : \"\"+datum[\"COMPLAINT TYPE\"], \"COMPLAINT DATE\": timeFormat(datum[\"COMPLAINT DATE\"], '%b %d, %Y')}"
          },
          ariaRoleDescription: {"value": "circle"},
          description: {
            signal: "\"LONGITUDE: \" + (format(datum[\"LONGITUDE\"], \"\")) + \"; LATITUDE: \" + (format(datum[\"LATITUDE\"], \"\")) + \"; COMPLAINT TYPE: \" + (isValid(datum[\"COMPLAINT TYPE\"]) ? datum[\"COMPLAINT TYPE\"] : \"\"+datum[\"COMPLAINT TYPE\"]) + \"; Count of Records: \" + (format(datum[\"__count\"], \"\")) + \"; COMPLAINT DATE: \" + (timeFormat(datum[\"COMPLAINT DATE\"], '%b %d, %Y'))"
          },
          x: {"field": "x"},
          y: {"field": "y"},
          size: {"scale": "size", "field": "__count"},
          shape: {"value": "circle"}
        }
      }
    }
  ],
  scales: [
    {
      name: "color",
      type: "ordinal",
      domain: {"data": "source_0", "field": "COMPLAINT TYPE", "sort": true},
      range: "category"
    },
    {
      name: "size",
      type: "linear",
      domain: {"data": "source_0", "field": "__count"},
      range: [0, 361],
      zero: true
    }
  ],
  legends: [
    {fill: "color", "symbolType": "circle", "title": "COMPLAINT TYPE"},
    {
      size: "size",
      symbolType: "circle",
      title: "Count of Records",
      encode: {
        symbols: {
          update: {
            fill: {"value": "black"},
            fillOpacity: {"value": 1},
            stroke: {"value": "transparent"}
          }
        }
      }
    }
  ]
};
vegaEmbed("#vis8", spec8);







