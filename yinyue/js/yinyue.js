window.onload=function(){
    let audio=document.querySelector('audio');
    let songs1=document.querySelector('.songs')
    let name1=document.querySelector('.name');
    let lyrics=document.querySelector('.lyrics');
    let prevbtn=document.querySelector('.prev');
    let playbtn=document.querySelector('.playl');
    let nextbtn=document.querySelector('.next');
    let info = document.querySelector('.info');
    let cTime = document.querySelector('.ctime');
    let dTime = document.querySelector('.dtime');
    let img = document.querySelector('img');
    let max=document.querySelector('.max');
    let min=document.querySelector('.min');
    let vlum=document.querySelector('.vlum');
    let yinlang=document.querySelector('.yinlang');
    let yinshart=document.querySelector('.yinshart');
    let yinradius=document.querySelector('.yinradius')
    let index=0;
    let i=x=0;

    lice(database[index])

    // playbtn.onclick=function () {
    //     if(audio.paused){
    //         audio.play();
    //         playbtn.classList.toggle('icon-zanting')
    //     }else{
    //         audio.pause();
    //         playbtn.classList.toggle('icon-zanting')
    //     }
    // }
    playbtn.onclick=function(){
        if(audio.paused){

            audio.play();
            playbtn.classList.toggle('icon-zanting');
        }else{

            audio.pause();
            playbtn.classList.toggle('icon-zanting');
        }
    }
    nextbtn.onclick=function(){
        index++;
        if(index==database.length){
          index=0
        }
        lice(database[index])
            // playbtn.className="iconfont  icon-iconfont31 playl"
            audio.ontimeupdate();
            audio.play();
            // i=x=0;

    }
    prevbtn.onclick=function () {
        index--;
        if(index<0){
          index=database.length-1;
        }
            lice(database[index])
            // playbtn.className="iconfont  icon-iconfont31 playl"
            audio.ontimeupdate();
            audio.play();
            // i=x=0;
    }
    vlum.onmouseenter=function(){
         yinlang.style.display='block';
         yinradius.onmousedown=function (e) {
             let oy=e.offsetY


             yinradius.onmousemove=function (e) {
               let my=e.offsetY;

             }
             yinradius.onmouseup=function () {
                 yinradius.onmousemove=null;
                 yinradius.onmouseup=null;
             }
         }
    }
   document.ondblclick=function () {
       yinlang.style.display='none';
   }





    audio.ontimeupdate= function(){
        let current = format(audio.currentTime);
        let duration = format(audio.duration);
        let string='';
        cTime.innerText = current+'/';
        dTime.innerText = duration;

        min.style.width=audio.currentTime/audio.duration*100+'%';

        lyrics.innerHTML='';
        database[index]['lyrics'].forEach(function(value,index){
            if( value.time == current ){
                x = i = index;
            }
        })

        if(x<2){
            i=0
        }else{
            i = x - 2;
        }
        console.log(i,x);
        for(let j=i;j<database[index]['lyrics'].length;j++){
            if(j==x){
                string+=`
             <li class="hoot">
                ${database[index]['lyrics'][j]['lyric']}
             </li>`;
            }else{
                string+=`
             <li >
                ${database[index]['lyrics'][j]['lyric']}
             </li>`;
            }

        }
        lyrics.innerHTML = string;

    }
  /* audio.ontimeupdate=function(){
       let currentTime=format(audio.currentTime);
       let duration=format(audio.duration);
       dTime.innerText=currentTime;
       cTime.innerText=duration;

       min.style.width=audio.currentTime/audio.duration*100%+'%';

       database[index]['lyrics'].forEach(function(value,index){
            if(value.time==currentTime){

            }
       })





   }*/







    function  format(time){
        let m =  Math.floor(time /60) >=10 ? Math.floor(time /60) :  '0'+Math.floor(time /60);
        let s =  Math.floor(time % 60) >=10 ? Math.floor(time % 60) :  '0'+Math.floor(time % 60);
        return `${m}:${s}`;
    }



    function lice(obj){
        let string='';
        songs1.innerText=obj.songs;
        name1.innerText=obj.name;
        audio.src=obj.src;

        info.innerText = `${obj.songs} - ${obj.name} `;
        img.src= obj.photo;
        cTime.innerText ='00:00/';
        dTime.innerText =  obj.alltime



       obj.lyrics.forEach(function (value, index) {
           string +=`<li>${value.lyric}</li>`
       })
        lyrics.innerHTML='';
        lyrics.innerHTML=string;

    }











}

















