/*
*对于每个图形元素，我们都可以去重载它的draw()方法
* 图形元素分为2类：
* 1.容器元素
* 2.顶级元素(即不能作为存放的容器)
*事件元素：
* 事件传递原则
*/

//window.onload=function(){
//
//    BGame.createWindow(0,0,800,600,'1px solid #eee',document.getElementById('canvas'));
//    BGame.init();
//    var director=new BDirector();
//    director.init(BGame);
//    var scene=new BScene();
//    var scene1=new BScene();
//    director.addScene(scene);
//    BGame.BContext.lineCap="round";
//    BGame.BContext.lineJoin="round";
//    BGame.BContext.lineWidth=20;
//    var textSprite=new BTextSprite();
//    textSprite.x=100;
//    textSprite.y=100;
//    textSprite.setText({
//        text:'Hello world!',
//        font:'40px Arial',
//        align:'start'
//    });
//    scene1.addChild(textSprite);
//    scene.addChild(textSprite);
//    var sprite =new BSprite(100,100);
//    sprite.setPosition({x:100,y:200});
//    var layer = new BLayer();
//    layer.addChild(sprite);
//
//    var imgSprite=new BImageSprite();
//    imgSprite.x=200;
//    imgSprite.y=200;
//    imgSprite.setImageData(document.getElementById('img'));
//    layer.addChild(imgSprite);
//    sprite.draw=function(){
//        new BRect(BGame.BContext).strokeRect(this.posX,this.posY,this.width,this.height);
//    };
//    //sprite.runAction(new BMoveTo(3,0));
//    var sprite1=sprite.clone();
//    sprite1.setPosition({x:200,y:300});
//    scene.addChild(sprite1);
//    scene.addChild(layer);
//    var flag1=1;
//    var yflag1=1;
//    sprite1.runAction(new bollMove());
//    sprite.runAction(new bollMove());
//    var scheduleId1=scene.schedulerUpdate(function(){
//
//    });
//    var scheduleId2=scene.schedulerUpdate(function(){
//
//    });
//    director.run();
//    var df=true;
//    document.getElementById('canvas').onclick=function(){
//       // scene.stopSchedule(scheduleId1);
//       // if(df){
//       //     director.switchSceneAdd(scene1);
//       //     df=false;
//       // }
//       // else{
//       //     director.switchScene(scene);
//       //     df=true;
//       // }
//        layer.removeChild(sprite);
//    }
//    function bollMove(){
//        BAction.call(this);
//        this.flag=1;
//        this.yflag=1;
//        this.executed=function(obj){
//            if(obj.posY+obj.height>=BGame.height){
//                this.yflag=0;
//            }
//            if(obj.posX+obj.width>=BGame.width){
//                this.flag=1;
//            }
//            if(obj.posX<=0){
//                this.flag=0;
//            }
//            if(obj.posY<=0){
//                this.yflag=1;
//            }
//            if(this.flag==0){
//                obj.setPosition({x:obj.posX+3,y:obj.posY});
//            }
//            if(this.flag==1){
//                obj.setPosition({x:obj.posX-3,y:obj.posY});
//            }
//            if(this.yflag==0){
//                obj.setPosition({x:obj.posX,y:obj.posY-3});
//            }else{
//                obj.setPosition({x:obj.posX,y:obj.posY+3});
//            }
//        }
//    }
//};

//canvas上下文

function BObject(){
    this.name='BObject';
    this.toString=function(){
        return 'BObject Object';
    }
}

function BPath(BContext){
    BObject.call(this);
    //绘制已定义的路径
    this.stroke=function(){
        return BContext.stroke();
    };
    //起始一条路径，或重置当前路径
    this.beginPath=function(){
        BContext.beginPath();
    }
    //把路径移动到画布中的指定点，不创建线条
    this.moveTo=function(x,y){
        return BContext.moveTo(x,y);
    }
    //创建从当前点回到起始点的路径
    this.closePath=function(){
        return BContext.closePath();
    }
    //添加一个新点，然后在画布中创建从该点到最后指定点的线条
    this.lineTo=function(){
        BContext.lineTo(x,y);
    }
    //从原始画布剪切任意形状和尺寸的区域
    this.clip=function(){
        return BContext.clip();
    }
    //创建二次贝塞尔曲线
    this.quadraticCurveTo=function(cpx,xpy,x,y){
        return BContext.quadraticCurveTo(cpx,cpy,x,y);
    }
    //创建三次方贝塞尔曲线
    this.bezierCurveTo=function(){
        return BContext.bezierCurveTo(cp1x,cp1y,cp2x,cp2y,x,y);
    }
    //创建弧/曲线（用于创建圆形或部分圆）
    this.arc=function(x,y,radius,startAnglr,endAngle,antclockwise){
        return BContext.arc(x,y,radius,startAnglr,endAngle,antclockwise);
    }
    //创建两切线之间的弧/曲线
    this.arcTo=function(x1,y1,x2,y2,radius){
        return BContext.arcTo(x1,y1,x2,y2,radius);
    }
    //如果指定的点位于当前路径中，则返回 true，否则返回 false
    this.isPointInPath=function(){
        return BContext.isPointInPath(x,y);
    }
}
function BRect(BContext){
    BObject.call(this);
    //创建矩形
    this.rect=function(x,y,w,h){
        return BContext.rect(x,y,w,h);
    };
    //绘制“被填充”的矩形
    this.fillRect=function(x,y,w,h){
        return BContext.fillRect(x,y,w,h);
    };
    //绘制矩形（无填充）
    this.strokeRect=function(x,y,w,h){
        return BContext.strokeRect(x,y,w,h);
    };
    //在给定的矩形内清除指定的像素
    this.clearRect=function(x,y,w,h){
        return BContext.clearRect(x,y,w,h);
    };
}

function BLineStyle(BContext){
    //设置或返回线条的结束端点样式
    this.lineCap=function(val){
        BContext.lineCap=val;
    }
    //设置或返回两条线相交时，所创建的拐角类型
    this.lineJoin=function(val){
        BContext.lineJoin=val;
    }
    //设置或返回当前的线条宽度
    this.lineWidth=function(val){
        BContext.lineWidth=val;
    }
    //设置或返回最大斜接长度
    this.miterLimit=function(val){
        BContext.miterLimit=val;
    }
}

function BActions(BContext){
    this.scale=function(x,y){
        return BContext.scale(x,y);
    }
    this.rotate=function(angle){
        return BContext.rotate(angle);
    }
    this.translate=function(x,y){
        return BContext.translate(x,y);
    }
    this.transform=function(m11,m12,m21,m22,dx,dy){
        return BContext.transform(m11,m12,m21,m22,dx,dy);
    }
    this.setTransform=function(m11,m12,m21,m22,dx,dy){
        return BContext.setTransform(m11,m12,m21,m22,dx,dy);
    }
}

function BText(BContext){
    //设置或返回文本内容的当前字体属性
    this.font=function(font){
        BContext.font=font;
    };
    //设置或返回文本内容的当前对齐方式
    this.textAlign=function(textAlign){
        BContext.textAlign=textAlign;
    };
    //设置或返回在绘制文本时使用的当前文本基线
    this.textBaseline=function(textBaseline){
        BContext.textBaseline=textBaseline;
    };
    //在画布上绘制“被填充的”文本
    this.fillText=function(text,x,y,maxWidth){
       return BContext.fillText(text,x,y,maxWidth);
    };
    //在画布上绘制文本（无填充）
    this.strokeText=function(text,x,y,maxWidth){
        return BContext.strokeText(text,x,y,maxWidth);
    };
    //返回包含指定文本宽度的对象
    this.measureText=function(text){
        return BContext.measureText(text);
    };
}

function BImage(BContext){
    this.drawImage=function(elem,x,y,w,h){
        BContext.drawImage(elem,x,y,w,h);
    };
    this.drawImageCut=function(elem,sx,sy,swidth,sheight,x,y,width,height){
        BContext.drawImage(elem,sx,sy,swidth,sheight,x,y,width,height);
    };
}
var BConfig={
    globalAlpha:'', //设置或返回绘图的当前 alpha 或透明值
    globalCompositeOperation:'',//设置或返回新图像如何绘制到已有的图像上
    fillStyle:'',
    strokeStyle:'',
    shadowColor:'',
    shadowBlur:'',
    shadowOffsetX:'',
    shadowOffsetY:'',
    createLinearGradient:function(){},
    createPattern:function(){},
    createRadialGradient:function(){},
    addColorStop:function(){},
    save:function(){},
    restore:function(){},
    createEvent:function(){},
    toDataURL:function(){}
}

function BPixels(BContext){
    this.width=function(){

    };
    this.height='';
    this.data='';
    this.createImageData=function(){
        return BContext.createImageData(sw,sh);
    };
    this.getImageData=function(){
        return BContext.getImageData(sx,sy,sw,sh);
    };
    this.putImageData=function(){
        return BContext.putImageData(data,dx,dy,dirtyX,dirtyY,dirtyWidth,dirtyHeight);
    };
}

var BUtils={
    uuid:function(){
        return (this.S4()+this.S4()+"-"+this.S4()+"-"+this.S4()+"-"+this.S4()+"-"+this.S4()+this.S4()+this.S4());
    },
    S4:function() {
        return (((1+Math.random())*0x10000)|0).toString(16).substring(1);
    }
};
//全局对象。一个游戏之一一个Game
var BGame={
    BContext:null,
    width:0,
    height:0,
    fps:0,
    canvasId:BUtils.uuid(),
    init:function(){
        this.BContext=document.getElementById(this.canvasId).getContext("2d");
    },

    createWindow:function(x,y,w,h,borderStyle,ele,fps){
        var canvas=document.createElement("canvas");
        canvas.style.left=x+'px';
        canvas.style.top=y+'px';
        canvas.width=w;
        canvas.height=h;
        this.width=w;
        this.height=h;
        canvas.style.border=borderStyle;
        canvas.id=this.canvasId;
        if(fps == undefined || fps == null) fps=1000/60;
        this.fps=fps;
        ele.appendChild(canvas);
    },
    end:function(){}
};

//游戏引擎对象
//
//容器对象
function BContainer(){
    BObject.call(this);
    this.clist=new Array();
    this.addChild=function(container){
        this.clist.push(container);
    };
    this.removeChild=function(container){
        for(var i=0;i<this.clist.length;i++)
        {
            if(this.clist[i] == container){
                this.clist.splice(i,1);
                break;
            }

        }
    };
    this.topDraw=function(){
        for(var i=0;i<this.clist.length;i++){
            if(this.clist[i].actions!=undefined && this.clist[i].actions!=null){
                this.clist[i].actions();
            }

            this.clist[i].draw();
        }
    };
}
function BDraw(){
    this.draw=function(){

    }
}
//点对象 抽象x,y
function BPoint(){
    this.posX=0;
    this.posY=0;
    this.oldPosX=99999;
    this.oldPosY=99999;
    this.setPosition=function(position){
        if(this.oldPosX==99999) {
            this.oldPosX = position.x;
        }else{
            this.oldPosX=this.posX;
        }
        if(this.oldPosY==99999){
            this.oldPosY=position.y;
        }else{
            this.oldPosY=this.posY;
        }
        this.posX=position.x;
        this.posY=position.y;
    };
}
//对象克隆
function BClone(){
    this.clone=function(){
        var o, obj;
        obj=this;
        if (obj.constructor == Object){
            o = new obj.constructor();
        }else{
            o = new obj.constructor(obj.valueOf());
        }
        for(var key in obj){
            if ( o[key] != obj[key] ){
                if ( typeof(obj[key]) == 'object' ){
                   // o[key] = this.clone(obj[key]); //这里屏蔽了深层复制
                }else{
                    o[key] = obj[key];
                }
            }
        }
        o.toString = obj.toString;
        o.valueOf = obj.valueOf;
        return o;
    }
}
//
//function BMove(){
//    this.actionList=new Array();
//    this.actions=function(){
//        for(var i=0;i<this.actionList.length;i++){
//            this.actionList[i].execute(this);
//        }
//    };
//    this.runAction=function(action){
//        this.actionList.push(action);
//    };
//}
function BMove(){
    this.acObj=null;
    this.actions=function(){
        if(this.acObj!=undefined && this.acObj!=null){
            this.acObj.executed(this);
        }
    };
    this.runAction=function(action){
        this.acObj=action;
    };
}
//场景 切换场景
function  BScene(){
    BContainer.call(this);
    BDraw.call(this);
    BSchedule.call(this);
    this.draw=function(){
        new BRect(BGame.BContext).clearRect(0,0,BGame.width,BGame.height);
        this.topDraw();
    };
    this.toString=function(){
        return 'BScene Object';
    };
}
function BLayer(){
    BContainer.call(this);
    BDraw.call(this);
    this.draw=function(){
        this.topDraw();
    };
    this.toString=function(){
        return 'BLayer Object';
    };
}
//申明一个精灵。然后一系列的操作 width 和 height 只是事实上的约束
function  BSprite(w,h){
    //BContainer.call(this);
    BDraw.call(this);
    BClone.call(this);
    BPoint.call(this);
    BMove.call(this);
    this.width=w;
    this.height=h;
    this.scaleX=1;
    this.scaleY=1;
    this.scale=function(x,y){
        this.scaleX=x;
        this.scaleY=y;
    };
    this.call=function(){
        alert('call');
    };
    this.toString=function(){
        return 'BSprite Object';
    };
}
/*
 start	默认。文本在指定的位置开始。
 end	文本在指定的位置结束。
 center	文本的中心被放置在指定的位置。
 left	文本左对齐。
 right	文本右对齐。
*/
function BTextSprite(){
    BSprite.call(this,0,0);
    var textObject=new BText(BGame.BContext);
    this.x;
    this.y;
    this.maxWidth=2000;
    this.tobj;
    this.width;
    /*
     tobj{text,align,style}
     */
    this.setText=function(tobj){
        this.tobj=tobj;
        this.width=textObject.measureText(this.tobj.text);
    };
    this.draw=function(){
        if(this.tobj.font!=undefined && this.tobj.font!=null)
            textObject.font(this.tobj.font);
        if(this.tobj.align!= undefined && this.tobj.align!=null)
            textObject.textAlign(this.tobj.align);
        if(this.tobj.style=='stroke'){
            textObject.strokeText(this.tobj.text,this.x,this.y,this.maxWidth);
        }else{
            textObject.fillText(this.tobj.text,this.x,this.y,this.maxWidth);
        }
    };
}
function BImageSprite(){
    BSprite.call(this);
    this.imageData;
    this.bimage=new BImage(BGame.BContext);
    this.x=0;
    this.y=0;
    this.width=100;
    this.height=100;
    this.imgInfo={
        'model':'normal', /*normal change cut*/
        'elem':null,
        'sx':0,
        'sy':0,
        'swidth':0,
        'sheight':0
    };
    this.setImageData=function(elem){
        this.imgInfo.elem=elem;
        this.width=elem.width;
        this.height=elem.height;
    };
    this.draw=function(){
        if(this.imgInfo.model == 'normal'){
            this.bimage.drawImage(this.imgInfo.elem,this.x,this.y,this.width,this.height);
        }else if(this.imgInfo.model == 'cut'){
            this.bimage.drawImageCut(this.imgInfo.elem,this.imgInfo.sx,this.imgInfo.sy,this.imgInfo.swidth,this.imgInfo.sheight,this.x,this.y,this.width,this.height);
        }else{

        }
    };

}
//动作
function BAction() {
    this.executed=function(obj){

    };
    this.toString=function(){
        return 'BAction Objext';
    };
}
function BMoveTo(mx,my){
    BAction.call(this);
    this.executed=function(obj){
        obj.posX+=mx;
        obj.posY+=my;
    };
}
//导演类
function BDirector(){
    this.game;
    this.sceneList=new Array();
    this.runScene=null;
    this.addScene=function(scene){
        this.sceneList.push({scene:scene,sceneId:BUtils.uuid()});
        if(this.runScene==null){
            this.runScene=this.sceneList[0].scene;
        }
    };
    this.popScene=function(){
        return this.sceneList.pop();
    };
    this.switchScene=function(scene){
        this.runScene=scene;
        this.flushScene();
    };
    this.switchSceneAdd=function(scene){
        this.runScene=scene;
        this.addScene(scene);
        this.flushScene();
    };
    this.switchSceneId=function(sceneId){
        for(var i=0;i<this.sceneList.length;i++){
            if(this.sceneList[i].sceneId==sceneId){
                this.runScene=this.sceneList[i].scene;
                this.flushScene();
                break;
            }
        }
    };
    this.init=function(game){
        this.game=game;
    };
    //主刷新循环
    this.run=function(){
        var scene=this.runScene;
        this.flushId=setInterval(function(){
            scene.draw();
        },this.game.fps);
    };
    this.stop=function(){
        clearInterval(this.flushId);
    };
    this.flushScene=function(){
        this.stop();
        this.run();
    };
}
//调度器
function BSchedule(){
    this.scheduleList=new Array();
    this.schedule=function(func,time){
        var sid=BUtils.uuid();
        this.scheduleList.push({schedule:setInterval(function(){
            func();
        },time),sid:sid});
        return sid;
    };
    this.schedulerUpdate=function(func){
        var sid=BUtils.uuid();
        this.scheduleList.push({schedule:setInterval(function(){
            func();
        },BGame.fps),sid:sid});
        return sid;
    };
    this.scheduleOnce=function(func,time){
        var sid=BUtils.uuid();
        this.scheduleList.push({schedule:setTimeout(function(){
            func();
        },time),sid:sid});
        return sid;
    };
    this.stopSchedule=function(sid){
        for(var i=0;i<this.scheduleList.length;i++){
            if(this.scheduleList[i].sid==sid){
                clearInterval(this.scheduleList[i].schedule);
                break;
            }
        }
    };
}

//资源管理器
var BExplorer={
    load:function(url){
        var source=document.createElement('img');
        source.src=url;
        return source;
    }
};