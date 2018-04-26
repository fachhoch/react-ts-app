import * as React from 'react';
import { render } from 'react-dom';
import './stylesheets/lib/bootstrap/3.3.7/bootstrap.min.css';
import './stylesheets/lib/font-awesome-4.7.0/css/font-awesome.min.css';
import './stylesheets/app.css'

import {AppUi} from './containers/AppUI';
import {AppCntrlIns} from "./appService";


const rootEl = document.getElementById('app');

render(
    <AppUi cntrl={AppCntrlIns} />,
  rootEl
)

