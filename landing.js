'use strict';
(()=>{
const root=document.getElementById('tickerclue-page');
const chart=root.querySelector('.tc-comparison-chart');
const series=[
 {name:'NVIDIA',color:'var(--tc-blue)',values:[0,.09,.04,.2,.15,.32,.25,.45,.38,.6,.52,.74,.67,.87,.77,1]},
 {name:'Microsoft',color:'var(--tc-yellow)',values:[0,.03,-.03,.09,.06,.18,.12,.27,.2,.34,.29,.45,.38,.51,.47,.65]},
 {name:'Apple',color:'var(--tc-pink)',values:[0,-.04,.02,.05,-.02,.08,.04,.15,.1,.21,.14,.27,.22,.36,.31,.43]}
];
function drawComparison(){
 const width=chart.getBoundingClientRect().width,height=125,left=4,right=width-76,top=10,bottom=112;
 chart.setAttribute('viewBox',`0 0 ${width} ${height}`);
 const y=v=>bottom-(v+.08)/1.65*(bottom-top);
 chart.innerHTML=[.1,.45,.8].map(v=>`<path d="M${left} ${y(v)}H${right}" stroke="var(--tc-line)" fill="none"/>`).join('')+series.map(s=>{
  const endY=y(s.values.at(-1));
  const points=s.values.map((v,i)=>`${i?'L':'M'}${left+i/(s.values.length-1)*(right-left)} ${y(v)}`).join(' ');
  return `<path d="${points}" stroke="${s.color}" stroke-width="1.7" stroke-opacity=".62" stroke-linejoin="round" fill="none"/><circle cx="${right}" cy="${endY}" r="2" fill="${s.color}" fill-opacity=".65"/><text x="${right+8}" y="${endY+4}" fill="var(--tc-muted)" font-family="Arial,sans-serif" font-size="11">${s.name}</text>`;
 }).join('');
}
new ResizeObserver(drawComparison).observe(chart);
drawComparison();


})();
