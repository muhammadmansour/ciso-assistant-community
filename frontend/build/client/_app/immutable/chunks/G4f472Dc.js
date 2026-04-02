function r(e,t="en-US"){if(typeof e!="string")return e;const a=e.includes("T"),n=new Date(e);return a?n.toLocaleString(t):n.toLocaleDateString(t)}export{r as f};
