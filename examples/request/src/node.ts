import * as request from 'dojo/request';

const resp = request('http://www.dojotoolkit.com/');

console.log(resp);

resp.then((response) => {
    console.log(typeof response);
});
