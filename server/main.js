import { Meteor } from 'meteor/meteor';

Meteor.startup(() => {
	var page=
	{
		url:"",
		title:"",
		desc:""
	};
	var cheerio=Npm.require('cheerio');
	var title="";
	var desc="";
  // code to run on server at startup
  Meteor.methods(

	{
		testHTTP:function(v)
		{
			title="";
			desc="";
			this.unblock();
			var res=HTTP.get(v);
			//page.title=res.content;
			$=cheerio.load(res.content);
			//console.log($('title').html());
			//For title
			if($('title').html()!=undefined)
			{
				title=$('title').html();
				console.log("1");
			}
			else if($('meta[name=\"twitter:title\"]').attr("content")!=undefined)
			{
				title=$('meta[name=\"twitter:title\"]').attr("content")
				console.log("2");
			}
			else if($('meta[property=\"og:title\"]').attr("content")!=undefined)
			{
				title=$('meta[property=\"og:title\"]').attr("content");
				console.log("3");
			}
			else if($('meta[name=\"og:title\"]').attr("content")!=undefined)
			{
				title=$('meta[name=\"og:title\"]').attr("content")
				console.log("4");
			}
				
			//For description
			if($('meta[name=\"twitter:description\"]').attr("content")!=undefined)
			{
				desc=$('meta[name=\"twitter:description\"]').attr("content");
				console.log("1");
			}
			else if($('meta[property=\"og:description\"]').attr("content")!=undefined)
			{
				desc=$('meta[property=\"og:description\"]').attr("content");
				console.log("2");
			}
			else if($('meta[name=\"description\"]').attr("content")!=undefined)
			{
				desc=$('meta[name=\"description\"]').attr("content");
				console.log("3");
			}
			else if($('meta[name=\"Description\"]').attr("content")!=undefined)
			{
				desc=$('meta[name=\"Description\"]').attr("content");
				console.log("4");
			}
				



			page.title=title;
			page.desc=desc;
			return page;
		}	

	}


	)




});
