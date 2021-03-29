import './style.css'
import {displayProjects, render} from './modules/domdisplay.js'
import {ProjectInstance, TodoInstance} from './modules/constructors.js';
import {modalEvents} from './modules/domevents.js'
import {projectCapture, todoCapture, selectCurrentProject} from './modules/datacapture.js'




let hooverStairs = TodoInstance('Hoover the stairs', '11/12/22', 'High', false, 'Get right in those corners');
selectCurrentProject.currentProject = [];
render();







