const t=document.querySelector("[data-start]"),e=document.querySelector("[data-stop]");e.disabled=!0;const d=document.body;let n=null;function a(){const t=`#${Math.floor(16777215*Math.random()).toString(16).padStart(6,0)}`;d.style.backgroundColor=t}t.addEventListener("click",(function(){t.disabled=!0,e.disabled=!1,a(),n=setInterval((()=>{a()}),1e3)})),e.addEventListener("click",(function(){t.disabled=!1,e.disabled=!0,clearInterval(n)}));
//# sourceMappingURL=01-color-switcher.5227ab00.js.map