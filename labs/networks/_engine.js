function switchTab(btn,id){
  var cs=document.querySelectorAll('.tab-content');
  for(var i=0;i<cs.length;i++)cs[i].classList.remove('active');
  var t=document.getElementById('tab'+id);if(t)t.classList.add('active');
  var bs=document.querySelectorAll('.tab-btn');
  for(var j=0;j<bs.length;j++)bs[j].classList.remove('active');
  if(btn)btn.classList.add('active');
}

/* مطابقة */
var mSel=null,mDone=0;
function buildMatch(){
  if(typeof MATCH==='undefined'||!MATCH.length)return;
  mSel=null;mDone=0;
  var right=MATCH.slice().sort(function(){return Math.random()-0.5;});
  document.getElementById('m-left').innerHTML=MATCH.map(function(d,i){return '<div class="match-item" id="ml-'+i+'" onclick="mPickL('+i+')">'+d.a+'</div>';}).join('');
  document.getElementById('m-right').innerHTML=right.map(function(d,i){return '<div class="match-item" id="mr-'+i+'" data-b="'+encodeURIComponent(d.b)+'" onclick="mPickR('+i+')">'+d.b+'</div>';}).join('');
  document.getElementById('m-score').textContent='تمت المطابقة: 0 / '+MATCH.length;
  document.getElementById('m-feedback').innerHTML='';
}
function mPickL(i){var l=document.querySelectorAll('#m-left .match-item');for(var k=0;k<l.length;k++)l[k].classList.remove('selected');document.getElementById('ml-'+i).classList.add('selected');mSel=i;}
function mPickR(i){
  if(mSel===null)return;
  var r=document.getElementById('mr-'+i),b=decodeURIComponent(r.getAttribute('data-b'));
  if(b===MATCH[mSel].b){
    var l=document.getElementById('ml-'+mSel);l.classList.remove('selected');l.classList.add('matched');l.style.pointerEvents='none';
    r.classList.add('matched');r.style.pointerEvents='none';mDone++;
    document.getElementById('m-score').textContent='تمت المطابقة: '+mDone+' / '+MATCH.length;
    if(mDone===MATCH.length)document.getElementById('m-feedback').innerHTML='<div class="alert alert-success">🎉 ممتاز! طابقت الكل بشكل صحيح.</div>';
  }else{
    var l2=document.getElementById('ml-'+mSel);l2.classList.add('wrong-match');r.classList.add('wrong-match');
    (function(l2,r){setTimeout(function(){l2.classList.remove('wrong-match','selected');r.classList.remove('wrong-match');},700);})(l2,r);
  }
  mSel=null;
}

/* تصنيف */
function buildTable(){
  if(typeof TABLE==='undefined'||!TABLE.length)return;
  document.getElementById('t-tbody').innerHTML=TABLE.map(function(d,i){
    return '<tr id="tr-'+i+'"><td style="font-weight:600">'+d.item+'</td><td><select id="ts-'+i+'"><option value="">-- اختر --</option>'+d.opts.map(function(o){return '<option value="'+o+'">'+o+'</option>';}).join('')+'</select></td><td id="tc-'+i+'" style="font-size:.8rem"></td></tr>';
  }).join('');
  document.getElementById('t-feedback').innerHTML='';
}
function checkTable(){
  var ok=0;
  TABLE.forEach(function(d,i){
    var s=document.getElementById('ts-'+i),row=document.getElementById('tr-'+i),c=document.getElementById('tc-'+i);
    if(!s.value){c.textContent='—';row.className='';return;}
    if(s.value===d.ans){ok++;row.className='correct-row';c.innerHTML='<span style="color:#065f46">✓ صحيح</span>';}
    else{row.className='wrong-row';c.innerHTML='<span style="color:#7f1d1d">✗ الصحيح: '+d.ans+'</span>';}
  });
  document.getElementById('t-feedback').innerHTML='<div class="alert '+(ok===TABLE.length?'alert-success':'alert-warn')+'">النتيجة: '+ok+' / '+TABLE.length+'</div>';
}

/* سيناريوهات */
var sIdx=0,sOk=0;
function loadScenario(){
  if(typeof SCEN==='undefined'||!SCEN.length)return;
  var s=SCEN[sIdx];
  document.getElementById('s-num').textContent='السيناريو '+(sIdx+1)+' من '+SCEN.length;
  document.getElementById('s-q').textContent=s.q;
  document.getElementById('s-feedback').innerHTML='';
  document.getElementById('s-next').style.display='none';
  document.getElementById('s-options').innerHTML=s.opts.map(function(o){return '<div class="scenario-card" onclick="pickScenario(\''+o.n+'\')"><div class="scenario-icon">'+o.i+'</div><div class="scenario-name">'+o.n+'</div><div class="scenario-desc">'+o.d+'</div></div>';}).join('');
  document.getElementById('s-score').textContent='النتيجة: '+sOk+' / '+Math.min(sIdx,SCEN.length);
}
function pickScenario(ch){
  var s=SCEN[sIdx],cards=document.querySelectorAll('#s-options .scenario-card');
  for(var k=0;k<cards.length;k++){cards[k].style.pointerEvents='none';var nm=cards[k].querySelector('.scenario-name').textContent;if(nm===s.ans)cards[k].classList.add('selected');else if(nm===ch&&ch!==s.ans)cards[k].classList.add('wrong');}
  if(ch===s.ans)sOk++;
  document.getElementById('s-feedback').innerHTML='<div class="alert '+(ch===s.ans?'alert-success':'alert-danger')+'">'+(ch===s.ans?'✅ صحيح! ':'❌ غير صحيح. ')+s.explain+'</div>';
  document.getElementById('s-next').style.display='inline-block';
  document.getElementById('s-score').textContent='النتيجة: '+sOk+' / '+(sIdx+1);
}
function nextScenario(){
  sIdx++;
  if(sIdx>=SCEN.length){
    document.getElementById('s-options').innerHTML='';document.getElementById('s-q').textContent='';
    document.getElementById('s-num').textContent='اكتمل القسم!';
    document.getElementById('s-feedback').innerHTML='<div class="alert alert-success">حصلت على '+sOk+'/'+SCEN.length+'.<br><button class="btn btn-ghost btn-sm" onclick="sIdx=0;sOk=0;loadScenario()" style="margin-top:10px">إعادة المحاولة</button></div>';
    return;
  }
  loadScenario();
}

/* الاختبار */
var qScore=0,qAns=0;
function buildQuiz(){
  if(typeof QUIZ==='undefined'||!QUIZ.length)return;
  document.getElementById('quiz-container').innerHTML=QUIZ.map(function(q,i){return '<div class="quiz-q" id="qq-'+i+'"><p>'+(i+1)+'. '+q.q+'</p>'+q.opts.map(function(o,j){return '<button class="quiz-opt" onclick="answerQuiz('+i+','+j+')">'+o+'</button>';}).join('')+'<div id="qfb-'+i+'" style="margin-top:6px"></div></div>';}).join('');
}
function answerQuiz(qi,oi){
  var q=QUIZ[qi],btns=document.querySelectorAll('#qq-'+qi+' .quiz-opt');
  for(var k=0;k<btns.length;k++)btns[k].disabled=true;
  btns[q.ans].classList.add('correct');
  if(oi!==q.ans)btns[oi].classList.add('incorrect');else qScore++;
  qAns++;
  document.getElementById('qfb-'+qi).innerHTML='<div class="alert '+(oi===q.ans?'alert-success':'alert-danger')+'" style="font-size:.82rem">'+(oi===q.ans?'✅ صحيح! ':'❌ غير صحيح. ')+q.exp+'</div>';
  document.getElementById('quiz-score').textContent='النتيجة: '+qScore+' / '+QUIZ.length;
  document.getElementById('quiz-prog').style.width=(qAns/QUIZ.length*100)+'%';
  if(qAns===QUIZ.length){
    var pct=Math.round(qScore/QUIZ.length*100);
    localStorage.setItem(LAB_ID,JSON.stringify({score:qScore,total:QUIZ.length,pct:pct}));
    document.getElementById('stotal').textContent=qScore+'/'+QUIZ.length;
    document.getElementById('quiz-container').insertAdjacentHTML('beforeend','<div class="alert '+(pct>=90?'alert-success':pct>=60?'alert-warn':'alert-danger')+'" style="margin-top:20px;font-weight:700">🎓 انتهى الاختبار! نتيجتك: '+qScore+'/'+QUIZ.length+' ('+pct+'%) — '+(pct>=90?'ممتاز 🏆':pct>=75?'جيد جداً ⭐':pct>=60?'جيد ✓':'يحتاج مراجعة 📖')+'<br><a href="index.html" style="color:var(--accent);font-size:.85rem;display:inline-block;margin-top:8px">← العودة للمختبرات</a></div>');
  }
}
function resetAll(){localStorage.removeItem(LAB_ID);location.reload();}
function saveScore(){if(qAns>0){var pct=Math.round(qScore/QUIZ.length*100);localStorage.setItem(LAB_ID,JSON.stringify({score:qScore,total:QUIZ.length,pct:pct}));document.getElementById('stotal').textContent=qScore+'/'+QUIZ.length;}}

/* حاسبة التقسيم */
function ipToInt(ip){return ip.split('.').reduce(function(a,o){return(a<<8)+(+o);},0)>>>0;}
function intToIp(n){return [24,16,8,0].map(function(s){return(n>>>s)&255;}).join('.');}
function calcSubnet(){
  var el=document.getElementById('ip-in');if(!el)return;
  var ip=el.value.trim(),p=parseInt(document.getElementById('pfx-in').value,10),out=document.getElementById('calc-out');
  var parts=ip.split('.');
  if(parts.length!==4||parts.some(function(o){return o===''||isNaN(o)||+o<0||+o>255;})||isNaN(p)||p<1||p>32){out.innerHTML='<div class="alert alert-danger">⚠️ أدخل عنوان IP صحيحاً وبادئة بين 1 و32.</div>';return;}
  var mask=p===0?0:(0xFFFFFFFF<<(32-p))>>>0,ipi=ipToInt(ip),net=(ipi&mask)>>>0,bc=(net|(~mask>>>0))>>>0;
  var hosts=p>=31?0:Math.pow(2,32-p)-2,first=p>=31?net:net+1,last=p>=31?bc:bc-1;
  out.innerHTML='<table><tr><td style="font-weight:600">القناع (Mask)</td><td>'+intToIp(mask)+' (/'+p+')</td></tr>'+
    '<tr><td style="font-weight:600">عنوان الشبكة</td><td>'+intToIp(net)+'</td></tr>'+
    '<tr><td style="font-weight:600">عنوان البث</td><td>'+intToIp(bc)+'</td></tr>'+
    '<tr><td style="font-weight:600">أول مضيف صالح</td><td>'+(hosts?intToIp(first):'—')+'</td></tr>'+
    '<tr><td style="font-weight:600">آخر مضيف صالح</td><td>'+(hosts?intToIp(last):'—')+'</td></tr>'+
    '<tr><td style="font-weight:600">عدد المضيفين الصالحين</td><td style="color:var(--accent);font-weight:700">'+hosts+'</td></tr></table>';
}

/* تشغيل */
buildMatch();buildTable();loadScenario();buildQuiz();
(function(){var s=JSON.parse(localStorage.getItem(LAB_ID)||'null');if(s&&document.getElementById('stotal'))document.getElementById('stotal').textContent=s.score+'/'+s.total;})();
(function(){var c=document.getElementById('net-canvas');if(!c)return;var ctx=c.getContext('2d'),W,H,nodes=[],N=42,D=150;
function rs(){W=c.width=innerWidth;H=c.height=innerHeight;}rs();window.addEventListener('resize',function(){rs();init();});
function Nd(){this.x=Math.random()*W;this.y=Math.random()*H;this.vx=(Math.random()-.5)*.35;this.vy=(Math.random()-.5)*.35;this.r=Math.random()*2+1.5;this.g=Math.random()<.12;}
function init(){nodes=[];for(var i=0;i<N;i++)nodes.push(new Nd());}init();
function draw(){ctx.clearRect(0,0,W,H);for(var i=0;i<nodes.length;i++){var a=nodes[i];for(var j=i+1;j<nodes.length;j++){var b=nodes[j],dx=a.x-b.x,dy=a.y-b.y,d=Math.sqrt(dx*dx+dy*dy);if(d<D){ctx.beginPath();ctx.strokeStyle='rgba(0,150,80,'+(1-d/D)*.3+')';ctx.lineWidth=.7;ctx.moveTo(a.x,a.y);ctx.lineTo(b.x,b.y);ctx.stroke();}}}
for(var i=0;i<nodes.length;i++){var n=nodes[i];ctx.beginPath();ctx.arc(n.x,n.y,n.r,0,Math.PI*2);ctx.fillStyle=n.g?'rgba(201,162,39,.6)':'rgba(0,150,80,.45)';ctx.fill();n.x+=n.vx;n.y+=n.vy;if(n.x<0||n.x>W)n.vx*=-1;if(n.y<0||n.y>H)n.vy*=-1;}requestAnimationFrame(draw);}draw();})();

