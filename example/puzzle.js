/**
 * Created by Administrator on 2016/3/3.
 */
//缺点，无法记录原图大小
//缺点,事件机制不完善(压根就没做)
//缺点，没做容器属性继承
//缺点，动画机制
//缺点，action机制使用面不广
//缺点，缺少UI组件
window.onload=function(){
    BGame.createWindow(100,100,600,400,'2px solid #ccc',document.getElementById('canvas'),60);
    BGame.init();
    var director= new BDirector();
    director.init(BGame);
    var levelScene = new BScene();
    var GameStartScene =new BScene();
    director.addScene(GameStartScene);
    var gameback = new BImageSprite();
    gameback.setImageData(BExplorer.load('example/gamestart.jpg'));
    gameback.width=600;
    gameback.height=400;
    GameStartScene.addChild(gameback);
    var title = new BTextSprite();
    title.x=200;
    title.y=100;
    title.setText({text:'拼图游戏',font:'40px Arial'});
    GameStartScene.addChild(title);

    var tishi = new BTextSprite();
    tishi.x=200;
    tishi.y=300;
    tishi.setText({text:'按任意键开始游戏',font:'25px Arial'});
    GameStartScene.addChild(tishi);


    //director.addScene(levelScene);
    var imgelem=BExplorer.load('example/level1.jpg');
    var dz=new puzzleProduce(imgelem);
    dz.produce(3,3,120);
    dz.add(levelScene);
    dz.flush();
    director.run();
    document.getElementById(BGame.canvasId).onclick=function(event){
        for(var i=0;i<dz.ImageBlock.length;i++){
            if(dz.ImageBlock[i].x<=event.clientX &&dz.ImageBlock[i].x+dz.ImageBlock[i].width>=event.clientX&&dz.ImageBlock[i].y<=event.clientY&&dz.ImageBlock[i].y+dz.ImageBlock[i].width>=event.clientY){
                if(dz.boll(i)!=0){
                    var tmp = dz.ImageBlock[i];
                    dz.ImageBlock[i] = dz.ImageBlock[dz.fix];
                    dz.ImageBlock[dz.fix] = tmp;
                    dz.fix=i;
                    dz.flush();
                }
            }
        }
    };
    document.body.onkeydown=function(){
        director.switchSceneAdd(levelScene);
    };
};
function puzzleProduce(imgelem){
    this.ImageBlock=new Array();
    this.fix=8;
    this.col;
    this.row;
    this.w;
    this.produce=function(col,row,w){
        this.col=col;
        this.row=row;
        this.w=w;
        this.fix=col*row-1;
        for(var i=0;i<row;i++) {
            for (var j = 0; j < col; j++) {
                var tmpObj = new BImageSprite();
                tmpObj.setImageData(imgelem);
                tmpObj.imgInfo.model = 'cut';
                tmpObj.imgInfo.sx = j * w;
                tmpObj.imgInfo.sy = i * w;
                tmpObj.imgInfo.swidth = w;
                tmpObj.imgInfo.sheight = w;
                tmpObj.width = w;
                tmpObj.height = w;
                this.ImageBlock.push(tmpObj);
            }
        }
        this.boll = function (i) {
            if (parseInt(i / this.row - 1) * this.row + i % this.row == this.fix) {
                return 1;//上
            }
            if (parseInt(i / this.row + 1) * this.row + i % this.row == this.fix) {
                return 2;//下
            }
            if (parseInt(i / this.row) == parseInt(this.fix / this.row) && parseInt(i / this.row) * this.row + (i % this.row + 1) == this.fix) {

                return 3;//右
            }
            if (parseInt(i / this.row) == parseInt(this.fix / this.row) && parseInt(i / this.row) * this.row + (i % this.row - 1) == this.fix) {
                return 4;//左
            }
            return 0;
        };
        var x=this.ImageBlock.pop();
        x.setImageData('');
        this.ImageBlock.push(x);
    };
    this.flush=function(){
        for(var i=0;i<this.ImageBlock.length;i++){
            this.ImageBlock[i].y=parseInt(i/this.row)*this.w;
            this.ImageBlock[i].x=(i%this.row)*this.w;
        }
    };
    this.add=function(layer){
        for(var i=0;i<this.ImageBlock.length;i++){
            layer.addChild(this.ImageBlock[i]);
        }
    };

}
