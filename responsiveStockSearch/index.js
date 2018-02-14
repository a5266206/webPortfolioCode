var app = angular.module('myApp', ['ngAnimate']);
app.controller('myCtrl', myfun);

function myfun ($scope, $http, $interval,$timeout) {
    var pricechart = "";
    var smachart = "";
    var emachart = "";
    var stochchart = "";
    var rsichart = "";
    var adxchart = "";
    var ccichart = "";
    var bbandschart = "";
    var macdchart = ""; 
    var dataPrice = [];
    var dataVol = [];
    var chartDate = [];
    var hisdata = [];
    var EMAchartDate = [];
    var dataEMA = [];
    var STOCHchartDate = [];
    var slowD = [];
    var slowK = [];
    var RSIchartDate = [];
    var dataRSI = [];
    var ADXchartDate = [];
    var dataADX = [];
    var CCIchartDate = [];
    var dataCCI = [];
    var BBANDSchartDate = [];
    var upper = [];
    var lower = [];
    var middle = [];
    var MACDchartDate = [];
    var macdsignal = [];
    var macd = [];
    var macdhist = [];
    $scope.panel1 = false;    
    $scope.panel2 = true;
    $scope.tableLoadbar = true;
    $scope.priceLoadbar = true;
    $scope.priceerror = false;
    $scope.SMALoadbar = true;
    $scope.SMAerror = false;
    $scope.EMALoadbar = true;
    $scope.EMAerror = false;
    $scope.STOCHLoadbar = true;
    $scope.STOCHerror = false;
    $scope.RSILoadbar = true;
    $scope.RSIerror = false;
    $scope.ADXLoadbar = true;
    $scope.ADXerror = false;
    $scope.CCILoadbar = true;
    $scope.CCIerror = false;
    $scope.BBANDSLoadbar = true;
    $scope.BBANDSerror = false;
    $scope.MACDLoadbar = true;
    $scope.MACDerror = false;
    $scope.newsLoadbar = true;
    $scope.newserror = false;
    $scope.hisPriceLoadbar = true;
    $scope.fav = false;
    $scope.favArr = [];
    $scope.detailblock = true;
    var picOptions = "";
    $scope.changeToPanel1 = function(){
        $scope.panel2 = true;
        $scope.panel1 = false;
    };
    $scope.changeToPanel2 = function(){
        $scope.panel1 = true;
        $scope.panel2 = false;
    };
    $scope.draw = function(){
        $timeout(function () {
/*  draw Price chart */
            Highcharts.chart('container1', {
				chart: {
					type: 'area',
					zoomType: 'x'
				},
				title: {
					text: $scope.stockContent["Meta Data"]["2. Symbol"] + ' Stock Price and Volume'
				},
				subtitle: {
                    useHTML: true,
					text: '<a href="https://www.alphavantage.co/" target="_blank">Source: Alpha Vantage</a>'
				},
				xAxis: {
                    tickInterval: 5,
					categories: chartDate
				},
				yAxis: [{
					title: {
						text: 'Stock Price',
					},
				}, {
					title: {
						text: 'Volume'
					},
					opposite: true,
				}],
				legend: {
					verticalAlign: 'bottom'
				},
				series: [{
					name: 'Price',
					type: 'area',
					color: '#1417FF',
					fillColor: '#E7E6FF',
					data: dataPrice,
					lineWidth: 1
				}, {
					name: 'Volume',
					yAxis: 1,
					type: 'column',
					color: '#FF1E14',
					data: dataVol,
				}]
			});
/* draw historical chart */
            Highcharts.stockChart('container', {
                chart: {
                    height: 400
                },
                title: {
                    text: $scope.stockContent["Meta Data"]["2. Symbol"] + ' Stock Value'
                },
                subtitle: {
                    useHTML: true,
                    text: '<a class="indi" href="https://www.alphavantage.co/" target="_blank">Source: Alpha Vantage</a>'
                },
				yAxis: {
					title: {
						text: 'Stock Value'
					}
				},
                rangeSelector: {
                    buttons: [{
						type: 'week',
						count: 1,
						text: '1w'
                   	}, {
						type: 'month',
						count: 1,
						text: '1m'
                   	}, {
						type: 'month',
						count: 3,
						text: '3m'
					}, {
						type: 'month',
						count: 6,
						text: '6m'
					}, {
						type: 'year',
						count: 1,
						text: '1y'
					}, {
						type: 'ytd',
						text: 'YTD'
					}, {
						type: 'all',
						text: 'All'
					}],
                    selected: 0
                },
                tooltip: {
                    formatter: function () {
                        var s = Highcharts.dateFormat('%A, %b %e, %Y', this.x);

                        $.each(this.points, function () {
                        s += '<br/><span style="color:#A0C7EF">\u25CF</span> ' + ' <b>' + this.series.name + ': ' + this.y + '</b>';
                        });
                        return s;
                    }
                },
                series: [{
                    name: $scope.stockContent["Meta Data"]["2. Symbol"],
                    data: hisdata,
                    type: 'area',
                    threshold: null,
                    tooltip: {
                        valueDecimals: 2
                    }
                }],
                responsive: {
                    rules: [{
                        condition: {
                            maxWidth: 500
                        },
                        chartOptions: {
                            chart: {
                                height: 300
                            },
                            subtitle: {
                                text: null
                            },
                            navigator: {
                                enabled: false
                            }
                        }
                    }]
                }
            });
/* draw SMA */
            Highcharts.chart('container2', {
				chart: {
                    type: 'spline',
					zoomType: 'x'
				},
				title: {
					text: 'Simple Moving Average (SMA)'
				},
				subtitle: {
                    useHTML: true,
					text: '<a href="https://www.alphavantage.co/" target="_blank">Source: Alpha Vantage</a>'
				},
				xAxis: {
                    tickInterval: 5,
					categories: $scope.SMAchartDate,
                    labels: {
                        rotation: -45
                    }
				},
				yAxis: {
					title: {
						text: 'SMA'
					}
				},
				legend: {
                    backgroundColor: '#FFFFFF',
					verticalAlign: 'bottom'
				},
				plotOptions: {
					spline: {
						lineWidth: 1,
					}
				},
				series: [{
					name: $scope.smaData["Meta Data"]["1: Symbol"],
                    color: '#85B0DB',
					data: $scope.dataSMA
                }]
			});
/* draw EMA */
            Highcharts.chart('container3', {
				chart: {
                    type: 'spline',
					zoomType: 'x'
				},
				title: {
					text: 'Exponential Moving Average (EMA)'
				},
				subtitle: {
                    useHTML: true,
					text: '<a href="https://www.alphavantage.co/" target="_blank">Source: Alpha Vantage</a>'
				},
				xAxis: {
                    tickInterval: 5,
					categories: EMAchartDate,
                    labels: {
                        rotation: -45
                    }
				},
				yAxis: {
					title: {
						text: 'EMA'
					}
				},
				legend: {
                    backgroundColor: '#FFFFFF',
					verticalAlign: 'bottom'
				},
				plotOptions: {
					spline: {
						lineWidth: 1,
					}
				},
				series: [{
					name: $scope.emaData["Meta Data"]["1: Symbol"],
                    color: '#85B0DB',
					data: dataEMA
                }]
			}); 
/*draw STOCH*/
            Highcharts.chart('container4', {
				chart: {
                    type: 'spline',
					zoomType: 'x'
				},
				title: {
					text: 'Stochastic Oscillator (STOCH)'
				},
				subtitle: {
                    useHTML: true,
					text: '<a href="https://www.alphavantage.co/" target="_blank">Source: Alpha Vantage</a>'
				},
				xAxis: {
                    tickInterval: 5,
					categories: STOCHchartDate,
                    labels: {
                        rotation: -45
                    }
				},
				yAxis: {
					title: {
						text: 'STOCH'
					}
				},
				legend: {
                    backgroundColor: '#FFFFFF',
					verticalAlign: 'bottom'
				},
				plotOptions: {
					spline: {
						lineWidth: 1,
					}
				},
                series: [{
                    name: $scope.stochData["Meta Data"]["1: Symbol"]+' SlowK',
                    lineWidth: 1,
                    color: '#E92100',
                    data: slowK
                },{
                    name: $scope.stochData["Meta Data"]["1: Symbol"]+' SlowD',
                    lineWidth: 1,
                    color: '#85B0DB',
                    data: slowD
                }]
			}); 
/* draw RSI */    
            Highcharts.chart('container5', {
				chart: {
                    type: 'spline',
					zoomType: 'x'
				},
				title: {
					text: 'Relative Strength Index (RSI)'
				},
				subtitle: {
                    useHTML: true,
					text: '<a href="https://www.alphavantage.co/" target="_blank">Source: Alpha Vantage</a>'
				},
				xAxis: {
                    tickInterval: 5,
					categories: RSIchartDate,
                    labels: {
                        rotation: -45
                    }
				},
				yAxis: {
					title: {
						text: 'RSI'
					}
				},
				legend: {
                    backgroundColor: '#FFFFFF',
					verticalAlign: 'bottom'
				},
				plotOptions: {
					spline: {
						lineWidth: 1,
					}
				},
				series: [{
					name: $scope.rsiData["Meta Data"]["1: Symbol"],
                    color: '#85B0DB',
					data: dataRSI
                }]
			});
/* draw ADX */
            Highcharts.chart('container6', {
				chart: {
                    type: 'spline',
					zoomType: 'x'
				},
				title: {
					text: 'Average Directional Movement Index (ADX)'
				},
				subtitle: {
                    useHTML: true,
					text: '<a href="https://www.alphavantage.co/" target="_blank">Source: Alpha Vantage</a>'
				},
				xAxis: {
                    tickInterval: 5,
					categories: ADXchartDate,
                    labels: {
                        rotation: -45
                    }
				},
				yAxis: {
					title: {
						text: 'ADX'
					}
				},
				legend: {
                    backgroundColor: '#FFFFFF',
					verticalAlign: 'bottom'
				},
				plotOptions: {
					spline: {
						lineWidth: 1,
					}
				},
				series: [{
					name: $scope.adxData["Meta Data"]["1: Symbol"],
                    color: '#85B0DB',
					data: dataADX
                }]
			});
/* draw CCI */
            Highcharts.chart('container7', {
				chart: {
                    type: 'spline',
					zoomType: 'x'
				},
				title: {
					text: 'Commodity Channel Index (CCI)'
				},
				subtitle: {
                    useHTML: true,
					text: '<a href="https://www.alphavantage.co/" target="_blank">Source: Alpha Vantage</a>'
				},
				xAxis: {
                    tickInterval: 5,
					categories: CCIchartDate,
                    labels: {
                        rotation: -45
                    }
				},
				yAxis: {
					title: {
						text: 'CCI'
					}
				},
				legend: {
                    backgroundColor: '#FFFFFF',
					verticalAlign: 'bottom'
				},
				plotOptions: {
					spline: {
						lineWidth: 1,
					}
				},
				series: [{
					name: $scope.cciData["Meta Data"]["1: Symbol"],
                    color: '#85B0DB',
					data: dataCCI
                }]
			});
/* draw BBANDS */
            Highcharts.chart('container8', {
				chart: {
                    type: 'spline',
					zoomType: 'x'
				},
				title: {
					text: 'Bollinger Bands (BBANDS)'
				},
				subtitle: {
                    useHTML: true,
					text: '<a href="https://www.alphavantage.co/" target="_blank">Source: Alpha Vantage</a>'
				},
				xAxis: {
                    tickInterval: 5,
					categories: BBANDSchartDate,
                    labels: {
                        rotation: -45
                    }
				},
				yAxis: {
					title: {
						text: 'BBANDS'
					}
				},
				legend: {
                    backgroundColor: '#FFFFFF',
					verticalAlign: 'bottom'
				},
				plotOptions: {
					spline: {
						lineWidth: 1,
					}
				},
                series: [{
                    name: $scope.bbandsData["Meta Data"]["1: Symbol"]+' Real Upper Band',
                    lineWidth: 1,
                    color: '#434348',
                    data: upper
                },{
                    name: $scope.bbandsData["Meta Data"]["1: Symbol"]+' Real Middle Band',
                    lineWidth: 1,
                    color: '#7CB5EC',
                    data: middle
                },{
                    name: $scope.bbandsData["Meta Data"]["1: Symbol"]+' Real Lower Band',
                    lineWidth: 1,
                    color: '#90EE7D',
                    data: lower
                }]
			});
/* draw MACD */
            Highcharts.chart('container9', {
				chart: {
                    type: 'spline',
					zoomType: 'x'
				},
				title: {
					text: 'Moving Average Convergence/Divergence (MACD)'
				},
				subtitle: {
                    useHTML: true,
					text: '<a href="https://www.alphavantage.co/" target="_blank">Source: Alpha Vantage</a>'
				},
				xAxis: {
                    tickInterval: 5,
					categories: MACDchartDate,
                    labels: {
                        rotation: -45
                    }
				},
				yAxis: {
					title: {
						text: 'MACD'
					}
				},
				legend: {
                    backgroundColor: '#FFFFFF',
					verticalAlign: 'bottom'
				},
				plotOptions: {
					spline: {
						lineWidth: 1,
					}
				},
                series: [{
                    name: $scope.macdData["Meta Data"]["1: Symbol"]+' MACD_Signal',
                    lineWidth: 1,
                    color: '#434348',
                    data: macdsignal
                },{
                    name: $scope.macdData["Meta Data"]["1: Symbol"]+' MACD',
                    lineWidth: 1,
                    color: '#7CB5EC',
                    data: macd
                },{
                    name: $scope.macdData["Meta Data"]["1: Symbol"]+' MACD_Hist',
                    lineWidth: 1,
                    color: '#90EE7D',
                    data: macdhist
                }]
			});        
        }, 300);
    };
    $scope.listinit = function(){
        for (var i = 0; i < localStorage.length; i++) {
            var initsym = localStorage.getItem(localStorage.key(i));
            $http({
                method : "GET",
                url : "http://tichengl-usc571web.us-west-1.elasticbeanstalk.com/index.php?FAV="+initsym
            }).then(function mySuccess(response) {
                
                $scope.intData = response.data;
                //console.log($scope.intData);
                $scope.INITsym = $scope.intData["Meta Data"]["2. Symbol"];
                //console.log($scope.INITsym);
                $scope.INITdate = Object.keys($scope.intData["Time Series (Daily)"]);
                $scope.INITprice = parseFloat($scope.intData["Time Series (Daily)"][$scope.INITdate[0]]["4. close"]);
                $scope.INITprevprice = parseFloat($scope.intData["Time Series (Daily)"][$scope.INITdate[1]]["4. close"]);
                $scope.INITchange = $scope.INITprice - $scope.INITprevprice;
                //console.log($scope.FAVchange);
                if($scope.INITchange < 0){
                    $scope.INITarrow = 0;
                }else{
                    $scope.INITarrow = 1;
                }
                $scope.INITchangepercent = 100*$scope.INITchange/$scope.INITprevprice;
                $scope.INITvolume = parseFloat($scope.intData["Time Series (Daily)"][$scope.INITdate[0]]["5. volume"]);
                var tempArr = [$scope.INITsym, $scope.INITprice, $scope.INITchange, $scope.INITchangepercent, $scope.INITvolume, $scope.INITarrow];
                $scope.favArr.push(tempArr);
                //console.log($scope.favArr);
            });    
        }
    };
    $scope.refreshFav = function(){
        console.log($scope.favArr);
        var inp = 0;
        for (var i = 0; i < localStorage.length; i++) {
            var refreshsym = localStorage.getItem(localStorage.key(i));
            //console.log(refreshsym);
            $http({
                method : "GET",
                url : "http://tichengl-usc571web.us-west-1.elasticbeanstalk.com/index.php?FAV="+refreshsym
            }).then(function mySuccess(response) {
                
                $scope.refreshData = response.data;
                //console.log($scope.refreshData);
                $scope.REFdate = Object.keys($scope.refreshData["Time Series (Daily)"]);
                $scope.REFprice = parseFloat($scope.refreshData["Time Series (Daily)"][$scope.REFdate[0]]["4. close"]);
                $scope.REFprevprice = parseFloat($scope.refreshData["Time Series (Daily)"][$scope.REFdate[1]]["4. close"]);
                $scope.REFchange = $scope.REFprice - $scope.REFprevprice;
                //console.log($scope.REFchange);
                if($scope.REFchange < 0){
                    $scope.REFarrow = 0;
                }else{
                    $scope.REFarrow = 1;
                }
                $scope.REFchangepercent = 100*$scope.REFchange/$scope.REFprevprice;
                $scope.REFvolume = parseFloat($scope.refreshData["Time Series (Daily)"][$scope.REFdate[0]]["5. volume"]);
                $scope.favArr[inp][1] = $scope.REFprice;
                $scope.favArr[inp][2] = $scope.REFchange;
                $scope.favArr[inp][3] = $scope.REFchangepercent;
                $scope.favArr[inp][4] = $scope.REFvolume;
                $scope.favArr[inp][5] = $scope.REFarrow;
                inp ++;
                //console.log($scope.favArr);
            }); 
        }      
    };
    $scope.auto;
    $scope.autoRefresh = function(x){
        console.log(x);
        if(x){
            $scope.auto = $interval(function(){
                $scope.refreshFav();
            }, 5000);
        }else{
            $interval.cancel($scope.auto);
        }
    };
    $scope.setFav = function(){
        
        $scope.fav = !$scope.fav;
        if($scope.fav == true){
            localStorage.setItem($scope.sym, $scope.sym);
            $http({
                method : "GET",
                url : "http://tichengl-usc571web.us-west-1.elasticbeanstalk.com/index.php?FAV="+$scope.FAVsymBol
            }).then(function mySuccess(response) {
                
                $scope.favData = response.data;
                //console.log($scope.favData);
                $scope.FAVsym = $scope.favData["Meta Data"]["2. Symbol"];
                $scope.FAVdate = Object.keys($scope.favData["Time Series (Daily)"]);
                $scope.FAVprice = parseFloat($scope.favData["Time Series (Daily)"][$scope.FAVdate[0]]["4. close"]);
                $scope.FAVprevprice = parseFloat($scope.favData["Time Series (Daily)"][$scope.FAVdate[1]]["4. close"]);
                //console.log($scope.FAVprice);
                //console.log($scope.FAVprevprice);
                $scope.FAVchange = $scope.FAVprice - $scope.FAVprevprice;
                //console.log($scope.FAVchange);
                if($scope.FAVchange < 0){
                    $scope.FAVarrow = 0;
                }else{
                    $scope.FAVarrow = 1;
                }
                $scope.FAVchangepercent = 100*$scope.FAVchange/$scope.FAVprevprice;
                //console.log($scope.FAVchangepercent);
                $scope.FAVvolume = parseFloat($scope.favData["Time Series (Daily)"][$scope.FAVdate[0]]["5. volume"]);
                //console.log($scope.FAVvolume);
                var tempArr = [$scope.FAVsym, $scope.FAVprice, $scope.FAVchange, $scope.FAVchangepercent, $scope.FAVvolume, $scope.FAVarrow];
                $scope.favArr.push(tempArr);
                //console.log($scope.favArr);
            });    
        }else{
            localStorage.removeItem($scope.deletsym, $scope.deletsym);
            var i;
            for (i in $scope.favArr) {
                if ($scope.favArr[i][0] == $scope.deletsym) {
                    $scope.favArr.splice(i, 1);
                }
            }
            //console.log($scope.favArr);
        }
    };
    $scope.trashFun =function(x){
        localStorage.removeItem(x, x);
        var i;
        for (i in $scope.favArr) {
            if ($scope.favArr[i][0] == x) {
                $scope.favArr.splice(i, 1);
            }
        }       
    };
/* text check valid */
    $scope.errorTx = false;
    $scope.checkValid = function(x){
        if (x == "" || typeof x == "undefined") {
            document.getElementById("searchTx").style.borderColor = "red";
            $scope.errorTx = true;
        }else{
            document.getElementById("searchTx").style.borderColor = "#CCCCCC";
            $scope.errorTx = false;
        }
    };
/* clear all */
    $scope.clear = function(){
        $scope.panel2 = true;
        $scope.panel1 = false;
        $scope.sym = "";
        document.getElementById("searchTx").style.borderColor = "#CCCCCC";
        $scope.errorTx = false;
        $scope.panel1 = false;    
        $scope.panel2 = true;
        $scope.tableLoadbar = true;
        $scope.priceLoadbar = true;
        $scope.priceerror = false;
        $scope.SMALoadbar = true;
        $scope.SMAerror = false;
        $scope.EMALoadbar = true;
        $scope.EMAerror = false;
        $scope.STOCHLoadbar = true;
        $scope.STOCHerror = false;
        $scope.RSILoadbar = true;
        $scope.RSIerror = false;
        $scope.ADXLoadbar = true;
        $scope.ADXerror = false;
        $scope.CCILoadbar = true;
        $scope.CCIerror = false;
        $scope.BBANDSLoadbar = true;
        $scope.BBANDSerror = false;
        $scope.MACDLoadbar = true;
        $scope.MACDerror = false;
        $scope.newsLoadbar = true;
        $scope.newserror = false;
        $scope.hisPriceLoadbar = true;
        $scope.detailblock = true;
    };
/* search function */
    $scope.search = function(symbol){
        $scope.detailblock = false;
        $scope.FAVsymBol = symbol;
/* table, price chart, and historical charts */
        if(localStorage.getItem(symbol) != null){
            $scope.fav = true;            
        }else{
            $scope.fav = false;
        }
        $scope.tableLoadbar = true;
        $scope.priceLoadbar = true;
        $scope.hisPriceLoadbar = true;
        $scope.priceerror = false;
        $http({
            method : "GET",
            url : "http://tichengl-usc571web.us-west-1.elasticbeanstalk.com/index.php?PRICE="+symbol
        }).then(function mySuccess(response) {
            $scope.stockContent = response.data;
            //console.log($scope.stockContent);
            if(Object.keys($scope.stockContent).length <=1 ){
                $scope.priceerror = true;
                $scope.priceLoadbar = false;
                $scope.tableLoadbar = false;
                $scope.hisPriceLoadbar = false;
            }else{
            $scope.tm = $scope.stockContent["Meta Data"]["3. Last Refreshed"];
            if($scope.tm.length > 11){
               $scope.tmStamp = $scope.tm + ' EST';
            }else{
               $scope.tmStamp = $scope.tm + ' 16:00:00 EST'
            }
            $scope.getdate = Object.keys($scope.stockContent["Time Series (Daily)"]);
            $scope.preDate = $scope.getdate[1];
            $scope.change = $scope.stockContent["Time Series (Daily)"][$scope.getdate[0]]["4. close"]-$scope.stockContent["Time Series (Daily)"][$scope.preDate]["4. close"];
            if($scope.change < 0){
                $scope.arrow = 0;
            }else{
                $scope.arrow = 1;
            }
            $scope.changePercent = 100*$scope.change/$scope.stockContent["Time Series (Daily)"][$scope.preDate]["4. close"];
            $scope.tableLoadbar = false;
            $scope.deletsym = $scope.stockContent["Meta Data"]["2. Symbol"];
            /* get x axis data */
            $scope.myDate = [];
            for(var i=120; i>=0; i--){
                $scope.myDate[i] = $scope.getdate[i];
            }
            $scope.revDate = [];
            for(var i=120; i>=0; i--){
                $scope.revDate[i] = $scope.myDate[120-i];
            }
            //console.log($scope.revDate); 
          /*  var chartDate = [];*/
            var tempArr = [];
            for(var i=0; i<$scope.revDate.length; i++){
                tempArr = $scope.revDate[i].split("-");
                chartDate[i] = tempArr[1]+'/'+tempArr[2];
            }
            //console.log(chartDate); 
            /* get y axis data */
/*            var dataPrice = [];
            var dataVol = [];    */        
            for(var i=120; i>=0; i--){
                dataPrice[i] = parseFloat($scope.stockContent["Time Series (Daily)"][$scope.revDate[i]]["4. close"]);
                dataVol[i] = parseFloat($scope.stockContent["Time Series (Daily)"][$scope.revDate[i]]["5. volume"]);
            }
            //console.log(dataPrice);
            //console.log(dataVol); 
            pricechart = Highcharts.chart('container1', {
				chart: {
					type: 'area',
					zoomType: 'x'
				},
				title: {
					text: $scope.stockContent["Meta Data"]["2. Symbol"] + ' Stock Price and Volume'
				},
				subtitle: {
                    useHTML: true,
					text: '<a href="https://www.alphavantage.co/" target="_blank">Source: Alpha Vantage</a>'
				},
				xAxis: {
                    tickInterval: 5,
					categories: chartDate
				},
				yAxis: [{
					title: {
						text: 'Stock Price',
					},
				}, {
					title: {
						text: 'Volume'
					},
					opposite: true,
				}],
				legend: {
					verticalAlign: 'bottom'
				},
				series: [{
					name: 'Price',
					type: 'area',
					color: '#1417FF',
					fillColor: '#E7E6FF',
					data: dataPrice,
					lineWidth: 1
				}, {
					name: 'Volume',
					yAxis: 1,
					type: 'column',
					color: '#FF1E14',
					data: dataVol,
				}]
			});
            picOptions = pricechart.options;
            $scope.priceLoadbar = false;
/* historical chart */
            var hisDate = [];
            for(var i=0; i<1000; i++){
                hisDate[i] = new Date($scope.getdate[999-i]);
            }
           /* var hisdata = [];*/
            var hisPrice = [];
            for(var i=0; i<1000; i++){
                var tempDate = Date.UTC(hisDate[i].getFullYear(), hisDate[i].getMonth(), hisDate[i].getDate());
                hisPrice[i] = parseFloat($scope.stockContent["Time Series (Daily)"][$scope.getdate[999-i]]["4. close"]);
                hisdata[i] = ([tempDate, hisPrice[i]]);
            }
            //console.log(hisdata);
            Highcharts.stockChart('container', {
                chart: {
                    height: 400
                },
                title: {
                    text: $scope.stockContent["Meta Data"]["2. Symbol"] + ' Stock Value'
                },
                subtitle: {
                    useHTML: true,
                    text: '<a class="indi" href="https://www.alphavantage.co/" target="_blank">Source: Alpha Vantage</a>'
                },
				yAxis: {
					title: {
						text: 'Stock Value'
					}
				},
                rangeSelector: {
                    buttons: [{
						type: 'week',
						count: 1,
						text: '1w'
                   	}, {
						type: 'month',
						count: 1,
						text: '1m'
                   	}, {
						type: 'month',
						count: 3,
						text: '3m'
					}, {
						type: 'month',
						count: 6,
						text: '6m'
					}, {
						type: 'year',
						count: 1,
						text: '1y'
					}, {
						type: 'ytd',
						text: 'YTD'
					}, {
						type: 'all',
						text: 'All'
					}],
                    selected: 0
                },
                tooltip: {
                    formatter: function () {
                        var s = Highcharts.dateFormat('%A, %b %e, %Y', this.x);

                        $.each(this.points, function () {
                        s += '<br/><span style="color:#A0C7EF">\u25CF</span> ' + ' <b>' + this.series.name + ': ' + this.y + '</b>';
                        });
                        return s;
                    }
                },
                series: [{
                    name: $scope.stockContent["Meta Data"]["2. Symbol"],
                    data: hisdata,
                    type: 'area',
                    threshold: null,
                    tooltip: {
                        valueDecimals: 2
                    }
                }],
                responsive: {
                    rules: [{
                        condition: {
                            maxWidth: 500
                        },
                        chartOptions: {
                            chart: {
                                height: 300
                            },
                            subtitle: {
                                text: null
                            },
                            navigator: {
                                enabled: false
                            }
                        }
                    }]
                }
            });
            $scope.hisPriceLoadbar = false;
            }
        }, function myError(response) {
            $scope.priceerror = true;
            $scope.priceLoadbar = false;
            $scope.tableLoadbar = false;
            $scope.hisPriceLoadbar = false;
        });
/* SMA */
        $scope.SMALoadbar = true;
        $scope.SMAerror = false;
        $http({
            method : "GET",
            url : "http://tichengl-usc571web.us-west-1.elasticbeanstalk.com/index.php?SMA="+symbol
        }).then(function mySuccess(response) {
            $scope.smaData = response.data;
            //console.log($scope.smaData);
            if(Object.keys($scope.smaData).length <=1 ){
                $scope.SMAerror = true;
                $scope.SMALoadbar = false;
            }else{
            /* get x axis data */
            $scope.SMAdate = Object.keys($scope.smaData["Technical Analysis: SMA"]);
            $scope.mySMAdate = [];
            for(var i=0; i<121; i++){
                $scope.mySMAdate[i] = $scope.SMAdate[120-i];
            }
            //console.log($scope.mySMAdate); 
            $scope.SMAchartDate = [];
            var SMAtempArr = [];
            for(var i=0; i<$scope.mySMAdate.length; i++){
                SMAtempArr = $scope.mySMAdate[i].split("-");
                $scope.SMAchartDate[i] = SMAtempArr[1]+'/'+SMAtempArr[2];
            }
            /* get y axis data */
            $scope.dataSMA = [];
            for(var i=0; i<121; i++){
                $scope.dataSMA[i] = parseFloat($scope.smaData["Technical Analysis: SMA"][$scope.mySMAdate[i]].SMA);
            }
            //console.log(dataSMA);
            smachart = Highcharts.chart('container2', {
				chart: {
                    type: 'spline',
					zoomType: 'x'
				},
				title: {
					text: 'Simple Moving Average (SMA)'
				},
				subtitle: {
                    useHTML: true,
					text: '<a href="https://www.alphavantage.co/" target="_blank">Source: Alpha Vantage</a>'
				},
				xAxis: {
                    tickInterval: 5,
					categories: $scope.SMAchartDate,
                    labels: {
                        rotation: -45
                    }
				},
				yAxis: {
					title: {
						text: 'SMA'
					}
				},
				legend: {
                    backgroundColor: '#FFFFFF',
					verticalAlign: 'bottom'
				},
				plotOptions: {
					spline: {
						lineWidth: 1,
					}
				},
				series: [{
					name: $scope.smaData["Meta Data"]["1: Symbol"],
                    color: '#85B0DB',
					data: $scope.dataSMA
                }]
			});
            $scope.SMALoadbar = false;
            }
        }, function myError(response) {
            $scope.SMAerror = true;
            $scope.SMALoadbar = false;
        });
/* EMA */
        $scope.EMALoadbar = true;
        $scope.EMAerror = false;
        $http({
            method : "GET",
            url : "http://tichengl-usc571web.us-west-1.elasticbeanstalk.com/index.php?EMA="+symbol
        }).then(function mySuccess(response) {
            $scope.emaData = response.data;
            //console.log($scope.emaData);
            if(Object.keys($scope.emaData).length <=1 ){
                $scope.EMAerror = true;
                $scope.EMALoadbar = false;
            }else{
            /* get x axis data */
            $scope.EMAdate = Object.keys($scope.emaData["Technical Analysis: EMA"]);
            $scope.myEMAdate = [];
            for(var i=0; i<121; i++){
                $scope.myEMAdate[i] = $scope.EMAdate[120-i];
            }
            //console.log($scope.myEMAdate); 
            /*var EMAchartDate = [];*/
            var EMAtempArr = [];
            for(var i=0; i<$scope.myEMAdate.length; i++){
                EMAtempArr = $scope.myEMAdate[i].split("-");
                EMAchartDate[i] = EMAtempArr[1]+'/'+EMAtempArr[2];
            }
            /* get y axis data */
            /*var dataEMA = [];*/
            for(var i=0; i<121; i++){
                dataEMA[i] = parseFloat($scope.emaData["Technical Analysis: EMA"][$scope.myEMAdate[i]].EMA);
            }
            //console.log(dataEMA);
            emachart = Highcharts.chart('container3', {
				chart: {
                    type: 'spline',
					zoomType: 'x'
				},
				title: {
					text: 'Exponential Moving Average (EMA)'
				},
				subtitle: {
                    useHTML: true,
					text: '<a href="https://www.alphavantage.co/" target="_blank">Source: Alpha Vantage</a>'
				},
				xAxis: {
                    tickInterval: 5,
					categories: EMAchartDate,
                    labels: {
                        rotation: -45
                    }
				},
				yAxis: {
					title: {
						text: 'EMA'
					}
				},
				legend: {
                    backgroundColor: '#FFFFFF',
					verticalAlign: 'bottom'
				},
				plotOptions: {
					spline: {
						lineWidth: 1,
					}
				},
				series: [{
					name: $scope.emaData["Meta Data"]["1: Symbol"],
                    color: '#85B0DB',
					data: dataEMA
                }]
			});
            $scope.EMALoadbar = false;
            }
        }, function myError(response) {
            $scope.EMAerror = true;
            $scope.EMALoadbar = false;
        });
/* STOCH */
        $scope.STOCHLoadbar = true;
        $scope.STOCHerror = false;
        $http({
            method : "GET",
            url : "http://tichengl-usc571web.us-west-1.elasticbeanstalk.com/index.php?STOCH="+symbol
        }).then(function mySuccess(response) {
            $scope.stochData = response.data;
            //console.log($scope.stochData);
            if(Object.keys($scope.stochData).length <=1 ){
                $scope.STOCHerror = true;
                $scope.STOCHLoadbar = false;
            }else{
            /* get x axis data */
            $scope.STOCHdate = Object.keys($scope.stochData["Technical Analysis: STOCH"]);
            $scope.mySTOCHdate = [];
            for(var i=0; i<121; i++){
                $scope.mySTOCHdate[i] = $scope.STOCHdate[120-i];
            }
            //console.log($scope.mySTOCHdate); 
/*            var STOCHchartDate = [];*/
            var STOCHtempArr = [];
            for(var i=0; i<$scope.mySTOCHdate.length; i++){
                STOCHtempArr = $scope.mySTOCHdate[i].split("-");
                STOCHchartDate[i] = STOCHtempArr[1]+'/'+STOCHtempArr[2];
            }
            /* get y axis data */
/*            var slowD = [];
            var slowK = [];*/
            for(var i=0; i<121; i++){
                slowD[i] = parseFloat($scope.stochData["Technical Analysis: STOCH"][$scope.mySTOCHdate[i]].SlowD);
                slowK[i] = parseFloat($scope.stochData["Technical Analysis: STOCH"][$scope.mySTOCHdate[i]].SlowK);
            }
            //console.log(slowD);
            //console.log(slowK);
            stochchart = Highcharts.chart('container4', {
				chart: {
                    type: 'spline',
					zoomType: 'x'
				},
				title: {
					text: 'Stochastic Oscillator (STOCH)'
				},
				subtitle: {
                    useHTML: true,
					text: '<a href="https://www.alphavantage.co/" target="_blank">Source: Alpha Vantage</a>'
				},
				xAxis: {
                    tickInterval: 5,
					categories: STOCHchartDate,
                    labels: {
                        rotation: -45
                    }
				},
				yAxis: {
					title: {
						text: 'STOCH'
					}
				},
				legend: {
                    backgroundColor: '#FFFFFF',
					verticalAlign: 'bottom'
				},
				plotOptions: {
					spline: {
						lineWidth: 1,
					}
				},
                series: [{
                    name: $scope.stochData["Meta Data"]["1: Symbol"]+' SlowK',
                    lineWidth: 1,
                    color: '#E92100',
                    data: slowK
                },{
                    name: $scope.stochData["Meta Data"]["1: Symbol"]+' SlowD',
                    lineWidth: 1,
                    color: '#85B0DB',
                    data: slowD
                }]
			});
            $scope.STOCHLoadbar = false;
            }
        }, function myError(response) {
            $scope.STOCHerror = true;
            $scope.STOCHLoadbar = false;
        }); 
/* RSI */
        $scope.RSILoadbar = true;
        $scope.RSIerror = false;
        $http({
            method : "GET",
            url : "http://tichengl-usc571web.us-west-1.elasticbeanstalk.com/index.php?RSI="+symbol
        }).then(function mySuccess(response) {
            $scope.rsiData = response.data;
            //console.log($scope.rsiData);
            if(Object.keys($scope.rsiData).length <=1 ){
                $scope.RSIerror = true;
                $scope.RSILoadbar = false;
            }else{
            /* get x axis data */
            $scope.RSIdate = Object.keys($scope.rsiData["Technical Analysis: RSI"]);
            $scope.myRSIdate = [];
            for(var i=0; i<121; i++){
                $scope.myRSIdate[i] = $scope.RSIdate[120-i];
            }
            //console.log($scope.myRSIdate); 
            /*var RSIchartDate = [];*/
            var RSItempArr = [];
            for(var i=0; i<$scope.myRSIdate.length; i++){
                RSItempArr = $scope.myRSIdate[i].split("-");
                RSIchartDate[i] = RSItempArr[1]+'/'+RSItempArr[2];
            }
            /* get y axis data */
            /*var dataRSI = [];*/
            for(var i=0; i<121; i++){
                dataRSI[i] = parseFloat($scope.rsiData["Technical Analysis: RSI"][$scope.myRSIdate[i]].RSI);
            }
            //console.log(dataRSI);
            rsichart = Highcharts.chart('container5', {
				chart: {
                    type: 'spline',
					zoomType: 'x'
				},
				title: {
					text: 'Relative Strength Index (RSI)'
				},
				subtitle: {
                    useHTML: true,
					text: '<a href="https://www.alphavantage.co/" target="_blank">Source: Alpha Vantage</a>'
				},
				xAxis: {
                    tickInterval: 5,
					categories: RSIchartDate,
                    labels: {
                        rotation: -45
                    }
				},
				yAxis: {
					title: {
						text: 'RSI'
					}
				},
				legend: {
                    backgroundColor: '#FFFFFF',
					verticalAlign: 'bottom'
				},
				plotOptions: {
					spline: {
						lineWidth: 1,
					}
				},
				series: [{
					name: $scope.rsiData["Meta Data"]["1: Symbol"],
                    color: '#85B0DB',
					data: dataRSI
                }]
			});
            $scope.RSILoadbar = false;
            }
        }, function myError(response) {
            $scope.RSIerror = true;
            $scope.RSILoadbar = false;
        });
/* ADX */
        $scope.ADXLoadbar = true;
        $scope.ADXerror = false;
        $http({
            method : "GET",
            url : "http://tichengl-usc571web.us-west-1.elasticbeanstalk.com/index.php?ADX="+symbol
        }).then(function mySuccess(response) {
            $scope.adxData = response.data;
            //console.log($scope.adxData);
            if(Object.keys($scope.adxData).length <=1 ){
                $scope.ADXerror = true;
                $scope.ADXLoadbar = false;
            }else{
            /* get x axis data */
            $scope.ADXdate = Object.keys($scope.adxData["Technical Analysis: ADX"]);
            $scope.myADXdate = [];
            for(var i=0; i<121; i++){
                $scope.myADXdate[i] = $scope.ADXdate[120-i];
            }
            //console.log($scope.myADXdate); 
            /*var ADXchartDate = [];*/
            var ADXtempArr = [];
            for(var i=0; i<$scope.myADXdate.length; i++){
                ADXtempArr = $scope.myADXdate[i].split("-");
                ADXchartDate[i] = ADXtempArr[1]+'/'+ADXtempArr[2];
            }
            /* get y axis data */
            /*var dataADX = [];*/
            for(var i=0; i<121; i++){
                dataADX[i] = parseFloat($scope.adxData["Technical Analysis: ADX"][$scope.myADXdate[i]].ADX);
            }
            //console.log(dataADX);
            adxchart = Highcharts.chart('container6', {
				chart: {
                    type: 'spline',
					zoomType: 'x'
				},
				title: {
					text: 'Average Directional Movement Index (ADX)'
				},
				subtitle: {
                    useHTML: true,
					text: '<a href="https://www.alphavantage.co/" target="_blank">Source: Alpha Vantage</a>'
				},
				xAxis: {
                    tickInterval: 5,
					categories: ADXchartDate,
                    labels: {
                        rotation: -45
                    }
				},
				yAxis: {
					title: {
						text: 'ADX'
					}
				},
				legend: {
                    backgroundColor: '#FFFFFF',
					verticalAlign: 'bottom'
				},
				plotOptions: {
					spline: {
						lineWidth: 1,
					}
				},
				series: [{
					name: $scope.adxData["Meta Data"]["1: Symbol"],
                    color: '#85B0DB',
					data: dataADX
                }]
			});
            $scope.ADXLoadbar = false;
            }
        }, function myError(response) {
            $scope.ADXerror = true;
            $scope.ADXLoadbar = false;
        }); 
/* CCI */
        $scope.CCILoadbar = true;
        $scope.CCIerror = false;
        $http({
            method : "GET",
            url : "http://tichengl-usc571web.us-west-1.elasticbeanstalk.com/index.php?CCI="+symbol
        }).then(function mySuccess(response) {
            $scope.cciData = response.data;
            //console.log($scope.cciData);
            if(Object.keys($scope.cciData).length <=1 ){
                $scope.CCIerror = true;
                $scope.CCILoadbar = false;
            }else{
            /* get x axis data */
            $scope.CCIdate = Object.keys($scope.cciData["Technical Analysis: CCI"]);
            $scope.myCCIdate = [];
            for(var i=0; i<121; i++){
                $scope.myCCIdate[i] = $scope.CCIdate[120-i];
            }
            //console.log($scope.myCCIdate); 
            /*var CCIchartDate = [];*/
            var CCItempArr = [];
            for(var i=0; i<$scope.myCCIdate.length; i++){
                CCItempArr = $scope.myCCIdate[i].split("-");
                CCIchartDate[i] = CCItempArr[1]+'/'+CCItempArr[2];
            }
            /* get y axis data */
            /*var dataCCI = [];*/
            for(var i=0; i<121; i++){
                dataCCI[i] = parseFloat($scope.cciData["Technical Analysis: CCI"][$scope.myCCIdate[i]].CCI);
            }
            //console.log(dataCCI);
            ccichart = Highcharts.chart('container7', {
				chart: {
                    type: 'spline',
					zoomType: 'x'
				},
				title: {
					text: 'Commodity Channel Index (CCI)'
				},
				subtitle: {
                    useHTML: true,
					text: '<a href="https://www.alphavantage.co/" target="_blank">Source: Alpha Vantage</a>'
				},
				xAxis: {
                    tickInterval: 5,
					categories: CCIchartDate,
                    labels: {
                        rotation: -45
                    }
				},
				yAxis: {
					title: {
						text: 'CCI'
					}
				},
				legend: {
                    backgroundColor: '#FFFFFF',
					verticalAlign: 'bottom'
				},
				plotOptions: {
					spline: {
						lineWidth: 1,
					}
				},
				series: [{
					name: $scope.cciData["Meta Data"]["1: Symbol"],
                    color: '#85B0DB',
					data: dataCCI
                }]
			});
            $scope.CCILoadbar = false;
            }
        }, function myError(response) {
            $scope.CCIerror = true;
            $scope.CCILoadbar = false;
        }); 
/* BBANDS */
        $scope.BBANDSLoadbar = true;
        $scope.BBANDSerror = false;
        $http({
            method : "GET",
            url : "http://tichengl-usc571web.us-west-1.elasticbeanstalk.com/index.php?BBANDS="+symbol
        }).then(function mySuccess(response) {
            $scope.bbandsData = response.data;
            //console.log($scope.bbandsData);
            if(Object.keys($scope.bbandsData).length <=1 ){
                $scope.BBANDSerror = true;
                $scope.BBANDSLoadbar = false;
            }else{
            /* get x axis data */
            $scope.BBANDSdate = Object.keys($scope.bbandsData["Technical Analysis: BBANDS"]);
            $scope.myBBANDSdate = [];
            for(var i=0; i<121; i++){
                $scope.myBBANDSdate[i] = $scope.BBANDSdate[120-i];
            }
            //console.log($scope.myBBANDSdate); 
            /*var BBANDSchartDate = [];*/
            var BBANDStempArr = [];
            for(var i=0; i<$scope.myBBANDSdate.length; i++){
                BBANDStempArr = $scope.myBBANDSdate[i].split("-");
                BBANDSchartDate[i] = BBANDStempArr[1]+'/'+BBANDStempArr[2];
            }
            /* get y axis data */
/*            var upper = [];
            var lower = [];
            var middle = [];*/
            for(var i=0; i<121; i++){
                upper[i] = parseFloat($scope.bbandsData["Technical Analysis: BBANDS"][$scope.myBBANDSdate[i]]["Real Upper Band"]);
                lower[i] = parseFloat($scope.bbandsData["Technical Analysis: BBANDS"][$scope.myBBANDSdate[i]]["Real Lower Band"]);
                middle[i] = parseFloat($scope.bbandsData["Technical Analysis: BBANDS"][$scope.myBBANDSdate[i]]["Real Middle Band"]);
            }
            //console.log(upper);
            //console.log(lower);
            //console.log(middle);
            bbandschart = Highcharts.chart('container8', {
				chart: {
                    type: 'spline',
					zoomType: 'x'
				},
				title: {
					text: 'Bollinger Bands (BBANDS)'
				},
				subtitle: {
                    useHTML: true,
					text: '<a href="https://www.alphavantage.co/" target="_blank">Source: Alpha Vantage</a>'
				},
				xAxis: {
                    tickInterval: 5,
					categories: BBANDSchartDate,
                    labels: {
                        rotation: -45
                    }
				},
				yAxis: {
					title: {
						text: 'BBANDS'
					}
				},
				legend: {
                    backgroundColor: '#FFFFFF',
					verticalAlign: 'bottom'
				},
				plotOptions: {
					spline: {
						lineWidth: 1,
					}
				},
                series: [{
                    name: $scope.bbandsData["Meta Data"]["1: Symbol"]+' Real Upper Band',
                    lineWidth: 1,
                    color: '#434348',
                    data: upper
                },{
                    name: $scope.bbandsData["Meta Data"]["1: Symbol"]+' Real Middle Band',
                    lineWidth: 1,
                    color: '#7CB5EC',
                    data: middle
                },{
                    name: $scope.bbandsData["Meta Data"]["1: Symbol"]+' Real Lower Band',
                    lineWidth: 1,
                    color: '#90EE7D',
                    data: lower
                }]
			});
            $scope.BBANDSLoadbar = false;
            }
        }, function myError(response) {
            $scope.BBANDSerror = true;
            $scope.BBANDSLoadbar = false;
        });
/* MACD */
        $scope.MACDLoadbar = true;
        $scope.MACDerror = false;
        $http({
            method : "GET",
            url : "http://tichengl-usc571web.us-west-1.elasticbeanstalk.com/index.php?MACD="+symbol
        }).then(function mySuccess(response) {
            $scope.macdData = response.data;
            //console.log($scope.macdData);
            if(Object.keys($scope.macdData).length <=1){
                $scope.MACDerror = true;
                $scope.MACDLoadbar = false;
            }else{
            /* get x axis data */
            $scope.MACDdate = Object.keys($scope.macdData["Technical Analysis: MACD"]);
            //console.log($scope.MACDdate); 
            $scope.myMACDdate = [];
            for(var i=0; i<121; i++){
                $scope.myMACDdate[i] = $scope.MACDdate[120-i];
            }
            //console.log($scope.myMACDdate); 
            /*var MACDchartDate = [];*/
            var MACDtempArr = [];
            for(var i=0; i<$scope.myMACDdate.length; i++){
                MACDtempArr = $scope.myMACDdate[i].split("-");
                MACDchartDate[i] = MACDtempArr[1]+'/'+MACDtempArr[2];
            }
            /* get y axis data */
/*            var macdsignal = [];
            var macd = [];
            var macdhist = [];*/
            for(var i=0; i<121; i++){
                macdsignal[i] = parseFloat($scope.macdData["Technical Analysis: MACD"][$scope.myMACDdate[i]]["MACD_Signal"]);
                macd[i] = parseFloat($scope.macdData["Technical Analysis: MACD"][$scope.myMACDdate[i]]["MACD"]);
                macdhist[i] = parseFloat($scope.macdData["Technical Analysis: MACD"][$scope.myMACDdate[i]]["MACD_Hist"]);
            }
            //console.log(macdsignal);
            //console.log(macd);
            //console.log(macdhist);
            macdchart = Highcharts.chart('container9', {
				chart: {
                    type: 'spline',
					zoomType: 'x'
				},
				title: {
					text: 'Moving Average Convergence/Divergence (MACD)'
				},
				subtitle: {
                    useHTML: true,
					text: '<a href="https://www.alphavantage.co/" target="_blank">Source: Alpha Vantage</a>'
				},
				xAxis: {
                    tickInterval: 5,
					categories: MACDchartDate,
                    labels: {
                        rotation: -45
                    }
				},
				yAxis: {
					title: {
						text: 'MACD'
					}
				},
				legend: {
                    backgroundColor: '#FFFFFF',
					verticalAlign: 'bottom'
				},
				plotOptions: {
					spline: {
						lineWidth: 1,
					}
				},
                series: [{
                    name: $scope.macdData["Meta Data"]["1: Symbol"]+' MACD_Signal',
                    lineWidth: 1,
                    color: '#434348',
                    data: macdsignal
                },{
                    name: $scope.macdData["Meta Data"]["1: Symbol"]+' MACD',
                    lineWidth: 1,
                    color: '#7CB5EC',
                    data: macd
                },{
                    name: $scope.macdData["Meta Data"]["1: Symbol"]+' MACD_Hist',
                    lineWidth: 1,
                    color: '#90EE7D',
                    data: macdhist
                }]
			});
            $scope.MACDLoadbar = false;
            }
        }, function myError(response) {
            $scope.MACDerror = true;
            $scope.MACDLoadbar = false;
        });
/* News */
        $scope.newsLoadbar = true;
        $scope.newserror = false;
        $http({
            method : "GET",
            url : "http://tichengl-usc571web.us-west-1.elasticbeanstalk.com/index.php?News="+symbol
        }).then(function mySuccess(response) {
            
            $scope.newsData = response.data;
            if(Object.keys($scope.newsData).length <=1){
                $scope.newserror = true;
                $scope.newsLoadbar = false;
            }else{
            for(var i=0; i<5; i++){
                $scope.newsData[i][2] = $scope.newsData[i][2].substring(0, 25);
            }
            //console.log($scope.newsData);
            $scope.newsLoadbar = false;
            }
        },function myError(response) {
            $scope.newserror = true;
            $scope.newsLoadbar = false;

        });
    };
/* FB */
    $scope.optNum = 0;
    $scope.changeOptions = function(x){
        $scope.optNum = x;
        //console.log($scope.optNum);
        if ($scope.optNum == 0) {
            picOptions = pricechart.options;
        }else if ($scope.optNum == 1) {
            picOptions = smachart.options;
        }else if ($scope.optNum == 2) {
            picOptions = emachart.options;
        }else if ($scope.optNum == 3) {
            picOptions = stochchart.options;
        }else if ($scope.optNum == 4) {
            picOptions = rsichart.options;
        }else if ($scope.optNum == 5) {
            picOptions = adxchart.options;
        }else if ($scope.optNum == 6) {
            picOptions = ccichart.options;
        }else if ($scope.optNum == 7) {
            picOptions = bbandschart.options;
        }else if ($scope.optNum == 8) {
            picOptions = macdchart.options;
        }
    };
    $scope.postFB = function(){
        
        FB.init({
            appId: '899894410160939',
            xfbml: true,
            version: 'v2.11'
        });   
        var data = {
            options: JSON.stringify(picOptions),
            filename: 'test',
            type: 'image/png',
            async: true
        };
        var exportUrl = 'http://export.highcharts.com/';
        $.post(exportUrl, data, function(data) {
            var url = exportUrl + data;
            //console.log(url);
            //window.open(url);
            FB.ui({
        	app_id:	'899894410160939',	
            method:	'feed',	
            picture: url
            }, (response) => {	
            if (response &&	!response.error_message) {	
                alert("Post Successfully");
            }else{	
                alert("Not Posted");	
            }	
            });
        });
    };
}