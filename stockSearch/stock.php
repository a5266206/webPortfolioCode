<html>
<head>
    <title>HW6 Stock Search</title>
    <style type="text/css">
        h1 {
            font-family:"Times new Roman", sans-serif; 
            font-style:italic;
            font-weight: 400;
            margin-top:-12px;
            margin-bottom: 0px;
        }
        h2{
            font-family:"Times new Roman", sans-serif; 
            font-style:italic;
            font-weight: 500;
            font-size: 16px;
            text-align: left;
            margin-top: -8px;
            margin-left: 10px;
        }
        table {
            border-collapse: collapse;
            border: 2px solid #D6D6D6;
        }
        td, th {
            border: 1px solid #D6D6D6;
        }
        #search{
            background-color:#F5F5F5;
            height:200px;
            width: 430px;
            margin-top: 0px;
            border-style: solid;
            border-color: #D9D9D9;
            border-width: 1px
        }
        #mystock{
            margin-left: 10px;
            text-align: left;
        } 
        #butt{
            margin-left: 190px;
        }
        #arrow{
            height: 30;
            width: 60;
        }
        #text{
            cursor:pointer; 
            color: #BFBFBF
        }
        .indi{
            text-decoration:none; 
            cursor:pointer; 
            color:#0000FF;
        }
        .indi:hover{
            color: #000000
        }
    </style>
    

    <script type="text/javascript">
        function searchData(data){
            if(data.symbol.value==""){
                alert("Please enter a symbol");
            }
        }
        
        function clearAll(){
            document.getElementById("mystock").reset();
            if(document.getElementById("clear").style.display == ''){
               document.getElementById("clear").style.display = 'none';
               document.getElementById("textClear").value = "";
            }
        }
    </script>  
</head>
<body>
  <!--search part-->
   <CENTER><div id="search">
    <br>
    <h1>Stock Search</h1>
    <hr size="1" align="center" width="98%" color="#DDDDDD">
    <form method="POST" name="stock" id="mystock" action="" accept-charset="UTF-8">
        <p>
            <label>Enter Stock Ticker Symbol:*</label>
            <input type="text" name="symbol" id="textClear" value="<?php if(isset($_POST['symbol'])){ echo $_POST['symbol']; } ?>">
        </p>
        <p>
            <input id="butt" type="submit" name="submit" value="Search" onclick="searchData(this.form)">
            <input type="button" name="clear" value="Clear" onclick="clearAll()">
        </p>
    </form>
    <h2>* - Mandatory fields.</h2>
   </div></CENTER>
   <!--first part-->
    <?php
        if (isset($_POST["submit"]) && $_POST["symbol"]!=''){
        $url = file_get_contents('https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol='.$_POST["symbol"].'&outputsize=full&apikey=QNF9LEUCFL598VF8');
        $contentArray = json_decode($url, true);
        $errorMessage = array("Error Message"=>"Invalid API call. Please retry or visit the documentation (https://www.alphavantage.co/documentation/) for TIME_SERIES_DAILY.");       
        if( $contentArray == $errorMessage){
                echo '<br><div id="clear"><CENTER><table border="" width=1200><tbody><tr><td  style="background-color:#F5F5F5; font-weight:bold;" width=350>Error</td><td style="background-color:#FBFBFB; text-align: center;">Error: NO recored has been found, please enter a valid symbol</td></tr></tbody></table></CENTER></div>';
        }else{
        $date = array_keys($contentArray['Time Series (Daily)']);
        $getDate = $date[0];
        $preDate = $date[1];
        echo '<br>';
        echo '<div id="clear">';
        echo '<CENTER><table width=1200><tbody>';  
        echo '<tr><td  style="background-color:#F5F5F5; font-weight:bold;" width=350>';
        echo 'Stock Ticker Symbol';
        echo '</td><td style="background-color:#FBFBFB; text-align: center;">';
        echo $contentArray['Meta Data']['2. Symbol'];
        echo '</td></tr>';
    
        echo '<tr><td style="background-color:#F5F5F5; font-weight:bold;">';
        echo 'Close';
        echo '</td><td style="background-color:#FBFBFB; text-align: center;">';
        echo $contentArray['Time Series (Daily)'][$getDate]['4. close'];
        echo '</td></tr>';
    
        echo '<tr><td style="background-color:#F5F5F5; font-weight:bold;">';
        echo 'Open';
        echo '</td><td style="background-color:#FBFBFB; text-align: center;">';
        echo $contentArray['Time Series (Daily)'][$getDate]['1. open'];
        echo '</td></tr>';
    
        echo '<tr><td  style="background-color:#F5F5F5; font-weight:bold;">';
        echo 'Previous Close';
        echo '</td><td style="background-color:#FBFBFB; text-align: center;">';
        echo $contentArray['Time Series (Daily)'][$preDate]['4. close'];
        echo '</td></tr>';
        
        $change = round($contentArray['Time Series (Daily)'][$getDate]['4. close'] - $contentArray['Time Series (Daily)'][$preDate]['4. close'], 2);
        echo '<tr><td  style="background-color:#F5F5F5; font-weight:bold;">';
        echo 'Change';
        echo '</td><td style="background-color:#FBFBFB; text-align: center;">';
        echo $change;
        if($change > 0){
            $pic = 'http://cs-server.usc.edu:45678/hw/hw6/images/Green_Arrow_Up.png';
        }else{
            $pic = 'http://cs-server.usc.edu:45678/hw/hw6/images/Red_Arrow_Down.png';
        }
        echo '<img src='.$pic.' width=15 height=15>';
        echo '</td></tr>';
    
        $percent = round(100*$change/$contentArray['Time Series (Daily)'][$preDate]['4. close'], 2);
        echo '<tr><td  style="background-color:#F5F5F5; font-weight:bold;">';
        echo 'Change Percent';
        echo '</td><td style="background-color:#FBFBFB; text-align: center;">';
        echo $percent.'%';
        if($percent > 0){
            $pic2 = 'http://cs-server.usc.edu:45678/hw/hw6/images/Green_Arrow_Up.png';
        }else{
            $pic2 = 'http://cs-server.usc.edu:45678/hw/hw6/images/Red_Arrow_Down.png';
        }
        echo '<img src='.$pic2.' width=15 height=15>';
        echo '</td></tr>';
    
        echo '<tr><td  style="background-color:#F5F5F5; font-weight:bold;">';
        echo 'Day&apos;s Range';
        echo '</td><td style="background-color:#FBFBFB; text-align: center;">';
        echo $contentArray['Time Series (Daily)'][$getDate]['3. low'].'-'.$contentArray['Time Series (Daily)'][$getDate]['2. high'];
        echo '</td></tr>';
    
        echo '<tr><td  style="background-color:#F5F5F5; font-weight:bold;">';
        echo 'Volume';
        echo '</td><td style="background-color:#FBFBFB; text-align: center;">';
        $vol = number_format($contentArray['Time Series (Daily)'][$getDate]['5. volume'], 0, '', ',');
        echo $vol;
        echo '</td></tr>';
    
        echo '<tr><td  style="background-color:#F5F5F5; font-weight:bold;">';
        echo 'Timestamp';
        echo '</td><td style="background-color:#FBFBFB; text-align: center;">';
        echo $getDate;
        echo '</td></tr>';
    
        echo '<tr><td  style="background-color:#F5F5F5; font-weight:bold;">';
        echo 'Indicators';
        echo '</td><td style="background-color:#FBFBFB; text-align: center;">';
        echo '<a class="indi" onClick=runPrice()>Price</a>';
        echo '<a class="indi" onClick=runSMA()>&nbsp&nbsp&nbsp&nbsp&nbspSMA</a>';
        echo '<a class="indi" onClick=runEMA()>&nbsp&nbsp&nbsp&nbsp&nbspEMA</a>';
        echo '<a class="indi" onClick=runSTOCH()>&nbsp&nbsp&nbsp&nbsp&nbspSTOCH</a>';
        echo '<a class="indi" onClick=runRSI()>&nbsp&nbsp&nbsp&nbsp&nbspRSI</a>';
        echo '<a class="indi" onClick=runADX()>&nbsp&nbsp&nbsp&nbsp&nbspADX</a>';
        echo '<a class="indi" onClick=runCCI()>&nbsp&nbsp&nbsp&nbsp&nbspCCI</a>';
        echo '<a class="indi" onClick=runBBANDS()>&nbsp&nbsp&nbsp&nbsp&nbspBBANDS</a>';
        echo '<a herf="javascrpit:;" class="indi" onClick=runMACD()>&nbsp&nbsp&nbsp&nbsp&nbspMACD</a>';
        echo '</td></tr>';  
        echo '</tbody></table></CENTER>';
        
        $priceArr = array();
        for($i=0; $i<121; $i++){
            $priceArr[120-$i] = $contentArray['Time Series (Daily)'][$date[$i]]['4. close'];
        } 
        $priceArrRev = array_reverse($priceArr);
        //print_r($priceArrRev);          
        $volumeArr = array();
        for($i=0; $i<121; $i++){
            $volumeArr[120-$i] = $contentArray['Time Series (Daily)'][$date[$i]]['5. volume'];
        } 
        $volumeArrRev = array_reverse($volumeArr);
        //print_r($volumeArrRev);
        $dateArr = array();
        for($i=0; $i<121; $i++){
            $dateArr[120-$i] = $date[$i];
        } 
        $dateArrRev = array_reverse($dateArr);
        //print_r($dateArrRev);
        }
        }
    ?>
    <!--chart part-->
    <script src="https://code.highcharts.com/highcharts.js"></script>
    <script src="https://code.highcharts.com/modules/exporting.js"></script>
    <br>
    <div id="container" style="min-width: 310px; height: 550px; width:1200px; margin: 0 auto"></div>
    <script type="text/javascript">
    <?php if (isset($_POST["submit"]) && $_POST["symbol"]!=''){ ?>
        
        var dataPrice = <?php echo json_encode($priceArrRev) ?>;
        //console.log(dataPrice);
        for(var i=0;i<dataPrice.length;i++){
            dataPrice[i] = parseFloat(dataPrice[i]);
        }
        //console.log(dataPrice);      
        var dataVol = <?php echo json_encode($volumeArrRev) ?>;
        for(var i=0;i<dataVol.length;i++){
            dataVol[i] = parseFloat(dataVol[i]);
        }
        var dataDate = <?php echo json_encode($dateArrRev) ?>;       
        //console.log(dataDate);
        var xDate = [];
        var tempArr = [];
        var temp = "";
        for(var i=0; i<dataDate.length; i++){
            tempArr = dataDate[i].split("-");
            temp = tempArr[1]+'/'+tempArr[2];
            xDate[i] = temp;
        }
        //console.log(xDate);
        var today = <?php echo json_encode($getDate) ?>;
        var dateArr = today.split("-");
        //console.log(dateArr);
        var symbolTag = <?php echo json_encode($contentArray['Meta Data']['2. Symbol']) ?>;
        //console.log(symbolTag);
        
        Highcharts.chart('container', {
        chart: {
            borderColor: '#DCDCDC',
            borderWidth: 2,
            type: 'area'
        },
        title: {
            text: 'Stock Price ('+dateArr[1]+'/'+dateArr[2]+'/'+dateArr[0]+')'
        },
        subtitle: {
            useHTML: true,
            text: '<a class="indi" href="https://www.alphavantage.co/" target="_blank">Source: Alpha Vantage</a>'
        },
        xAxis: {
            tickInterval: 5,
            categories: xDate
        },
        yAxis: [{
            title: {
                text: 'Stock Price'
            }
        },{
            max: 560000000,
            title: {
            		text: 'Volume'
            },
            opposite: true
        }],
        legend: {
            layout: 'vertical',
            backgroundColor: '#FFFFFF',
            align: 'right',
            verticalAlign:"middle"
        },
        plotOptions: {
            area: {
                fillColor: {
                    linearGradient: {
                        x1: 0,
                        y1: 0,
                        x2: 0,
                        y2: 1
                    },
                    stops: [
                        [0, Highcharts.getOptions().colors[8]],
                        [1, Highcharts.Color(Highcharts.getOptions().colors[8]).setOpacity(0.7).get('rgba')]
                    ]
                },
                marker: {
                    enabled: false,
                    symbol: 'circle',
                    radius: 2,
                    states: {
                        hover: {
                            enabled: true
                        }
                    }
                },
                lineWidth: 1,
                states: {
                    hover: {
                        lineWidth: 1
                    }
                },
                threshold: null
            }
        },

        series: [{
            type: 'area',
            name: symbolTag,
            color: 'red',
            data: dataPrice
        },
        {
            type: 'column',
            name: symbolTag+' Volume',
            color: '#FFFFFF',
            data: dataVol,
            yAxis: 1
        }]
    });
        function runPrice(){
        var dataPrice = <?php echo json_encode($priceArrRev) ?>;
        //console.log(dataPrice);
        for(var i=0;i<dataPrice.length;i++){
            dataPrice[i] = parseFloat(dataPrice[i]);
        }
        //console.log(dataPrice);      
        var dataVol = <?php echo json_encode($volumeArrRev) ?>;
        for(var i=0;i<dataVol.length;i++){
            dataVol[i] = parseFloat(dataVol[i]);
        }
        var dataDate = <?php echo json_encode($dateArrRev) ?>;       
        //console.log(dataDate);
        var xDate = [];
        var tempArr = [];
        var temp = "";
        for(var i=0; i<dataDate.length; i++){
            tempArr = dataDate[i].split("-");
            temp = tempArr[1]+'/'+tempArr[2];
            xDate[i] = temp;
        }
        //console.log(xDate);
        var today = <?php echo json_encode($getDate) ?>;
        var dateArr = today.split("-");
        //console.log(dateArr);
        var symbolTag = <?php echo json_encode($contentArray['Meta Data']['2. Symbol']) ?>;
        //console.log(symbolTag);
        
    Highcharts.chart('container', {
        chart: {
            borderColor: '#DCDCDC',
            borderWidth: 2,
            type: 'line'
        },
        title: {
            text: 'Stock Price ('+dateArr[1]+'/'+dateArr[2]+'/'+dateArr[0]+')'
        },
        subtitle: {
            useHTML: true,
            text: '<a class="indi" href="https://www.alphavantage.co/" target="_blank">Source: Alpha Vantage</a>'
        },
        xAxis: {
            tickInterval: 5,
            categories: xDate
        },
        yAxis: [{
            title: {
                text: 'Stock Price'
            }
        },{
            max: 560000000,
            title: {
            		text: 'Volume'
            },
            opposite: true
        }],
        legend: {
            layout: 'vertical',
            backgroundColor: '#FFFFFF',
            align: 'right',
            verticalAlign:"middle"
        },
        plotOptions: {
            area: {
                fillColor: {
                    linearGradient: {
                        x1: 0,
                        y1: 0,
                        x2: 0,
                        y2: 1
                    },
                    stops: [
                        [0, Highcharts.getOptions().colors[8]],
                        [1, Highcharts.Color(Highcharts.getOptions().colors[8]).setOpacity(0.7).get('rgba')]
                    ]
                },
                marker: {
                    enabled: false,
                    symbol: 'circle',
                    radius: 2,
                    states: {
                        hover: {
                            enabled: true
                        }
                    }
                },
                lineWidth: 1,
                states: {
                    hover: {
                        lineWidth: 1
                    }
                },
                threshold: null
            }
        },

        series: [{
            type: 'area',
            name: symbolTag,
            color: 'red',
            data: dataPrice
        },
        {
            type: 'column',
            name: symbolTag+' Volume',
            color: '#FFFFFF',
            data: dataVol,
            yAxis: 1
        }]
    });
        }    
        function runSMA(){ 
    var sym = <?php echo json_encode($_POST["symbol"]) ?>;       
    xmlhttp = new XMLHttpRequest();
    var url = 'https://www.alphavantage.co/query?function=SMA&symbol='+sym+'&interval=weekly&time_period=10&series_type=open&apikey=QNF9LEUCFL598VF8';
    //console.log(url);
    xmlhttp.open("GET", url, false); 
    xmlhttp.send();    
    jsonObj = JSON.parse(xmlhttp.responseText);
    //console.log(jsonObj);
    
    var sma = [];
    var dateArray = jsonObj["Technical Analysis: SMA"];
    var dateKey = Object.keys(dateArray);
    var dataDate = [];
    for(var i=0; i<121; i++){
        dataDate[i] = dateKey[i];
    }
    dataDate.reverse();
    //console.log(dataDate);
    for(var j=0; j<121; j++){
        temp = dataDate[j];
        sma[j] = jsonObj["Technical Analysis: SMA"][temp].SMA;      
    }
    for(var k=0; k<sma.length; k++){
            sma[k] = parseFloat(sma[k]);
    }
    //console.log(sma); 
    var myDate = [];
    var tempArr = [];
    for(var i=0; i<dataDate.length; i++){
        tempArr = dataDate[i].split("-");
        myDate[i] = tempArr[1]+'/'+tempArr[2];
    }
    //console.log(myDate);
    Highcharts.chart('container', {
    chart: {
        borderColor: '#DCDCDC',
        borderWidth: 2,
        type: 'line'
    },
    title: {
        text: 'Simple Moving Average (SMA)'
    },
    subtitle: {
        useHTML: true,
        text: '<a class="indi" href="https://www.alphavantage.co/" target="_blank">Source: Alpha Vantage</a>'
    },
    xAxis: {
        tickInterval: 5,
        categories: myDate,
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
        layout: 'vertical',
        backgroundColor: '#FFFFFF',
        align: 'right',
        verticalAlign:"middle"
    },
    tooltip: {
        formatter: function () {
            return '<b>' + this.series.name + '</b><br/>' +
                this.x + ': ' + this.y;
        }
    },
    plotOptions: {
        series: {
            marker: {
                symbol: 'square',
                radius: 2
            }
        }
    },
    series: [{
        name: symbolTag,
        lineWidth: 1,
        color: 'red',
        data: sma
    }]
});
    }
        function runEMA(){
    var sym = <?php echo json_encode($_POST["symbol"]) ?>;       
    xmlhttp = new XMLHttpRequest();
    var url = 'https://www.alphavantage.co/query?function=EMA&symbol='+sym+'&interval=weekly&time_period=10&series_type=open&apikey=QNF9LEUCFL598VF8';
    //console.log(url);
    xmlhttp.open("GET", url, false); 
    xmlhttp.send();    
    jsonObj = JSON.parse(xmlhttp.responseText);
    //console.log(jsonObj);
    
    var ema = [];
    var dateArray = jsonObj["Technical Analysis: EMA"];
    var dateKey = Object.keys(dateArray);
    var dataDate = [];
    for(var i=0; i<121; i++){
        dataDate[i] = dateKey[i];
    }
    dataDate.reverse();
    //console.log(dataDate);
    for(var j=0; j<121; j++){
        temp = dataDate[j];
        ema[j] = jsonObj["Technical Analysis: EMA"][temp].EMA;      
    }
    for(var k=0; k<ema.length; k++){
            ema[k] = parseFloat(ema[k]);
    }
    //console.log(sma);  
    var myDate = [];
    var tempArr = [];
    for(var i=0; i<dataDate.length; i++){
        tempArr = dataDate[i].split("-");
        myDate[i] = tempArr[1]+'/'+tempArr[2];
    }
    //console.log(myDate);
    Highcharts.chart('container', {
    chart: {
        borderColor: '#DCDCDC',
        borderWidth: 2,
        type: 'line'
    },
    title: {
        text: 'Exponential Moving Average (EMA)'
    },
    subtitle: {
        useHTML: true,
        text: '<a class="indi" href="https://www.alphavantage.co/" target="_blank">Source: Alpha Vantage</a>'
    },
    xAxis: {
        tickInterval: 5,
        categories: myDate,
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
        layout: 'vertical',
        backgroundColor: '#FFFFFF',
        align: 'right',
        verticalAlign:"middle"
    },
    tooltip: {
        formatter: function () {
            return '<b>' + this.series.name + '</b><br/>' +
                this.x + ': ' + this.y;
        }
    },
    plotOptions: {
        series: {
            marker: {
                symbol: 'square',
                radius: 2
            }
        }
    },
    series: [{
        name: symbolTag,
        lineWidth: 1,
        color: 'red',
        data: ema
    }]
});
        }
        function runSTOCH(){
    var sym = <?php echo json_encode($_POST["symbol"]) ?>;       
    xmlhttp = new XMLHttpRequest();
    var url = 'https://www.alphavantage.co/query?function=STOCH&symbol='+sym+'&interval=weekly&time_period=10&series_type=open&apikey=QNF9LEUCFL598VF8';
    //console.log(url);
    xmlhttp.open("GET", url, false); 
    xmlhttp.send();    
    jsonObj = JSON.parse(xmlhttp.responseText);
    //console.log(jsonObj);   
    var slowD = [];
    var slowK = [];
    var dateArray = jsonObj["Technical Analysis: STOCH"];
    var dateKey = Object.keys(dateArray);
    var dataDate = [];
    for(var i=0; i<121; i++){
        dataDate[i] = dateKey[i];
    }
    dataDate.reverse();
    //console.log(dataDate);
    for(var j=0; j<121; j++){
        temp = dataDate[j];
        slowD[j] = jsonObj["Technical Analysis: STOCH"][temp].SlowD;   
        slowK[j] = jsonObj["Technical Analysis: STOCH"][temp].SlowK; 
    }
    for(var k=0; k<slowD.length; k++){
            slowD[k] = parseFloat(slowD[k]);
            slowK[k] = parseFloat(slowK[k]);
    }
    //console.log(slowD); 
    //console.log(slowK); 
    var myDate = [];
    var tempArr = [];
    for(var i=0; i<dataDate.length; i++){
        tempArr = dataDate[i].split("-");
        myDate[i] = tempArr[1]+'/'+tempArr[2];
    }
    //console.log(myDate);
    Highcharts.chart('container', {
    chart: {
        borderColor: '#DCDCDC',
        borderWidth: 2,
        type: 'line'
    },
    title: {
        text: 'Stochastic Oscillator(STOCH)'
    },
    subtitle: {
        useHTML: true,
        text: '<a class="indi" href="https://www.alphavantage.co/" target="_blank">Source: Alpha Vantage</a>'
    },
    xAxis: {
        tickInterval: 5,
        categories: myDate
    },
    yAxis: {
    		title: {
               text: 'STOCH'
        }
    },
    legend: {
        layout: 'vertical',
        backgroundColor: '#FFFFFF',
        align: 'right',
        verticalAlign:"middle"
    },
    tooltip: {
        formatter: function () {
            return '<b>' + this.series.name + '</b><br/>' +
                this.x + ': ' + this.y;
        }
    },
    plotOptions: {
        series: {
            marker: {
                symbol: 'square',
                radius: 2
            }
        }
    },
    series: [{
        name: symbolTag+' SlowK',
        lineWidth: 1,
        color: '#E92100',
        data: slowK
    },{
        name: symbolTag+' SlowD',
        lineWidth: 1,
        color: '#8DC3F1',
        data: slowD
    }]
});
        }
        function runRSI(){
    var sym = <?php echo json_encode($_POST["symbol"]) ?>;       
    xmlhttp = new XMLHttpRequest();
    var url = 'https://www.alphavantage.co/query?function=RSI&symbol='+sym+'&interval=weekly&time_period=10&series_type=open&apikey=QNF9LEUCFL598VF8';
    //console.log(url);
    xmlhttp.open("GET", url, false); 
    xmlhttp.send();    
    jsonObj = JSON.parse(xmlhttp.responseText);
    //console.log(jsonObj);
    
    var rsi = [];
    var dateArray = jsonObj["Technical Analysis: RSI"];
    var dateKey = Object.keys(dateArray);
    var dataDate = [];
    for(var i=0; i<121; i++){
        dataDate[i] = dateKey[i];
    }
    dataDate.reverse();
    //console.log(dataDate);
    for(var j=0; j<121; j++){
        temp = dataDate[j];
        rsi[j] = jsonObj["Technical Analysis: RSI"][temp].RSI;      
    }
    for(var k=0; k<rsi.length; k++){
            rsi[k] = parseFloat(rsi[k]);
    }
    //console.log(rsi); 
    var myDate = [];
    var tempArr = [];
    for(var i=0; i<dataDate.length; i++){
        tempArr = dataDate[i].split("-");
        myDate[i] = tempArr[1]+'/'+tempArr[2];
    }
    //console.log(myDate);
    Highcharts.chart('container', {
    chart: {
        borderColor: '#DCDCDC',
        borderWidth: 2,
        type: 'line'
    },
    title: {
        text: 'Relative Strength Index (RSI)'
    },
    subtitle: {
        useHTML: true,
        text: '<a class="indi" href="https://www.alphavantage.co/" target="_blank">Source: Alpha Vantage</a>'
    },
    xAxis: {
        tickInterval: 5,
        categories: myDate,
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
        layout: 'vertical',
        backgroundColor: '#FFFFFF',
        align: 'right',
        verticalAlign:"middle"
    },
    tooltip: {
        formatter: function () {
            return '<b>' + this.series.name + '</b><br/>' +
                this.x + ': ' + this.y;
        }
    },
    plotOptions: {
        series: {
            marker: {
                symbol: 'square',
                radius: 2
            }
        }
    },
    series: [{
        name: symbolTag,
        lineWidth: 1,
        color: 'red',
        data: rsi
    }]
});
        }
        function runADX(){
    var sym = <?php echo json_encode($_POST["symbol"]) ?>;       
    xmlhttp = new XMLHttpRequest();
    var url = 'https://www.alphavantage.co/query?function=ADX&symbol='+sym+'&interval=weekly&time_period=10&series_type=open&apikey=QNF9LEUCFL598VF8';
    //console.log(url);
    xmlhttp.open("GET", url, false); 
    xmlhttp.send();    
    jsonObj = JSON.parse(xmlhttp.responseText);
    //console.log(jsonObj);
    
    var adx = [];
    var dateArray = jsonObj["Technical Analysis: ADX"];
    var dateKey = Object.keys(dateArray);
    var dataDate = [];
    for(var i=0; i<121; i++){
        dataDate[i] = dateKey[i];
    }
    dataDate.reverse();
    //console.log(dataDate);
    for(var j=0; j<121; j++){
        temp = dataDate[j];
        adx[j] = jsonObj["Technical Analysis: ADX"][temp].ADX;      
    }
    for(var k=0; k<adx.length; k++){
            adx[k] = parseFloat(adx[k]);
    }
    //console.log(adx);
    var myDate = [];
    var tempArr = [];
    for(var i=0; i<dataDate.length; i++){
        tempArr = dataDate[i].split("-");
        myDate[i] = tempArr[1]+'/'+tempArr[2];
    }
    //console.log(myDate);
    Highcharts.chart('container', {
    chart: {
        borderColor: '#DCDCDC',
        borderWidth: 2,
        type: 'line'
    },
    title: {
        text: 'Average Directional movement IndeX (ADX)'
    },
    subtitle: {
        useHTML: true,
        text: '<a class="indi" href="https://www.alphavantage.co/" target="_blank">Source: Alpha Vantage</a>'
    },
    xAxis: {
        tickInterval: 5,
        categories: myDate,
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
        layout: 'vertical',
        backgroundColor: '#FFFFFF',
        align: 'right',
        verticalAlign:"middle"
    },
    tooltip: {
        formatter: function () {
            return '<b>' + this.series.name + '</b><br/>' +
                this.x + ': ' + this.y;
        }
    },
    plotOptions: {
        series: {
            marker: {
                symbol: 'square',
                radius: 2
            }
        }
    },
    series: [{
        name: symbolTag,
        lineWidth: 1,
        color: 'red',
        data: adx
    }]
});
        }
        function runCCI(){
    var sym = <?php echo json_encode($_POST["symbol"]) ?>;       
    xmlhttp = new XMLHttpRequest();
    var url = 'https://www.alphavantage.co/query?function=CCI&symbol='+sym+'&interval=weekly&time_period=10&series_type=open&apikey=QNF9LEUCFL598VF8';
    //console.log(url);
    xmlhttp.open("GET", url, false); 
    xmlhttp.send();    
    jsonObj = JSON.parse(xmlhttp.responseText);
    //console.log(jsonObj);
    
    var cci = [];
    var dateArray = jsonObj["Technical Analysis: CCI"];
    var dateKey = Object.keys(dateArray);
    var dataDate = [];
    for(var i=0; i<121; i++){
        dataDate[i] = dateKey[i];
    }
    dataDate.reverse();
    //console.log(dataDate);
    for(var j=0; j<121; j++){
        temp = dataDate[j];
        cci[j] = jsonObj["Technical Analysis: CCI"][temp].CCI;      
    }
    for(var k=0; k<cci.length; k++){
            cci[k] = parseFloat(cci[k]);
    }
    //console.log(cci); 
    var myDate = [];
    var tempArr = [];
    for(var i=0; i<dataDate.length; i++){
        tempArr = dataDate[i].split("-");
        myDate[i] = tempArr[1]+'/'+tempArr[2];
    }
    //console.log(myDate);
    Highcharts.chart('container', {
    chart: {
        borderColor: '#DCDCDC',
        borderWidth: 2,
        type: 'line'
    },
    title: {
        text: 'Commodity Channel Index (CCI)'
    },
    subtitle: {
        useHTML: true,
        text: '<a class="indi" href="https://www.alphavantage.co/" target="_blank">Source: Alpha Vantage</a>'
    },
    xAxis: {
        tickInterval: 5,
        categories: myDate,
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
        layout: 'vertical',
        backgroundColor: '#FFFFFF',
        align: 'right',
        verticalAlign:"middle"
    },
    tooltip: {
        formatter: function () {
            return '<b>' + this.series.name + '</b><br/>' +
                this.x + ': ' + this.y;
        }
    },
    plotOptions: {
        series: {
            marker: {
                symbol: 'square',
                radius: 2
            }
        }
    },
    series: [{
        name: symbolTag,
        lineWidth: 1,
        color: 'red',
        data: cci
    }]
});
        }
        function runBBANDS(){
    var sym = <?php echo json_encode($_POST["symbol"]) ?>;       
    xmlhttp = new XMLHttpRequest();
    var url = 'https://www.alphavantage.co/query?function=BBANDS&symbol='+sym+'&interval=weekly&time_period=10&series_type=open&apikey=QNF9LEUCFL598VF8';
    //console.log(url);
    xmlhttp.open("GET", url, false); 
    xmlhttp.send();    
    jsonObj = JSON.parse(xmlhttp.responseText);
    //console.log(jsonObj);
    
    var lower = [];
    var upper = [];
    var middle = [];
    var dateArray = jsonObj["Technical Analysis: BBANDS"];
    var dateKey = Object.keys(dateArray);
    var dataDate = [];
    for(var i=0; i<121; i++){
        dataDate[i] = dateKey[i];
    }
    dataDate.reverse();
    //console.log(dataDate);
    for(var j=0; j<121; j++){
        temp = dataDate[j];
        lower[j] = jsonObj["Technical Analysis: BBANDS"][temp]["Real Lower Band"];
        upper[j] = jsonObj["Technical Analysis: BBANDS"][temp]["Real Upper Band"];      
        middle[j] = jsonObj["Technical Analysis: BBANDS"][temp]["Real Middle Band"];      
    }
    for(var k=0; k<lower.length; k++){
            lower[k] = parseFloat(lower[k]);
            upper[k] = parseFloat(upper[k]);
            middle[k] = parseFloat(middle[k]);
    }
    var myDate = [];
    var tempArr = [];
    for(var i=0; i<dataDate.length; i++){
        tempArr = dataDate[i].split("-");
        myDate[i] = tempArr[1]+'/'+tempArr[2];
    }
    //console.log(myDate);
       
    Highcharts.chart('container', {
    chart: {
    borderColor: '#DCDCDC',
        borderWidth: 2,
        type: 'line'
    },
    title: {
        text: 'Bollinger Bands (BBANDS)'
    },
    subtitle: {
        useHTML: true,
        text: '<a class="indi" href="https://www.alphavantage.co/" target="_blank">Source: Alpha Vantage</a>'
    },
    xAxis: {
        tickInterval: 5,
        categories: myDate
    },
    yAxis: {
    		title: {
               text: 'BBANDS'
        }
    },
    legend: {
        layout: 'vertical',
        backgroundColor: '#FFFFFF',
        align: 'right',
        verticalAlign:"middle"
    },
    tooltip: {
        formatter: function () {
            return '<b>' + this.series.name + '</b><br/>' +
                this.x + ': ' + this.y;
        }
    },
    plotOptions: {
        series: {
            marker: {
                symbol: 'square',
                radius: 2
            }
        }
    },
    series: [{
        name: symbolTag+' Real Middle Band',
        lineWidth: 1,
        color: '#E92100',
        data: middle
    },{
        name: symbolTag+' Real Upper Band',
        lineWidth: 1,
        color: '#8DC3F1',
        data: upper
    },{
        name: symbolTag+' Real Lower Band',
        lineWidth: 1,
        color: '#55555A',
        data: lower
    }]
});
        }
        function runMACD(){     
   var sym = <?php echo json_encode($_POST["symbol"]) ?>;       
    xmlhttp = new XMLHttpRequest();
    var url = 'https://www.alphavantage.co/query?function=MACD&symbol='+sym+'&interval=weekly&time_period=10&series_type=open&apikey=QNF9LEUCFL598VF8';
    //console.log(url);
    xmlhttp.open("GET", url, false); 
    xmlhttp.send();    
    jsonObj = JSON.parse(xmlhttp.responseText);
    //console.log(jsonObj);
    
    var mysignal = [];
    var myhist = [];
    var myMACD = [];
    var dateArray = jsonObj["Technical Analysis: MACD"];
    var dateKey = Object.keys(dateArray);
    var dataDate = [];
    for(var i=0; i<121; i++){
        dataDate[i] = dateKey[i];
    }
    dataDate.reverse();
    //console.log(dataDate);
    for(var j=0; j<121; j++){
        temp = dataDate[j];
        mysignal[j] = jsonObj["Technical Analysis: MACD"][temp]["MACD_Signal"];
        myhist[j] = jsonObj["Technical Analysis: MACD"][temp]["MACD_Hist"];      
        myMACD[j] = jsonObj["Technical Analysis: MACD"][temp]["MACD"];      
    }
    for(var k=0; k<mysignal.length; k++){
            mysignal[k] = parseFloat(mysignal[k]);
            myhist[k] = parseFloat(myhist[k]);
            myMACD[k] = parseFloat(myMACD[k]);
    }
    var myDate = [];
    var tempArr = [];
    for(var i=0; i<dataDate.length; i++){
        tempArr = dataDate[i].split("-");
        myDate[i] = tempArr[1]+'/'+tempArr[2];
    }
    //console.log(myDate);
       
    Highcharts.chart('container', {
    chart: {
    borderColor: '#DCDCDC',
        borderWidth: 2,
        type: 'line'
    },
    title: {
        text: 'Moving Average Convergence/Divergence (MACD)'
    },
    subtitle: {
        useHTML: true,
        text: '<a class="indi" href="https://www.alphavantage.co/" target="_blank">Source: Alpha Vantage</a>'
    },
    xAxis: {
        tickInterval: 5,
        categories: myDate
    },
    yAxis: {
    		title: {
               text: 'MACD'
        }
    },
    legend: {
        layout: 'vertical',
        backgroundColor: '#FFFFFF',
        align: 'right',
        verticalAlign:"middle"
    },
    tooltip: {
        formatter: function () {
            return '<b>' + this.series.name + '</b><br/>' +
                this.x + ': ' + this.y;
        }
    },
    plotOptions: {
        series: {
            marker: {
                symbol: 'square',
                radius: 2
            }
        }
    },
    series: [{
        name: symbolTag+' MACD',
        lineWidth: 1,
        color: '#E92100',
        data: myMACD
    },{
        name: symbolTag+' MACD_Hist',
        lineWidth: 1,
        color: '#F0A96F',
        data: myhist
    },{
        name: symbolTag+' MACD_Signal',
        lineWidth: 1,
        color: '#8DC3F1',        
        data: mysignal
    }]
});
        }
    <?php } ?>
    </script>
    
    <!--third part-->
    <?php
        if (isset($_POST["submit"]) && $_POST["symbol"]!='' && $contentArray != $errorMessage){
            $xml = simplexml_load_file("https://seekingalpha.com/api/sa/combined/".$_POST["symbol"].".xml");
            echo '<br>';
            echo '<CENTER><div id="text" onclick="myclick()">click to show stock news</div><br>';
            echo '<a href= "javascript:;" onclick="myclick()"><img id="arrow" src="http://cs-server.usc.edu:45678/hw/hw6/images/Gray_Arrow_Down.png"></a><br><br>';
            echo '<div id="table" style="display: none">';
            echo '<table border="" width=1200><tbody>';
            $titleArr = array("", "" ,"", "", "");
            $linkArr = array("", "" ,"", "", "");
            $pubdateArr = array("", "" ,"", "", "");
            $max = $xml->channel->item->count();
            //var_dump($max) ;
            $num = 0;          
            for($i=0; $i<$max; $i++){
                $link = $xml->children()->children()[$i+3]->children()[1];
                $sublink = substr($link, 25, 7);
                if($num<5 && $sublink=="article"){
                    $titleArr[$num] = $xml->children()->children()[$i+3]->children();
                    $linkArr[$num] = $xml->children()->children()[$i+3]->children()[1];
                    $pubdateArr[$num] = "Publicated Time: ".$xml->children()->children()[$i+3]->children()[3];
                    $num ++;
                }
            }
            $pubdateArr[0] = substr($pubdateArr[0], 0, -5);
            echo '<tr><td  style="background-color:#FBFBFB">';
            echo '<a class="indi" href='.$linkArr[0].' target="_blank" >'.$titleArr[0].'</a>&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp'.$pubdateArr[0];
            echo '</td></tr>';
            
            $pubdateArr[1] = substr($pubdateArr[1], 0, -5);
            echo '<tr><td  style="background-color:#FBFBFB">';
            echo '<a class="indi" href='.$linkArr[1].' target="_blank" >'.$titleArr[1].'</a>&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp'.$pubdateArr[1];
            echo '</td></tr>';
            
            $pubdateArr[2] = substr($pubdateArr[2], 0, -5);
            echo '<tr><td  style="background-color:#FBFBFB">';
            echo '<a class="indi" href='.$linkArr[2].' target="_blank" >'.$titleArr[2].'</a>&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp'.$pubdateArr[2];
            echo '</td></tr>';
            
            $pubdateArr[3] = substr($pubdateArr[3], 0, -5);
            echo '<tr><td  style="background-color:#FBFBFB">';
            echo '<a class="indi" href='.$linkArr[3].' target="_blank" >'.$titleArr[3].'</a>&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp'.$pubdateArr[3];
            echo '</td></tr>';
            
            $pubdateArr[4] = substr($pubdateArr[4], 0, -5);
            echo '<tr><td  style="background-color:#FBFBFB">';
            echo '<a class="indi" href='.$linkArr[4].' target="_blank" >'.$titleArr[4].'</a>&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp'.$pubdateArr[4];
            echo '</td></tr>';
            echo '</tbody></table>';
            echo '</div></CENTER></div>';
        }     
    ?>
    <script type="text/javascript">
        function myclick(){
            if(document.getElementById('table').style.display == 'none'){
                document.getElementById('table').style.display = '';
                document.getElementById('arrow').src='http://cs-server.usc.edu:45678/hw/hw6/images/Gray_Arrow_Up.png';
                document.getElementById('text').innerHTML = 'click to hide stock news';
            }else{
                document.getElementById('table').style.display = 'none';
                document.getElementById('arrow').src='http://cs-server.usc.edu:45678/hw/hw6/images/Gray_Arrow_Down.png';
                document.getElementById('text').innerHTML = 'click to show stock news';
            }
        }
    </script>
    <div style="height:150px;"> </div>
</body>
</html>