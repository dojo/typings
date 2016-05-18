import * as request from 'dojo/request';

const resp = request('./test.json', { handleAs: 'json' });

console.log(resp);

resp.then((...args: any[]) => {
    console.log(args);
}, (error) => {
    console.log('error', error);
});
