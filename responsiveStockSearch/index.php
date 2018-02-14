<?php

    header('Access-Control-Allow-Origin:*');
    if(isset($_GET["PRICE"])){
        
        $url = file_get_contents('https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol='.$_GET["PRICE"].'&outputsize=full&apikey=QNF9LEUCFL598VF8');
        echo $url;
    }
    if(isset($_GET["SMA"])){
        
        $url = file_get_contents('https://www.alphavantage.co/query?function=SMA&symbol='.$_GET["SMA"].'&interval=daily&time_period=10&series_type=open&apikey=QNF9LEUCFL598VF8');
        echo $url;
    }
    if(isset($_GET["EMA"])){
        
        $url = file_get_contents('https://www.alphavantage.co/query?function=EMA&symbol='.$_GET["EMA"].'&interval=daily&time_period=10&series_type=open&apikey=QNF9LEUCFL598VF8');
        echo $url;
    }
    if(isset($_GET["STOCH"])){
        
        $url = file_get_contents('https://www.alphavantage.co/query?function=STOCH&symbol='.$_GET["STOCH"].'&interval=daily&time_period=10&series_type=open&apikey=QNF9LEUCFL598VF8');
        echo $url;
    }
    if(isset($_GET["RSI"])){
        
        $url = file_get_contents('https://www.alphavantage.co/query?function=RSI&symbol='.$_GET["RSI"].'&interval=daily&time_period=10&series_type=open&apikey=QNF9LEUCFL598VF8');
        echo $url;
    }
    if(isset($_GET["ADX"])){
        
        $url = file_get_contents('https://www.alphavantage.co/query?function=ADX&symbol='.$_GET["ADX"].'&interval=daily&time_period=10&series_type=open&apikey=QNF9LEUCFL598VF8');
        echo $url;
    }
    if(isset($_GET["CCI"])){
        
        $url = file_get_contents('https://www.alphavantage.co/query?function=CCI&symbol='.$_GET["CCI"].'&interval=daily&time_period=10&series_type=open&apikey=QNF9LEUCFL598VF8');
        echo $url;
    }
    if(isset($_GET["BBANDS"])){
        
        $url = file_get_contents('https://www.alphavantage.co/query?function=BBANDS&symbol='.$_GET["BBANDS"].'&interval=daily&time_period=10&series_type=open&apikey=QNF9LEUCFL598VF8');
        echo $url;
    }
    if(isset($_GET["MACD"])){
        
        $url = file_get_contents('https://www.alphavantage.co/query?function=MACD&symbol='.$_GET["MACD"].'&interval=daily&time_period=10&series_type=open&apikey=QNF9LEUCFL598VF8');
        echo $url;
    }
    if(isset($_GET["News"])){
        
        $xml = simplexml_load_file('https://seekingalpha.com/api/sa/combined/'.$_GET["News"].'.xml');
        $newsArr = array(array(), array(), array(), array(), array());
        $max = $xml->channel->item->count();
        $num = 0;          
        for($i=0; $i<$max; $i++){
            $link = $xml->children()->children()[$i+3]->children()[1];
            $sublink = substr($link, 25, 7);
            if($num<5 && $sublink=="article"){
                $newsArr[$num][0] = "".$xml->children()->children()[$i+3]->children()[0];
                $newsArr[$num][1] = "".$xml->children()->children()[$i+3]->children()[1];
                $newsArr[$num][2] = "".$xml->children()->children()[$i+3]->children()[3];                   
                $newsArr[$num][3] = "".$xml->children()->children()[$i+3]->children('sa', true)->author_name;
                $num ++;
            }
        }
        echo json_encode($newsArr);
    }
    if(isset($_GET["FAV"])){
        
        $url = file_get_contents('https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol='.$_GET["FAV"].'&outputsize=full&apikey=QNF9LEUCFL598VF8');
        echo $url;
    }
    if(isset($_GET["AUTOCOMPLETE"])){
        
        $url = file_get_contents('http://dev.markitondemand.com/MODApis/Api/v2/Lookup/json?input='.$_GET["AUTOCOMPLETE"]);    
        echo $url;
    }
?>
