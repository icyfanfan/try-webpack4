import _ from 'lodash';

function component () {
    let ele = document.createElement('div');

    ele.innerText = _.join(['hello','webpack4'], ' ');
    
    return ele;

}

document.body.appendChild( component() ) 