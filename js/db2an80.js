function ajaxget (url) {
	var xhr = new XMLHttpRequest();
/*    xhr.onreadystatechange = function(data) {
        if (xhr.readyState == 4) {
            if (xhr.status == 200) {
                callback(data.target.responseText);
            }
            else {
                callback(null);
            }
        }
    }*/
	xhr.open('GET', url, false); // false 表示同步操作
	xhr.send();
	return xhr.responseText;
}

function getQueryUrl (query) {
	// query is movie title
	var url = "http://www.an80.com/?s={{query}}";
	url = url.replace("{{query}}", query);
	return url;
}

function getButton (url,found) {
	var btn;
	if(found){
		btn = '<a href="' + url + '" title="点击去没有水的鱼下载影片" style="float:left;display:inline-block;background:#33A057;border: 1px solid #2f7b4b;color: white;padding: 1px 10px;border-radius: 3px;margin-right:8px;" target="_blank">没有水的鱼</a>'; 
	}
	else {
		btn = '<a href="' + url + '" title="没有水的鱼找不到该影片" style="float:left;display:inline-block;background:#cc2b2f;border: 1px solid #cc0007;color: white;padding: 1px 10px;border-radius: 3px;margin-right:8px;" >没有记录</a>';
	}
	return btn;
}

function handleResult (content) {
	var content = content.toString();
	if( content.indexOf('errorbox') != -1){
		var url = getQueryUrl(query);
		return getButton(url,false);
	}
	else {
		var url = getQueryUrl(query);
		return getButton(url,true);
	}
}

function sendQuery (query) {
	var content = ajaxget(getQueryUrl(query));
	var btn = handleResult(content);
	return btn;
}

var url = window.location.toString();
var query;

// Movie Page
if(url.indexOf("subject") != -1 ){
	query = $("#mainpic img").attr("alt");
	var btn = sendQuery(query);
	$("div.a_stars").before(btn);
}
// // System's Movie List Page: tag
// else if (url.indexOf("tag") != -1){
// 	$(".article table").each(function() {
// 		query = $("div.pl2 a",this).text();
// 		var btn = sendQuery(query);
// 		$("div.star",this).prepend(btn);
// 	});
// }
// // System's Movie List Page: doulist
// else if (url.indexOf("doulist") != -1 ){
// 	$(".article table").each(function() {
// 		query = $("div.pl2 a", this).html();
// 		var btn = sendQuery(query);
// 		$("td > span.rr", this).prepend(btn);
// 	});
// }
// // People's Movie List Page
// else if ( (url.indexOf("mine") != -1) || (url.indexOf("people") != -1)){
// 	$('div#db-book-mine div.mod ul li').each(function() {
// 		query = $('img',this).attr("alt");
// 		var btn = $(sendQuery(query));
// 		$(this).append(btn);
// 	});
// 	$('div#db-book-mine div.mod ul li a').css({"margin-right": "0","margin-top": "5px","float": "none"});
// }



