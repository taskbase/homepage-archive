import {Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';

const SHOW_LEFT_IMAGE_ABOVE = 900;
const SHOW_RIGHT_IMAGE_ABOVE = 1200;

interface Point {
  x: number;
  y: number;
}

interface Line {
  selected: boolean;
  points: Point[];
}

interface TbModuleData {
  connectorLine: string;
  module: string;
  title: string;
  schildStyle: any;
}

@Component({
  selector: 'app-tb-modules',
  templateUrl: './tb-modules.component.html',
  styleUrls: ['./tb-modules.component.scss']
})
export class TbModulesComponent implements OnChanges, OnInit {

  @Input() screenWidth: number;
  showLeftImage: boolean;
  showRightImage: boolean;

  // svg stuff
  width = 500;
  height = 500;
  tbModuleData: TbModuleData[] = [{
    connectorLine: 'M152,75C150,75,116.66666666666666,57.5,100,150C83.33333333333334,242.5,50,630,50,630',
    module: 'blab-module',
    title: 'Blab',
    schildStyle: {
      top: '350px',
      left: '35px'
    }
  }, {
    connectorLine: 'M200,150C200,150,189.16666666666666,120,185,200C180.83333333333334,280,175,630,175,630',
    module: 'bla-module',
    title: 'Bla',
    schildStyle: {
      top: '460px',
      left: '125px'
    }
  }, {
    connectorLine: 'M300,150C300,150,311.6666666666667,120,315,200C318.3333333333333,280,320,630,320,630',
    module: 'blub-module',
    title: 'Blub',
    schildStyle: {
      top: '430px',
      left: '260px'
    }
  }, {
    connectorLine: 'M348,75C350,75,383.3333333333333,57.5,400,150C416.6666666666667,242.5,450,630,450,630',
    module: 'barf-module',
    title: 'Barf',
    schildStyle: {
      top: '300px',
      left: '360px'
    }
  }];
  activeModule: string;
  _touched: boolean;

  setActiveModule(val) {
    this._touched = true;
    this.activeModule = val;
  }

  ngOnChanges(changes: SimpleChanges) {
    this.setShowLeftImage(this.screenWidth);
    this.setShowRightImage(this.screenWidth);
  }

  ngOnInit() {
    let counter = 0;
    const iterateWhileUntouched = () => {
      if (!this._touched) {
        this.activeModule = this.tbModuleData[counter++ % this.tbModuleData.length].module;
        setTimeout(() => {
          iterateWhileUntouched();
        }, 2500);
      }
    };
    iterateWhileUntouched();
  }

  setShowLeftImage(windowSize: number) {
    this.showLeftImage = windowSize > SHOW_LEFT_IMAGE_ABOVE;
  }

  setShowRightImage(windowSize: number) {
    this.showRightImage = windowSize > SHOW_RIGHT_IMAGE_ABOVE;
  }

  trackByFn(index, item) {
    return item.connectorLine;
  }

}
