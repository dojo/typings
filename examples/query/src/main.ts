import * as query from 'dojo/query';

/* An example of working with query and NodeLists */

/* Querying all the nodes of the current document.  The will default to the node
  list being an array of Nodes */
const results = query('*');

/* Now we are going to assert that we will be only returning HTML elements,
  this now means resulting functions will be typed appropriately */
results
    .filter<HTMLElement>((node) => node.parentElement === document.body)
    .forEach((item) => {
        /* item is typed as HTMLElement */
        console.log(item.tagName);
    });

/* If we want to assert what types of nodes our query will return, we can do that
  upfront */

const myDiv = document.createElement('div');
const myP = document.createElement('p');

query<HTMLDivElement>('div')
    .concat(myDiv)
    .forEach((div) => {
        console.log(div.noWrap);
    });

/* it will also type guard us, for example, if you uncomment the below, you will
  throw a type error */

// divs = divs.concat(myP);
