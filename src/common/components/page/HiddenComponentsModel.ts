/**
 * Created by sairam.manda on 8/20/2017.
 */

export  class HiddenComponentController{
    blockUiController:BlockUiCntrl= new BlockUiCntrl()
    blockUi:boolean
    alertUiContrlller:AlertUiController= new AlertUiController()
    alertUi:boolean
    showConfirm:boolean
    ariaCntrl:AriaHelperCntrl= new AriaHelperCntrl();
}

export class AlertUiController {
    title:string='Loading...'
    msg:string='Please wait, processing request...'
    btnElement:HTMLElement
}

export class BlockUiCntrl {
    title: string = 'Loading...'
    msg: string = 'Please wait, processing request...'
}

export class AriaHelperCntrl{
    msg:string
}
