$(function () {
    let poke=[];
    let color=['h','s','c','d'];
    let biao={};
   let moveR=$('.moveR');
   let moveL=$('.moveL');
   let first=null;
    //biao={c_5:true}
    for(let i=0;i<52;i++){
        let house=color[Math.floor(Math.random()*4)];
        let shuzi=Math.floor(Math.random()*13+1)
        while (biao[house+'_'+shuzi]){
            house=color[Math.floor(Math.random()*4)];
            shuzi=Math.floor(Math.random()*13+1);
        }
        biao[house+'_'+shuzi]=true;
        poke.push({house,shuzi})
        // document.write(` ${house}--${shuzi}`)
    }
    let index=0;
    for(let i=0;i<7;i++){
        for(let j=0;j<=i;j++){
            let item=poke[index];
            index++;
            let  src='url(image/'+item.house+item.shuzi+'.png)';
            $('<div>').addClass('poke')
                .css('backgroundImage',src)
                .data('num',item.shuzi)
                // .html(`${item.house}---${item.shuzi}`)
                .delay(30*index)
                .prop('id',i+'_'+j)
                .animate({
                left:300-i*50+100*j,
                top:60*i
            })
                .appendTo('.table');
        }
    }
    for(;index<poke.length;index++){
        let item=poke[index];
        index++;
        let  src='url(image/'+item.house+item.shuzi+'.png)';
        $('<div>').addClass('poke zuo')
            .css('backgroundImage',src)
            .data('num',item.shuzi)
            .delay(30*index)
            .animate({
                left:100,
                top:515
            })
            .appendTo('.table');
    }
    $('.poke').click(function(){
        let ids=$(this).prop('id').split('_');
        let id1=`#${parseInt(ids[0])+1}_${ids[1]}`;
        let id2=`#${parseInt(ids[0])+1}_${parseInt(ids[1])+1}`
        if($(id1).length==1||$(id2).length==1){
            return
        }

       $(this).toggleClass('active')
         if($(this).hasClass('active')){
            $(this).animate({top:'-=20'})
         }else{
             $(this).animate({top:'+=20'})
         }

        if(!first){
             first=this;
             let sum=$(first).data('num');
             if(sum==13){
                 $('.active').animate({left:600,top:0},function () {
                     $(this).remove()
                 })
             }
              // first=null;
        }else{
             let sum=$(first).data('num')+$(this).data('num');
             if(sum==13){
                 $('.active').animate({left:600,top:0},function () {
                     $(this).remove();
                 })

             }else{
                 $('.active').animate({top:'+=20'},function () {
                     $(this).removeClass('active')
                 })
             }
            first=null
        }



    })

       let z=1;
       moveR.on('click',function () {
          z++;
          $('.zuo:last')
              .addClass('you')
              .removeClass('zuo')

              .css('zIndex',z)
              .animate({left:'+=400'})

       })
      moveL.on('click',function () {
          let you=$('.you');
          z++;
          for(let i=you.length-1;i>=0;i--){
              $(you[i]).delay(100*i)
                      .animate({left:'-=400'},function () {
                           $(this).css('zIndex',0)
                       })
                       .addClass('zuo')
                       .removeClass('you')

          }
      })



})
