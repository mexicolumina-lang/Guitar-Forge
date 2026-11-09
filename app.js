/* GUITAR FORGE — Vanilla JS PWA */
(() => {
  "use strict";
  const $ = (s, r=document) => r.querySelector(s);
  const $$ = (s, r=document) => [...r.querySelectorAll(s)];
  const STORE = "guitar-forge-v1";
  const NOTES = ["C","C♯","D","D♯","E","F","F♯","G","G♯","A","A♯","B"];
  const TUNING = [4,11,7,2,9,4]; // high e to low E, pitch classes: E B G D A E
  const SCALE_INTERVALS = {
    minorPent:[0,3,5,7,10], majorPent:[0,2,4,7,9], major:[0,2,4,5,7,9,11],
    minor:[0,2,3,5,7,8,10], blues:[0,3,5,6,7,10], dorian:[0,2,3,5,7,9,10],
    mixolydian:[0,2,4,5,7,9,10]
  };
  const defaultTasks = ["Escala mayor en 3 tonalidades","Pentatónica con alternate picking","Bending de un tono afinado","Arpegio de tríada en 2 inversiones","Improvisación libre durante 5 minutos"];
  const courses = [
    {id:"fundamentals",category:"fundamentals",num:"01",title:"Fundamentos musicales",desc:"El alfabeto musical: notas, intervalos, tonos, semitonos y tonalidades.",level:"INICIACIÓN",lessons:6,duration:"45 MIN",body:`<h3>1. Las doce notas</h3><p>En la música occidental de uso común, la octava se divide en doce alturas cromáticas. En la guitarra, cada traste consecutivo representa un semitono. Por eso, si avanzas dos trastes, avanzas un tono.</p><p>Las notas naturales son C, D, E, F, G, A y B. Entre E–F y B–C hay un semitono natural; entre las demás notas naturales hay un tono.</p><div class="callout"><b>Regla práctica:</b> un traste = un semitono. Dos trastes = un tono. Memoriza primero las notas naturales de las cuerdas 6.ª y 5.ª.</div><h3>2. Intervalos</h3><p>Un intervalo mide la distancia entre dos notas. Se cuenta por grados: desde C hasta E hay una tercera mayor (4 semitonos); desde C hasta E♭ hay una tercera menor (3 semitonos).</p><ul><li>Unísono: 0 semitonos.</li><li>2.ª menor: 1; 2.ª mayor: 2.</li><li>3.ª menor: 3; 3.ª mayor: 4.</li><li>4.ª justa: 5; tritono: 6; 5.ª justa: 7.</li><li>6.ª menor: 8; 6.ª mayor: 9; 7.ª menor: 10; 7.ª mayor: 11.</li></ul><h3>3. Aplicación en guitarra</h3><p>En una misma cuerda, cada traste equivale a un semitono. En cuerdas contiguas, la forma visual cambia por la afinación estándar: la relación entre G y B es una tercera mayor, mientras que las demás parejas contiguas están afinadas a una cuarta justa.</p><h3>Práctica</h3><p>Elige una nota en la sexta cuerda. Di en voz alta su nombre y encuentra su octava dos cuerdas más agudas y dos trastes más arriba (excepto el ajuste necesario al cruzar la cuerda G–B). Repite por todo el mástil.</p><h3>Comprueba tu comprensión</h3><p>¿Cuántos semitonos hay en una tercera menor? ¿Qué intervalo forman siete semitonos? ¿Qué distancia hay entre E y F?</p>`},
    {id:"pentatonic",category:"scales",num:"02",title:"Pentatónica menor",desc:"Cinco notas, infinitas posibilidades. Aprende sus formas y conexión.",level:"INICIACIÓN",lessons:5,duration:"35 MIN",body:`<h3>1. Fórmula y sonido</h3><p>La pentatónica menor contiene cinco grados: 1, ♭3, 4, 5 y ♭7. En La menor: A, C, D, E y G. Su ausencia de semitonos internos entre grados vecinos hace que sea una escala muy flexible para rock, blues y metal.</p><div class="callout"><b>Fórmula interválica:</b> 0, 3, 5, 7, 10 semitonos desde la tónica.</div><h3>2. Primera posición en La</h3><p>Comienza en el traste 5 de la sexta cuerda. En esta posición, el índice toca el traste 5 y el meñique el 8 en las cuerdas sexta y primera. En las cuerdas centrales se usan trastes 5 y 7 con índice y anular.</p><h3>3. Cómo practicar</h3><ul><li>Empieza a 60 BPM con una nota por pulso.</li><li>Usa alternate picking: abajo-arriba de forma constante.</li><li>Practica ascendiendo y descendiendo sin detener el pulso.</li><li>Aísla los cambios de cuerda y busca movimientos mínimos.</li><li>Sube 4–5 BPM solo cuando tres repeticiones sean limpias y relajadas.</li></ul><h3>4. Musicalidad</h3><p>No practiques únicamente la escala de arriba abajo. Crea frases de tres o cuatro notas, deja silencios, repite motivos y resuelve en A o C sobre una base en Am. Añade bends hacia C o E y controla la afinación del bend.</p><h3>Errores frecuentes</h3><p>Evita apretar de más, levantar mucho los dedos, perder el alternate picking al cambiar de cuerda y tocar todas las notas con la misma intensidad.</p>`},
    {id:"intervals",category:"fundamentals",num:"03",title:"Intervalos en el mástil",desc:"Visualiza terceras, quintas, octavas y tensiones desde cualquier raíz.",level:"INICIACIÓN",lessons:4,duration:"30 MIN",body:`<h3>Entender la distancia</h3><p>Los intervalos son la base para construir acordes, escalas y melodías. Aprende tanto su sonido como su forma en el diapasón: una quinta justa suele estar a siete semitonos de la raíz; una octava, a doce.</p><h3>Ejercicio de visualización</h3><p>Elige una raíz en la sexta cuerda. Encuentra su quinta justa en la quinta cuerda dos trastes más arriba; encuentra su octava en la cuarta cuerda dos trastes más arriba. Comprueba cada nota contando semitonos.</p><div class="callout">La forma visual depende de la cuerda de partida. La afinación G–B desplaza ciertos patrones: no memorices una figura sin entender qué intervalo representa.</div><h3>Aplicación</h3><p>Toca una raíz y canta la tercera mayor, después la tercera menor. Alterna ambas para escuchar cómo cambia el carácter mayor/menor.</p>`},
    {id:"modes",category:"scales",num:"04",title:"Los siete modos griegos",desc:"Fórmulas, carácter, acordes asociados y usos musicales.",level:"INTERMEDIO",lessons:7,duration:"70 MIN",body:`<h3>Qué es un modo</h3><p>Un modo es una escala organizada alrededor de una nota principal y un conjunto particular de intervalos. Los siete modos derivados de la escala mayor comparten sus notas, pero cambian al cambiar el centro tonal y el contexto armónico.</p><ul><li><b>Jónico:</b> 1 2 3 4 5 6 7. Sonido mayor estable; acorde maj7.</li><li><b>Dórico:</b> 1 2 ♭3 4 5 6 ♭7. Menor con sexta mayor; m7.</li><li><b>Frigio:</b> 1 ♭2 ♭3 4 5 ♭6 ♭7. Color oscuro; m7(♭9) como contexto.</li><li><b>Lidio:</b> 1 2 3 ♯4 5 6 7. Mayor flotante; maj7(♯11).</li><li><b>Mixolidio:</b> 1 2 3 4 5 6 ♭7. Dominante; 7.</li><li><b>Eólico:</b> 1 2 ♭3 4 5 ♭6 ♭7. Menor natural; m7.</li><li><b>Locrio:</b> 1 ♭2 ♭3 4 ♭5 ♭6 ♭7. Semidisminuido; m7♭5.</li></ul><h3>Cómo escucharlos de verdad</h3><p>No basta con tocar C mayor desde D para decir que estás tocando D dórico. El acompañamiento debe establecer D como centro. Mantén un pedal o vamp de Dm7 y destaca la sexta mayor B para revelar el color dórico.</p><h3>Práctica guiada</h3><p>Selecciona una raíz, toca la fórmula lentamente y termina cada frase en la tónica. Después improvisa usando el acorde asociado como referencia. Compara D dórico con D eólico: la nota característica es B natural frente a B♭.</p>`},
    {id:"triads",category:"harmony",num:"05",title:"Tríadas y armonía",desc:"Construye acordes, inversiones y progresiones con sentido.",level:"INTERMEDIO",lessons:6,duration:"55 MIN",body:`<h3>Construcción de tríadas</h3><p>Una tríada se forma apilando terceras. Mayor: 1–3–5 (0, 4, 7 semitonos). Menor: 1–♭3–5 (0, 3, 7). Disminuida: 1–♭3–♭5 (0, 3, 6). Aumentada: 1–3–♯5 (0, 4, 8).</p><h3>Inversiones</h3><p>En posición fundamental la raíz está en el bajo. Primera inversión: la tercera es la nota más grave. Segunda inversión: la quinta es la nota más grave. Las inversiones permiten conectar acordes con movimientos mínimos.</p><h3>Aplicación en guitarra</h3><p>Practica tríadas de tres cuerdas en grupos 1–2–3, 2–3–4 y 3–4–5. Toca una progresión I–V–vi–IV y busca la inversión más cercana para cada acorde.</p><div class="callout">La armonía no es solo memorizar nombres: escucha qué nota cambia al pasar de mayor a menor y cómo la voz superior puede crear una melodía.</div>`},
    {id:"arpeggios",category:"harmony",num:"06",title:"Arpegios esenciales",desc:"Descompón acordes y conecta armonía con líneas melódicas.",level:"INTERMEDIO",lessons:5,duration:"50 MIN",body:`<h3>Arpegio y acorde</h3><p>Un arpegio toca las notas de un acorde de forma sucesiva. Para una tríada mayor: 1–3–5; menor: 1–♭3–5. Para un acorde maj7: 1–3–5–7; m7: 1–♭3–5–♭7.</p><h3>Rutina</h3><ul><li>Toca cada nota aislada y deja que suene limpia.</li><li>Practica grupos de tres cuerdas antes de ampliar.</li><li>Usa economy picking o sweep solo cuando el movimiento sea eficiente y controlado.</li><li>Invierte el arpegio y crea frases que resuelvan en notas del acorde.</li></ul><h3>Aplicación</h3><p>Sobre una progresión Am–F–C–G, apunta a notas del acorde en cada cambio. Esto hace que tus frases sigan la armonía en lugar de sonar como una escala genérica.</p>`},
    {id:"alternate",category:"technique",num:"07",title:"Alternate picking",desc:"Sincronización, economía de movimiento y control de articulación.",level:"INTERMEDIO",lessons:4,duration:"40 MIN",body:`<h3>Fundamento</h3><p>Alternate picking alterna golpes hacia abajo y hacia arriba de manera consistente. El objetivo es reducir movimientos innecesarios y sincronizar el ataque de la púa con la mano izquierda.</p><h3>Protocolo técnico</h3><ul><li>Comienza a 50–60 BPM con corcheas.</li><li>Mantén la púa cerca de la cuerda y evita tensión en hombro y antebrazo.</li><li>Practica una cuerda, luego dos y finalmente cruces de cuerda.</li><li>Graba una repetición para comprobar regularidad y ruido.</li></ul><div class="callout">No aumentes velocidad a costa de tensión o notas poco definidas. La velocidad útil es la que puedes repetir con control.</div><h3>Variación</h3><p>Practica patrones 1-2-3-4, 1-3-2-4 y grupos de tres notas por cuerda. Mantén el patrón de púa definido antes de acelerar.</p>`},
    {id:"legato",category:"technique",num:"08",title:"Legato y articulación",desc:"Hammer-ons, pull-offs y fluidez con control de volumen.",level:"INTERMEDIO",lessons:4,duration:"35 MIN",body:`<h3>Hammer-on</h3><p>Ataca una nota y coloca otro dedo con decisión en un traste superior sin volver a pulsar con la púa. El dedo cae cerca del traste, no encima de él.</p><h3>Pull-off</h3><p>Al retirar el dedo, realiza un pequeño movimiento lateral que haga vibrar la cuerda. No levantes el dedo verticalmente sin control: la nota siguiente debe sonar clara.</p><h3>Rutina</h3><p>En una cuerda, toca 5h7p5 lentamente. Iguala el volumen de las tres notas. Repite en las seis cuerdas y descansa si aparece fatiga.</p>`}
  ];

  let state = loadState();
  let metro = {running:false, timer:null, beat:0, audio:null, nextTime:0, taps:[]};
  let session = {running:false, started:0, elapsed:0, interval:null};

  function freshState(){return {name:"Guitar Player",goal:30,tasks:{},sessions:[],records:[],completedLessons:[],streak:0,lastPractice:""};}
  function loadState(){try{return {...freshState(),...JSON.parse(localStorage.getItem(STORE)||"{}")};}catch{return freshState();}}
  function save(){localStorage.setItem(STORE,JSON.stringify(state));renderDashboard();renderProfile();}
  function dateKey(d=new Date()){return d.getFullYear()+"-"+String(d.getMonth()+1).padStart(2,"0")+"-"+String(d.getDate()).padStart(2,"0");}
  function dayTasks(){if(!state.tasks[dateKey()])state.tasks[dateKey()]=defaultTasks.map((label,i)=>({id:String(i),label,done:false}));return state.tasks[dateKey()];}
  function toast(msg){const el=$("#toast");el.textContent=msg;el.classList.add("show");clearTimeout(toast.t);toast.t=setTimeout(()=>el.classList.remove("show"),2300);}
  function nav(name){$$(".view").forEach(v=>v.classList.toggle("active",v.id==="view-"+name));$$(".nav-item").forEach(b=>b.classList.toggle("active",b.dataset.nav===name));window.scrollTo({top:0,behavior:"smooth"});if(name==="academy")renderCourses();if(name==="tools")renderFretboards();if(name==="training")renderTraining();}
  $$("[data-nav]").forEach(b=>b.addEventListener("click",e=>{e.preventDefault();nav(b.dataset.nav);}));
  document.addEventListener("click",e=>{const b=e.target.closest("[data-action]");if(!b)return;const a=b.dataset.action;if(a==="start-session"){nav("tools");startTimer();}if(a==="open-lesson")openLesson(b.dataset.id);if(a==="shuffle-warmup")renderWarmup(true);if(a==="metro-toggle")toggleMetro();if(a==="bpm-up")setBpm(+$("#bpmSlider").value+1);if(a==="bpm-down")setBpm(+$("#bpmSlider").value-1);if(a==="tap-tempo")tapTempo();if(a==="timer-toggle")toggleTimer();if(a==="timer-reset")resetTimer();if(a==="export-data")exportData();});
  function renderDashboard(){
    const tasks=dayTasks(),done=tasks.filter(t=>t.done).length;
    $("#todayLabel").textContent=new Intl.DateTimeFormat("es-ES",{weekday:"short",day:"numeric",month:"short"}).format(new Date()).toUpperCase();
    const today=state.sessions.filter(s=>s.date===dateKey()).reduce((a,s)=>a+s.minutes,0);
    const now=new Date(),weekStart=new Date(now);weekStart.setDate(now.getDate()-((now.getDay()+6)%7));weekStart.setHours(0,0,0,0);
    const week=state.sessions.filter(s=>new Date(s.date+"T00:00:00")>=weekStart).reduce((a,s)=>a+s.minutes,0);
    $("#todayMinutes").innerHTML=`${today} <small>min</small>`;$("#weekMinutes").innerHTML=`${week} <small>min</small>`;$("#tasksDone").innerHTML=`${done} <small>/ ${tasks.length}</small>`;
    $("#streakCount").textContent=state.streak||0;
    $("#homeChecklist").innerHTML=tasks.slice(0,3).map(t=>`<label class="check-row ${t.done?"done":""}"><input type="checkbox" data-task="${t.id}" ${t.done?"checked":""}><span>${escapeHtml(t.label)}</span></label>`).join("");
    $("#homeProgress").style.width=(done/tasks.length*100)+"%";$("#homeProgressText").textContent=`${Math.round(done/tasks.length*100)}% completado`;
    $$("[data-task]").forEach(c=>c.addEventListener("change",()=>toggleTask(c.dataset.task,c.checked)));
  }
  function renderTraining(){
    const tasks=dayTasks(),done=tasks.filter(t=>t.done).length;
    $("#dailyChecklist").innerHTML=tasks.map(t=>`<label class="check-row ${t.done?"done":""}"><input type="checkbox" data-task="${t.id}" ${t.done?"checked":""}><span>${escapeHtml(t.label)}</span></label>`).join("");
    $("#trainingProgress").style.width=(done/tasks.length*100)+"%";$("#trainingProgressText").textContent=`${done} de ${tasks.length} completados`;
    $$("[data-task]").forEach(c=>c.addEventListener("change",()=>toggleTask(c.dataset.task,c.checked)));
    renderWarmup(false);renderExerciseBoard();
  }
  function toggleTask(id,checked){const t=dayTasks().find(x=>x.id===id);if(t)t.done=checked;save();renderTraining();}
  function renderWarmup(shuffle){
    const exercises=[["Spider walk","1-2-3-4 por cuerda, lento y uniforme.","2:00"],["Alternate picking","Cromatismos en una cuerda, púa alternada.","2:00"],["Legato controlado","5h7p5 en cada cuerda, volumen equilibrado.","1:30"],["String skipping","Salta una cuerda manteniendo precisión.","1:30"]];
    if(shuffle)exercises.sort(()=>Math.random()-.5);
    $("#warmupList").innerHTML=exercises.map((x,i)=>`<div class="warmup-item"><span class="warmup-index">0${i+1}</span><div><b>${x[0]}</b><small>${x[1]}</small></div><time>${x[2]}</time></div>`).join("");
  }
  function renderCourses(filter="all"){
    const list=courses.filter(c=>filter==="all"||c.category===filter);
    $("#courseList").innerHTML=list.map(c=>`<article class="course-card" data-course="${c.id}"><div class="course-number">${c.num}</div><h3>${c.title}</h3><p>${c.desc}</p><div class="course-meta"><span>${c.level}</span><span>${c.duration} ↗</span></div></article>`).join("");
    $$(".course-card").forEach(card=>card.addEventListener("click",()=>openLesson(card.dataset.course)));
  }
  $("#courseFilters").addEventListener("click",e=>{const b=e.target.closest("[data-filter]");if(!b)return;$$(".filter-chip").forEach(x=>x.classList.toggle("active",x===b));renderCourses(b.dataset.filter);});
  function openLesson(id){
    const c=courses.find(x=>x.id===id);if(!c)return;nav("academy");
    $("#lessonDetail").classList.remove("hidden");
    $("#lessonDetail").innerHTML=`<article class="panel"><div class="lesson-top"><div><p class="eyebrow">LECCIÓN ${c.num} · ${c.level}</p><h2>${c.title}</h2><p class="muted">${c.desc}</p></div><button class="text-btn" id="closeLesson">CERRAR ×</button></div><div class="lesson-content">${c.body}<h3>Diapasón de referencia</h3><p>Selecciona una raíz y explora las notas de esta familia de escala en el laboratorio de diapasón.</p><div id="lessonBoard"></div></div><button class="btn btn-primary" id="completeLesson">${state.completedLessons.includes(id)?"LECCIÓN COMPLETADA ✓":"MARCAR COMO COMPLETADA"}</button></article>`;
    $("#closeLesson").onclick=()=>$("#lessonDetail").classList.add("hidden");
    $("#completeLesson").onclick=()=>{if(!state.completedLessons.includes(id))state.completedLessons.push(id);save();$("#completeLesson").textContent="LECCIÓN COMPLETADA ✓";toast("Lección guardada en tu progreso");};
    renderBoard($("#lessonBoard"),9,0,"minorPent");
    $("#lessonDetail").scrollIntoView({behavior:"smooth",block:"start"});
  }
  function renderExerciseBoard(){renderBoard($("#exerciseFretboard"),12,9,"minorPent");}
  function renderFretboards(){
    const root=$("#rootSelect"),scale=$("#scaleSelect");if(!root.options.length)root.innerHTML=NOTES.map((n,i)=>`<option value="${i}" ${i===9?"selected":""}>${n}</option>`).join("");
    renderBoard($("#mainFretboard"),15,+root.value,scale.value);
  }
  $("#rootSelect").addEventListener("change",renderFretboards);$("#scaleSelect").addEventListener("change",renderFretboards);
  function renderBoard(container,frets,root,scale){
    if(!container)return;
    const intervals=SCALE_INTERVALS[scale]||SCALE_INTERVALS.minorPent,allowed=new Set(intervals.map(x=>(root+x)%12));
    const width=900,height=240,left=50,right=width-18,top=24,bottom=height-22,step=(right-left)/frets;
    let svg=`<div class="fretboard-wrap"><svg class="fretboard-svg" viewBox="0 0 ${width} ${height}" role="img" aria-label="Diapasón interactivo"><defs><linearGradient id="wood" x1="0" x2="1"><stop stop-color="#392a22"/><stop offset=".5" stop-color="#241d1b"/><stop offset="1" stop-color="#17191e"/></linearGradient></defs><rect x="${left}" y="${top}" width="${right-left}" height="${bottom-top}" rx="5" fill="url(#wood)" stroke="#786050" stroke-width="2"/>`;
    for(let f=0;f<=frets;f++){const x=left+f*step;svg+=`<line x1="${x}" y1="${top}" x2="${x}" y2="${bottom}" stroke="${f===0?"#d4c5b4":"#a8adb5"}" stroke-width="${f===0?5:1.5}" opacity=".8"/>`;if(f>0)svg+=`<text x="${x-step/2}" y="${height-5}" fill="#8b929e" font-size="10" text-anchor="middle">${f}</text>`;}
    const yPos=i=>top+8+i*((bottom-top-16)/5);
    for(let s=0;s<6;s++){const y=yPos(s);svg+=`<line x1="${left}" y1="${y}" x2="${right}" y2="${y}" stroke="#c3c8ce" stroke-width="${1+s*.35}" opacity=".9"/>`;svg+=`<text x="9" y="${y+4}" fill="#aeb8c8" font-size="11">${["e","B","G","D","A","E"][s]}</text>`;}
    // Fret markers
    [3,5,7,9,12,15,17,19,21].filter(f=>f<=frets).forEach(f=>{const x=left+(f-.5)*step;if(f===12){svg+=`<circle cx="${x}" cy="${top+42}" r="4" fill="#c6a98a"/><circle cx="${x}" cy="${bottom-42}" r="4" fill="#c6a98a"/>`;}else svg+=`<circle cx="${x}" cy="${(top+bottom)/2}" r="4" fill="#c6a98a" opacity=".7"/>`;});
    for(let s=0;s<6;s++){for(let f=0;f<=frets;f++){const pitch=(TUNING[s]+f)%12;if(allowed.has(pitch)){const x=f===0?left-2:left+(f-.5)*step,y=yPos(s);const isRoot=pitch===root;svg+=`<circle cx="${x}" cy="${y}" r="${isRoot?10:7}" fill="${isRoot?"#ff4ca5":"#54f2e7"}" opacity=".95"/><text x="${x}" y="${y+3}" text-anchor="middle" fill="#071111" font-size="${isRoot?8:7}" font-weight="700">${isRoot?NOTES[pitch]:"•"}</text>`;}}}
    svg+=`</svg></div>`;container.innerHTML=svg;
  }
  // Metronome uses a scheduled audio click. Scheduling ahead avoids visual timer drift.
  function setBpm(v){v=Math.max(30,Math.min(240,Math.round(v)));$("#bpmSlider").value=v;$("#bpmValue").textContent=v;}
  $("#bpmSlider").addEventListener("input",e=>setBpm(+e.target.value));
  function audioContext(){const AC=window.AudioContext||window.webkitAudioContext;if(!AC)return null;if(!metro.audio)metro.audio=new AC();if(metro.audio.state==="suspended")metro.audio.resume();return metro.audio;}
  function clickSound(time,accent){
    const ctx=audioContext();if(!ctx)return;const osc=ctx.createOscillator(),gain=ctx.createGain();osc.type="sine";osc.frequency.value=accent?1450:950;gain.gain.setValueAtTime(.0001,time);gain.gain.exponentialRampToValueAtTime(accent?.24:.12,time+.004);gain.gain.exponentialRampToValueAtTime(.0001,time+.055);osc.connect(gain);gain.connect(ctx.destination);osc.start(time);osc.stop(time+.06);
  }
  function metroTick(){if(!metro.running)return;const now=metro.audio.currentTime;while(metro.nextTime<now+.12){const beats=+$("#timeSignature").value;const beat=metro.beat%beats;clickSound(metro.nextTime,beat===0);const delay=60/+$("#bpmSlider").value;const scheduled=metro.nextTime;setTimeout(()=>{if(metro.running){const dots=$$("#beatDisplay span");dots.forEach((d,i)=>d.classList.toggle("active",i===beat));}},Math.max(0,(scheduled-now)*1000));metro.nextTime+=delay;metro.beat=(metro.beat+1)%beats;}metro.timer=setTimeout(metroTick,25);}
  function toggleMetro(){if(metro.running){metro.running=false;clearTimeout(metro.timer);$("#metroToggle").textContent="INICIAR METRÓNOMO";$$("#beatDisplay span").forEach(x=>x.classList.remove("active"));}else{const ctx=audioContext();if(!ctx){toast("Este navegador no admite Web Audio");return;}metro.running=true;metro.beat=0;metro.nextTime=ctx.currentTime+.05;$("#metroToggle").textContent="DETENER METRÓNOMO";metroTick();}}
  function tapTempo(){const now=Date.now();metro.taps=metro.taps.filter(t=>now-t<2500);metro.taps.push(now);if(metro.taps.length>=2){const diffs=metro.taps.slice(1).map((t,i)=>t-metro.taps[i]);setBpm(60000/(diffs.reduce((a,b)=>a+b,0)/diffs.length));}}
  // Session timer
  function formatTime(sec){const m=Math.floor(sec/60),s=sec%60;return String(m).padStart(2,"0")+":"+String(s).padStart(2,"0");}
  function updateTimer(){const total=session.elapsed+(session.running?Math.floor((Date.now()-session.started)/1000):0);$("#timerDisplay").textContent=formatTime(total);}
  function startTimer(){if(session.running)return;session.running=true;session.started=Date.now();session.interval=setInterval(updateTimer,250);$("#timerToggle").textContent="FINALIZAR";updateTimer();}
  function stopTimer(){if(!session.running)return;session.elapsed+=Math.floor((Date.now()-session.started)/1000);session.running=false;clearInterval(session.interval);const minutes=Math.max(1,Math.round(session.elapsed/60));state.sessions.push({date:dateKey(),minutes,seconds:session.elapsed});state.streak=state.lastPractice===dateKey()?state.streak:state.streak+1;state.lastPractice=dateKey();session.elapsed=0;$("#timerToggle").textContent="INICIAR";updateTimer();save();toast(`Sesión guardada: ${minutes} min`);}
  function toggleTimer(){if(session.running)stopTimer();else startTimer();}
  function resetTimer(){if(session.running){session.running=false;clearInterval(session.interval);}session.elapsed=0;$("#timerToggle").textContent="INICIAR";updateTimer();}
  // BPM records
  $("#recordForm").addEventListener("submit",e=>{e.preventDefault();const technique=$("#recordTechnique").value.trim(),bpm=+$("#recordBpm").value;if(!technique||bpm<20||bpm>400)return;state.records.unshift({technique,bpm,notes:$("#recordNotes").value.trim(),date:dateKey()});state.records=state.records.slice(0,40);e.target.reset();save();renderRecords();toast("Récord guardado");});
  function renderRecords(){$("#recordList").innerHTML=state.records.length?state.records.map(r=>`<div class="record-item"><div><b>${escapeHtml(r.technique)}</b><small>${r.date}${r.notes?" · "+escapeHtml(r.notes):""}</small></div><strong>${r.bpm}<small>BPM</small></strong></div>`).join(""):`<p class="muted tiny">Aún no hay récords. Registra tu primera marca.</p>`;}
  function renderProfile(){
    $("#profileName").textContent=state.name;$("#nameInput").value=state.name;$("#goalSelect").value=String(state.goal);
    const total=state.sessions.reduce((a,s)=>a+s.minutes,0);$("#totalMinutes").innerHTML=`${total} <small>min</small>`;$("#recordCount").textContent=state.records.length;$("#lessonCount").textContent=state.completedLessons.length;
  }
  $("#nameInput").addEventListener("change",e=>{state.name=e.target.value.trim()||"Guitar Player";save();});
  $("#goalSelect").addEventListener("change",e=>{state.goal=+e.target.value;save();});
  function exportData(){const blob=new Blob([JSON.stringify(state,null,2)],{type:"application/json"}),url=URL.createObjectURL(blob),a=document.createElement("a");a.href=url;a.download="guitar-forge-backup.json";a.click();URL.revokeObjectURL(url);toast("Copia de seguridad exportada");}
  $("#importFile").addEventListener("change",async e=>{const f=e.target.files[0];if(!f)return;try{const parsed=JSON.parse(await f.text());if(!parsed||typeof parsed!=="object"||!Array.isArray(parsed.sessions)||!Array.isArray(parsed.records))throw Error();state={...freshState(),...parsed};save();renderRecords();toast("Datos importados correctamente");}catch{toast("Archivo JSON no válido");}e.target.value="";});
  function escapeHtml(str){return String(str).replace(/[&<>"']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]));}
  // Initial render
  renderDashboard();renderTraining();renderCourses();renderRecords();renderProfile();renderFretboards();updateTimer();
  if("serviceWorker" in navigator && location.protocol!=="file:"){window.addEventListener("load",()=>navigator.serviceWorker.register("./sw.js").catch(err=>console.warn("SW registration:",err)));}
})();