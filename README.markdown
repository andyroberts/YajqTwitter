# YajqTwitter - Yet another jQuery Twitter plugin

## Description

YajqTwitter is a jQuery plugin for retrieving tweets via the official Twitter API.
The objective was to emulate Twitter's Profile Widget, but with this plugin you
get even more flexibility. And with CSS it's possible customize the appearance too.

## Usage

1\. Link to required Javascript files. Naturally, as it's a jQuery plugin, you'll need to link to jQuery too.

```html
...
<script type="text/javascript" src="http://ajax.googleapis.com/ajax/libs/jquery/1.6.1/jquery.min.js"></script>
<script type="text/javascript" src="yajqtwitter.js"></script>
...
```

2\. Insert the following Javascript: 

```html
  <script type="text/javascript">
    $(document).ready(function(){
      $('#twitterFeed').yajqtwitter({username: 'your_twitter_username'});
    });
  </script>
```

3\. Ensure the selector exists. In this instance you need to place the following HTML into the document body:

```html
  <div id="twitterFeed"></div>
```

YajqTwitter will populate this div will the items from your specified Twitter feed.

By default it will retrieve five tweets from the specified feed. To change this value, set the 'maxNumberOfPosts' option too, e.g.:

```html
  $('#twitterFeed').yajqtwitter({username: 'your_twitter_username', maxNumberOfPosts: 10});
```

See twitter_test.html for sample use and styling.

## Options

* linkify: true (converts URLs, twitter screen names and hashtags into hyperlinks)
* maxNumberOfPosts: 5 (specifies upper limit of posts to display)
* includeRetweets: true (choose whether the timeline includes retweets)

## Roadmap

1. Use setInterval to check with Twitter for new tweets.

## Author

Andrew Roberts

Twitter: [@andyroberts_uk](http://twitter.com/andyroberts_uk)

Web: http://www.andy-roberts.net

Github: https://github.com/andyroberts

## License

(c) 2012 Andrew Roberts

Released under the [MIT License](http://www.opensource.org/licenses/mit-license.php). 

