import PromisePool from '../modules/promise_pool';
import Person from './person';

const undo = new PromisePool();
const yo = new Person({name: 'Iván', surname: 'Gajate', age: 42});

undo.push(yo.log.bind(yo));
undo.push(yo.getCompleteName.bind(yo));
//undo.push(yo.getError.bind(yo));

undo.all()
  .then(result => {
    console.log('Result: ', result);
  })
  .catch(error => {
    console.log('Result Error:', error)
  });

