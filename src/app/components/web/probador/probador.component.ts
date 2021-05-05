import { Component, OnInit, ViewChild, ElementRef, Input } from '@angular/core';
import { Options, ChangeContext } from 'ng5-slider';
import * as posenet from '@tensorflow-models/posenet';
import { global } from 'src/app/services/global';
import { ActivatedRoute } from '@angular/router';
import { DisfrazService } from 'src/app/services/disfraz.service';
import { Disfraz } from 'src/app/models/disfraz';

@Component({
  selector: 'app-probador',
  templateUrl: './probador.component.html',
  styleUrls: ['./probador.component.css']
})
export class ProbadorComponent implements OnInit {

  public disfraz: Disfraz;
  public url: string;

  public model: any;
  public modelLoaded: boolean = false;
  public imgBtnStatus: boolean = true;
  public animationFrame: any;
  public videoCanvasEnable: boolean = false;
  public fileName: string = 'No File Chosen';
  public imageSrc: any = 'assets/backpackman.jpg';
  public webBtnStatus: boolean = false;
  public snapData: any;
  @ViewChild('videoElement', { static: false }) videoElement: ElementRef;
  public video: any;
  public videoWidth: number = 410;
  public videoHeight: number = 310;
  public canvas: any;
  public canvasWidth: number = 400;
  public canvasHeight: number = 300;
  public canvasContext: any;
  @ViewChild("videoCanvas", { static: false }) videoCanvas: ElementRef;
  public scoreThresholdOptions: Options = {
    floor: 0.0,
    ceil: 1,
    step: 0.1,
    showSelectionBar: true
  };
  public scoreThreshold: any = 0.5;
  public nmsRadiusOptions: Options = {
    floor: 1,
    ceil: 50,
    step: 1,
    showSelectionBar: true
  };
  public nmsRadius: any = 20;
  public videoStream: any;
  public videoPic: any = false;
  public singlePose: any;
  public flipHorizontal: any = false;
  public drawKeypoints: any = true;

  public miImagen;
  constructor(
    private _route: ActivatedRoute,
    private _disfrazService: DisfrazService,
  ) {
    this.url = global.url;
    this.disfraz = new Disfraz(null,null,null,null);
    this.miImagen = new Image();
  }

  public async ngOnInit() {
    // Consulta imagen
    this._route.params.subscribe(params => {
      let id = +params['disfrazId'];      
      this.infoDisfraz(id);
    });

    // Levanta reconocimiento
    this.model = await posenet.load();
    this.modelLoaded = true;
    setTimeout(() => {
      this.setSliderConfig();
    }, 1000);
    this.videoMode()
    this.realTimeVideo()
    
  }

  infoDisfraz(id){
    this._disfrazService.getDisfraz(id).subscribe(
      response => {
        this.disfraz = response.disfraz[0];
        // console.log(this.disfraz)
        
      
      },
      error => {
        // console.log(error)
      }
    );
  }

  public videoMode() {
    if (this.imgBtnStatus) {
      cancelAnimationFrame(this.animationFrame);
      this.videoCanvasEnable = false;
      this.fileName = 'No File Chosen';
      this.imageSrc = 'assets/white.jpg';
      this.webBtnStatus = true;
      this.imgBtnStatus = false;
      this.snapData = null;
      this.video = this.videoElement.nativeElement;
      this.initCamera({ video: true, audio: false });
      this.canvas = document.getElementById("canvas");
      this.canvasContext = this.canvas.getContext("2d");
      this.canvasContext.clearRect(0, 0, 400, 300);
    }
  }

  public setSliderConfig() {
    this.scoreThresholdOptions = {
      floor: 0.0,
      ceil: 1,
      step: 0.1,
      showSelectionBar: true
    };
    this.scoreThreshold = this.scoreThreshold;
    this.nmsRadiusOptions = {
      floor: 1,
      ceil: 50,
      step: 1,
      showSelectionBar: true
    };
    this.nmsRadius = this.nmsRadius;
  }

  public initCamera(config: any) {
    let browser = <any>navigator;
    browser.getUserMedia = (browser.getUserMedia ||
      browser.webkitGetUserMedia ||
      browser.mozGetUserMedia ||
      browser.msGetUserMedia);
    browser.mediaDevices.getUserMedia(config).then((stream: any) => {
      if (!stream.stop && stream.getTracks) {
        stream.stop = function () {
          this.getTracks().forEach(function (track: any) {
            track.stop();
          });
        };
      }
      this.videoStream = stream;
      try {
        this.video.srcObject = this.videoStream;
      } catch (err) {
        this.video.src = window.URL.createObjectURL(this.videoStream);
      }
      this.video.play();
    });
  }

  public async realTimeVideo() {
    this.miImagen.src = this.url+'disfraz/foto/'+this.disfraz.photoCostume;
    this.videoPic = false;
    if (this.videoCanvasEnable) {
      this.singlePose = await this.model.estimatePoses(this.video, {
        flipHorizontal: this.flipHorizontal,
        decodingMethod: 'single-person'
      });
      this.renderSinglePoseResult();

      this.animationFrame = requestAnimationFrame(() => {
        this.realTimeVideo();
      });
    }
  }

  public async renderSinglePoseResult() {
    try {
      this.canvas = document.getElementById("videoCanvas");
      this.canvasContext = this.canvas.getContext("2d");
      // this.canvasContext.drawImage(this.videoElement.nativeElement, 0, 0, this.canvasWidth, this.canvasHeight);
      this.drawSinglePoseResult();
    } catch (e) { }
  }

  public async drawSinglePoseResult() {
    if (this.drawKeypoints) {
      // this.singlePose[0]['keypoints'].forEach((points: any) => {
        
      //   if(points.part == 'nose' && points.score > 0.5){
      //     this.canvasContext.beginPath();
      //     // ***********
      //     let miImagen = new Image();
      //     miImagen.src = this.url+'disfraz/foto/'+this.disfraz.photoCostume;

      //     miImagen.onload = () =>{
      //       this.canvasContext.drawImage(miImagen,points['position']['x']-340, points['position']['y']-150,700,850);
      //     }
      //     // ************
      //     // console.log(points)

      //     // this.canvasContext.fillStyle = 'aqua';
      //     // this.canvasContext.arc(points['position']['x'], points['position']['y'], 3, 0, Math.PI*2, true);
      //     this.canvasContext.closePath();
      //     this.canvasContext.fill();
      //   }else if(points.part == 'leftEar' || points.part == 'rigthEar' ){
      //     var d = Math.hypot(points['position']['x'] - points['position']['x'] ,points['position']['y'] - points['position']['y'] );
      //     console.log(d)
      //   }
      // });
      let nariz = this.singlePose[0]['keypoints'].find(elemento => elemento.part == 'nose' && elemento.score > 0.9);
      let hombroDe = this.singlePose[0]['keypoints'].find(elemento => elemento.part == 'rightShoulder' && elemento.score > 0.9);
      let hombroIz = this.singlePose[0]['keypoints'].find(elemento => elemento.part == 'leftShoulder' && elemento.score > 0.9);
      this.canvasContext.beginPath();
      // ***********
      
      // miImagen.src = 'assets/images/sombrero.png';
      // miImagen.style.

      // calcular distancia
      var d = 0;
      if(hombroDe != undefined && hombroIz != undefined){
        d = Math.hypot(hombroDe.position['x'] - hombroIz.position['x'] ,hombroDe.position['y'] - hombroIz.position['y']);
      // console.log(d)
      }
      

      this.miImagen.onload = () =>{
        // this.canvasContext.drawImage(miImagen,nariz.position['x']-425,nariz.position['y']-150);
        // this.canvasContext.clearRect(0, 0, this.videoWidth, this.videoHeight);
        this.canvasContext.drawImage(this.videoElement.nativeElement, 0, 0, this.canvasWidth, this.canvasHeight);
        this.canvasContext.drawImage(this.miImagen,nariz.position['x']-d*2.9,nariz.position['y']-d*0.6,d*5,d*5);
      }
      // ************
      

      // this.canvasContext.fillStyle = 'aqua';
      // this.canvasContext.arc(points['position']['x'], points['position']['y'], 3, 0, Math.PI*2, true);
      this.canvasContext.closePath();
      this.canvasContext.fill();
    }
  }


}
