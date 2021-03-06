(function($) {

	$.fn.yajqtwitter = function(options) { 

		options = $.extend({}, $.fn.yajqtwitter.defaults, options);
		
		var linkify = function(text) {
			var exp = /\b(http:\/\/[-A-Za-z0-9+&@#/%?=~_()|!:,.;]*[-A-Za-z0-9+&@#/%=~_()|])/ig;
			return text.replace(exp,"<a href='$1' target=\"_blank\">$1</a>");
		}

		var linkifyTwitter = function(text) {
			var screennameRe = /(@([A-Za-z0-9_]+))/ig;
			var hashtagRe = /(#([-A-Za-z0-9_]))/ig;
			
			text = text.replace(screennameRe,"<a href=\"http://www.twitter.com/$2\" target=\"_blank\">$1</a>");
			text = text.replace(hashtagRe,"<a href=\"https://twitter.com/#!/search?q=%23$2\" target=\"_blank\">$1</a>");
			return text;
		}
		
		var parseFunctions = {
			'regular': function parseRegular(post) {
				var bodyString = post['text'];
				if (options.linkify) {
					bodyString = linkify(bodyString);
					bodyString = linkifyTwitter(bodyString);
				}
				return "<div class=\"post-body\">" + bodyString + "</div>";
			}
		};

		/* Credit: jquery.TimeAgo.js */
		var zeropad = function (num) {
		  return ((num < 10) ? '0' : '') + num;
		};
		
		/* Credit: jquery.TimeAgo.js */ 
		var iso8601 = function (date) {
		  return date.getUTCFullYear()
		    + "-" + zeropad(date.getUTCMonth()+1)
		    + "-" + zeropad(date.getUTCDate())
		    + "T" + zeropad(date.getUTCHours())
		    + ":" + zeropad(date.getUTCMinutes())
		    + ":" + zeropad(date.getUTCSeconds()) + "Z";
		};
	
		

	       /* Credit: John Resig (http://ejohn.org/blog/javascript-pretty-date/); Updated by AR */ 
		var prettyDate = function(time) {
			var date = new Date((time || "").replace(/-/g,"/").replace(/[TZ]/g," ")),
			diff = (((new Date()).getTime() - date.getTime()) / 1000),
			day_diff = Math.floor(diff / 86400);
			
			if ( isNaN(day_diff) || day_diff < 0 )
				return;
			
			return day_diff == 0 && (
				diff < 60 && "just now" ||
				diff < 120 && "1 minute ago" ||
				diff < 3600 && Math.floor( diff / 60 ) + " minutes ago" ||
				diff < 7200 && "1 hour ago" ||
				diff < 86400 && Math.floor( diff / 3600 ) + " hours ago") ||
				day_diff == 1 && "Yesterday" ||
				day_diff < 7 && day_diff + " days ago" ||
				day_diff < 85 && Math.ceil( day_diff / 7 ) + " weeks ago" || 
				"many moons ago";
		}
		return this.each(function() {
				var $this = $(this);
				$.ajax({
					type:'GET',
					dataType: "jsonp",
					data: "trim_user=1&screen_name="+options.username+"&count="+(options.maxNumberOfPosts+1) + (options.includeRetweets ? "&include_rts=1":""),
					url:"https://api.twitter.com/1/statuses/user_timeline.json",
					success: function(posts_api_read) {
			
						if (posts_api_read == null) {
							// TODO: produce some suitable error message
						} else {
							//$this.empty();
							var postsBuffer = "";
							$.each(posts_api_read, function(i, post){
								if (i > options.maxNumberOfPosts) {
									return false;
								}

								var timestamp = post["created_at"];
								if (isNaN(Date.parse(timestamp))) {
									// must be IE, let's do something
									var tzRegex = /(\+[0-9]{4}\s)/ig;
									timestamp = timestamp.replace(tzRegex,"");
								}
								var postDate = new Date(timestamp);
								var dateHtml = "";
								dateHtml = "<span class=\"timeago\">"+prettyDate(iso8601(postDate))+"</span>";
								postsBuffer += "<div class=\"post\">" + parseFunctions["regular"].apply(this, [post]) + "<div class=\"postDate\"><a target=\"_blank\" href=\"http://twitter.com/"+post.user.screen_name+"/status/"+post.id_str+"\">" + dateHtml + "</a> · <a target=\"_blank\" href=\"http://twitter.com/intent/tweet?in_reply_to="+post.id_str+"\">reply</a> · <a target=\"_blank\" href=\"http://twitter.com/intent/retweet?tweet_id="+post.id_str+"\">retweet</a> · <a target=\"_blank\" href=\"http://twitter.com/intent/favorite?tweet_id="+post.id_str+"\">favourite</a></div></div>";
							});
							$this.append("<div class=\"posts\">"+postsBuffer+"</div>");
						}
					},
					error: function() {}

				});
		});
	}

	$.fn.yajqtwitter.defaults = {
		linkify: true,
        	maxNumberOfPosts: 5,
		username: 'andyroberts_uk',
		includeRetweets: true
	}; 

})(jQuery);
