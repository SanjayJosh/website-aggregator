Accounts.ui.config({
	passwordSignupFields:"USERNAME_AND_EMAIL"
});
Router.configure({
    layoutTemplate: 'layout'
});
//Put permit : :
Router.route('/',function()
{
	this.render('top',
	{
		to:"top"

	});
	this.render('navbar',
	{
		to:"navbar"

	});
	this.render('putpermit',
	{
		to:"putpermit"

	});
	this.render('list',
	{
		to:"main"

	});
});
Router.route('/:_id',function()
{
	$("html , body").animate({scrollTop:0},0);
	this.render('top',
	{
		to:"top"

	});
	this.render('navbar2',
	{
		to:"navbar"

	});
	this.render('details',
	{
		to:"main",
		data:function()
		{
			return Webpages.findOne({_id:this.params._id});
		}
	})
});





Template.putpermit.helpers(
  			
			{
				getUser:function()
				{
					if(Meteor.user())
					{
						console.log("Username is :"+Meteor.user().emails[0].address);
						return Meteor.user().username;
					}
					return "Yaaro ?"
				}
			}

,
);
Template.putpermit.events(

	{
		'submit .js-add':function(event)
		{
			var date=new Date()
			var url=event.target.url.value;
			var title=event.target.title.value;
			var desc=event.target.desc.value;
			console.log("Url :"+event.target.url.value);
			
			//console.log("Title :"+event.target.title.value);
			if(title==""||desc=="")
			{

				Meteor.call('testHTTP',url,res={node:""},function(error,result)
				{
					//result;
					console.log("Scrape title:"+result.title);
					console.log("Scrape desc:"+result.desc);
					if(title=="")
						title=result.title;
					if(desc=="")
						desc=result.desc;
					Webpages.insert(
							{
								"url":url,
								"title":title,
								"desc":desc,
								"createdOn":date,
								"createdBy":Meteor.user()._id,
								"votes":0


							}

						);
					console.log(Webpages.find({}).count());
				});
				//console.log("Scrape title:"+vf.title);
				//console.log("Scrape desc:"+vf.desc);
			}	


			$('#myModal').modal('hide');
			return false;
		}
	}


);



Template.list.helpers(
	{
		pages:function()
		{
			if(Session.get("userFilter"))
			return Webpages.find({createdBy:Session.get("userFilter")},{sort:{votes:-1,createdOn:-1}});


			return Webpages.find({},{sort:{votes:-1,createdOn:-1}});
		}
		,
	
		display:function(name)
		{
			if(Meteor.users.findOne({_id:name})!=undefined)
			return Meteor.users.findOne({_id:name}).username;
		}
	
	}


);

Template.list.events(

	{
		'click .js-pressup':function(event)
		{
			//console.log(this);
			//console.log(event);
			var post_id=this._id;
			var user_id=Meteor.user()._id;
			var votes=Webpages.findOne({"_id":post_id}).votes;
			if(Upvotes.find({"post_id":post_id,"user_id":user_id}).count()==0)
			{
				console.log("Hello");
				Upvotes.insert({"post_id":post_id,"user_id":user_id});
				votes=votes+1;
				Webpages.update({"_id":post_id},{$set:{"votes":votes}});
			}
			else if(Upvotes.find({"post_id":post_id,"user_id":user_id}).count()==1)
			{
				console.log("Poda");
				Upvotes.remove({"_id":Upvotes.findOne({"post_id":post_id,"user_id":user_id})._id});
				votes=votes-1;
				Webpages.update({"_id":post_id},{$set:{"votes":votes}});
				console.log(Upvotes.find({"post_id":post_id,"user_id":user_id}).count())
			}	
			//

			//var or= parseInt($('#'+post_id+' .up').html())+1;
			//$('#'+post_id+' .up').html(or);



		},
		'click .js-pressdown':function(event)
		{
			console.log(this._id);
			var post_id=this._id;
			var user_id=Meteor.user()._id;
			var votes=Webpages.findOne({"_id":post_id}).votes;
			if(Downvotes.find({"post_id":post_id,"user_id":user_id}).count()==0)
			{
				console.log("Hello");
				Downvotes.insert({"post_id":post_id,"user_id":user_id});
				votes=votes-1;
				Webpages.update({"_id":post_id},{$set:{"votes":votes}});
			}
			else if(Downvotes.find({"post_id":post_id,"user_id":user_id}).count()==1)
			{
				console.log("Poda");
				Downvotes.remove({"_id":Downvotes.findOne({"post_id":post_id,"user_id":user_id})._id});
				votes=votes+1;
				Webpages.update({"_id":post_id},{$set:{"votes":votes}});
				console.log(Downvotes.find({"post_id":post_id,"user_id":user_id}).count())
			}


			//var or= parseInt($('#'+post_id+' .down').html())-1;
			//$('#'+post_id+' .down').html(or);

		},
		'click .user-filter':function()
		{
			Session.set("userFilter",this.createdBy);
		}
	}
);	
Template.list.helpers(
  			
			{
				notempty:function()
				{
					return Webpages.find({}).count()>0;
				},
				ups:function(id)
				{
					return Upvotes.find({"post_id":id}).count()
				}
				,
				downs:function(id)
				{
					return Downvotes.find({"post_id":id}).count()
				},
				tally:function(id)
				{
					return Webpages.findOne({"_id":id}).votes
				}

			}
);	

Template.navbar.events(
  			
			{
				'click .unset-filter':function()
				{
					console.log("Unset bro");
					Session.set("userFilter",undefined);
					//$('body').scrollTop(500)
					//$('html').scrollTop(500)
					$("html , body").animate({scrollTop:0},500)
					return false;
				}
			}
);		
Template.navbar2.events(
  			
			{
				'click .unset-filter':function()
				{
					console.log("Unset bro");
					Session.set("userFilter",undefined);
					//$('body').scrollTop(500)
					//$('html').scrollTop(500)
					$("html , body").animate({scrollTop:0},0)
					return true;
				}
			}
);				


Template.details.helpers(
{

		display:function(name)
		{
			if(Meteor.users.findOne({_id:name})!=undefined)
			return Meteor.users.findOne({_id:name}).username;
		},
		ups:function(id)
		{
			return Upvotes.find({"post_id":id}).count()
		}
		,
		downs:function(id)
		{
			return Downvotes.find({"post_id":id}).count()
		},
		tally:function(id)
		{
			return Webpages.findOne({"_id":id}).votes
		},
		comment:function(id)
		{
			return Comments.find({"webpage":id},{sort:{createdOn:-1}});
		},

	
}


);


Template.details.events(
{
	'click .js-pressup':function(event)
	{
		//console.log(this);
		//console.log(event);
		var post_id=this._id;
		var user_id=Meteor.user()._id;
		var votes=Webpages.findOne({"_id":post_id}).votes;
		if(Upvotes.find({"post_id":post_id,"user_id":user_id}).count()==0)
		{
			console.log("Hello");
			Upvotes.insert({"post_id":post_id,"user_id":user_id});
			votes=votes+1;
			Webpages.update({"_id":post_id},{$set:{"votes":votes}});
		}
		else if(Upvotes.find({"post_id":post_id,"user_id":user_id}).count()==1)
		{
			console.log("Poda");
			Upvotes.remove({"_id":Upvotes.findOne({"post_id":post_id,"user_id":user_id})._id});
			votes=votes-1;
			Webpages.update({"_id":post_id},{$set:{"votes":votes}});
			console.log(Upvotes.find({"post_id":post_id,"user_id":user_id}).count())
		}	
		//

		//var or= parseInt($('#'+post_id+' .up').html())+1;
		//$('#'+post_id+' .up').html(or);



	},
	'click .js-pressdown':function(event)
	{
		console.log(this._id);
		var post_id=this._id;
		var user_id=Meteor.user()._id;
		var votes=Webpages.findOne({"_id":post_id}).votes;
		if(Downvotes.find({"post_id":post_id,"user_id":user_id}).count()==0)
		{
			console.log("Hello");
			Downvotes.insert({"post_id":post_id,"user_id":user_id});
			votes=votes-1;
			Webpages.update({"_id":post_id},{$set:{"votes":votes}});
		}
		else if(Downvotes.find({"post_id":post_id,"user_id":user_id}).count()==1)
		{
			console.log("Poda");
			Downvotes.remove({"_id":Downvotes.findOne({"post_id":post_id,"user_id":user_id})._id});
			votes=votes+1;
			Webpages.update({"_id":post_id},{$set:{"votes":votes}});
			console.log(Downvotes.find({"post_id":post_id,"user_id":user_id}).count())
		}


		//var or= parseInt($('#'+post_id+' .down').html())-1;
		//$('#'+post_id+' .down').html(or);

	},
	'submit .js-add-comment':function(event)
	{
		var comm=event.target.comm.value;
		var user=Meteor.user()._id;
		if(comm!="")
		{
			var date=new Date();
			
			Comments.insert(
			{
				"webpage":this._id,
				"data":comm,
				"createdBy":user,
				"createdOn":date,

			});
			
			console.log(this._id+" "+comm+"   "+user+" "+Comments.findOne({})._id);	
		}
		event.target.comm.value="";
		return false;
	},
	display:function(name)
	{
		if(Meteor.users.findOne({_id:name})!=undefined)
		return Meteor.users.findOne({_id:name}).username;
	},


});