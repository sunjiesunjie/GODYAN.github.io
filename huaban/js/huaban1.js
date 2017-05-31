function palette(obj,ctx,mask) {
    this.obj=obj;
    this.ctx=ctx;
    this.mask=mask;

    this.history=[];
    this.lineCap='butt';
    this.fillStyle = '#000';
    this.strokeStyle = '#000';
    this.lineWidth = 2;
    this.width=obj.width;
    this.height=obj.height;
    this.type='stroke'
    this.lineCap='round';
    this.bian=5;
    this.text='16px 宋体';
    this.textAlign='center';
    this.textBaseline='middle';


}
  palette.prototype={
      lini:function () {
          this.ctx.lineWidth=this.lineWidth;
          this.ctx.strokeStyle=this.strokeStyle;
          this.ctx.fillStyle=this.fillStyle;
          this.ctx.lineCap=this.lineCap;
      },

       line:function () {
          let self=this;
              self.mask.onmousedown=function(e){
                  let ox=e.offsetX,oy=e.offsetY;
                  self.mask.onmousemove=function(e){
                      let mx=e.offsetX,my=e.offsetY;
                      self.lini();
                      self.ctx.clearRect(0,0,self.width,self.height);
                      if(self.history.length>0){
                        self.ctx.putImageData(self.history[self.history.length-1],0,0)
                      }
                      self.ctx.beginPath();

                      self.ctx.moveTo(ox,oy)
                      self.ctx.lineTo(mx,my)
                      self.ctx.stroke();
                  }
                  self.mask.onmouseup=function () {
                      self.history.push(self.ctx.getImageData(0,0,self.width,self.height))
                      self.mask.onmouseup=null;
                      self.mask.onmousemove=null;
                  }
                  document.body.onkeydown=function(e){
                      if(e.ctrlKey&&e.keyCode==90){
                          if(self.history.length==0){
                              self.ctx.clearRect(0,0,self.width,self.height);
                              return
                          }
                          let last=self.history.pop();
                          self.ctx.putImageData(last,0,0)
                      }
                  }
              }






     },
      pencil:function () {
          let self=this;
          self.mask.onmousedown=function(e){
              let ox=e.offsetX,oy=e.offsetY;
              self.lini();
              self.ctx.clearRect(0,0,self.width,self.height);
              if(self.history.length>0){
                  self.ctx.putImageData(self.history[self.history.length-1],0,0)
              }
              self.ctx.beginPath();

              self.ctx.moveTo(ox,oy)

              self.mask.onmousemove=function(e){
                  let mx=e.offsetX,my=e.offsetY;

                  self.ctx.lineTo(mx,my)
                  self.ctx.stroke();
              }
              self.mask.onmouseup=function () {
                  self.history.push(self.ctx.getImageData(0,0,self.width,self.height))
                  self.mask.onmouseup=null;
                  self.mask.onmousemove=null;
              }
              document.body.onkeydown=function(e){
                  if(e.ctrlKey&&e.keyCode==90){
                      if(self.history.length==0){
                          self.ctx.clearRect(0,0,self.width,self.height);
                          return
                      }
                      let last=self.history.pop();
                      self.ctx.putImageData(last,0,0)
                  }
              }
          }

      },
      //矩形
      rectangle:function () {
          let self=this;
          self.mask.onmousedown=function(e){
              let ox=e.offsetX,oy=e.offsetY;
              self.mask.onmousemove=function(e){
                  self.lini();
                  self.ctx.clearRect(0,0,self.width,self.height);
                  if(self.history.length>0){
                      self.ctx.putImageData(self.history[self.history.length-1],0,0)
                  }
                  self.ctx.beginPath();
                  let mx=e.offsetX,my=e.offsetY;
                  self.ctx.rect(ox,oy,mx-ox,my-oy);
                  self.ctx.closePath();
                  self.ctx[self.type]();
              }
              self.mask.onmouseup=function () {
                  self.history.push(self.ctx.getImageData(0,0,self.width,self.height))
                  self.mask.onmouseup=null;
                  self.mask.onmousemove=null;
              }
              document.body.onkeydown=function(e){
                  if(e.ctrlKey&&e.keyCode==90){
                      if(self.history.length==0){
                          self.ctx.clearRect(0,0,self.width,self.height);
                          return
                      }
                      let last=self.history.pop();
                      self.ctx.putImageData(last,0,0)
                  }
              }
          }
      },
      //多边形
      polygon:function () {
          let self=this;
          let n=self.bian;
          let angle;
          angle=(360/n)/180*Math.PI;
          self.mask.onmousedown=function(e){
              let ox=e.offsetX,oy=e.offsetY;
              self.mask.onmousemove=function(e){
                  let nx=e.offsetX,ny=e.offsetY;
                  let radius=Math.sqrt((nx-ox)*(nx-ox)+(ny-oy)*(ny-oy))
                  self.lini();
                  self.ctx.clearRect(0,0,self.width,self.height);
                  if(self.history.length>0){
                      self.ctx.putImageData(self.history[self.history.length-1],0,0)
                  }

                  self.ctx.beginPath();
                  self.ctx.moveTo(ox+radius,oy);
                  for(let i=0;i<n;i++){
                      let mx=ox+radius*Math.cos(angle*i)
                      let my=oy+radius*Math.sin(angle*i)
                      self.ctx.lineTo(mx,my);
                  }
                  self.ctx.closePath();
                  self.ctx[self.type]();

              }
              self.mask.onmouseup=function () {
                  self.history.push(self.ctx.getImageData(0,0,self.width,self.height))
                  self.mask.onmouseup=null;
                  self.mask.onmousemove=null;
              }
              document.body.onkeydown=function(e){
                  if(e.ctrlKey&&e.keyCode==90){
                      if(self.history.length==0){
                          self.ctx.clearRect(0,0,self.width,self.height);
                          return
                      }
                      let last=self.history.pop();
                      self.ctx.putImageData(last,0,0)
                  }
              }
          }

      },
      //duo角星
      polyl:function () {
          let self=this;
          let n=self.bian;
          let angle;
          angle=Math.PI/self.bian;
          self.mask.onmousedown=function(e){
              let ox=e.offsetX,oy=e.offsetY;
              self.mask.onmousemove=function(e){
                  let nx=e.offsetX,ny=e.offsetY;
                  let radius=Math.sqrt((nx-ox)*(nx-ox)+(ny-oy)*(ny-oy));
                  let radius1=radius/3
                  self.lini();
                  self.ctx.clearRect(0,0,self.width,self.height);
                  if(self.history.length>0){
                      self.ctx.putImageData(self.history[self.history.length-1],0,0)
                  }

                  self.ctx.beginPath();
                  self.ctx.moveTo(ox+radius,oy);
                  for(let i=0;i<self.bian*2;i++){
                      if(i%2==0){
                          self.ctx.lineTo(ox+radius*Math.cos(angle*i),oy+radius*Math.sin(angle*i))
                      }else{
                          self.ctx.lineTo(ox+radius1*Math.cos(angle*i),oy+radius1*Math.sin(angle*i))
                      }
                  }
                  self.ctx.closePath();
                  self.ctx[self.type]();

              },
              self.mask.onmouseup=function () {
                  self.history.push(self.ctx.getImageData(0,0,self.width,self.height))
                  self.mask.onmouseup=null;
                  self.mask.onmousemove=null;
              }
              document.body.onkeydown=function(e){
                  if(e.ctrlKey&&e.keyCode==90){
                      if(self.history.length==0){
                          self.ctx.clearRect(0,0,self.width,self.height);
                          return
                      }
                      let last=self.history.pop();
                      self.ctx.putImageData(last,0,0)
                  }
              }
          }

      },
      circular:function(){
          let self=this;
          self.mask.onmousedown=function(e){
              let ox=e.offsetX,oy=e.offsetY;

              self.mask.onmousemove=function(e){
                  let mx=e.offsetX,my=e.offsetY;
                  self.lini();
                  self.ctx.clearRect(0,0,self.width,self.height);
                  if(self.history.length>0){
                      self.ctx.putImageData(self.history[self.history.length-1],0,0)
                  }
                  self.ctx.beginPath();
                  self.ctx.arc(ox,oy,mx-ox,0,Math.PI*2);
                  self.ctx[self.type]();
                  self.ctx.closePath();
              }
              self.mask.onmouseup=function () {
                  self.history.push(self.ctx.getImageData(0,0,self.width,self.height))
                  self.mask.onmouseup=null;
                  self.mask.onmousemove=null;
              }
              document.body.onkeydown=function(e){
                  if(e.ctrlKey&&e.keyCode==90){
                      if(self.history.length==0){
                          self.ctx.clearRect(0,0,self.width,self.height);
                          return
                      }
                      let last=self.history.pop();
                      self.ctx.putImageData(last,0,0)
                  }
              }
          }
      },
      rRectangle:function (r) {
          let self=this;
          self.mask.onmousedown=function(e){
              let ox=e.offsetX,oy=e.offsetY;

              self.mask.onmousemove=function(e){
                  let mx=e.offsetX,my=e.offsetY;
                  self.lini();

                  self.ctx.clearRect(0,0,self.width,self.height);
                  if(self.history.length>0){
                      self.ctx.putImageData(self.history[self.history.length-1],0,0)
                  }
                  self.ctx.beginPath();
                  self.ctx.moveTo(ox+r,oy);
                  self.ctx.lineTo(mx-r,oy);
                  self.ctx.quadraticCurveTo(mx,oy,mx,r+oy);
                  self.ctx.lineTo(mx,my-r);
                  self.ctx.quadraticCurveTo(mx,my,mx-r,my);
                  self.ctx.lineTo(ox+r,my);
                  self.ctx.quadraticCurveTo(ox,my,ox,my-r);
                  self.ctx.lineTo(ox,oy+r);
                  self.ctx.quadraticCurveTo(ox,oy,ox+r,oy)


                  self.ctx[self.type]();
                  self.ctx.closePath();
              }
              self.mask.onmouseup=function () {
                  self.history.push(self.ctx.getImageData(0,0,self.width,self.height))
                  self.mask.onmouseup=null;
                  self.mask.onmousemove=null;
              }
              document.body.onkeydown=function(e){
                  if(e.ctrlKey&&e.keyCode==90){
                      if(self.history.length==0){
                          self.ctx.clearRect(0,0,self.width,self.height);
                          return
                      }
                      let last=self.history.pop();
                      self.ctx.putImageData(last,0,0)
                  }
              }
          }
      },
      eraser:function (w,h,eraser1) {
          let self=this;

          self.mask.onmousedown=function () {
               eraser1.style.display='block';
              self.ctx.putImageData(self.history[self.history.length-1],0,0);
              eraser1.style.width=`${w}px`;
               eraser1.style.height=`${h}px`;


              self.mask.onmousemove=function (e) {
                  let cx=e.offsetX-w/2,cy=e.offsetY-w/2;

                  if(cx>=self.width-w){
                      cx=self.width-w;
                  }
                  if(cx==0){
                      cx=0;
                  }
                  if(cy>=self.height-w){
                      cy=self.height-w;
                  }
                  if(cy==0){
                      cy=0;
                  }
                  eraser1.style.left=`${cx}px`;
                  eraser1.style.top=`${cy}px`;
                  self.ctx.clearRect(cx,cy,w,h)

              }
              self.mask.onmouseup=function () {
                  eraser1.style.display='none';
                  self.history.push(self.ctx.getImageData(0,0,self.width,self.height))
                  self.mask.onmousemove=null;
                  self.mask.onmouseup=null;
              }
              document.body.onkeydown=function(e){
                  if(e.ctrlKey&&e.keyCode==90){
                      if(self.history.length==0){
                          self.ctx.clearRect(0,0,self.width,self.height);
                          return
                      }
                      let last=self.history.pop();
                      self.ctx.putImageData(last,0,0)
                  }
              }
          }
      },
      //文字
      character:function(){
         let self=this;

          self.mask.onmousedown=function (e) {
              let ox=e.offsetX,oy=e.offsetY;
              if(self.history.length>0){
                  self.ctx.putImageData(self.history[self.history.length-1],0,0)
              }
              let div=document.createElement('div');
                  div.style.cssText=`min-width:100px;height:auto;padding:3px;position:absolute;left:${ox}px;top:${oy}px;background:white;`

                 div.contentEditable='true';
                  self.mask.appendChild(div);
                  self.mask.onmousedown=null;
                  self.divs=div;


                 self.divs.onmousedown=function (e) {
                     let ox=e.clientX-this.offsetLeft;
                     let oy=e.clientY-this.offsetTop;
                     self.mask.onmousemove=function (e) {
                         let cx=e.clientX,cy=e.clientY;
                         let lefts=cx-ox;tops=cy-oy;
                         self.divs.style.left=lefts+'px';
                         self.divs.style.top=tops+'px';

                     }
                     self.divs.onmouseup=function () {
                         self.history.push(self.ctx.getImageData(0,0,self.width,self.height))
                         self.divs.onmouseup=null;
                         self.mask.onmousemove=null;
                     }
                 }
                 self.divs.onblur=function(){
                     self.ctx.font=self.text;
                     self.ctx.textAlign=self.textAlign;
                     self.ctx.textBaseline=self.textBaseline;
                     self.ctx.fillText(this.innerText,this.offsetLeft,this.offsetTop);
                     this.parentNode.removeChild(this);
                     self.divs=null;
                 }

              document.body.onkeydown=function(e){
                  if(e.ctrlKey&&e.keyCode==90){
                      if(self.history.length==0){
                          self.ctx.clearRect(0,0,self.width,self.height);
                          return
                      }
                      let last=self.history.pop();
                      self.ctx.putImageData(last,0,0)
                  }
              }

          }

      },
      //裁切
   /*   cutt:function(){
          let self=this;
          self.mask.onmousedown=function (e) {
              let ox=e.



              self.mask.onmousemove=function () {

              }
              self.mask.onmouseup=function () {
                  self.mask.onmousemove=null;
                  self.mask.onmouseup=null;
              }
          }
      },*/

      cj:function(cai){
          let self9=this;
          let minx,miny,w,h;
          self9.lini();
          self9.cai=cai;
          self9.mask.onmousedown=function(e){
              let s=e.offsetX;
              let d=e.offsetY;
              self9.mask.onmousemove=function(e){
                  let s1=e.offsetX;
                  let d1=e.offsetY;
                  minx=s1>=s?s:s1;
                  miny=d1>d?d:d1;
                  w=Math.abs(s1-s);
                  h=Math.abs(d1-d);
                  self9.cai.style.cssText= `
                  width=${w}px;height=${h}px;border:1px dashed black;
                  position:absolute;left:${minx}px;top${miny};        
                  `
              }
              self9.mask.onmouseup=function(){
                  self9.mask.onmousemove=null;
                  self9.mask.onmouseup=null;
                  self9.t=self9.ctx.getImageData(minx,miny,w,h);
                  self9.ctx.clearRect(minx,miny,w,h);
                  self9.history.push(self9.ctx.getImageData(0,0,self9.width,self9.height));
                  self9.ctx.putImageData(self9.t,minx,miny);
                  self9.drag(minx,miny,w,h,cai);
              }
          }

      },

      // 裁剪拖拽
      drag: function (x, y, w, h, cai) {
          let self = this;
          self.mask.onmousemove = function (e) {
              let ox = e.offsetX;
              let oy = e.offsetY;
              if (ox > x && ox < w + x && oy > y && oy < h + y) {
                  self.mask.style.cursor = "move";
              } else {
                  self.mask.style.cursor = "default";
              }
          }
          self.mask.onmousedown = function (e) {
              let ox = e.offsetX;
              let oy = e.offsetY;
              //鼠标相对于div左上角的位置
              let cx = ox - x;
              let cy = oy - y;
              if (ox > x && ox < w + x && oy > y && oy < h + y) {
                  self.mask.style.cursor = "move";
              } else {
                  self.mask.style.cursor = "default";
                  return;
              }
              self.mask.onmousemove = function (e) {
                  self.ctx.clearRect(0, 0, self.width, self.height);
                  if (self.history.length > 0) {
                      self.ctx.putImageData(self.history[self.history.length - 1], 0, 0)
                  }
                  let ex = e.offsetX;
                  let ey = e.offsetY;
                  let left = ex - cx;
                  let top = ey - cy;
                  if(left<0){
                      left=0;
                  }
                  if(left>self.width-w){
                      left=self.width-w
                  }

                  if(top<0){
                      top=0;
                  }
                  if(top>self.height-h){
                      top=self.height-h;
                  }
                  cai.style.left= left+'px';
                  cai.style.top=top+'px';
                  x=left;
                  y=top;
                  self.ctx.putImageData(self.t, left, top);
              }
              self.mask.onmouseup = function () {
                  self.mask.onmouseup = null;
                  self.mask.onmousemove = null;
                  self.drag(x, y, w, h, cai);
                  // self.ctx.clearRect(0,0,self.width,self.height);
              }
          }
      },



      //虚线
     /* DottedL:function () {
          let self=this;
          self.mask.onmousedown=function (e) {
              let ox=e.offsetX,oy=e.offsetY;
              self.mask.onmousemove=function (e) {
                  let mx=e.offsetX,my=e.offsetY;
                  self.lini();
                  self.ctx.clearRect(0,0,self.width,self.height);
                  if(self.history.length>0){
                      self.ctx.putImageData(self.history[self.history.length-1],0,0);
                  }
                  self.ctx.beginPath();
                  self.ctx.setLineDash([mx-ox,my-oy]);
                  self.ctx.closePath();
                  self.ctx[self.type]();
              }
              self.mask.onmouseup=function () {
                  self.history.push(self.ctx.getImageData(0,0,self.width,self.height));
                  self.mask.onmouseup=null;
                  self.mask.onmousemove=null;

              }
              document.body.onkeydown=function(e){
                  if(e.ctrlKey&&e.keyCode==90){
                      if(self.history.length==0){
                          self.ctx.clearRect(0,0,self.width,self.height);
                          return;
                      }
                      let last = self.history.pop();
                      self.ctx.putImageData(last, 0, 0);

                  }
              }
          }
      },*/
        // 撤销
                undo:function(){
                     let self=this;
                    self.history.pop();
                            if(self.history.length==0){
                                self.ctx.clearRect(0,0,self.width,self.height);
                                return
                            }

                            self.ctx.putImageData(self.history[self.history.length-1],0,0)

                    },


        //新建
       newC:function () {
            let self=this;
            // if()
           let flag=confirm("是否保存");
           if(flag){
               let data=self.obj.toDataURL('image/png').replace('data:image/png','data:stream/octet');
               location.href=data;
           }
            self.history=[];
            self.ctx.clearRect(0,0,self.width,self.height)

       },
      //保存
      saveT:function(){
           let self=this;
           let data=self.obj.toDataURL('image/png').replace('data:image/png','data:stream/octet');
           location.href=data;
      }









  }




