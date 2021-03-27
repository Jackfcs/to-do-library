import './style.css'
import {ProjectInstance, TodoInstance} from './modules/constructors.js';
import {modalEvents} from './modules/domevents.js'
import {projectCapture, saveData, todoCapture} from './modules/datacapture.js'
import {displayProjects} from './modules/domdisplay.js'



let hooverStairs = TodoInstance('Hoover the stairs', '11/12/22', 'High', false, 'Get right in those corners');

displayProjects.addToDom();

//console.log(projectCapture.projectName)

//console.log(projectCapture.myProjects)



