(function($) {

	$.fn.yajqtwitter = function(options) { 

		options = $.extend({}, $.fn.yajqtwitter.defaults, options);

		var parseFunctions = {
			'regular': function parseRegular(post) {
				var bodyString = post['text'];
			
				return "<div class=\"post-body\">" + bodyString + "</div>";
			},
		};

		var zeropad = function (num) {
		  return ((num < 10) ? '0' : '') + num;
		};
		
		var iso8601 = function (date) {
		  return date.getUTCFullYear()
		    + "-" + zeropad(date.getUTCMonth()+1)
		    + "-" + zeropad(date.getUTCDate())
		    + "T" + zeropad(date.getUTCHours())
		    + ":" + zeropad(date.getUTCMinutes())
		    + ":" + zeropad(date.getUTCSeconds()) + "Z";
		};
		

		return this.each(function() {
				var $this = $(this);
				$.ajax({
					type:'GET',
					dataType: "jsonp",
					data: "screen_name="+options.username+"&count="+options.maxNumberOfPosts,
					url:"http://api.twitter.com/1/statuses/user_timeline.json",
					success: function(posts_api_read) {
			
						if (posts_api_read == null) {
							// TODO: produce some suitable error message
						} else {
							$this.empty();
							var postsBuffer = "";
							$.each(posts_api_read, function(i, post){
								if (i >= options.maxNumberOfPosts) {
									return false;
								}
								var postDate = new Date(post["created_at"]);
								var dateHtml = "";
								if (jQuery().timeago) {
									dateHtml = "<span class=\"timeago\" title=\""+iso8601(postDate)+"\">"+jQuery.timeago(postDate)+"</span>";
								} else {
									dateHtml = "<span>"+postDate.toDateString()+"</span>";
								}
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
        	maxNumberOfPosts: 5,
		username: 'andyroberts_uk'
	}; 

})(jQuery);
