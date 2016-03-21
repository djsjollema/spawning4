var Enemy = {
	x:0,
	y:0,
	xspeed:0,
	yspeed:1,
	w:10,
	h:10,
	img:0,
	update:function(){
		this.y += this.yspeed;
	},
	draw:function(context,img){
		this.width = this.img.width;
		context.drawImage(img,this.x,this.y,this.w,this.h);
		
	}
}