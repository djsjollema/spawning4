var Enemy = {
	x:0,
	y:0,
	xspeed:0,
	yspeed:1,
	w:10,
	h:10,
	setImage:function(imageURL){
		this.img = new Image();
		this.img.src = imageURL;
		this.img.addEventListener('load', this.imageLoaded.bind(this));
	},
	imageLoaded: function(){
		console.log('image loaded');
	},
	update:function(){
		this.y += this.yspeed;
	}
}