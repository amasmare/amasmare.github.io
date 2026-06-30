(function(){var c=document.getElementById('net-canvas');if(!c)return;var ctx=c.getContext('2d'),W,H,nodes=[],N=42,D=150;
function rs(){W=c.width=innerWidth;H=c.height=innerHeight;}rs();window.addEventListener('resize',function(){rs();init();});
function Nd(){this.x=Math.random()*W;this.y=Math.random()*H;this.vx=(Math.random()-.5)*.35;this.vy=(Math.random()-.5)*.35;this.r=Math.random()*2+1.5;this.g=Math.random()<.12;}
function init(){nodes=[];for(var i=0;i<N;i++)nodes.push(new Nd());}init();
function draw(){ctx.clearRect(0,0,W,H);for(var i=0;i<nodes.length;i++){var a=nodes[i];for(var j=i+1;j<nodes.length;j++){var b=nodes[j],dx=a.x-b.x,dy=a.y-b.y,d=Math.sqrt(dx*dx+dy*dy);if(d<D){ctx.beginPath();ctx.strokeStyle='rgba(0,150,80,'+(1-d/D)*.3+')';ctx.lineWidth=.7;ctx.moveTo(a.x,a.y);ctx.lineTo(b.x,b.y);ctx.stroke();}}}
for(var i=0;i<nodes.length;i++){var n=nodes[i];ctx.beginPath();ctx.arc(n.x,n.y,n.r,0,Math.PI*2);ctx.fillStyle=n.g?'rgba(201,162,39,.6)':'rgba(0,150,80,.45)';ctx.fill();n.x+=n.vx;n.y+=n.vy;if(n.x<0||n.x>W)n.vx*=-1;if(n.y<0||n.y>H)n.vy*=-1;}requestAnimationFrame(draw);}draw();})();

