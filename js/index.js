/// <summary>
/// 格式化字符串
/// </summary>
String.prototype.format = function () {
    var regexp = /\{(\d+)\}/g;
    var args = arguments;
    var result = this.replace(regexp, function (m, i, o, n) {
        return args[i];
    });
    return result;
}
/// <summary>
/// 获取链接参数
/// </summary>
function getQueryString(name) {
        var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
        var r = window.location.search.substr(1).match(reg);
        if (r != null)
        {
          // if(r.indexOf('%')>-1)
          // return unescape(r[2]);
          // else
          return r[2];
        }
        return null;
    }

var URL_TYPE="category/{0}/";
var URL="https://rabtman.com/api/v2/acgclub/{0}pictures";

var putHtml=`
<div id="fh5co-board" data-columns>
{0}
</div>
`;
var putItemHtml=`<div class="item">
<div class="animate-box">
  <a href="{0}" class="image-popup fh5co-board-img"><img src="{0}" alt="{1}"></a>
</div>
<div class="fh5co-desc">{2}</div>
</div>
`;
var faildImage="图片被吃了T^T";
var token="eWZhdm9y";
var sort=getQueryString("sort");
var titleImageHtml=sort==null?"<a href='{0}'>查看图包>></a>":"";
var query=getQueryString("query");
var type=getQueryString("type");

var offset=getQueryString("offset");
var limit=getQueryString("limit");

var url_new=URL;
if(type!=null&&(type=="moeimg"||type=="cosplay"||type=="gamersky"))
url_new=url_new.format(URL_TYPE.format(type));
if(query!=null||offset!=null||type!=null)
{
let urlhead=url_new==URL?URL.format(""):url_new;
let queryUrl=urlhead;
if(query!=null)
queryUrl+="?query="+query;
if(offset!=null)
queryUrl+=(query!=null?"&":"?")+"offset="+offset;
if(type!=null)
queryUrl+=(queryUrl.indexOf("?")>-1?"&":"?")+"type="+type;
ResetImages(queryUrl);
}
else
ResetImages(URL.format(""));

function ResetImages(url) {
$.ajax({
    type: "get",
    url: url,
    cache:false,
    async:false,
    dataType: "json",
    success: function(data){
      if(data.message=="请求成功")
      {
        $.each(data.data,function(idx,item){
          //if(idx>5) return true;l
          var typeItem=item.type;
          var sortItem=item.sort;
          if(sort!=null)
          {
            if(sortItem==sort)
            {
              var tempItem="";
              var urlarry=item.imgUrls;
              for (var i = 0; i < urlarry.length; i++) {
                tempItem+=putItemHtml.format(urlarry[i],faildImage,"来自:"+typeItem+" 编号:"+sortItem+". " );
              }
              $(".row").append(putHtml.format(tempItem));
            }
          }
          else {
            var tempItem="";
            var queryChar=window.location.href+"?"
            if(window.location.href.indexOf("?")>-1) queryChar=window.location.href+"&";
            tempItem+=putItemHtml.format(item.thumbnail,faildImage,"来自:"+typeItem+" 编号:"+sortItem+" "+item.title+". "+titleImageHtml.format(queryChar+"sort="+sortItem) );
            $(".row").append(putHtml.format(tempItem));
          }
        });
      }
    }
});
}

//TOP
$('#js-go_top').gotoTop({
offset : 500, //距离顶部的位置
speed : 300, //移动到顶部的速度
/*     iconSpeed : 300, //icon动画样式的速度*/
animationShow : {
    'transform' : 'translate(0,0)',
    'transition': 'transform .5s ease-in-out'
}, //icon动画样式显示时
animationHide : {
    'transform' : 'translate(80px,0)',
    'transition': 'transform .5s ease-in-out'
} //icon动画样式隐藏时
});

$(function() {
    if(sort!=null)
    {
      $("#btn_up").css('display', 'none');
      $("#btn_next").css('display', 'none');
    }
    $("#btn_seach").click(function(){
        location.href=window.location.origin+window.location.pathname+"?query="+encodeURI($("#txt_seach").val());
    });
    $("#btn_up").click(function(){
      var roothref=window.location.href;
      if(offset!=null)
      {
        var index=1;
        var reg = new RegExp("(^|&)offset=([^&]*)(&|$)", "i");
        var r = window.location.search.substr(1).match(reg);
        if(r[2]==index) return;
        index=(parseInt(r[2])-1);
        location.href=roothref.replace(/offset=([^&]*)(&|$)/g,"offset="+index+"&");
      }
    });
    $("#btn_next").click(function(){
      var roothref=window.location.href;
      if(offset!=null)
      {
        var index=1;
        var reg = new RegExp("(^|&)offset=([^&]*)(&|$)", "i");
        var r = window.location.search.substr(1).match(reg);
        if(r[2]==index) return;
        index=(parseInt(r[2])+1);
        location.href=roothref.replace(/offset=([^&]*)(&|$)/g,"offset="+index+"&");
      }
      else
      {
        var urlChar=window.location.href+"?offset=2"
        if(window.location.href.indexOf("?")>-1) urlChar=window.location.href+"&offset=2";
        location.href=urlChar;
      }
    });
    $("#btn_home").click(function(){
        location.href=window.location.origin+window.location.pathname;
    });
    $(".btn-group").on('click', 'button', function(event) {
      event.preventDefault();
      var roothref=window.location.href;
      if(type!=null)
      {
        location.href=roothref.replace(/type=([^&]*)(&|$)/g,"type="+$(this).text()+"&");
      }
      else
      {
        var urlChar=window.location.href+"?type="+$(this).text();
        if(window.location.href.indexOf("?")>-1) urlChar=window.location.href+"&type="+$(this).text();
        location.href=urlChar;
      }
    });
    $("a").hover(function(){
        $("a").css("text-decoration","none");
    });
});
