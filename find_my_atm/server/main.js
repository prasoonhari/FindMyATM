/**
 * Created by prasoon on 11/13/16.
 */
import path from 'path';
import fs from 'fs';

import env from './configs/environment';

import {boot} from './services/bootService';

import controllers from './controllers';

const app = boot();

app.use( controllers );