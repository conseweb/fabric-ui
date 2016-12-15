/**
 * 作者: bullub
 * 日期: 2016/12/15 12:50
 * 用途:
 */
"use strict";
(function (angular, undefined) {

    angular.module("controllers")
        .controller("flotChartCtrl", flotChartCtrl);

    function flotChartCtrl() {
        /**
         * Bar Chart data
         */
        var chartData = [
            {
                label: "bar",
                data: [
                    [201606, 10],
                    [201607, 234],
                    [201608, 456],
                    [201609, 704],
                    [201610, 984],
                    [201611, 1125],
                    [201612, 1459],
                ]
            }
        ];

        /**
         * Pie Chart Data
         */
        var pieData = [
            {
                label: "媒体文件",
                data: 21,
                color: "#d3d3d3"
            },
            {
                label: "代码文件",
                data: 3,
                color: "#bababa"
            },
            {
                label: "word文档",
                data: 15,
                color: "#79d2c0"
            },
            {
                label: "文本文件",
                data: 12,
                color: "#3ac2a4"
            },
            {
                label: "excel表格",
                data: 13,
                color: "#1ab394"
            },
            {
                label: "其它",
                data: 27,
                color: "#1ab284"
            },
        ];

        /**
         * Pie Chart Options
         */
        var pieOptions = {
            series: {
                pie: {
                    show: true
                }
            },
            grid: {
                hoverable: true
            },
            tooltip: true,
            tooltipOpts: {
                content: "%p.0%, %s", // show percentages, rounding to 2 decimal places
                shifts: {
                    x: 20,
                    y: 0
                },
                defaultTheme: false
            }
        };

        /**
         * Line Chart Options
         */
        var lineOptions = {
            series: {
                lines: {
                    show: true,
                    lineWidth: 2,
                    fill: true,
                    fillColor: {
                        colors: [
                            {
                                opacity: 0.0
                            },
                            {
                                opacity: 0.0
                            }
                        ]
                    }
                }
            },
            xaxis: {
                tickDecimals: 0
            },
            colors: ["#1ab394"],
            grid: {
                color: "#999999",
                hoverable: true,
                clickable: true,
                tickColor: "#D4D4D4",
                borderWidth: 0
            },
            legend: {
                show: false
            },
            tooltip: true,
            tooltipOpts: {
                content: "x: %x, y: %y"
            }
        };

        /**
         * Definition of variables
         * Flot chart
         */
        this.flotChartData = chartData;
        this.flotLineOptions = lineOptions;
        this.flotPieData = pieData;
        this.flotPieOptions = pieOptions;
    }

}(angular));