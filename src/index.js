import './style.css'
import {ProjectInstance, TodoInstance} from './modules/constructors.js';
import {modalEvents} from './modules/domEvents'

let houseWork = ProjectInstance('House Work', '12/12/22', 'Need to clean the whole house');

let hooverStairs = TodoInstance('Hoover the stairs', '11/12/22', 'High', false, 'Get right in those corners');





console.log(houseWork.todos)
console.table(hooverStairs)